# Observables vs Promises

## 1. Definition

**Observables vs Promises** represents the core choice between stream-based and single-value async patterns.

## 2. Why do we need it?

Observables provide cancellation, streaming, and multicasting; Promises are simpler but limited.

## 3. Internal Working

Key differences:
- Promises resolve once; Observables emit multiple values
- Promises can't be canceled; Observables support unsubscribe
- Promises don't compose easily; Observables have rich operators
- Observers multicast to subscribers

## 4. Step-by-Step Execution

Promise flow:
1. Create promise
2. Executor runs immediately
3. Resolve/reject called
4. Single value delivered
5. Handler runs microtask

Observable flow:
1. Create observable
2. Subscribe triggers execution
3. Multiple emissions possible
4. Completion/error terminate stream
5. Operators transform values inline

## 5. Syntax

```typescript
// Promise - single value
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('data'), 1000);
});

promise.then(console.log); // Logs once after 1s

// Observable - stream
const observable = new Observable(subscriber => {
  let count = 0;
  const interval = setInterval(() => {
    subscriber.next(count++);
  }, 1000);
  
  return () => clearInterval(interval); // Cleanup on unsubscribe
});

const sub = observable.subscribe(console.log); // Logs 0, 1, 2...
setTimeout(() => sub.unsubscribe(), 5000); // Cancel after 5s
```

## 6. Examples

### Easy
```typescript
// API calls
fetch('/api/data').then(res => res.json()); // Promise

this.http.get('/api/data').subscribe(data => {}); // Observable
```

### Advanced
```typescript
// Cancellation comparison
// Promise cannot cancel - request continues
const longPromise = new Promise(r => setTimeout(r, 10000));

// Observable cancels on unsubscribe
const longObservable = timer(10000);
const sub = longObservable.subscribe(() => {});
sub.unsubscribe(); // Immediately stops
```

## 7. Comparison

| Feature | Promise | Observable |
|---------|---------|------------|
| Values | Single | Multiple |
| Cancellation | Impossible | Cancel via unsubscribe |
| Execution | Eager | Lazy |
| Operators | .then chaining | Rich pipeable ops |

## 8. Interview Questions

1. When to use each?
2. Cancellation support comparison?
3. Error handling differences?

## 9. Summary

Choose Promises for simple async, Observables for complex streams.

## 10. References

- [RxJS vs Promise](https://rxjs.dev/guide/overview)

---
