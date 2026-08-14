/**
 * Service Worker — offline-first app shell for the Learning Hub.
 *
 * Strategy:
 *   - Navigation requests (HTML): network-first, fall back to cached index.html
 *   - Static assets (js/css/manifest): stale-while-revalidate
 *   - Quiz JSON + topics.json: cache-first (so quizzes work fully offline)
 *   - Everything else: try network, cache on success
 *
 * Bump CACHE_VERSION to force-update cached files after a deploy.
 */
const CACHE_VERSION = 'learnhub-v2';
const APP_SHELL = [
  './',
  './index.html',
  './topics.json',
  './manifest.webmanifest',
  './css/style.css',
  './js/app.js',
  './js/db.js',
  './quizzes/quiz-index.json',
  './quizzes/banks/interview.json',
  './quizzes/banks/angular.json',
  './quizzes/banks/concepts.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // let CDN (fonts, hljs, marked) pass through

  // Quiz data + manifest: cache-first (offline friendly)
  if (url.pathname.endsWith('.json') || url.pathname.endsWith('.webmanifest')) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // HTML navigations: network-first, fall back to cached shell
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req));
    return;
  }

  // JS/CSS/icons: stale-while-revalidate
  event.respondWith(staleWhileRevalidate(req));
});

function cacheFirst(req) {
  return caches.match(req).then((cached) => cached || fetch(req).then((res) => {
    if (res && res.ok) {
      const copy = res.clone();
      caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
    }
    return res;
  }).catch(() => cached));
}

function networkFirst(req) {
  return fetch(req).then((res) => {
    if (res && res.ok) {
      const copy = res.clone();
      caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
    }
    return res;
  }).catch(() => caches.match(req).then((c) => c || caches.match('./index.html')));
}

function staleWhileRevalidate(req) {
  return caches.match(req).then((cached) => {
    const network = fetch(req).then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => cached);
    return cached || network;
  });
}
