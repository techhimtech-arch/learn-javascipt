# Caching Strategies

## 1. Definition

**Caching Strategies** optimize data retrieval by storing results closer to consumers — reducing latency, bandwidth, and backend load.

## 2. Why do we need it?

Improve perceived performance, reduce server costs, enhance offline resilience.

## 3. Internal Working

Cache layers:
- **Browser HTTP cache**: Automatic via HTTP headers
- **Service worker cache**: Programmatic control
- **In-memory cache**: Fast, ephemeral storage
- **localStorage/sessionStorage**: Persistent, synchronous
- **IndexedDB**: Rich async storage

## 4. Step-by-Step Execution

HTTP caching headers:
```
Cache-Control: public, max-age=3600, stale-while-revalidate=60
ETag: "abc123"
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
```

Strategy selection:
1. Static assets → long-lived cache with versioning
2. Dynamic data → short TTL or stale-while-revalidate
3. User-specific → no-cache or session-tagged

## 5. Syntax

```typescript
// Service worker cache
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});

// In-memory cache
class InMemoryCache<T> {
  private cache = new Map<string, T>();
  
  get(key: string): T | undefined {
    return this.cache.get(key);
  }
  
  set(key: string, value: T): void {
    this.cache.set(key, value);
    setTimeout(() => this.cache.delete(key), 60000); // Expire
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// localStorage wrapper
class LocalStorageService {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
```

### Medium
```typescript
// Cache-first with network fallback
@Injectable()
export class DataService {
  constructor(private http: HttpClient, private cache: LocalStorageService) {}
  
  getData(): Observable<Data[]> {
    const cached = this.cache.get<Data[]>('data');
    if (cached) {
      return of(cached);
    }
    
    return this.http.get<Data[]>('/api/data').pipe(
      tap(data => this.cache.set('data', data, 300)) // 5 min expiry
    );
  }
}
```

### Advanced
```typescript
// Stale-while-revalidate implementation
class SWRCache<K, V> {
  private cache = new Map<K, { data: V, timestamp: number }>();
  private readonly MAX_AGE = 5 * 60 * 1000; // 5 minutes

  async get(key: K, fetcher: () => Promise<V>): Promise<V> {
    const cached = this.cache.get(key);
    
    if (cached) {
      if (Date.now() - cached.timestamp < this.MAX_AGE) {
        return cached.data; // Fresh data
      }
      
      // Stale data - return immediately but revalidate in background
      this.revalidate(key, fetcher);
      return cached.data;
    }
    
    // No cache - fetch fresh data
    const data = await fetcher();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }
  
  private async revalidate(key: K, fetcher: () => Promise<V>): Promise<void> {
    const data = await fetcher();
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}
```

## 7. Visual Diagram (ASCII)

```
Caching Strategy Selection

Data Type       Strategy          Use Case
-----------     ----------        ----------------
Static Assets   Cache-first       Bundled JS/CSS
Dynamic Data    Stale-resolve     API responses
User Data       Network-first     Authentication
Images          Cache-first       Avatar/photos
```

## 8. Real-world Example

News site caching article list with background refresh.

## 9. Angular Use Case

HTTP interceptors caching, service worker config, local state persistence.

## 10. Common Mistakes

❌ Caching sensitive/user-specific data
❌ Not invalidating stale entries

## 11. Edge Cases

1. **Cache invalidation timing**
2. **Storage quota limits**
3. **Offline-first strategies**

## 12. Performance Considerations

Caching reduces round-trips — major speedup for repeat visits.

## 13. Time & Space Complexity

Depends on cache size — memory/storage constrained.

## 14. Interview Questions

1. Cache invalidation strategies?
2. Browser vs service worker caching?
3. Stale-while-revalidate benefits?

## 15. Follow-up Questions

- "Implement cache-buster pattern?"

## 16. Production Best Practices

1. Use versioned asset URLs
2. Separate per-user vs shared data
3. Set appropriate TTLs
4. Monitor cache hit ratios
5. Plan capacity limits

## 17. Summary

Thoughtful caching balances freshness, performance, and storage constraints.

## 18. Revision Notes

- HTTP cache controlled by headers
- Service workers enable programmatic control
- Memory cache for short-lived data
- LocalStorage persistent but synchronous
- SWR pattern improves perceived speed

## 19. Practice Questions

1. Cache API response with expiry.
2. Implement stale-while-revalidate.
3. Design cache invalidation strategy.

## 20. References

- [Web Cache Guide](https://web.dev/articles/caches)
- [Google: Stale-while-revalidate](https://web.dev/stale-while-revalidate/)
