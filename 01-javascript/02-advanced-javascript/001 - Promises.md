# Promises

## 1. Definition

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

States: `pending` → `fulfilled` OR `rejected`

Immutable once settled.

## 2. Why do we need it?

Avoids callback hell; provides cleaner chaining (`then/catch/finally`).

## 3. Internal Working

Internally maintains:
- State & value (or reason)
- Handler queues for success/failure callbacks
- Resolves/rejects synchronously, but handlers run asynchronously (microtask queue)

## 4. Step-by-Step Execution

1. `new Promise((resolve, reject) => {...})`
2. Constructor runs synchronously
3. Async work begins
4. On result → call `resolve/reject`
5. Microtask flushes handler callbacks

## 5. Syntax

```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done"), 1000);
});

p.then(result => console.log(result));
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
Promise.resolve(42).then(console.log); // 42
```

### Medium
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.table(data))
  .catch(err => console.error('Error', err));
```

### Advanced
```javascript
async function* fetchPages(urls) {
  for (const url of urls) {
    yield await fetch(url).then(r => r.json());
  }
}
```

## 7. Visual Diagram

```
[Pending] ──resolve()──▶ [Fulfilled]
              \
               └─reject()─▶ [Rejected]
```

## 8. Real-world Example

Angular HttpClient returns Observables (converted from Promises internally):

```typescript
this.http.get<User[]>('/api/users');
```

## 9. Angular Use Case

Used in async pipe, preloading modules, interceptors, routing guards.

## 10. Common Mistakes

❌ Resolving immediately in constructor  
❌ Swallowing rejections  
❌ Chaining without returning  

## 11. Edge Cases

1. `Promise.resolve(promise)` – returns same promise
2. Throwing inside `.then` – becomes rejected promise
3. Unhandled rejections – runtime warnings/errors

## 12. Performance Considerations

- Promises add overhead vs callbacks
- Microtasks always run before macrotasks (can delay rendering)

## 13. Time & Space Complexity

- Time: Depends on async operation
- Space: One-time allocation + handler closures

## 14. Interview Questions

1. What makes promises better than callbacks?
2. Difference between `then`, `catch`, `finally`?
3. When does `Promise.resolve()` actually resolve?
4. What happens if both resolve and reject are called?

## 15. Follow-up Questions

- "How do unhandled rejections behave?"
- "Explain microtask queue priority"

## 16. Production Best Practices

1. Always chain `.catch`
2. Return values from `.then`
3. Avoid nested promises
4. Prefer `async/await` for readability

## 17. Summary

Promises encapsulate async results in a reliable, chainable format.

## 18. Revision Notes

- Pending → Settled (Resolved/Rej)
- Chainable via `.then/.catch`
- Auto-wrapped in `async` functions
- Microtask priority

## 19. Practice Questions

1. Create a timeout-based promise.
2. Convert callback pattern to promise.
3. Handle race conditions manually.

## 20. References

- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [ES2015 Spec](https://tc39.es/ecma262/#sec-promise-objects)

### Next File
**002 - Promise States.md**
