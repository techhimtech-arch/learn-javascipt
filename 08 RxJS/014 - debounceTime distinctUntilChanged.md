# debounceTime distinctUntilChanged

## 1. Definition

Two essential rate-limiting operators:
- **debounceTime(ms)**: Delays emission until no new input for specified duration
- **distinctUntilChanged()**: Only emits when current value differs from previous

## 2. Why do we need it?

- debounceTime: Prevent excessive API calls during rapid typing (autocomplete)
- distinctUntilChanged: Avoid redundant actions/re-renders

## 3. Internal Working

- debounceTime: Resets timer on each new emission; fires only after quiet period
- distinctUntilChanged: Tracks previous value; compares current to last

## 4. Step-by-Step Execution

Example:
```javascript
// User typing "hello"
input$ = from(['h', 'he', 'hel', 'hell', 'hello'])

input$.pipe(
  debounceTime(300),
  distinctUntilChanged()
)
```

Steps for debounceTime:
1. Receive 'h' → start 300ms timer
2. Receive 'he' within 300ms → reset timer
3. Receive 'hel' within 300ms → reset timer
4. No more input → timer expires → emit 'hel'

Steps for distinctUntilChanged:
1. Emits 'hel'
2. If next value = 'hel' → suppressed
3. If next value = 'help' → emitted

## 5. Syntax

```javascript
// debounceTime
source$.pipe(debounceTime(300))

// distinctUntilChanged
source$.pipe(distinctUntilChanged())

// Key-based comparison
source$.pipe(distinctUntilChanged((prev, curr) => prev.id === curr.id))
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
of(1, 1, 2, 2, 3).pipe(
  distinctUntilChanged()
).subscribe(console.log); // 1, 2, 3
```

### Medium
```typescript
// Search box with debounce
this.searchInput.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  filter(term => term.length >= 2),
  switchMap(term => this.searchService.search(term))
).subscribe(results => this.results = results);
```

### Advanced
```typescript
// Complex form validation sequence
this.validationSubject.pipe(
  debounceTime(250),
  distinctUntilChanged((prev, curr) => 
    JSON.stringify(prev) === JSON.stringify(curr)
  ),
  switchMap(form => this.validateForm(form))
).subscribe(validation => {
  this.formErrors = validation.errors;
});
```

## 7. Visual Diagram (ASCII)

```
debounceTime(300ms) Behavior:

Events: h ─ h-e ─ h-e-l ─ h-e-l-l ─ h-e-l-l-o(pause)
Timer resets each time
                    ───► 300ms silence ───► Emit "hello"

distinctUntilChanged():

Values: 1 ──► 1 ──► 2 ──► 3 ──► 3
Emit?:   ✓     ✗     ✓     ✓     ✗
Output:  1           2     3
```

## 8. Real-world Example

Angular reactive search input:
```typescript
@Component({
  template: `<input [formControl]="searchBox">`
})
export class SearchComponent {
  results: any[] = [];
  private loading = false;

  ngOnInit(): void {
    this.searchBox.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(term => term ? this.api.search(term) : of([])),
      finalize(() => this.loading = false)
    ).subscribe(data => this.results = data);
  }
}
```

## 9. Angular Use Case

- debounceTime: Search inputs, resize handlers, scroll events
- distinctUntilChanged: Prevent unnecessary change detection cycles

## 10. Common Mistakes

❌ Using debounce instead of debounceTime  
❌ Not combining with distinctUntilChanged  
❌ Misunderstanding leading/trailing edge behavior

## 11. Edge Cases

1. **Immediate first emission**
   ```javascript
   // distinctUntilChanged emits first value immediately
   of(1,1,2).pipe(distinctUntilChanged()).subscribe() // 1, 2
   ```

2. **Leading/trailing config**
   ```javascript
   debounceTime(300, undefined, { leading: true, trailing: true })
   ```

3. **Custom equality**
   ```javascript
   distinctUntilChanged((prev, curr) => 
     prev.toLowerCase() === curr.toLowerCase()
   )
   ```

## 12. Performance Considerations

debounceTime reduces unnecessary computations during rapid fire events.

## 13. Time & Space Complexity

Both O(1) per emission — constant time checks/operations.

## 14. Interview Questions

1. Where would you use debounceTime?
2. What does distinctUntilChanged prevent?
3. Difference between debounce/throttle?

## 15. Follow-up Questions

- "How to implement search with both operators together?"
- "What if you want to fire immediately and then debounce?"

## 16. Production Best Practices

1. Always combine debounceTime with distinctUntilChanged
2. Adjust debounce timing based on user expectation
3. Cancel timers appropriately during component teardown
4. Provide visual feedback while waiting

## 17. Summary

These two work great together — debounce prevents spamming, distinctUntilChanged avoids redundant processing.

## 18. Revision Notes

- debounceTime: time-based suppression
- distinctUntilChanged: value-based suppression
- Often chained together
- Critical for performant UX

## 19. Practice Questions

1. Implement smart search field.
2. Optimize window resize handler.
3. Reduce redundant form validations.

## 20. References

- [RxJS: debounceTime](https://rxjs.dev/api/operators/debounceTime)
- [RxJS: distinctUntilChanged](https://rxjs.dev/api/operators/distinctUntilChanged)

### Next File
**015 - takeUntil.md**
