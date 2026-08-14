# Memory Profiling

## 1. Definition

**Memory Profiling** identifies and resolves memory leaks/performance issues — using browser devtools to inspect heap snapshots and allocation timelines.

## 2. Why do we need it?

Detect leaks causing gradual performance degradation — especially in long-running SPAs.

## 3. Internal Working

Steps:
1. Trigger suspected leak scenario
2. Take heap snapshot before/after
3. Compare retaining paths to DOM nodes
4. Identify detached elements/lingering references

## 4. Step-by-Step Execution

Chrome DevTools workflow:
```bash
# 1. Open Chrome DevTools → Memory tab
# 2. Select "Heap snapshot"
# 3. Take baseline snapshot
# 4. Perform operation (navigate, subscribe, etc.)
# 5. Take comparison snapshot
# 6. Filter by "Detached DOM trees"
```

## 5. Syntax

```typescript
// Memory-safe subscription pattern
export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private api: ApiService) {}

  loadData(): void {
    this.api.getStream().pipe(
      takeUntil(this.destroy$) // Auto-cleanup
    ).subscribe(data => this.handleData(data));
  }

  ngOnDestroy(): void {
    this.destroy$.next();    // Trigger cleanup
    this.destroy$.complete(); // Complete subject
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Correct cleanup pattern
export class TimerComponent {
  private intervalId!: number;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      // ...
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Essential cleanup
  }
}
```

### Medium
```typescript
// Event listener cleanup
export class ScrollComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') container!: ElementRef;

  ngAfterViewInit(): void {
    this.container.nativeElement.addEventListener('scroll', this.onScroll);
  }

  private onScroll = (): void => {
    // Scroll handling
  };

  ngOnDestroy(): void {
    this.container.nativeElement.removeEventListener('scroll', this.onScroll);
  }
}
```

### Advanced
```typescript
// Comprehensive leak prevention
export class ComplexComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private subscriptions = new Subscription();
  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.pipe(
        takeUntil(this.destroy$)
      ).subscribe(params => this.handleParams(params))
    );

    this.resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => this.handleResize(entry));
    });
    this.resizeObserver.observe(this.elementRef.nativeElement);

    // Global listener cleanup
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onWindowResize());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscriptions.unsubscribe();
    this.resizeObserver.disconnect();
  }
}
```

## 7. Visual Diagram (ASCII)

```
Memory Profiling Workflow

┌─────────────────────────────────────┐
│ Step 1: Baseline Snapshot           │
│ (Clean state before operation)      │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│ Step 2: Perform Suspect Action      │
│ (Subscribe/listen/navigate)         │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│ Step 3: Comparison Snapshot         │
│ (After suspected leak)              │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│ Step 4: Analyze Retention Paths     │
│ Identify detached DOM trees         │
└─────────────────────────────────────┘
```

## 8. Real-world Example

Finding zombie subscriptions preventing component GC.

## 9. Angular Use Case

Component lifecycle management, service cleanup, third-party integration hygiene.

## 10. Common Mistakes

❌ Forgetting global event listeners
❌ Missing third-party library cleanup

## 11. Edge Cases

1. **Third-party library memory management**
2. **Circular reference prevention**
3. **WeakMap/WeakSet usage**

## 12. Performance Considerations

Regular profiling catches leaks before they impact users.

## 13. Time & Space Complexity

Profiling tools add runtime overhead — use judiciously.

## 14. Interview Questions

1. Tools for memory leak detection?
2. Common Angular leak sources?
3. takeUntil pattern explanation?

## 15. Follow-up Questions

- "Debug detached DOM trees?"

## 16. Production Best Practices

1. Regular memory profiling sessions
2. Automated subscription cleanup
3. Event listener auditing
4. Third-party library cleanup verification

## 17. Summary

Proactive memory profiling sustains long-term application health.

## 18. Revision Notes

- Heap snapshots reveal retained objects
- Detached DOM trees indicate leaks
- takeUntil pattern for subscription cleanup
- Always implement ngOnDestroy for external resources

## 19. Practice Questions

1. Fix subscription memory leak.
2. Audit event listener cleanup.
3. Profile simulated leak scenario.

## 20. References

- [Chrome DevTools Memory](https://developer.chrome.com/docs/devtools/memory-problems/)
- [Angular: Memory Leaks](https://indepth.dev/angular-memory-leaks/)

---

## Repository Progress Report
