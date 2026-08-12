# map filter tap

## 1. Definition

Three essential RxJS transformation/filtering operators:
- **map**: Transforms each emission
- **filter**: Selects emissions matching predicate
- **tap**: Side-effect operator for debugging/logging

## 2. Why do we need it?

Handle 90% of common stream transformation needs in Angular apps.

## 3. Internal Working

Each wraps source observable:
- map: applies function per value
- filter: passes through only matching
- tap: runs side effect without altering stream

## 4. Step-by-Step Execution

Example:
```javascript
from([1,2,3,4,5]).pipe(
  filter(x => x % 2 !== 0), // keep odds: 1,3,5
  map(x => x * 10),         // scale: 10,30,50
  tap(val => console.log(val)) // log each value
).subscribe();
```

Steps:
1. Source emits 1 → passes filter → maps to 10 → tap logs "10"
2. Source emits 2 → fails filter → dropped
3. Source emits 3 → passes → 30 → tap logs "30"
4. And so on...

## 5. Syntax

```javascript
// map
source$.pipe(map(fn));

// filter
source$.pipe(filter(predicate));

// tap
source$.pipe(tap(sideEffect));
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
of(1, 2, 3).pipe(
  map(x => x * 2),         // [2, 4, 6]
  filter(x => x > 3),      // [4, 6]
  tap(x => console.log(x)) // logs 4, 6
).subscribe();
```

### Medium
```typescript
this.userInput$ = this.searchInput.valueChanges.pipe(
  filter(text => text?.length >= 2),
  tap(term => this.loading = true),
  debounceTime(300),
  map(term => term.toLowerCase())
);
```

### Advanced
```typescript
// Multi-stage transformation with logging
this.form.valueChanges.pipe(
  tap(formValue => this._logChange('form_updated', formValue)),
  map(value => this._sanitize(value)),
  filter(sanitized => this._isValid(sanitized)),
  tap(valid => this._markValid(valid)),
  map(valid => this._transformForApi(valid))
).subscribe(apiData => this.submit(apiData));
```

## 7. Visual Diagram (ASCII)

```
Pipeline Execution Flow

Source: [1, 2, 3, 4, 5]
                ↓
            filter(odd)
                ↓ [1, 3, 5]
              map(x*10)
                ↓ [10, 30, 50]
                tap(log)
                ↓ Same values, logged
```

## 8. Real-world Example

Angular reactive form processing:
```typescript
this.filterForm.valueChanges.pipe(
  tap(() => this.isLoading = true),
  filter(form => form !== null),
  debounceTime(300),
  distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
  switchMap(form => this.api.applyFilters(form))
).subscribe(response => {
  this.results = response.items;
  this.isLoading = false;
});
```

## 9. Angular Use Case

Data transformation pipelines, form validation chains, API preprocessing.

## 10. Common Mistakes

❌ Putting subscribe/tap side effects in filter/map  
❌ Mutating objects in map (should return new)

## 11. Edge Cases

1. **filter dropping all values**
   ```javascript
   of(1, 2, 3).pipe(filter(x => false)).subscribe(); // Never emits, but completes normally
   ```

2. **tap for state updates**
   ```javascript
   source$.pipe(tap(val => this.loading = val > 0));
   ```

3. **map throwing error**
   ```javascript
   source$.pipe(map(JSON.parse)).subscribe({ error: e => handle(e) });
   ```

## 12. Performance Considerations

Chain operators efficiently - each adds overhead. Use switchMap/debounceTime combos for user input handling.

## 13. Time & Space Complexity

- All operate in O(1) per emission
- Filter may reduce downstream work

## 14. Interview Questions

1. Difference between map and tap?
2. Does filter change stream timing?
3. How to debug complex pipelines?

## 15. Follow-up Questions

- "Why not put side effects in map?"
- "What happens with filter when all values fail?"

## 16. Production Best Practices

1. Use tap for logging/state updates, not map
2. Always return transformed value in map
3. Chain filter/map before expensive operations
4. Add tap at points needing observability

## 17. Summary

map/filter/tap form the foundation of observable transformation workflows.

## 18. Revision Notes

- map: transform values
- filter: conditional pass-through
- tap: side-effect only
- All chainable via pipe()

## 19. Practice Questions

1. Convert number stream to filtered doubled values with logging.
2. Build validation pipeline with error states.
3. Transform API response fields before subscription.

## 20. References

- [RxJS: map](https://rxjs.dev/api/operators/map)
- [RxJS: filter](https://rxjs.dev/api/operators/filter)
- [RxJS: tap](https://rxjs.dev/api/operators/tap)

### Next File
**010 - mergeMap switchMap.md**
