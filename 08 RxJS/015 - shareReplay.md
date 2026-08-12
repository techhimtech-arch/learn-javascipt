# shareReplay

## 1. Definition

**shareReplay** multicasts the last N emissions to new subscribers — sharing a single underlying execution among multiple observers while caching recent values.

## 2. Why do we need it?

Optimize resource usage (prevent duplicate API calls) while ensuring late subscribers get the most recent data immediately.

## 3. Internal Working

1. Subscribes to source observable once
2. Buffers last N emissions (configurable)
3. New subscribers receive buffered values instantly
4. Continues receiving live updates afterward

## 4. Step-by-Step Execution

Example:
```typescript
const shared$ = makeHttpRequest().pipe(
  shareReplay({ bufferSize: 1 })
);

// First subscriber triggers HTTP call
shared$.subscribe(data => { /* gets data */ });

// Second subscriber receives cached result instantly
shared$.subscribe(data => { /* already available */ });
```

Steps:
1. First subscribe → source executes
2. Result stored in replay buffer
3. Second subscribe → gets buffered value
4. Both continue receiving updates

## 5. Syntax

```typescript
source$.pipe(
  shareReplay({
    bufferSize: 1,
    refCount: true
  })
);

// Or shorthand
source$.pipe(shareReplay(1));
```

Parameters:
- `bufferSize`: How many recent values to replay
- `refCount`: Whether to unsubscribe when all subscribers leave
- `errors`: Whether to replay errors (default false)

## 6. Examples (Easy → Advanced)

### Easy
```typescript
const apiCall$ = this.http.get('/api/data').pipe(
  shareReplay(1)
);

// Two components both calling this
this.componentA.data = apiCall$;
this.componentB.data = apiCall$; // Gets cached result
```

### Medium
```typescript
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config$ = this.http.get<AppConfig>('/assets/config.json').pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getConfig(): Observable<AppConfig> {
    return this.config$;
  }
}
```

### Advanced
```typescript
// Caching HTTP responses with error handling
@Injectable()
export class CachedDataService {
  private cache = new Map<string, Observable<any>>();
  
  getCached<T>(url: string): Observable<T> {
    if (!this.cache.has(url)) {
      this.cache.set(url, this.http.get<T>(url).pipe(
        shareReplay({ 
          bufferSize: 1, 
          refCount: true 
        }),
        catchError(err => {
          // Clear cache on error
          this.cache.delete(url);
          return throwError(() => err);
        })
      ));
    }
    return this.cache.get(url)!;
  }
}
```

## 7. Visual Diagram (ASCII)

```
shareReplay Multicast Behavior

Source Observable ──► [shareReplay(1)]
       │
Subscriber A ───────► Receives value, caches it
       │
Subscriber B ───────► Instantly gets cached value
       │
Both ──► Continue receiving live updates
```

## 8. Real-world Example

Angular HTTP config loading shared across services.

## 9. Angular Use Case

Caching singleton HTTP requests, sharing form state, memoizing selectors.

## 10. Common Mistakes

❌ Forgetting `refCount` leading to memory leaks
❌ Caching failed/error states unintentionally

## 11. Edge Cases

1. **Error propagation**
   ```typescript
   shareReplay({ bufferSize: 1, errors: true }); // Replays errors too
   ```

2. **Completion behavior**
   ```typescript
   // refCount: true → unsubscribes when no subscribers
   // refCount: false → stays alive indefinitely
   ```

3. **Cold-to-hot conversion with caching**
   ```typescript
   const hot$ = coldObservable.pipe(shareReplay(1));
   ```

## 12. Performance Considerations

Balances memory (buffering) vs network savings (sharing).

## 13. Time & Space Complexity

Space: O(bufferSize) for cached emissions
Time: negligible overhead per emission

## 14. Interview Questions

1. When to use shareReplay over share?
2. Difference from publishLast/replay?
3. refCount impact?

## 15. Follow-up Questions

- "How does it interact with retry logic?"

## 16. Production Best Practices

1. Set appropriate buffer sizes
2. Handle errors before caching
3. Use refCount strategically
4. Combine with caching strategies for HTTP

## 17. Summary

shareReplay combines multicasting power with replay convenience — ideal for caching and sharing hot streams.

## 18. Revision Notes

- Buffers last N emissions
- Multicasts underlying source
- refCount controls subscription lifecycle
- Great for HTTP caching

## 19. Practice Questions

1. Cache HTTP response with shareReplay.
2. Prevent duplicate API calls.
3. Combine with error retry logic.

## 20. References

- [RxJS: shareReplay](https://rxjs.dev/api/operators/shareReplay)

### Next File
**016 - Creating Observables.md**
