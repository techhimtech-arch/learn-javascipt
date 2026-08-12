# Memory Leaks in TypeScript

## 1. Definition

**Memory Leaks in TypeScript/JavaScript** occur when allocated objects are no longer needed but remain referenced — preventing garbage collection.

## 2. Why do we need it?

Detect and prevent gradual memory consumption leading to performance degradation.

## 3. Internal Working

Common leak patterns:
1. **Event listener retention**: Forgotten removeEventListener calls
2. **Subscription leaks**: Unsubscribed observables
3. **Timer leaks**: Intervals/timeouts not cleared
4. **Closures**: Captured references never released
5. **DOM node retention**: Orphaned elements with references
6. **Global state leaks**: Accidental global variable pollution

## 4. Step-by-Step Execution

```javascript
// ❌ Leaking event listener
const heavyHandler = () => { /* expensive */ };
document.addEventListener('scroll', heavyHandler); // Never removed!

// ✅ Correct approach
const cleanupFunctions = [];
function addListenerWithCleanup(element, event, handler) {
  element.addEventListener(event, handler);
  const cleanup = () => element.removeEventListener(event, handler);
  cleanupFunctions.push(cleanup);
  return cleanup;
}
```

## 5. Syntax

```typescript
// Cleanup pattern with takeUntil
private destroy$ = new Subject<void>();

ngOnInit(): void {
  this.route.queryParams
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => { /* ... */ });
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// setInterval leak
let intervalId;

function startTimer() {
  intervalId = setInterval(() => {
    console.log('tick');
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId); // Required!
}
```

### Medium
```typescript
// Subscription group cleanup
class LeakyComponent {
  private subscriptions = new Subscription();

  loadData(): void {
    const sub1 = this.service.stream1$.subscribe(data => this.handle(data));
    const sub2 = this.service.stream2$.subscribe(data => this.handle(data));
    
    this.subscriptions.add(sub1);
    this.subscriptions.add(sub2);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Cleans all sub-group
  }
}
```

### Advanced
```typescript
// WeakMap-based listener registry
class EventBus {
  private listeners = new WeakMap<object, Set<Function>>();
  
  register(target: object, event: string, handler: Function) {
    if (!this.listeners.has(target)) {
      this.listeners.set(target, new Set());
    }
    this.listeners.get(target)!.add(handler);
    
    target.addEventListener(event, handler);
  }
  
  unregister(target: object, event: string, handler: Function) {
    target.removeEventListener(event, handler);
    
    const registered = this.listeners.get(target);
    if (registered) {
      registered.delete(handler);
      if (registered.size === 0) {
        this.listeners.delete(target); // Allows GC
      }
    }
  }
}
```

## 7. Visual Diagram (ASCII)

```
Memory Leak Mechanism

┌─────────────────────┐
│ Object Allocated    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Needed Reference    │
│ (component context) │
└─────────┬───────────┘
          │
   Object Destroyed
 (Expected)
          │
          ▼
┌─────────────────────┐
│ Forgotten Reference │ ←── LEANS TO LEAK!
└─────────┬───────────┘
          │
          ▼
 Garbage Collector SKIPS object
```

## 8. Real-world Example

Component subscription chain not unsubscribed — keeps entire component tree alive.

## 9. Angular Use Case

Subscription cleanup, timer management, event listener removal, third-party integration disposals.

## 10. Common Mistakes

❌ Forgetting subscription cleanup
❌ Mutating observables causing infinite loops

## 11. Edge Cases

1. **Third-party library cleanup APIs**
   ```typescript
   thirdPartyChart.destroy(); // Often missing
   ```

2. **Global event listeners**
```typescript
document.addEventListener('click', handler);
// Remove on destroy!
```

## 12. Performance Considerations

Early detection prevents gradual degradation.

## 13. Time & Space Complexity

Leaks grow linearly over time.

## 14. Interview Questions

1. Common leak patterns?
2. Prevent RxJS subscription leaks?
3. Use WeakMap/WeakSet effectively?

## 15. Follow-up Questions

- "Debugging memory leaks?"

## 16. Production Best Practices

1. Use takeUntil pattern consistently
2. Clear all timers/intervals
3. Remove global listeners
4. Verify third-party cleanup APIs
5. Profile memory during development

## 17. Summary

Preventing memory leaks ensures sustained application performance over extended sessions.

## 18. Revision Notes

- Closures capturing outer scope variables
- Event listeners requiring explicit removal
- takeUntil pattern for automatic cancellation
- WeakMap/WeakSet allow garbage collection

## 19. Practice Questions

1. Fix subscription leak in component.
2. Remove interval-based timer.
3. Audit global listener usage.

## 20. References

- [MDN: Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

---
