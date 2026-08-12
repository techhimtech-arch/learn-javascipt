# Higher Order Mapping

## 1. Definition

**Higher Order Mapping (HOM)** operators map values to inner Observables — flattening nested asynchronous flows into manageable streams.

## 2. Why do we need it?

Handle sequential/concurrent async operations triggered by previous emissions — essential for request-response cycles, user interactions.

## 3. Internal Working

Four variants differ in concurrency strategy:
- **switchMap**: switches to new inner observable, cancels previous
- **mergeMap**: spawns concurrent inner observables, merges results
- **concatMap**: queues inner observables sequentially
- **exhaustMap**: ignores new if previous still active

## 4. Step-by-Step Execution

Example:
```typescript
const queryChange$ = new Subject<string>();

const results$ = queryChange$.pipe(
  switchMap(query => api.search(query))
);

// Typing "abc"
queryChange$.next('a'); // request 1 starts
queryChange$.next('ab'); // request 1 cancelled, request 2 starts
queryChange$.next('abc'); // request 2 cancelled, request 3 starts
```

Steps:
1. Input triggers emission
2. map operator maps to inner observable
3. HOM flattens to single output stream
4. Concurrency strategy determines behavior

## 5. Syntax

```typescript
source$.pipe(
  switchMap(value => innerObservable(value))
);

source$.pipe(
  mergeMap(value => innerObservable(value), concurrency)
);
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// switchMap for autocomplete
this.searchInput.valueChanges.pipe(
  debounceTime(300),
  switchMap(term => this.api.search(term))
).subscribe(results => this.displayResults(results));
```

### Medium
```typescript
// mergeMap for parallel file uploads
this.uploads$.pipe(
  mergeMap(file => uploadFile(file), 3) // Max 3 concurrent
).subscribe(uploaded => this.updateProgress(uploaded));
```

### Advanced
```typescript
// concatMap for ordered operations
this.batchActions$.pipe(
  concatMap(action => {
    return of(action).pipe(
      delay(100),
      mergeMap(() => this.executeAction(action))
    );
  })
).subscribe(); // Ensures strict ordering

// exhaustMap for preventing duplicates
this.saveButton$.pipe(
  exhaustMap(() => this.save())
).subscribe(); // Ignores clicks during save
```

## 7. Visual Diagram (ASCII)

```
Operator Behavior Comparison

switchMap:
Stream1 ──► [Switch] ──► Result
Stream2 ──► [Switch] ──► Result ← Latest only
Stream3 ──► [Switch] ──► Result

mergeMap:
Stream1 ──► [Merge] ──► Result ┐
Stream2 ──► [Merge] ──► Result ├── Combined timing
Stream3 ──► [Merge] ──► Result ┘
```

## 8. Real-world Example

Search input that cancels outdated requests.

## 9. Angular Use Case

HTTP requests based on user input, form submissions, polling mechanisms.

## 10. Common Mistakes

❌ Using switchMap where mergeMap needed (lost emissions)
❌ Not considering concurrency limits

## 11. Edge Cases

1. **Inner observable completion timing**
   ```typescript
   // concatMap waits for prior to complete
   // mergeMap merges regardless
   ```

2. **Shared inner observables**
3. **Nested subscription cleanup**

## 12. Performance Considerations

Concurrency affects throughput vs order guarantees.

## 13. Time & Space Complexity

Per operator depends on source emission rate.

## 14. Interview Questions

1. switchMap vs mergeMap vs concatMap vs exhaustMap?
2. When to use each variant?
3. Cancel previous request pattern?

## 15. Follow-up Questions

- "How to limit concurrent requests?"

## 16. Production Best Practices

1. Match strategy to business requirements
2. Consider user experience during cancellation
3. Combine with proper error handling
4. Test operator choices with real scenarios

## 17. Summary

HOM operators enable expressive handling of nested asynchronous flows.

## 18. Revision Notes

- switchMap: latest only (autocomplete)
- mergeMap: parallel (uploads)
- concatMap: sequential (ordered processing)
- exhaustMap: ignore during activity (save buttons)

## 19. Practice Questions

1. Implement autocomplete with proper cancellation.
2. Upload files in parallel with concurrency limit.
3. Queue API calls maintaining order.

## 20. References

- [RxJS: Higher Order Mapping](https://rxjs.dev/guide/opizer)
