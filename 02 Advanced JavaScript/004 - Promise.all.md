# Promise.all

## 1. Definition

**`Promise.all`** is a static method that accepts an iterable of promises and returns a **single promise** that resolves **only when all promises** have resolved, or **rejects immediately** if any of the promises reject.

## 2. Why do we need it?

To wait for **all parallel operations to complete** before proceeding — common in data-fetching scenarios.

Useful when:
- You need results from multiple APIs at once.
- One failure makes the whole result unusable.

## 3. Internal Working

1. Receives array of promises (or values)
2. Creates new promise:
   - If all resolve → resolve new promise with array of results
   - If any rejects → reject new promise with first rejection reason
3. Results preserved in same order as input

## 4. Step-by-Step Execution

```javascript
const urls = [
  fetch("/api/users"),
  fetch("/api/posts"),
  fetch("/api/comments")
];

Promise.all(urls)
  .then(([usersRes, postsRes, commentsRes]) => {
    return Promise.all([
      usersRes.json(),
      postsRes.json(),
      commentsRes.json()
    ]);
  })
  .then(([users, posts, comments]) => {
    console.log({ users, posts, comments });
  })
  .catch(error => console.error("Failed:", error));
```

Steps:
1. Requests fired in parallel
2. On all resolutions → `.then()` triggered with all data arrays
3. JSON parsing also done in parallel
4. If any fails → jumps directly to `.catch()`

## 5. Syntax

```javascript
Promise.all(iterable)
```

Accepts:
- Array of `Promise` objects
- Mixed array of promises and plain values

## 6. Examples (Easy → Advanced)

### Easy
```javascript
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2)
]).then(values => console.log(values)); // [1, 2]
```

### Medium
```javascript
async function loadUsers() {
  const ids = [1, 2, 3];
  const userPromises = ids.map(id => fetchUser(id));
  const users = await Promise.all(userPromises);
  return users;
}
```

### Advanced
```javascript
function timeout(ms) {
  return new Promise((_, reject) => 
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  );
}

const criticalOps = [op1(), op2(), op3()];
Promise.race([
  Promise.all(criticalOps),
  timeout(5000)
]).catch(console.warn);
```

## 7. Visual Diagram (ASCII)

```
Promise.all Flow:

Input:
┌─────────────┐
│ Promise A   │ (resolves quickly)
├─────────────┤
│ Promise B   │ (takes longer)
├─────────────┤
│ Promise C   │ (fails immediately)
└─────────────┘

Result:
❌ Immediate rejection with Promise C's error
(No delay for others)

Success Case:
┌─────────────┐
│ Promise A   │ ✅
├─────────────┤
│ Promise B   │ ✅
├─────────────┤
│ Promise C   │ ✅
└─────────────┘
→ Resolves with [A_result, B_result, C_result]
```

## 8. Real-world Example

Angular Parallel API Calls:

```typescript
combineLatest([
  this.userService.getProfile(),
  this.notificationService.getRecent(),
  this.analyticsService.getStats()
]).subscribe(([profile, notifications, stats]) => {
  this.dashboardData = { profile, notifications, stats };
});
```

RxJS equivalent of `Promise.all`.

## 9. Angular Use Case

Use `combineLatest` from RxJS when working with Observables. For one-time fetches, use `forkJoin`.

## 10. Common Mistakes

❌ Not catching rejections early  
❌ Passing non-iterable to `Promise.all`  
❌ Expecting partial results on failure  

## 11. Edge Cases

1. **Empty input**
   ```javascript
   Promise.all([]).then(() => "OK"); // resolves immediately
   ```

2. **Non-promise values**
   ```javascript
   Promise.all([Promise.resolve(1), 2]).then(console.log); // [1, 2]
   ```

3. **Immediate rejection**
   ```javascript
   Promise.all([Promise.reject("error"), longTask()]).catch(console.log); // logs "error", no waiting
   ```

4. **Order preservation**
   ```javascript
   Promise.all([delayed(2000), immediateValue(1)])
     .then(([delayResult, value]) => {
       // Order matches input, regardless of resolution time
     });
   ```

## 12. Performance Considerations

- Start operations immediately so they run in parallel
- Don’t create unnecessary promises for already-resolved values
- Watch out for memory pressure with very large arrays

## 13. Time & Space Complexity

- Time: Max of all tasks’ durations (parallel)
- Space: O(n), where n = number of promises (to store results)

## 14. Interview Questions

1. How does `Promise.all` behave if one promise fails?
2. Can you pass non-promises to it?
3. Does it preserve order of results?
4. What happens with empty input?

## 15. Follow-up Questions

- "What happens if two promises reject?"
- "How do you get partial success/failure info?"

## 16. Production Best Practices

1. Always chain `.catch()` unless intentionally leaving rejection unhandled
2. Validate inputs before calling `Promise.all`
3. Consider `Promise.allSettled` for tolerant workflows
4. Cancel long-running tasks manually if needed

## 17. Summary

- Waits for **all promises** to succeed
- Fails fast on **first rejection**
- Ideal for **parallel dependent operations**

## 18. Revision Notes

- Fail-fast strategy
- Order maintained by index
- Good for batch API calls
- Combine with `.catch()`

## 19. Practice Questions

1. Convert multiple callbacks into a `Promise.all`.
2. Make `Promise.all` continue after a rejection.
3. Fetch several endpoints and combine results.

## 20. References

- [MDN: Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

### Next File
**005 - async await.md**
