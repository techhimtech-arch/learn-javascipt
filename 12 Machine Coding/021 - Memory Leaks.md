# Memory Leak Detection in Angular

## 1. Definition

A **memory leak** in Angular apps occurs when objects/components/subscriptions retain references preventing garbage collection — gradually consuming browser memory.

## 2. Why do we need it?

Detect/prevent gradual performance degradation that leads to slow UI/browser crashes in long-running SPAs.

## 3. Internal Working

Common sources:
- Active subscriptions not unsubscribed
- Event listeners never removed
- Timers/intervals still running
- Retained references in closures/services
- Detached DOM nodes kept alive

## 4. Step-by-Step Execution

Detection workflow:
1. Open Chrome DevTools → Memory tab
2. Take heap snapshot
3. Perform suspected leaky action (navigate, subscribe)
4. Take another snapshot
5. Compare snapshots → look for growing object counts

Tools:
- Chrome DevTools Memory panel
- Allocation instrumentation
- heapdump module
- RxJS subscription tracking

## 5. Syntax

```typescript
// Bad - subscription leak
ngOnInit(): void {
  this.data$.subscribe(data => this.items = data); // Never unsubscribed!
}

// Good - manual cleanup
private destroy$ = new Subject<void>();

ngOnInit(): void {
  this.data$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(data => this.items = data);
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

// Better - async pipe
// Template: {{ data$ | async }}
data$ = this.service.getData();
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Fix subscription leak
@Component({...})
export class BadComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getData().subscribe(data => this.data = data);
    // Memory leak - subscription never cleaned up!
  }
}
```

### Medium
```typescript
// Proper cleanup using takeUntil
@Component({...})
export class GoodComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => this.loadData(params.id));

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.validate(value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Advanced
```typescript
// Global leak detection helper
@Injectable({ providedIn: 'root' })
export class LeakDetectorService {
  private subscriptions = new Set<Subscription>();
  
  track(subscription: Subscription): Subscription {
    this.subscriptions.add(subscription);
    subscription.closed && this.subscriptions.delete(subscription);
    return subscription;
  }

  destroyAll() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.clear();
  }
}

// Usage in component
ngOnInit() {
  const sub = this.api.watchUser().subscribe(...);
  this.leakDetector.track(sub);
}
```

## 7. Visual Diagram (ASCII)

```
Retention Path in Memory

Component Instance ──► Subscription ──► Observable ──► External Resource
           │              │                     │
           └──────────────┴─────────────────────┘
              All references must be cleared
              for garbage collector to reclaim memory
```

## 8. Real-world Example

Dashboard component subscribing to WebSocket feed without cleanup.

## 9. Angular Use Case

Service worker cleanup, WebSocket connections, interval timers, event handlers.

## 10. Common Mistakes

❌ Forgetting to unsubscribe from observables
❌ Global event listeners without cleanup
❌ setInterval not cleared

## 11. Edge Cases

1. **Long-lived streams in injectable services**
   ```typescript
   // Service with persistent subscriptions
   ```

2. **Third-party library subscriptions**
   ```typescript
   // Libraries that internally create subscriptions
   ```

3. **Circular reference chains**

## 12. Performance Considerations

Regular profiling helps catch leaks early before they compound.

## 13. Time & Space Complexity

Memory grows linearly with leaked objects over time.

## 14. Interview Questions

1. Common Angular memory leak patterns?
2. TakeUntil vs async pipe vs manual unsubscribe?
3. How to detect leaks programmatically?

## 15. Follow-up Questions

- "What about third-party libraries?"

## 16. Production Best Practices

1. Use async pipe wherever possible (auto-unsubscribes)
2. Implement takeUntil pattern consistently
3. Profile memory regularly during development
4. Use linting rules (e.g., `rxjs-no-unsafe-subscribe`)
5. Monitor event listener counts in DevTools

## 17. Summary

Memory leak prevention requires proactive lifecycle management in reactive applications.

## 18. Revision Notes

- Unsubscribe all observables
- Remove event listeners
- Clear timers/intervals
- Use async pipe/takeUntil patterns
- Profile regularly with DevTools

## 19. Practice Questions

1. Identify leak in sample component.
2. Implement global leak detector.
3. Convert subscriptions to async pipe.

## 20. References

- [Angular: Component Lifecycle](https://angular.io/guide/component-overview#component-lifecycle hook)
- [Chrome DevTools Memory Profiling](https://developer.chrome.com/docs/devtools/memory-problems/)
- [RxJS Subscription Tracking](https://rxjs.dev/guide/subscription)

---

## Module 12 (Machine Coding) — Complete! ✅

All 21 essential machine coding patterns covered. Next up: **Module 9 - Angular Core**.
