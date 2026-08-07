# Promise States

## 1. Definition

Promises have three states:
- **pending**: initial state, neither fulfilled nor rejected
- **fulfilled**: operation completed successfully
- **rejected**: operation failed

Once settled, transitions are **irreversible** — no going back to pending or changing outcome.

## 2. Why do we need it?

Clear finite state model enables robust control flow, deterministic chaining behavior, and reliable error propagation.

## 3. Internal Working

State transitions:
```
Pending → Fulfilled
Pending → Rejected
Fulfilled → No change
Rejected → No change
```

Handlers attached to already-settled promises behave differently than pending ones.

## 4. Step-by-Step Execution

1. A new promise starts in `pending`
2. Calling `resolve(value)` transitions to `fulfilled`
3. Calling `reject(reason)` transitions to `rejected`
4. Once changed, state remains fixed permanently

## 5. Syntax

```javascript
new Promise((resolve, reject) => {
  if (condition) resolve(value);
  else reject(error);
});
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
let myPromise = new Promise((res, rej) => {
  res("success");
});
console.assert(myPromise.state === "fulfilled");
```

### Medium
```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.5 ? resolve("Yes") : reject("No");
  }, 100);
});

p.then(console.log).catch(console.warn);
```

### Advanced
```javascript
class Task {
  status = 'pending';
  constructor(taskFn) {
    try {
      taskFn(
        val => { this.status = 'fulfilled'; },
        err => { this.status = 'rejected'; }
      );
    } catch (e) {
      this.status = 'rejected';
    }
  }
}
```

## 7. Visual Diagram

```
State Transition Graph

┌────────────┐
│ PENDING    │
│            │
│ resolve()  │  reject()
│ ↓          │  ↓
│ FULFILLED  │  REJECTED
└────────────┘  └─────────┘
```

## 8. Real-world Example

API Call Status Tracking:

```typescript
interface Task<T> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: T;
  error?: Error;
}

class DataFetcher {
  task: Task<any> = { status: 'idle' };

  fetch(url: string) {
    this.task.status = 'loading';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.task = { status: 'success', data };
      })
      .catch(err => {
        this.task = { status: 'error', error: err };
      });
  }
}
```

## 9. Angular Use Case

RxJS Observables mirror many aspects of promise states:
- Loading indicators tied to pending state
- Success/error handling via subscription patterns

## 10. Common Mistakes

❌ Modifying resolved promises  
❌ Expecting sync resolution  
❌ Ignoring intermediate states  

## 11. Edge Cases

1. `Promise.resolve(promise)` – returns identical reference
2. Rejected promise without handler – unhandled rejection warning
3. Race condition between resolve/reject triggers

## 12. Performance Considerations

- Minimal cost per promise (small object overhead)
- Avoid excessive microtask scheduling

## 13. Time & Space Complexity

- O(1) state transition cost
- O(n) memory where n = number of handlers

## 14. Interview Questions

1. Can a promise switch from fulfilled to rejected?
2. How can you observe promise state changes?
3. What prevents race conditions in state transitions?
4. Is it possible to mutate a promise's value after resolution?

## 15. Follow-up Questions

- "Why aren’t promise states mutable?"
- "How does `.finally()` interact with states?"

## 16. Production Best Practices

1. Treat promises as immutable
2. Log intermediate states explicitly
3. Use typed wrappers in TypeScript for clarity

## 17. Summary

States define predictable behavior; immutability ensures reliability.

## 18. Revision Notes

- Pending → Fulfilled OR Rejected
- Irreversible
- Handlers queue for future execution

## 19. Practice Questions

1. Simulate a promise constructor with state machine logic.
2. Detect when a promise settles.
3. Build retry mechanism tracking promise states.

## 20. References

- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- ["JavaScript: The Definitive Guide"] by David Flanagan

### Next File
**003 - Promise Chaining.md**