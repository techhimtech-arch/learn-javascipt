# Subscription

## 1. Definition

A **Subscription** represents a disposable resource holding an active connection between an Observable and its Observer.

Essential for cleanup – calling `.unsubscribe()` stops emissions and releases resources.

## 2. Why do we need it?

Prevents memory leaks and unnecessary computations in long-lived applications.

## 3. Internal Working

When you call `.subscribe()`:
1. A subscription object returned
2. Contains references to observer + observable
3. Stores teardown function(s) from source
4. `.unsubscribe()` cancels ongoing processes

## 4. Step-by-Step Execution

Example:
```javascript
const sub = interval(1000).subscribe(console.log);

setTimeout(() => {
  sub.unsubscribe(); // Stops interval
}, 5000);
```

Steps:
1. Create subscription to interval stream
2. After 5 seconds → unsubscribe
3. Interval cleared → no further logs

## 5. Syntax

```javascript
const subscription = observable$.subscribe(observer);
subscription.unsubscribe();

// Composite subscriptions group multiple together
const subs = new Subscription();
subs.add(sub1);
subs.add(sub2);
subs.unsubscribe(); // Cancels everything
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const sub = timer(0, 1000).subscribe(console.log);
setTimeout(() => sub.unsubscribe(), 10000); // Stop after 10s
```

### Medium
```javascript
class MyComponent {
  private subs = new Subscription();

  ngOnInit() {
    this.subs.add(dataService.updates.subscribe(this.handleUpdate.bind(this)));
  }

  ngOnDestroy() {
    this.subs.unsubscribe(); // Tear down all on destroy
  }
}
```

### Advanced
```typescript
// Auto-unsubscribe on component destroy
@Directive({ selector: '[appAutoSub]' })
export class AutoSubscribeDirective implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    timer(0, 1000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(val => console.log(val));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## 7. Visual Diagram (ASCII)

```
Subscription Lifecycle

Observable ──► subscribe() ──► Subscription
                                   │
                        .unsubscribe() ─► Teardown
                                   │
                            Release Resources
```

## 8. Real-world Example

Angular `async` pipe manages subscriptions internally:
```html
<span>{{ data$ | async }}</span> <!-- Auto subscribes/unsubscribes -->
```

## 9. Angular Use Case

Prevents memory leaks in components using observables (HTTP, timers, WebSocket).

## 10. Common Mistakes

❌ Forgetting to unsubscribe  
❌ Calling `.unsubscribe()` on completed streams

## 11. Edge Cases

1. **Completed subscriptions safe to unsubscribe**
2. **Adding child subscriptions to parent**
3. **Sharing subscription across components**

## 12. Performance Considerations

Unsubscribe promptly to free memory/CPU resources.

## 13. Time & Space Complexity

O(1) subscribe/unsubscribe cost.

## 14. Interview Questions

1. Why unsubscribe important?
2. Composite subscription usage?
3. Auto-unsubscribe techniques?

## 15. Follow-up Questions

- "What happens if we never unsubscribe?"
- "How does async pipe avoid leaks?"

## 16. Production Best Practices

1. Use `takeUntil` pattern with subject per component
2. Leverage `async` pipe whenever possible
3. Group related subscriptions with `Subscription` object

## 17. Summary

Subscriptions must be disposed to prevent resource leaks.

## 18. Revision Notes

- Returned from .subscribe()
- Must be unsubscribed
- Composite pattern supported
- async pipe auto-manages

## 19. Practice Questions

1. Implement takeUntil pattern.
2. Build composite subscription manager.
3. Fix common leak scenarios.

## 20. References

- [RxJS: Subscription](https://rxjs.dev/guide/subscription)

### Next File
**004 - Subject.md**
