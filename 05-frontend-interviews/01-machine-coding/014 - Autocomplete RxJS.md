# Autocomplete with RxJS

## 1. Definition

**Autocomplete** provides real-time suggestions as user types using RxJS streams to efficiently handle rapid input changes.

## 2. Why do we need it?

Balance responsiveness vs performance — avoid overwhelming servers with every keystroke.

## 3. Internal Working

Reactive pipeline:
1. Listen to input events
2. Debounce to wait for pause
3. Filter/distinct to reduce redundant calls
4. Cancel previous requests (switchMap)
5. Update suggestion list

## 4. Step-by-Step Execution

Angular implementation:
```typescript
this.searchTerm$ = this.searchControl.valueChanges.pipe(
  startWith(''),
  debounceTime(300),
  distinctUntilChanged(),
  filter(term => !!term),
  switchMap(term => this.autocompleteService.search(term)),
  catchError(() => of([]))
);
```

Steps:
1. valueChanges emits on input
2. debounceTime waits 300ms of silence
3. distinctUntilChanged skips repeated values
4. switchMap cancels prior requests, initiates new
5. catchError gracefully handles errors

## 5. Syntax

```typescript
input.valueChanges.pipe(
  debounceTime(delay),
  distinctUntilChanged(),
  filter(predicate),
  switchMap(searchTerm => apiCall(searchTerm)),
  catchError(() => of([]))
).subscribe(results => displayResults(results));
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
input.addEventListener('input', e => {
  const term = e.target.value;
  if (term.length < 2) return;
  fetch(`/api/suggest?q=${term}`).then(r => r.json()).then(showResults);
});
```

### Medium
```typescript
ngOnInit() {
  this.input.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => term ? this.search(term) : of([]))
  ).subscribe(results => this.suggestions = results);
}
```

### Advanced
```typescript
@Component({
  template: `
    <input [formControl]="searchControl" placeholder="Search...">
    <ul>
      <li *ngFor="let suggestion of suggestions$ | async">
        {{ suggestion }}
      </li>
    </ul>
  `
})
export class SmartSearchComponent {
  searchControl = new FormControl('');

  suggestions$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged((prev, curr) => prev.toLowerCase() === curr.toLowerCase()),
    switchMap(term => {
      if (!term || term.length < 2) return of([]);
      this.loading = true;
      return this.api.search(term).pipe(
        tap(results => this.suggestions = results),
        finalize(() => this.loading = false),
        catchError(() => of([]))
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private api: SearchService) {}
}
```

## 7. Visual Diagram (ASCII)

```
Autocomplete Pipeline

Input Stream: [a][ab][abc][abcd]
               ┊   ┊    ┊    ┊
debounceTime:  ┊   ┊    ┊    ┊ (300ms wait)
               ┊   ┊    ┊    ▼
distinct:      ┊   ┊    ┊   [abcd] (only distinct)
               ┊   ┊    ┊
switchMap:     ┊   ┊    ▼ (cancel previous fetches)
               ┊   ▼   fetch(abcd)
               ▼  fetch(abc) → cancelled
            fetch(ab) → cancelled

Result: Only fetch(abcd) completes
```

## 8. Real-world Example

Google Search-style predictive input component.

## 9. Angular Use Case

Reactive search fields, type-ahead components, cascading dropdowns.

## 10. Common Mistakes

❌ Not debouncing input  
❌ Not cancelling previous requests  
❌ Not handling empty results

## 11. Edge Cases

1. **Minimum character threshold**
   ```typescript
   filter(term => term && term.length >= 2)
   ```

2. **Network latency variance**
3. **Empty/no results states**

## 12. Performance Considerations

Debounce time tuning crucial — too short = too many requests, too long = poor UX.

## 13. Time & Space Complexity

Depends on API response time; stream backpressure managed via switchMap.

## 14. Interview Questions

1. RxJS operators used?
2. Why switchMap over mergeMap here?
3. Handle cancellation visually?

## 15. Follow-up Questions

- "How to cache recent searches?"

## 16. Production Best Practices

1. Start with conservative debounce (~300ms)
2. Show loading indicator during request
3. Implement local caching for repeated terms
4. Graceful degradation on API failures

## 17. Summary

RxJS excels at autocomplete flows — combining debounce/dedup/cancellation naturally.

## 18. Revision Notes

- valueChanges stream backbone
- debounceTime prevents over-fetching
- distinctUntilChanged avoids redundant work
- switchMap ensures latest result wins

## 19. Practice Questions

1. Build basic typeahead component.
2. Add minimum length requirement.
3. Implement local caching layer.

## 20. References

- [RxJS: switchMap](https://rxjs.dev/api/operators/switchMap)
- [Angular Reactive Forms Guide](https://angular.io/guide/reactive-forms)

### Next File
**015 - Infinite Scroll.md**
