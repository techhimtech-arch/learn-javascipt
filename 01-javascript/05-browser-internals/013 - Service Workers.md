# Service Workers

## 1. Definition

A **Service Worker** is a script run in the background by the browser, acting as a proxy between web app and network — enabling offline functionality, caching strategies, and push notifications.

## 2. Why do we need it?

Provide native-app-like experiences:
- Offline access
- Fast loading via cached assets
- Push notifications
- Background sync

## 3. Internal Working

Lifecycle:
1. **Registration**
2. **Install** – cache static assets
3. **Activate** – clean old caches
4. **Fetch intercept** – serve from cache/network
5. **Terminate** – idle cleanup

Registered via JavaScript, runs in separate thread.

## 4. Step-by-Step Execution

Example registration:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Registered'))
    .catch(err => console.error('Failed', err));
}
```

In `sw.js`:
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
```

## 5. Syntax

Register:
```javascript
navigator.serviceWorker.register(scriptURL[, options])
```

Inside SW:
```javascript
self.addEventListener('event', callback);
```

## 6. Examples (Easy → Advanced)

### Easy
Basic caching:
```javascript
caches.open('v1').then(cache => {
  cache.addAll(['/']);
});
```

### Medium
Network-first with fallback:
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match('/offline.html'))
  );
});
```

### Advanced
Stale-while-revalidate:
```javascript
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      caches.open(API_CACHE).then(cache =>
        fetch(event.request).then(resp => {
          cache.put(event.request, resp.clone());
          return resp;
        }).catch(() => cache.match(event.request))
      )
    );
  }
});
```

## 7. Visual Diagram (ASCII)

```
Service Worker Proxy Pattern

Browser ↔ Network
       ┊
       ┊ Intercepted by Service Worker
       ▼
Cache Storage ←→ Local Cache
       ▲
       ┊ Controlled Pages
       ▼
Web App
```

## 8. Real-world Example

Angular PWA uses service worker to enable offline browsing:
```json
// ngsw-config.json
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": { "files": ["/favicon.ico", "/*.css", "/*.js"] }
    }
  ]
}
```

## 9. Angular Use Case

Angular Service Worker (`@angular/pwa`) generates optimized SW configuration for asset caching, data groups, and update notifications.

## 10. Common Mistakes

❌ Incorrect cache invalidation  
❌ Not testing offline fallback  
❌ Over-caching dynamic content  

## 11. Edge Cases

1. **HTTPS requirement** – localhost exempt for dev
2. **Updates require re-fetch** – versioned cache names needed
3. **Cross-origin restrictions apply**

## 12. Performance Considerations

Proper caching strategy reduces load times and bandwidth usage significantly.

## 13. Time & Space Complexity

Cache size affects storage quota; fetch interception adds latency.

## 14. Interview Questions

1. Explain SW lifecycle phases.
2. Caching strategies?
3. Why require HTTPS?

## 15. Follow-up Questions

- "How to force update of cached content?"
- "Can SW communicate with client tabs?"

## 16. Production Best Practices

1. Version cache names explicitly
2. Implement stale-while-revalidate strategy
3. Monitor cache size and usage
4. Test thoroughly under poor connectivity

## 🔍 Quick Recap
- Runs in background thread
- Lifecycle: install/activate/fetch
- Caching strategies: cache-first/network-first/SWR
- Requires HTTPS (localhost ok for dev)

## 📝 Summary
Service Workers act as programmable proxies. With proper lifecycle management and caching strategies, they transform web apps into reliable, installable experiences — core technology behind Progressive Web Apps.

## 17. Summary

Essential for progressive web app patterns.

## 18. Revision Notes

- Runs separately from main thread
- Installs once, activates on next visit
- Fetch events intercept network calls
- Can go offline

## 19. Practice Questions

1. Cache-first for static assets.
2. Network-first with cache fallback.
3. Background sync implementation.

## 20. References

- [MDN: Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- Google Web Fundamentals PWA guides

### Module 5 Complete (10 files)
