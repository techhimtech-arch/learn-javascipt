# Observable

## 1. Definition

An **Observable** is a function that creates a "producer" of values that can be subscribed to — it emits values over time asynchronously.

Core building block of reactive programming in RxJS.

## 2. Why do we need it?

To model streams of data/events that arrive over time — essential for async flows like HTTP responses, user input, timers.

## 3. Internal Working

1. Observable created via `new Observable(subscriberFn)` or factory function
2. Subscriber function defines how values are emitted
3. On `.subscribe()`, observer callbacks registered
4. Values pushed through chain until completion or error

## 4. Step-by-Step Execution

Example:
```javascript
const interval$ = new Observable((subscriber) => {
  let i = 0;
  const id = setInterval(() => {
    subscriber.next(i++);
  }, 1000);
  return () => clearInterval(id); // teardown
});

const sub = interval$.subscribe({
  next: v => console.log(v),
  complete: () => console.log('Done')
});
```

Steps:
1. Observable created with emitter function
2. Subscription triggers execution
3. Interval emits value every second
4. `.subscribe()` handler invoked each time
5. On unsubscribe → cleanup runs

## 5. Syntax

```javascript
const obs$ = new Observable(subscriber => {
  subscriber.next(value);
  subscriber.error(err);
  subscriber.complete();
});

obs$.subscribe({
  next: val => ...,
  error: err => ...,
  complete: () => ...
});
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const data$ = of(1, 2, 3);
data$.subscribe(console.log); // 1,2,3
```

### Medium
```javascript
const timer$ = timer(0, 1000);
timer$.subscribe(sec => console.log(`${sec}s elapsed`));
```

### Advanced
```typescript
@Injectable()
export class DataStreamService {
  private dataSource$ = new Observable<Data>((subscriber) => {
    const ws = new WebSocket('wss://api.example.com/ws');
    ws.onmessage = (msg) => subscriber.next(JSON.parse(msg.data));
    ws.onerror = (err) => subscriber.error(err);
    return () => ws.close(); // auto-cleanup
  });

  getDataStream(): Observable<Data> {
    return this.dataSource$.pipe(
      shareReplay(1)
    );
  }
}
```

## 7. Visual Diagram (ASCII)

```
Observable Lifecycle

┌──────────────────────┐
│ New Observable       │ ← Created but inactive
└─────────┬────────────┘
          │ .subscribe()
          ▼
┌─────────▼────────────┐
│ Producer Starts      │ ← Emitting values
└─────────┬────────────┘
          │
          ▼
┌─────────▼────────────┐
│ Unsubscribe          │ ← Teardown logic
└──────────────────────┘
```

## 8. Real-world Example

Angular HttpClient returns Observables wrapping XHR/fetch requests:
```typescript
this.http.get<User[]>('/api/users');
```

## 9. Angular Use Case

Primary pattern for async data streams throughout Angular (HTTP, reactive forms, component communication).

## 10. Common Mistakes

❌ Subscribing inside subscriber (nested subscriptions)  
❌ Forgetting unsubscribe → memory leaks  
❌ Calling `.next()` after `.complete()`

## 11. Edge Cases

1. **Cold vs Hot observables**
   ```javascript
   // Cold - new execution per subscriber
   const cold$ = of(1, 2, 3);

   // Hot - shared producer
   const hot$ = fromEvent(button, 'click').pipe(share());
   ```

2. **Error handling**
   ```javascript
   obs$.subscribe({ error: err => fallbackData });
   ```

3. **Completion stops stream**
   ```javascript
   interval(1000).pipe(take(5)).subscribe(); // completes after 5 emissions
   ```

## 12. Performance Considerations

Unsubscribing prevents unnecessary computation/memory retention.

## 13. Time & Space Complexity

Emission rate governed by source — subscription adds minimal overhead.

## 14. Interview Questions

1. Cold vs hot observables?
2. What happens on `.subscribe()`?
3. Cleanup via teardown functions?
4. Error propagation rules?

## 15. Follow-up Questions

- "How does `shareReplay` differ from `share`?"
- "What triggers unsubscription?"

## 16. Production Best Practices

1. Always unsubscribe manually or use `async` pipe
2. Prefer hot observables for shared streams
3. Use factory functions for creation simplicity

## 17. Summary

Observables represent lazy, cancellable streams — ideal foundation for reactive async patterns.

## 18. Revision Notes

- Creators: of/from/fromEvent/timer/interval/ajax
- Push vs pull (Observer pattern)
- Cold/hot distinction
- Teardown prevents resource leaks

## 19. Practice Questions

1. Create WebSocket-based observable.
2. Convert Promise to Observable.
3. Demonstrate cold/hot behavior difference.

## 20. References

- [RxJS Documentation](https://rxjs.dev/guide/observable)
- [MDN: Observable](https://developer.mozilla.org/en-US/docs/Web/API/Observable)

### Next File
**002 - Observer.md**
