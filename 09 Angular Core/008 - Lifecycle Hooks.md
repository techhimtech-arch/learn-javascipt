# Lifecycle Hooks

## 1. Definition

Angular **Lifecycle Hooks** are interfaces/methods called at specific moments during a component/directive/service lifecycle — providing control over initialization, updates, and cleanup.

## 2. Why do we need it?

Hook into component lifecycle phases to:
- Initialize/finalize work
- Respond to input changes
- Optimize performance
- Clean up subscriptions/resources

## 3. Internal Working

Angular calls hooks in predictable order:
1. OnChanges → ngOnInit → DoCheck → OnChanges → ...
2. After each change detection cycle
3. OnDestroy on destruction

## 4. Step-by-Step Execution

Example flow:
```typescript
export class MyComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data!: any;
  
  ngOnChanges(): void { console.log('Input changed'); }
  ngOnInit(): void { console.log('Initialized'); }
  ngDoCheck(): void { console.log('Checked'); }
  ngOnDestroy(): void { console.log('Destroyed'); }
}
```

Order:
1. `ngOnChanges` (first time + input changes)
2. `ngOnInit` (first run only)
3. `ngDoCheck` (every CD cycle)
4. `ngAfterContentInit`
5. `ngAfterViewInit`
6. ...OnChanges → DoCheck loop...
7. `ngOnDestroy`

## 5. Syntax

```typescript
// Implement interface and method
implements OnInit {
  ngOnInit(): void { ... }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
export class TimerComponent implements OnInit, OnDestroy {
  intervalId: any;
  ngOnInit(): void {
    this.intervalId = setInterval(() => console.log('tick'), 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
```

### Medium
```typescript
export class DataComponent implements OnChanges {
  @Input() config!: Config;
  private previousConfig!: Config;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && !changes.config.firstChange) {
      this.handleConfigChange(changes.config.previousValue, changes.config.currentValue);
    }
  }
}
```

### Advanced
```typescript
@Component({...})
export class SmartListComponent<T> implements OnInit, OnChanges, OnDestroy {
  @Input() items: T[] = [];
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  private destroy$ = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.updateVirtualList();
    }
  }

  ngOnInit(): void {
    this.viewport.renderedRangeStream.pipe(
      takeUntil(this.destroy$)
    ).subscribe(range => {
      this.handleRangeChange(range);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## 7. Visual Diagram (ASCII)

```
Component Lifecycle Hook Order

Creation Phase:
ngOnChanges → ngOnInit → ngDoCheck → 
ngAfterContentInit → ngAfterViewInit

Update Phase:
ngOnChanges → ngDoCheck → ngAfterContentChecked → ngAfterViewChecked

Destruction:
ngOnChanges → ngDoCheck → ngAfterContentChecked → 
ngAfterViewChecked → ngOnDestroy
```

## 8. Real-world Example

Cleanup HTTP subscriptions using `takeUntil(this.destroyed$)`.

## 9. Angular Use Case

Resource management, dynamic component loading, form initialization.

## 10. Common Mistakes

❌ Performing DOM queries before AfterViewInit
❌ Forgetting to unsubscribe
❌ Mutating inputs in ngOnChanges

## 11. Edge Cases

1. **Multiple input changes**
   ```typescript
   ngOnChanges(changes: SimpleChanges) {
     Object.keys(changes).forEach(key => {
       if (key === 'config') {...}
     });
   }
   ```

2. **First change detection**
   ```typescript
   if (changes.config && changes.config.firstChange) { ... }
   ```

## 12. Performance Considerations

Minimize work in frequently-called hooks (DoCheck).

## 13. Time & Space Complexity

O(1) per hook invocation typically.

## 14. Interview Questions

1. Hook execution order?
2. When to use OnChanges vs DoCheck?
3. Resource cleanup strategies?

## 15. Follow-up Questions

- "Can you trigger change detection manually?"

## 16. Production Best Practices

1. Use takeUntil/take(1) for automatic unsubscription
2. Defer heavy initialization to AfterViewInit
3. Avoid heavy computations in frequently-run hooks
4. Leverage async pipe to reduce manual subscription

## 17. Summary

Lifecycle hooks give precise control over component behavior at critical moments.

## 18. Revision Notes

- Order matters: Changes → Init → Check → Content → View → Destroy
- Only implement hooks you actually use
- Subscribe wisely in OnInit
- Unsubscribe in OnDestroy

## 19. Practice Questions

1. Implement proper subscription cleanup pattern.
2. Trigger side effects only after first input change.
3. Optimize virtual scroll viewport updates.

## 20. References

- [Angular: Lifecycle Hooks](https://angular.io/guide/lifecycle-hooks)

### Next File
**009 - Routing.md**
