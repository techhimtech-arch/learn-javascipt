# concatMap exhaustMap

## 1. Definition

Two more flattening operators:
- **concatMap**: Queues inner observables sequentially — completes current before starting next
- **exhaustMap**: Starts new inner observable but ignores any from previous until it completes

## 2. Why do we need it?

- concatMap: Preserve order, prevent race conditions (e.g., ordered saves)
- exhaustMap: Skip redundant work (e.g., drag-end events)

## 3. Internal Working

- concatMap: Maintains internal queue, subscribes to one at a time
- exhaustMap: Subscribes to new inner immediately, unsubscribes silently from old (without canceling)

## 4. Step-by-Step Execution

Example scenario (user typing fast):
```javascript
input$.pipe(
  concatMap(text => saveToServer({ text })) // Processes in order
);

drag$.pipe(
  exhaustMap(start => dragMove$, // Ignores intermediate drags
);
```

Steps for concatMap:
1. Emit A → start save A
2. While saving A: queue B, C
3. A completes → save B starts
4. B completes → save C starts
5. All processed in order

Steps for exhaustMap:
1. Drag1 starts → subscribe to dragMove$
2. Drag2 starts immediately → ignore Drag1's remaining events
3. Only complete drag matters

## 5. Syntax

```javascript
// concatMap
source$.pipe(concatMap(projectFn))

// exhaustMap
source$.pipe(exhaustMap(projectFn))
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// concatMap example
of('a', 'b').pipe(
  concatMap(letter => of(letter.toUpperCase()))
).subscribe(console.log); 
// a, b → A, B (same as mergeMap here since synchronous)
```

### Medium
```typescript
// Ordered API calls without overlap
saveQueue$ = new Subject<SaveRequest>();

saveQueue$.pipe(
  concatMap(request => this.api.save(request)),
  retry(1)
).subscribe(saved => this.saved.next(saved));

// Drag-to-edit feature
this.dragStart$.pipe(
  exhaustMap(() => this.dragMove$)
).subscribe(position => this.updatePosition(position));
```

### Advanced
```typescript
// Form submission queue
submitForm(form: FormGroup) {
  this.formSubmitQueue$.next(form.value);
}

formSubmissions$ = this.formSubmitQueue$.pipe(
  concatMap(formValue => 
    this.http.post('/api/forms', formValue).pipe(
      map(res => ({ success: true, data: res })),
      catchError(err => of({ success: false, error: err }))
    )
  )
).subscribe(result => {
  if (!result.success) {
    this.error.next(result.error);
  } else {
    this.success.next(result.data);
  }
});
```

## 7. Visual Diagram (ASCII)

```
concatMap Queue Behavior:

Events: [A] → [B] → [C]
Processing:
[A starts] → [B queued] → [C queued]
[A finishes] → [B starts] → [C queued]
[B finishes] → [C starts] → []
Order preserved!

exhaustMap Ignore Behavior:

Events: [Drag1][Drag2][Drag3]
Processing:
[Drag1 begins] → [Drag2 cancels Drag1]
[Drag3 cancels Drag2] → [Only Drag3 active]
```

## 8. Real-world Example

Angular form save queue preventing out-of-order writes:
```typescript
private formChanges$ = new Subject<FormValue>();

ngOnInit() {
  this.formChanges$.pipe(
    concatMap(form => this.backend.save(form)),
    catchError(err => throwError(() => err))
  ).subscribe(savedForm => {
    this.lastSaved = savedForm;
  });
}

onFormSubmit(form: any) {
  this.formChanges$.next(form);
}
```

## 9. Angular Use Case

- concatMap: Sequential operations requiring order preservation
- exhaustMap: UI gestures where only latest matters (drag, resize)

## 10. Common Mistakes

❌ Using switchMap for critical sequential operations
❌ Forgetting error handling in queue operators

## 11. Edge Cases

1. **concatMap backpressure**
   ```javascript
   source$.pipe(concatMap(asyncTask)) // Queues indefinitely
   ```

2. **exhaustMap with fast emissions**
   ```javascript
   interval(100).pipe(exhaustMap(() => timer(300))) // Drops some timers
   ```

## 12. Performance Considerations

- concatMap queues potentially infinite backlog
- Add buffer/dedupe if needed for high-frequency sources

## 13. Time & Space Complexity

concatMap: O(n) queue space worst case
exhaustMap: O(1) since only one active at a time

## 14. Interview Questions

1. concatMap vs mergeMap difference?
2. How exhaustMap suppresses old work?
3. When to pick each variant?

## 15. Follow-up Questions

- "How would you implement retry with delay?"

## 16. Production Best Practices

1. Use concatMap for ordered async sequences
2. Use exhaustMap for gesture-based flows
3. Monitor backpressure in long queues
4. Always handle errors to prevent deadlocks

## 17. Summary

concatMap = ordered queue, exhaustMap = latest-only processing.

## 18. Revision Notes

- concatMap: sequential, preserves order
- exhaustMap: ignores intermediate completions
- Useful for preventing race conditions
- Angular form/model sync uses cases heavily

## 19. Practice Questions

1. Queue user saves with concatMap.
2. Handle drag gesture with exhaustMap.
3. Process events preserving order.

## 20. References

- [RxJS: concatMap](https://rxjs.dev/api/operators/concatMap)
- [RxJS: exhaustMap](https://rxjs.dev/api/operators/exhaustMap)

### Next File
**012 - combineLatest forkJoin.md**
