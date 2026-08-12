# Service Workers

## 1. Definition

**Angular Service Worker** brings Progressive Web App capabilities — caching static assets and API responses for offline operation and improved performance.

## 2. Why do we need it?

Enable installable web apps, offline functionality, reduced network dependency.

## 3. Internal Working

1. Register service worker script during app init
2. Intercept network requests
3. Serve cached responses where available
4. Update cache in background when newer versions available

## 4. Step-by-Step Execution

Setup:
```bash
ng add @angular/pwa
```

Cache strategies:
1. **Freshness**: Always fetch latest, fall back to cache
2. **Performance**: Serve from cache immediately
3. **StaleWhileRevalidate**: Cache-first with background update

## 5. Syntax

```json
// ngsw-config.json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "filenames": ["/favicon.ico", "/index.html", "/manifest.webmanifest"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": ["/assets/**", "/*.css", "/*.js"]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api",
      "urls": ["/api/*"],
      "cacheConfig": {
        "strategy": "freshness",
        "maxSize": 100,
        "maxAge": "1d"
      }
    }
  ]
}
```

## 6. Examples (Easy → Advanced)

### Easy
```json
// Cache-first for images
{
  "name": "images",
  "installMode": "prefetch",
  "resources": { "files": ["/assets/images/**"] }
}
```

### Medium
```json
// Freshness strategy for API
{
  "name": "api-responses",
  "urls": ["/api/**"],
  "cacheConfig": {
    "strategy": "freshness",
    "maxSize": 50,
    "maxAge": "1h",
    "timeout": { "duration": 5000 }
  }
}
```

### Advanced
```typescript
// Programmatic cache control
import { SwPush } from '@angular/service-worker';

@Component({
  template: `<button (click)="subscribeToNotifications()">Enable Push</button>`
})
export class NotificationComponent {
  constructor(private swPush: SwPush) {}
  
  subscribeToNotifications(): void {
    this.swPush.requestSubscription(
      'bdc88...', // public key
      '/api/notifications',
      {}
    ).subscribe(sub => {
      console.log('Push subscription:', sub);
    });
  }
}
```

## 7. Visual Diagram (ASCII)

```
Service Worker Flow

Network Request
        │
        ▼
Service Worker Checks Cache
        │
   ┌────┴────┐
   │ Hit     │ Miss
   ▼         ▼
Cached Response  ──► Fetch from Network ──► Cache ──► Return
```

## 8. Real-world Example

Offline-capable dashboard syncing analytics when connectivity restored.

## 9. Angular Use Case

Progressive Web Apps, offline-first tooling, performance budgets.

## 10. Common Mistakes

❌ Caching sensitive/API data too long
❌ Not versioning cache correctly

## 11. Edge Cases

1. **Cache invalidation strategies**
2. **Large media asset handling**
3. **Update propagation timing**

## 12. Performance Considerations

Aggressive caching improves perceived performance.

## 13. Time & Space Complexity

Limited by browser storage quotas.

## 14. Interview Questions

1. Service worker lifecycle phases?
2. Stale-while-revalidate usage?
3. Cache busting techniques?

## 15. Follow-up Questions

- "Handle auth token caching?"

## 16. Production Best Practices

1. Separate versioned assets from dynamic content
2. Version cache with file hashes
3. Test offline scenarios thoroughly
4. Monitor cache size limits

## 17. Summary

Service workers transform websites into reliable, installable experiences.

## 18. Revision Notes

- Three cache strategies (freshness, performance, staleWhileRevalidate)
- Intercept requests at network layer
- Background sync for offline actions
- Update notifications via SW events

## 19. Practice Questions

1. Configure caching for static assets.
2. Implement stale-while-revalidate for API.
3. Handle service worker updates.

## 20. References

- [Angular Service Worker](https://angular.io/guide/service-worker-intro)
- [Web.dev: Service Workers](https://web.dev/articles/service-worker-quick-guide)

---

## Module 10 (Angular Advanced) - Continuing...
