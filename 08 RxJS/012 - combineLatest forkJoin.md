# combineLatest forkJoin

## 1. Definition

Two powerful RxJS combination operators:
- **combineLatest**: Emits tuple/array when ANY input observable emits (after all have emitted once)
- **forkJoin**: Emits array/object with **LAST values** from each input observable **after all complete**

## 2. Why do we need it?

Combine multiple data sources efficiently:
- combineLatest: live updates from multiple streams
- forkJoin: parallel completion (like Promise.all but for observables)

## 3. Internal Working

- combineLatest: Tracks latest value from each input; re-emits whenever any input changes
- forkJoin: Waits for all inputs to complete; emits final values

## 4. Step-by-Step Execution

Example with two observables:
```javascript
const a$ = of(1,2); // completes after 2
const b$ = from([10,20,30]); // completes after 30

// combineLatest:
// After first emit of both: [1,10]
// a emits 2: [2,10]
// b emits 20: [2,20]
// b emits 30: [2,30]
// a completes → still listening to b (but no new a)

// forkJoin:
// Waits for both to complete
// Final values: [2, 30]
```

Steps for combineLatest:
1. Input streams A, B start
2. A emits 1, B emits 10 → first combined: [1,10]
3. A emits 2 → [2,10]
4. B emits 20 → [2,20]
5. B emits 30 → [2,30]
6. A completes but B might still emit

Steps for forkJoin:
1. Start both observables
2. Wait until BOTH complete
3. Take final value from each
4. Emit combined final values

## 5. Syntax

```javascript
// combineLatest
combineLatest([obs1$, obs2$]).subscribe(([v1, v2]) => ...)

// With object syntax
combineLatest({ name: name$, age: age$ }).subscribe(obj => ...)

// forkJoin
forkJoin([obs1$, obs2$]).subscribe(([result1, result2]) => ...)
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// combineLatest
const letters$ = of('a', 'b');
const numbers$ = of(1, 2, 3);

combineLatest([letters$, numbers$]).subscribe(([letter, number]) => {
  console.log(letter + number); // ab, a1, b1...wait, need latest from each
});
```

### Medium
```typescript
// Reactive form combining multiple controls
this.combinedValue$ = combineLatest([
  this.firstName.valueChanges,
  this.lastName.valueChanges,
  this.email.valueChanges
]).pipe(
  map(([first, last, email]) => ({
    fullName: `${first || ''} ${last || ''}`.trim(),
    isValid: this.validateEmail(email || '')
  }))
);
```

### Advanced
```typescript
// Dashboard data parallel loading
this.dashboardData$ = forkJoin({
  users: this.api.getUsers(),
  orders: this.api.getOrders(),
  stats: this.api.getStats()
}).pipe(
  tap(data => this.initializeDashboard(data)),
  catchError(err => of(this.getDefaultDashboard()))
);
```

## 7. Visual Diagram (ASCII)

```
combineLatest Behavior:

Stream A: 1 ──► 2 ──► 3
Stream B:   a ──►   b ──► c

Combined Outputs:
             [1,a]  [2,a]  [2,b]  [3,b]  [3,c]
             Wait for both streams to emit at least once

forkJoin Behavior:

Stream A: 1 ──► 2 ──► 3 ──► COMPLETE
Stream B:   a ──►   b ──► COMPLETE

Final Emission: [3, b] only after both complete
```

## 8. Real-world Example

Angular dashboard with parallel API calls:
```typescript
loadDashboard(): Observable<DashboardData> {
  return forkJoin({
    users: this.userService.getAll(),
    products: this.productService.list(),
    sales: this.salesService.getMonthlyReport()
  }).pipe(
    map(results => ({
      ...results,
      totalRevenue: calculateRevenue(results.sales)
    }))
  );
}
```

## 9. Angular Use Case

- combineLatest: Real-time form validation combining multiple fields
- forkJoin: Parallel API calls in route resolvers/services

## 10. Common Mistakes

❌ Using forkJoin when streams don't complete
❌ Not initializing combineLatest with at least one emission per stream

## 11. Edge Cases

1. **forkJoin with non-completing observables**
   ```javascript
   // This never emits!
   forkJoin(timer(1000)); // timer never completes by default
   ```

2. **combineLatest with cold observables**
   ```javascript
   combineLatest([timer(1000), timer(2000)]); // Needs both to emit first
   ```

## 12. Performance Considerations

- combineLatest emits on any change → potential performance issues if inputs update frequently
- forkJoin waits for all → optimal for parallel requests

## 13. Time & Space Complexity

Both O(n) where n = number of input observables.

## 14. Interview Questions

1. When does combineLatest emit?
2. How is forkJoin different from Promise.all?
3. What happens if an input never completes?

## 15. Follow-up Questions

- "How to combine with different projection functions?"
- "What does the resultSelector parameter do?"

## 16. Production Best Practices

1. Use forkJoin for independent parallel requests
2. Use combineLatest for real-time combination needs
3. Handle errors in either operator appropriately
4. Be mindful of memory leaks with long-lived streams

## 17. Summary

combineLatest = real-time combination, forkJoin = parallel completion batch.

## 18. Revision Notes

- combineLatest: reacts to any emission, needs all to start
- forkJoin: emits once all complete, takes final values
- Similar to Promise.all vs reactive streams
- Perfect for form/dashboard scenarios

## 19. Practice Questions

1. Combine search filters with combineLatest.
2. Load dependent data with forkJoin.
3. Create reactive dashboard metrics.

## 20. References

- [RxJS: combineLatest](https://rxjs.dev/api/index/function/combineLatest)
- [RxJS: forkJoin](https://rxjs.dev/api/index/function/forkJoin)

### Next File
**013 - zip.md**
