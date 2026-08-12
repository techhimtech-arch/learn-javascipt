# Event Loop

## 1. Definition

The **Event Loop** is the mechanism in the JavaScript runtime that allows JavaScript to perform non-blocking operations — coordinating between the **call stack**, **Web APIs**, and **task queues**.

## 2. Why do we need it?

JavaScript uses **single-threaded execution**, but many actions (network requests, timers, I/O) are inherently **asynchronous**.

The Event Loop bridges this gap by offloading async work and bringing callbacks back when ready.

## 3. Internal Working

Model:
```
┌─────────────┐
│  Memory     │
│ Heap        │
└─────────────┘
      │
      ▼
┌─────────────┐
│ Call Stack  │
└─────────────┘
      │
      ▼
┌────────────────┐
│ Event Loop     │
│ Checks stack → │
│ If empty →     │
│ pulls from     │
│ Callback Queue │
└────────────────┘
      │
      ▼
┌─────────────┐
│ Web APIs    │
│ (Timers,    │
│ Fetch, etc.)│
└─────────────┘
```

## 4. Step-by-Step Execution

1. Engine runs JS synchronously → fills call stack
2. Async operation started → offloaded to browser APIs
3. Call stack clears
4. Event Loop detects that stack is empty
5. Pulls callback from queue
6. Executes callback → becomes part of call stack
7. Repeat

## 5. Syntax

No syntax — runtime behavior only.

## 6. Examples (Easy → Advanced)

### Easy
```javascript
console.log("First");
setTimeout(() => console.log("Second"), 0);
console.log("Third");
// Output: First Third Second
```

### Medium
```javascript
Promise.resolve().then(() => console.log("Promise"));
console.log("Regular");
// Output: Regular Promise
```

### Advanced
```javascript
console.log('Script start');
setTimeout(() => console.log('Timeout'));
Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => { console.log('Promise 2'); });
console.log('Script end');

/* Expected order:
   Script start
   Script end
   Promise 1
   Promise 2
   Timeout
*/
```

## 7. Visual Diagram (ASCII)

```
Event Loop Cycle:

┌──────────────────────────────┐
│ Call Stack                   │
│ ┌────────┐                  │
│ │ Main   │ → empty?          │
│ └────────┘                  │
└─────────┬───────────────────┘
          │ If empty
          ▼
┌──────────────────────────────┐
│ Callback Queue               │
│ [Task1][Task2][Task3]         │
└─────────┬────────────────────┘
          │
          ▼
┌─────────▼────────────────────┐
│ Microtask Queue                │
│ [Promise Callback]             │
└─────────┬────────────────────┘
          │
          ▼
Execute one callback
then repeat cycle
```

## 8. Real-world Example

Angular Change Detection:

Zone.js monkey-patches async zones to ensure Angular detects changes triggered by microtasks/macrotasks.

## 9. Angular Use Case

- Zone.js intercepts the event loop to trigger CD
- `NgZone.run()` schedules callbacks via event loop

## 10. Common Mistakes

❌ Not distinguishing microtasks vs macrotasks  
❌ Misusing intervals/setTimeout  
❌ Not understanding execution timing  

## 11. Edge Cases

1. **Starvation prevention** – microtask queues drained between each macrotask
2. **Long tasks blocking** – UI frozen during heavy CPU-bound sync code
3. **Nested event listeners** – event loop continues dispatching even if one handler throws

## 12. Performance Considerations

- Prefer microtasks for fast post-sync processing
- Batch DOM updates to avoid layout thrashing
- Watch for infinite recursion in microtasks/macrotasks

## 13. Time & Space Complexity

O(infinite loop) conceptually — runs continuously while program exists.

Space bounded by number of queued callbacks.

## 14. Interview Questions

1. What drives the event loop?
2. Describe the role of queues.
3. Differentiate microtasks and macrotasks.
4. How does the event loop interact with promises?

## 15. Follow-up Questions

- "When does a microtask execute?"
- "How to detect starvation?"

## 16. Production Best Practices

1. Monitor long-running synchronous code
2. Use Web Workers for intensive tasks
3. Limit recursive setTimeout calls
4. Profile event loop lag with custom monitors

## 17. Summary

Enables non-blocking JavaScript execution through careful coordination of tasks and microtasks.

## 18. Revision Notes

- Single-threaded concurrency model
- Starvation avoidance handled by spec
- Tasks vs microtasks priority rules
- Drives all async behavior

## 19. Practice Questions

1. Predict execution order:
```javascript
console.log(1);
Promise.resolve().then(() => console.log(2));
setTimeout(() => console.log(3), 0);
console.log(4);
```

2. Demonstrate infinite recursion issue.

3. Add logging to observe event loop timing.

## 20. References

- [MDN: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- ["What the heck is the event loop anyway?"](https://www.youtube.com/watch?v=8aGhZQKOqQE)

### Next File
**007 - Microtasks.md**
