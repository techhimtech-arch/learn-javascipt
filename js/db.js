/**
 * db.js — Offline-first persistence for quiz progress & results.
 *
 * Uses IndexedDB when available, with a transparent localStorage fallback
 * (private mode, very old browsers, file:// contexts). Exposes `window.QuizDB`.
 */
(function (global) {
  'use strict';

  const DB_NAME = 'learnJsDB';
  const DB_VERSION = 1;
  const STORE_RESULTS = 'quizResults'; // keyPath: id
  const STORE_KV = 'kv';               // keyPath: key (mirrors course progress)

  let _dbPromise = null;

  function hasIDB() {
    return typeof indexedDB !== 'undefined';
  }

  function openDB() {
    if (!hasIDB()) return Promise.resolve(null);
    if (_dbPromise) return _dbPromise;
    _dbPromise = new Promise((resolve, reject) => {
      let req;
      try {
        req = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (e) {
        return reject(e);
      }
      req.onupgradeneeded = function (e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_RESULTS)) {
          db.createObjectStore(STORE_RESULTS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORE_KV)) {
          db.createObjectStore(STORE_KV, { keyPath: 'key' });
        }
      };
      req.onsuccess = function (e) { resolve(e.target.result); };
      req.onerror = function (e) { reject(e.target.error || new Error('IndexedDB open failed')); };
    });
    return _dbPromise;
  }

  // Generic transaction helper.
  function tx(storeName, mode, fn) {
    return openDB().then(function (db) {
      if (!db) return Promise.reject(new Error('IndexedDB unavailable'));
      return new Promise(function (resolve, reject) {
        let captured;
        const t = db.transaction(storeName, mode);
        const store = t.objectStore(storeName);
        const maybe = fn(store);
        if (maybe && typeof maybe.then === 'function') {
          maybe.then(function (r) { captured = r; }).catch(reject);
        }
        t.oncomplete = function () { resolve(captured); };
        t.onerror = function () { reject(t.error); };
        t.onabort = function () { reject(t.error || new Error('Transaction aborted')); };
      });
    });
  }

  // ---- localStorage fallback (kv only) ----
  const fallback = {
    get: function (k) {
      try { const v = localStorage.getItem('quiz_' + k); return v ? JSON.parse(v) : null; }
      catch (e) { return null; }
    },
    set: function (k, v) {
      try { localStorage.setItem('quiz_' + k, JSON.stringify(v)); } catch (e) {}
    }
  };

  const QuizDB = {
    available: hasIDB,

    /** Save one quiz attempt. record.id should be unique (e.g. bankId + timestamp). */
    saveQuizResult: function (record) {
      if (!hasIDB()) { fallback.set('result_' + record.id, record); return Promise.resolve(record); }
      return tx(STORE_RESULTS, 'readwrite', function (store) {
        return store.put(record);
      }).then(function () { return record; }).catch(function () {
        fallback.set('result_' + record.id, record); return record;
      });
    },

    getQuizResult: function (id) {
      if (!hasIDB()) return Promise.resolve(fallback.get('result_' + id));
      return tx(STORE_RESULTS, 'readonly', function (store) { return store.get(id); });
    },

    getAllResults: function () {
      if (!hasIDB()) return Promise.resolve([]);
      return tx(STORE_RESULTS, 'readonly', function (store) { return store.getAll(); });
    },

    getBestResult: function (scopeKey) {
      return this.getAllResults().then(function (all) {
        const list = (all || []).filter(function (r) { return r && r.scopeKey === scopeKey; });
        if (!list.length) return null;
        list.sort(function (a, b) { return (b.percent || 0) - (a.percent || 0); });
        return list[0];
      });
    },

    /** Generic KV (mirror course completion/bookmark progress offline). */
    setKV: function (key, value) {
      const rec = { key: key, value: value, updatedAt: new Date().toISOString() };
      if (!hasIDB()) { fallback.set(key, rec); return Promise.resolve(rec); }
      return tx(STORE_KV, 'readwrite', function (store) { return store.put(rec); })
        .then(function () { return rec; })
        .catch(function () { fallback.set(key, rec); return rec; });
    },

    getKV: function (key) {
      if (!hasIDB()) return Promise.resolve(fallback.get(key));
      return tx(STORE_KV, 'readonly', function (store) { return store.get(key); })
        .then(function (r) { return r ? r.value : null; });
    }
  };

  global.QuizDB = QuizDB;
})(window);
