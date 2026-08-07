# Macrotasks

## 1. Definition

**Macrotasks** (also called **tasks** or **callback tasks**) are units of work scheduled in the **task queue** by the host environment.

They include:
- `setTimeout` callbacks
- `setInterval` callbacks
- `setImmediate` (in Node.js)
- UI rendering (browser)
- I/O operations (Node)

## 2. Why do we need it?

Allows deferring work to future turns of the event loop, enabling:
- Scheduling background jobs
- Breaking up heavy computations
- Handling asynchronous completion callbacks

## 3. Internal Working

Each macrotask:
1. Pulled from task queue
2. Executed in global/function context
3. All microtasks drained before returning control
4. Rendering occurs (if applicable)
5. Next macrotask pulled

## 4. Step-by-Step Execution

Given:
```javascript
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("Sync");
```

Execution:
1. `setTimeout` registers task
2. `Promise.then` queues microtask
3. `console.log("Sync")` runs
4. Sync code ends → microtasks drain → logs `"Promise"`
5. Task queue processed → logs `"Timeout"`

## 5. Syntax

```javascript
setTimeout(() => {}, delayMs);
setInterval(() => {}, delayMs);
setImmediate(() => {});
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
setTimeout(() => console.log("Later"), 1000);
console.log("Now");
```

### Medium
```javascript
const intervalId = setInterval(() => {
  if (done) clearInterval(intervalId);
}, 500);
```

### Advanced
```javascript
async function workerLoop(jobQueue) {
  while (!jobQueue.isEmpty()) {
    const job = jobQueue.dequeue();
    await job(); // Allow microtasks to process between jobs
    setTimeout(() => {}, 0); // Yield to render/UI thread
  }
}
```

## 7. Visual Diagram (ASCII)

```
Event Loop Turn

┌──────────────────┐
│ Macrotask        │ ← setTimeout(), etc.
│ Run to completion│
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Microtasks       │ ← Promise callbacks
│ Drain all        │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Rendering        │ ← Update layout/paint
└──────┬───────────┘
       │
       ▼
Next Macrotask
```

## 8. Real-world Example

Angular animations rely on requestAnimationFrame which is part of macrotask cycle.

## 9. Angular Use Case

Using `NgZone` to run code outside zone to prevent unnecessary CD cycles.

## 10. Common Mistakes

❌ Mixing macrotasks and microtasks incorrectly  
❌ Not cleaning up timers  

## 11. Edge Cases

1. **Zero-delay setTimeout still has minimum 4ms delay**
2. **Multiple setTimeout(fn, 0) fire in order queued**
3. **Unref/unref patterns in Node.js timers**
4. **Frame rate-limited timers (requestAnimationFrame)**

## 12. Performance Considerations

- Prefer `requestAnimationFrame` for visual updates
- Clear timers when components unmount
- Batch DOM writes to avoid forced synchronous layout

## 13. Time & Space Complexity

Each timer adds entry to heap → O(log n) insertion.

## 14. Interview Questions

1. Types of macrotasks
2. Relationship with microtasks
3. Why setTimeout(fn, 0) ≠ instant
4. How requestAnimationFrame fits

## 15. Follow-up Questions

- "What’s Clamping?"
- "How do idle callbacks help?"

## 16. Production Best Practices

1. Use named timers for easier debugging
2. Always clean up timers in destructors/components
3. Prefer microtasks for internal coordination
4. Defer non-critical work

## 17. Summary

Low-priority async work processed after sync code and microtasks.

## 18. Revision Notes

- Timer tasks
- Run after microtasks
- Delay floors enforced
- Important for animation/UI

## 19. Practice Questions

1. Compare setTimeout vs setImmediate in Node.
2. Avoid memory leak from dangling intervals.
3. Implement debounce using setTimeout.

## 20. References

- [MDN: Timers](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerTimeoutPromise)
- HTML Living Standard – Timers section

### Next File
**009 - Web APIs.md**