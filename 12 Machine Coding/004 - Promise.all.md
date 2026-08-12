# Promise.all Polyfill

## 1. Definition

**Promise.all** takes an iterable of promises and returns a single promise that resolves when all promises resolve or rejects with the first rejection reason.

## 2. Why do we need it?

Coordinate parallel async operations — proceed only after all complete successfully.

## 3. Internal Working

Implementation tracks count of resolved promises:
1. Create result array sized to inputs
2. Track completion count
3. Resolve collectively when all finish
4. Reject early if any fails

## 4. Step-by-Step Execution

Polyfill:
```javascript
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    const promises = Array.from(iterable);

    if (promises.length === 0) {
      resolve(results);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = value;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}
```

Steps:
1. Wrap each item in Promise.resolve()
2. Store resolved values by index
3. Count completions
4. When count matches total → resolve array

## 5. Syntax

```javascript
Promise.all([p1, p2, p3]).then(results => {
  console.log(results);
}).catch(err => {
  console.error("First failure:", err);
});
```

## 6. Examples (Easy → Advanced)

### Easy
Parallel fetches:
```javascript
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]).then(([users, posts, comments]) => {
  // All done
});
```

### Medium
Race condition handling:
```javascript
Promise.allSettled([task1(), task2(), task3()])
  .then(results => results.filter(r => r.status === 'fulfilled'));
```

### Advanced
Custom concurrency control:
```javascript
async function mapWithConcurrencyLimit(items, fn, limit) {
  const results = [];
  const executing = [];
  
  for (const item of items) {
    const promise = fn(item).then(result => {
      results.push(result);
      executing.splice(executing.indexOf(promise), 1);
    });
    
    executing.push(promise);
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  
  await Promise.all(executing);
  return results;
}
```

## 7. Visual Diagram (ASCII)

```
Promise.all Coordination

Promised: [p1][p2][p3]
          ↓  ↓  ↓
Results:   [1][2][3]
                   ↓
Combined: [1, 2, 3] ← All resolved
```

## 8. Real-world Example

Angular service batch loading:
```typescript
loadDashboardData(): Observable<DashboardData> {
  return forkJoin({
    users: this.userService.getAll(),
    products: this.productService.list(),
    stats: this.analytics.getStats()
  });
}
```

## 9. Angular Use Case

Using RxJS `forkJoin` equivalent to native `Promise.all`.

## 10. Common Mistakes

❌ Race conditions with non-idempotent requests  
❌ Unhandled rejections killing entire chain

## 11. Edge Cases

1. **Empty input**
   ```javascript
   Promise.all([]); // Immediately resolves []
   ```

2. **Mixed sync/async**
   ```javascript
   Promise.all([1, Promise.resolve(2)]); // [1, 2]
   ```

3. **Promise rejection**
   ```javascript
   Promise.all([resolved, rejected]) // Rejects immediately
   ```

## 12. Performance Considerations

All promises start immediately — memory usage proportional to count.

## 13. Time & Space Complexity

Time: O(max(promises))
Space: O(n) for result array

## 14. Interview Questions

1. Difference between `all`/`race`/`any`?
2. Implement polyfill
3. Handle individual errors?

## 15. Follow-up Questions

- "What does `Promise.allSettled` add?"

## 16. Production Best Practices

1. Wrap individual promises with error handlers
2. Chunk large batches to avoid memory spikes
3. Combine with `AbortSignal` for cancellable requests

## 17. Summary

Promise.all coordinates concurrent async flows — foundational tool for parallel coordination.

## 18. Revision Notes

- Resolves with array of values
- Rejects on first error
- Preserves input order
- Empty iterable resolves immediately

## 19. Practice Questions

1. Build retry-able Promise.all wrapper.
2. Implement concurrency limiter.
3. Handle partial successes gracefully.

## 20. References

- [MDN: Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

### Next File
**005 - Deep Clone.md**
