# Observer

## 1. Definition

An **Observer** is a plain object containing callback functions (`next`, `error`, `complete`) that reacts to values emitted by an Observable.

## 2. Why do we need it?

Observers define how to handle incoming data/events from observables.

## 3. Internal Working

Observer callbacks invoked by Observable during emission lifecycle:
1. `next(value)` – called for each emitted value
2. `error(err)` – called if observable errors
3. `complete()` – called when observable finishes

Once `error` or `complete` fires, subscription ends.

## 4. Step-by-Step Execution

Example:
```javascript
const observer = {
  next: val => console.log("Received:", val),
  error: err => console.error("Error:", err),
  complete: () => console.log("Stream ended")
};

interval(1000).pipe(take(3)).subscribe(observer);
```

Steps:
1. Subscribe with observer object
2. Every second → `next(0)`, `next(1)`, `next(2)`
3. After 3rd emission → `complete()`
4. No further emissions

## 5. Syntax

```javascript
const observer = {
  next(value) { ... },
  error(error) { ... },
  complete() { ... }
};

observable$.subscribe(observer);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
of("a", "b").subscribe(console.log); // Logs a,b
```

### Medium
```javascript
const myObserver = {
  next: console.log,
  error: console.error,
  complete: () => console.log('Done')
};
timer(0, 1000).pipe(take(3)).subscribe(myObserver);
```

### Advanced
```typescript
class CustomObserver implements Observer<string> {
  next(value: string): void {
    console.log(`Processing: ${value}`);
  }
  error(err: any): void {
    console.error('Stream failed', err);
  }
  complete(): void {
    console.log('All data processed');
  }
}

data$.subscribe(new CustomObserver());
```

## 7. Visual Diagram (ASCII)

```
Observer Interaction

Observable ──► Observer.next(value)
              Observer.error(error)
              Observer.complete()
```

## 8. Real-world Example

Angular HTTP error handling:
```typescript
this.http.get('/api/data').subscribe({
  next: data => this.loadData(data),
  error: err => this.handleHttpError(err),
  complete: () => this.loading = false
});
```

## 9. Angular Use Case

Used everywhere async data is consumed — HTTP calls, reactive forms, WebSocket connections.

## 10. Common Mistakes

❌ Throwing inside observer callbacks  
❌ Not handling all observer branches  

## 11. Edge Cases

1. **Partial observers**
   ```javascript
   obs$.subscribe(value => console.log(value)); // Only next
   ```

2. **Throwing inside next**
   ```javascript
   try { obs$.subscribe(val => { throw new Error(); }) } catch {}
   ```

## 12. Performance Considerations

Observer logic runs per-emission — keep handlers fast.

## 13. Time & Space Complexity

O(1) per emission.

## 14. Interview Questions

1. Required observer methods?
2. Behavior on error vs complete?
3. Partial observer behavior?

## 15. Follow-up Questions

- "Can you pass only `next`?"

## 16. Production Best Practices

1. Separate success/error/completion handlers
2. Reuse observer objects where applicable
3. Never throw inside observer logic — return errors explicitly

## 17. Summary

Observers decouple producers (observables) from consumers — core observer pattern realization.

## 18. Revision Notes

- next/error/complete structure
- Subscribe accepts partial observer
- Throws inside callbacks not caught by RxJS
- Order preserved: next* → error|complete

## 19. Practice Questions

1. Implement retry-on-error observer.
2. Log completion event reliably.
3. Handle network interruption cleanly.

## 20. References

- [RxJS: Observer](https://rxjs.dev/guide/observer)

### Next File
**003 - Subscription.md**
