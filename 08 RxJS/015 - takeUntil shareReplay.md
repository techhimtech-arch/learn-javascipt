# takeUntil shareReplay

## 1. Definition

Two critical RxJS operators:
- **takeUntil(notifier$)**: Emits values from source until notifier emits/completes — then completes
- **shareReplay(config)**: Multicasts last N emissions to new subscribers (ideal for caching/HTTP)

## 2. Why do we need it?

- takeUntil: Automatic cleanup of subscriptions based on lifecycle events
- shareReplay: Efficiently replay cached responses without re-fetching

## 3. Internal Working

- takeUntil subscribes to notifier$. When notifier emits/completes → unsubscribes from source
- shareReplay multicasts source, buffers N last emissions, replays them to new subscribers

## 4. Step-by-Step Execution

Example:
```javascript
this.route.params.pipe(
  takeUntil(this.destroyed$)
).subscribe(params => this.load(params.id));

// When destroyed$.next() called → subscription auto-unsubscribed
```

Steps for takeUntil:
1. Subscribe to `params`
2. Watch `destroyed$` concurrently
3. When component destroys → next() on destroyed$
4. takeUntil completes → unsubscribes from params

Steps for shareReplay:
1. First subscriber → source executes, buffers result
2. Second subscriber arrives → receives cached result immediately
3. No re-execution happens

## 5. Syntax

```javascript
// takeUntil
source$.pipe(takeUntil(componentDestroyed$))

// shareReplay
source$.pipe(shareReplay({ bufferSize: 1, refCount: true }))
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const destroy$ = new Subject<void>();

timer(1000).pipe(
  takeUntil(destroy$)
).subscribe(() => console.log('Will cancel'));

destroy$.next(); // Timer cancelled
```

### Medium
```typescript
@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  data$: Observable<any>;

  ngOnInit(): void {
    this.data$ = this.route.data.pipe(
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Clean everything
    this.destroy$.complete();
  }
}
```

### Advanced
```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  // Shared user data across app
  private user$ = this.http.get<User>('/api/user').pipe(
    shareReplay({ bufferSize: 1, refCount: false }),
    tap(user => this.currentUser = user)
  );

  getUser(): Observable<User> {
    return this.user$; // Always cached
  }

  refreshUser(): void {
    // Force refresh by replacing source
    this.user$ = this.http.get<User>('/api/user').pipe(
      shareReplay({ bufferSize: 1, refCount: false })
    );
  }
}
```

## 7. Visual Diagram (ASCII)

```
takeUntil Behavior:

Source Stream: ○─○─○─○─○─○─○─○─○─▶
Notifier:                     ●────▶ (emits)
Result:   ○─○─○─○─○─○─○─✕ (completed)

shareReplay Behavior:

Subscriber A: subscribes → triggers HTTP call → gets result → cached
Subscriber B: arrives later → instantly gets cached result (no HTTP)
```

## 8. Real-world Example

Angular service with singleton data:
```typescript
@Injectable({
  providedIn: 'root'
})
export class DataCacheService {
  private cache: Map<string, Observable<any>> = new Map();

  getData(key: string): Observable<any> {
    if (!this.cache.has(key)) {
      const obs = this.http.get(`/api/${key}`).pipe(
        shareReplay({ bufferSize: 1, refCount: true }), // Cache result
        tap(data => console.log(`Loaded ${key}`))
      );
      this.cache.set(key, obs);
    }
    return this.cache.get(key)!;
  }
}
```

## 9. Angular Use Case

- takeUntil: Component lifecycle management
- shareReplay: Caching HTTP responses across components

## 10. Common Mistakes

❌ Calling .next() on already completed subject
❌ Misconfiguring shareReplay buffer size

## 11. Edge Cases

1. **takeUntil with already completed notifier**
   ```javascript
   const stop$ = new Subject<void>();
   stop$.next(); // Already triggered
   source$.pipe(takeUntil(stop$)).subscribe(); // Immediate unsubscribe
   ```

2. **shareReplay refCount false**
   ```javascript
   // Data persists even after last subscriber unsubscribes
   ```

3. **Memory leak with takeUntil**
   ```javascript
   // If destroy$ never fires → subscription stays alive
   ```

## 12. Performance Considerations

Both reduce wasted computations and memory usage.

## 13. Time & Space Complexity

- takeUntil: minimal overhead
- shareReplay: memory cost scales with buffer size

## 14. Interview Questions

1. How does takeUntil help with cleanup?
2. What’s difference between share and shareReplay?
3. Why use refCount option?

## 15. Follow-up Questions

- "Alternatives to takeUntil pattern?"
- "How does async pipe handle unsubscription?"

## 16. Production Best Practices

1. Create `destroyed$` subjects in components using it
2. Call `.next()` and `.complete()` in ngOnDestroy
3. Use shareReplay for expensive, infrequently changing data
4. Be careful with buffer sizing

## 17. Summary

takeUntil handles automatic teardown, shareReplay enables efficient caching/replaying.

## 18. Revision Notes

- takeUntil: notifier-based completion
- shareReplay: cached multicast with replay
- Critical for component hygiene
- Used together in most Angular apps

## 19. Practice Questions

1. Implement component-level automatic unsubscribe.
2. Cache HTTP service result with shareReplay.
3. Build destroy pattern helper mixin.

## 20. References

- [RxJS: takeUntil](https://rxjs.dev/api/operators/takeUntil)
- [RxJS: shareReplay](https://rxjs.dev/api/operators/shareReplay)

### Module 8 Complete (15 files)
