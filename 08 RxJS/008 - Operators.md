# Operators

## 1. Definition

**Operators** are pure functions that take an Observable and return another Observable — transforming, filtering, or combining streams.

## 2. Why do we need it?

Compose behaviors declaratively — chain transformations without manual state management.

## 3. Internal Working

Pipeable operators:
1. Accept source Observable
2. Return new Observable wrapping transformed stream
3. Preserve original untouched

Creation operators return new Observables from scratch.

## 4. Step-by-Step Execution

Example:
```javascript
from([1,2,3]).pipe(
  filter(x => x % 2 === 0),
  map(x => x * 10)
).subscribe(console.log); // 20
```

Steps:
1. `from([1,2,3])` creates observable emitting 1,2,3
2. `filter` skips odds → passes 2
3. `map` multiplies → 20
4. `subscribe` receives 20

## 5. Syntax

```javascript
source$.pipe(
  operator1(),
  operator2(),
  ...
).subscribe(observer);
```

Categories:
- Creation (`of`, `from`, `timer`, `interval`)
- Transformation (`map`, `mergeMap`, `switchMap`)
- Filtering (`filter`, `takeUntil`, `distinctUntilChanged`)
- Utility (`tap`, `delay`, `catchError`)

## 6. Examples (Easy → Advanced)

### Easy
```javascript
of(1, 2, 3).pipe(
  map(x => x * 2)
).subscribe(console.log); // 2, 4, 6
```

### Medium
```javascript
fromEvent(input, 'input').pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => fetch(`/search?q=${term}`))
).subscribe(results => display(results));
```

### Advanced
```typescript
// Complex pipeline with error recovery
this.data$ = combineLatest([
  this.route.params,
  this.auth.user$
]).pipe(
  switchMap(([params, user]) =>
    this.api.loadDashboard(params.id, user.token)
  ),
  retry({ count: 3, delay: (error, retryCount) => timer(retryCount * 1000) }),
  catchError(error => of({ fallback: true }))
);
```

## 7. Visual Diagram (ASCII)

```
Operator Pipeline

Source Observable
    ↓ .pipe()
[map] → [filter] → [debounceTime] → [switchMap]
    ↓
Transformed Output Observable
```

## 8. Real-world Example

Angular reactive forms with live search:
```typescript
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  filter(term => term.length >= 3),
  switchMap(term => this.search(term))
).subscribe(results => this.results = results);
```

## 9. Angular Use Case

Essential for composing complex async flows in components/services.

## 10. Common Mistakes

❌ Interleaving side effects incorrectly  
❌ Nested subscriptions instead of mergeMap/switchMap

## 11. Edge Cases

1. **Sharing observable instances**
   ```javascript
   const shared = expensiveOp();
   shared.pipe(map(...)).subscribe(); // Runs once if shared
   ```

2. **Completion propagation**
   ```javascript
   source$.pipe(take(3)).subscribe(); // Auto-completes after 3
   ```

## 12. Performance Considerations

Reuse observables for common sources to avoid duplicate work.

## 13. Time & Space Complexity

Depends on operator chain length + source emission frequency.

## 14. Interview Questions

1. Pipeable vs patch operators?
2. When to use tap vs map?
3. Difference between mergeMap and switchMap?

## 15. Follow-up Questions

- "How does takeUntil work in ngOnDestroy?"

## 16. Production Best Practices

1. Chain declaratively
2. Minimize side effects in transformations
3. Use takeUntil for cleanup
4. Avoid nested subscriptions

## 17. Summary

Pure functions composing stream transformations elegantly.

## 18. Revision Notes

- Pure functions
- Return new observable
- Chained via .pipe()
- Categories: create/transform/filter/utility

## 19. Practice Questions

1. Chain map/filter on number stream.
2. Build autocomplete with debounce.
3. Convert nested subscription to flat.

## 20. References

- [RxJS: Operators](https://rxjs.dev/guide/operators)

### Next File
**009 - map filter tap.md**
