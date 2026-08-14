# Browser Storage

## 1. Definition

Browser storage mechanisms provide ways to persist data on the client side — ranging from small cookies to large IndexedDB databases.

Options include:
- Cookies
- LocalStorage
- SessionStorage
- IndexedDB

## 2. Why do we need it?

Store user preferences, cache responses, offline capability, session tracking.

## 3. Internal Working

Different engines/backends:
- Cookies sent automatically with HTTP requests
- Web Storage backed by filesystem
- IndexedDB uses structured clone algorithm in background threads

## 4. Step-by-Step Execution

Example with LocalStorage:
```javascript
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme'); // 'dark'
```

Steps:
1. Set key/value pair in storage
2. Stored persistently until cleared
3. Available across tabs/sessions

## 5. Syntax

```javascript
localStorage.setItem(key, value);
localStorage.getItem(key);
localStorage.removeItem(key);
sessionStorage.setItem(key, value);
```

IndexedDB requires async setup:
```javascript
const db = await openIndexedDB('MyApp');
db.transaction('store').objectStore.put(item);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
sessionStorage.setItem('loginAttempt', '1');
```

### Medium
```javascript
localStorage.setItem('settings', JSON.stringify(settingsObj));
```

### Advanced
```javascript
// Offline-first pattern with IndexedDB
const db = indexedDB.open('AppDB', 1);
db.onupgradeneeded = e => {
  const store = e.target.result.createObjectStore('cache', { keyPath: 'id' });
  store.createIndex('byUrl', 'url');
};
```

## 7. Visual Diagram (ASCII)

```
Browser Storage Hierarchy

┌──────────────┐
│ Cookies      │ (Small, HTTP-bound)
├──────────────┤
│ LocalStorage │ (Persistent, shared domain)
├──────────────┤
│ SessionStorage│ (Tab/session scoped)
├──────────────┤
│ IndexedDB    │ (Structured, async, versioned)
└──────────────┘
```

## 8. Real-world Example

Angular Service Worker caching strategy:
```typescript
@Injectable()
export class CacheService {
  async getCachedOrFetch(url: string): Promise<any> {
    const cached = await this.db.get('cache', url);
    if (cached) return cached.data;
    
    const res = await fetch(url);
    const data = await res.json();
    await this.db.put('cache', { id: url, data });
    return data;
  }
}
```

## 9. Angular Use Case

Offline data persistence, JWT token storage, application state backup.

## 10. Common Mistakes

❌ Storing sensitive data in localStorage (XSS risk)
❌ Overusing cookies for large payloads
❌ Not handling quota exceeded errors

## 11. Edge Cases

1. **Storage limits vary**
   - LocalStorage: ~5MB
   - IndexedDB: hundreds of MB+

2. **Same-origin restriction strict**
3. **Private browsing disables persistence**
4. **Synchronous nature of localStorage blocks main thread**

## 12. Performance Considerations

Use async alternatives (IndexedDB) for large datasets.

## 13. Time & Space Complexity

Depends on engine implementation — generally O(1) for small key-value pairs.

## 14. Interview Questions

1. Compare localStorage/sessionStorage/indexedDB
2. When to use cookies?
3. Security concerns with client-side storage?

## 15. Follow-up Questions

- "How to encrypt stored data?"

## 16. Production Best Practices

1. Never store auth tokens in localStorage (XSS risk)
2. Use secure flags on cookies
3. Gracefully handle storage limits
4. Version stored schemas

## 🔍 Quick Recap
- Cookies: small, auto-sent with requests
- LocalStorage/SessionStorage: key-value pairs
- IndexedDB: structured, async database
- Security: XSS risk with localStorage

## 📝 Summary
Different storage backends suit different needs. Cookies handle authentication/session state. LocalStorage/SessionStorage offer simple sync access for small data. IndexedDB provides scalable async storage for rich client apps. Choose appropriately based on size, persistence, and access requirements.

## 17. Summary

Choose right mechanism based on data size and persistence needs.

## 18. Revision Notes

- Cookies: automatic, limited size
- LocalStorage: persistent domain-wide
- SessionStorage: tab-scoped
- IndexedDB: largest capacity, async

## 19. Practice Questions

1. Implement theme preference persistence.
2. Store form draft in sessionStorage.
3. Cache API responses in IndexedDB.

## 20. References

- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### Next File
**010 - Cookies.md**
