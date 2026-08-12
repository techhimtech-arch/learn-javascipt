# Creating Observables

## 1. Definition

**Observable Creation Functions** generate new observable streams from various sources — events, promises, timers, arrays, async iterables.

## 2. Why do we need it?

Wrap external data sources into reactive streams compatible with RxJS operators.

## 3. Internal Working

Different constructors handle different input types:
- `of(...items)`: emits arguments synchronously
- `from(array/promise/iterable)`: converts existing structures
- `fromEvent(target, eventName)`: wraps DOM events
- `timer/delay`: schedule future emissions
- `interval`: periodic scheduling

## 4. Step-by-Step Execution

Example:
```typescript
// Convert promise to observable
const result$ = from(fetch('/api/data').then(res => res.json()));

// Event stream
const click$ = fromEvent(button, 'click');
click$.subscribe(() => console.log('Clicked!'));
```

Steps:
1. Provide source to factory function
2. Observable wraps source internally
3. Subscription activates behavior
4. Source delivers values through pipeline

## 5. Syntax

```typescript
// Synchronous values
of(1, '2', true);

// From existing structures
from([1, 2, 3]);
from(new Set([1, 2, 3]));
from(Promise.resolve('hello'));

// Event sources
fromEvent(window, 'resize');

// Timed sources
timer(1000); // Emits after 1s
interval(1000); // Emits every 1s

// Async generators
from(async function*() {
  yield await fetchSomething();
})();
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple timer
of('Start').pipe(
  delay(1000),
  concatWith(of('End'))
).subscribe(console.log);
```

### Medium
```typescript
// Combining multiple sources
const resize$ = fromEvent(window, 'resize').pipe(
  debounceTime(200),
  map(() => ({ width: window.innerWidth, height: window.innerHeight }))
);

// Convert array to observable
from([1,2,3,4,5]).pipe(
  filter(x => x % 2 === 0),
  map(x => x * 2)
).subscribe(); // 4, 8
```

### Advanced
```typescript
// WebSocket connection wrapped
function webSocket$(url: string): Observable<any> {
  return new Observable(observer => {
    const ws = new WebSocket(url);
    
    ws.onmessage = event => observer.next(JSON.parse(event.data));
    ws.onerror = err => observer.error(err);
    ws.onclose = () => observer.complete();

    return () => ws.close(); // teardown
  }).pipe(
    share(), // Multicast to multiple subscribers
    retry({ count: 3, delay: 1000 })
  );
}
```

## 7. Visual Diagram (ASCII)

```
Observable Creation Patterns

┌──────────────┐    ┌──────────────┐
│ External       │───▶│ Observable     │
│ Source         │    │ Factory        │
└──────────────┘    └──────┬───────┘
                         │
                    Subscribe
                         │
                         ▼
                   Stream of Values
```

## 8. Real-world Example

Angular HTTP client returning observables from XHR/fetch.

## 9. Angular Use Case

All async operations converted to observables.

## 10. Common Mistakes

❌ Using `new Observable()` unnecessarily (prefer factories)
❌ Ignoring teardown logic

## 11. Edge Cases

1. **Promise resolution timing**
   ```typescript
   from(Promise.resolve('hello')); // Emits asynchronously
   ```

2. **Infinite timers**
   ```typescript
   interval(1000); // Never completes naturally
   ```

## 12. Performance Considerations

Native operators (of, from, etc.) optimized internally.

## 13. Time & Space Complexity

Varies by factory — generally O(1) creation cost.

## 14. Interview Questions

1. Convert promise to observable?
2. Wrap DOM events?
3. Implement timer/interval?

## 15. Follow-up Questions

- "Why prefer observable over promise?"

## 16. Production Best Practices

1. Use appropriate factory for source type
2. Always include teardown logic
3. Leverage built-ins over manual creation
4. Combine with proper error handling

## 17. Summary

Creation functions bridge synchronous and async worlds into uniform observable interface.

## 18. Revision Notes

- of: synchronous emissions
- from: convert existing structures
- fromEvent: DOM/web events
- timer/interval: time-based triggers
- async generators supported

## 19. Practice Questions

1. Wrap callback-based API in observable.
2. Create custom interval observable.
3. Convert Node.js stream to observable.

## 20. References

- [RxJS: Observable Creation](https://rxjs.dev/guide/observable)

### Module 8 (RxJS) Complete! ✅
