# Promise Chaining

## 1. Definition

**Promise Chaining** refers to connecting multiple `then()` calls sequentially so that output from earlier steps feeds into subsequent steps.

Enables composing async workflows in a readable way.

## 2. Why do we need it?

- Sequential async execution without nesting
- Error propagation via single `.catch`
- Functional composition using return values

## 3. Internal Working

Each `.then()` returns a new promise.

- If callback resolves → next `.then` receives resolved value
- If callback throws/rejects → skips forward to nearest `.catch`

Chains short-circuit on errors automatically.

## 4. Step-by-Step Execution

Example:
```javascript
fetch('/user')
  .then(response => response.json())
  .then(user => fetchUserPosts(user.id))
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

Steps:
1. `fetch('/user')` initiates request
2. First `.then` waits → parses JSON
3. Second `.then` fetches posts based on user ID
4. Third `.then` logs results
5. `.catch` catches any propagated failures

## 5. Syntax

```javascript
promise
  .then(stepOne)
  .then(stepTwo)
  .then(stepThree)
  .catch(handleError)
  .finally(cleanup);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
Promise.resolve(5)
  .then(x => x * 2)
  .then(console.log); // 10
```

### Medium
```javascript
fetch('/api/items')
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
  .then(items => items.filter(Boolean))
  .catch(err => ({ error: err.message }));
```

### Advanced
```javascript
async function sequentialTasks(tasks = []) {
  let result = null;
  for (const task of tasks) {
    result = await task(result); // Chain effect
  }
  return result;
}
```

## 7. Visual Diagram

```
Chain Flow:

Step 1 → [Resolved Value]  
           ↓ .then()
        Step 2 → [Processed Value]
           ↓ .then()
         Step 3 → Final Result
           ↓
        .catch() → Error Handling Path
```

## 8. Real-world Example

Angular Login Flow:
```typescript
this.authService.login(credentials)
  .pipe(
    tap(() => this.router.navigate(['/dashboard'])),
    catchError((err) => {
      this.errorMessage = 'Login failed';
      return EMPTY;
    })
  )
  .subscribe();
```

(Translation to promise equivalent shown in comments)

## 9. Angular Use Case

- Observable pipelines mimic promise chains
- Used for HTTP request flows, guards, and auth checks
- Side effects managed via operators (`tap`, `catchError`)

## 10. Common Mistakes

❌ Forgetting to return inside `.then`  
❌ Mixing sync/async return types  
❌ Breaking error propagation

## 11. Edge Cases

1. Returning non-promise from `.then` wraps automatically
2. `.then(undefined, fn)` behaves differently than `.catch(fn)`
3. Multiple `.then`s can attach to same promise independently

## 12. Performance Considerations

- Too many intermediate steps → increased latency
- Prefer batching related tasks when possible

## 13. Time & Space Complexity

- Each `.then`: O(1) creation
- Memory grows with chain length if retaining previous context

## 14. Interview Questions

1. Explain how `.then()` returns a new promise.
2. Describe error propagation in a chain.
3. What happens if you don’t return from `.then`?
4. Can two chains diverge from one source?

## 15. Follow-up Questions

- "Why shouldn’t we mix promise chains with async/await?"
- "How do you debug broken promise chains?"

## 16. Production Best Practices

1. Always return values unless intentional side effect
2. Centralize error handling
3. Flatten nested promise structures

## 17. Summary

Chaining improves code organization, reduces callback nesting, and handles errors effectively.

## 18. Revision Notes

- `.then` returns new promise
- Errors bubble upward
- Return controls flow

## 19. Practice Questions

1. Debug broken promise chain:
```javascript
Promise.resolve()
  .then(() => console.log("A"))
  .then(() => console.log("B"));
```

2. Add intermediate logging to chain.

3. Convert nested callbacks into flat promise chain.

## 20. References

- [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- ["JavaScript Allongé"] by Reginald Braithwaite

### Next File
**004 - Promise.all.md**
