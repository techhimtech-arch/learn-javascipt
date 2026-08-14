# Microtasks

## 1. Definition

**Microtasks** are tasks that run **after the current synchronous code completes**, but **before the next rendering step or timer callback**.

They come from:
- Resolved promises (`.then`, `.catch`, `.finally`)
- `queueMicrotask()`
- `MutationObserver`

## 2. Why do we need it?

Prioritize quick, high-importance work without interrupting ongoing script.

## 3. Internal Working

After every macrotask:
1. Microtask queue drained completely (FIFO)
2. Rendering may occur
3. Next macrotask runs

## 4. Step-by-Step Execution

Example:
```javascript
console.log("Sync Start");
Promise.resolve().then(() => console.log("Microtask"));
setTimeout(() => console.log("Timeout"), 0);
console.log("Sync End");
```

Order:
1. `console.log("Sync Start")`
2. Sync code finishes
3. Microtask queue flushed → logs `"Microtask"`
4. Timer fires → logs `"Timeout"`

## 5. Syntax

```javascript
queueMicrotask(() => {
  console.log("Runs as microtask");
});

Promise.resolve().then(task);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
Promise.resolve().then(() => console.log("P1"));
Promise.resolve().then(() => console.log("P2"));
```

### Medium
```javascript
async function logAfter(ms) {
  await new Promise(r => setTimeout(r, ms));
  console.log("Done");
}
```

### Advanced
```javascript
queueMicrotask(() => {
  console.log("First Microtask");
  queueMicrotask(() => console.log("Second Nested Microtask"));
});
```

## 7. Visual Diagram (ASCII)

```
Task Queue vs Microtask Queue:

┌────────────┐
│ Macrotask  │ ← setTimeout, setInterval
└─────┬──────┘
      │
      ▼
┌────────────┐
│ Microtask  │ ← Promise callbacks, queueMicrotask()
│ Drain all  │ ← Until empty
└─────┬──────┘
      │
      ▼
┌────────────┐
│ Render     │ ← Paint updates
└────────────┘
```

## 8. Real-world Example

Angular Zone.js patches promise microtasks to trigger change detection.

## 9. Angular Use Case

Guarantees async updates reflected in UI through microtask scheduling.

## 10. Common Mistakes

❌ Confusing microtasks with macrotasks  
❌ Infinite microtask loops causing starvation  

## 11. Edge Cases

1. **Recursive microtasks** – drain all before yielding back
2. **Mixing with timers** – microtask priority always higher
3. **Async function resolution** – treated as microtask

## 12. Performance Considerations

- Efficient for small jobs
- Overuse can starve macrotasks → delays rendering

## 13. Time & Space Complexity

O(1) per item processed.

## 14. Interview Questions

1. Difference between microtasks and macrotasks?
2. Where do promise callbacks land?
3. Why might UI freeze with many microtasks?

## 15. Follow-up Questions

- "Can microtasks starve macrotasks?"
- "Where are they queued?"

## 16. Production Best Practices

1. Yield occasionally with `setTimeout(fn, 0)` or `requestIdleCallback`
2. Watch for runaway microtask scheduling
3. Profile event loop responsiveness

## 17. Summary

High-priority async tasks running between macro tasks.

## 18. Revision Notes

- Higher priority than timers
- Fully drained before next task
- Used by promises/Zones internally

## 19. Practice Questions

1. Explain why this runs before setTimeout:
```javascript
Promise.resolve().then(console.log);
setTimeout(console.log, 0);
```

2. Simulate microtask starvation.

3. Use queueMicrotask intentionally.

## 20. References

- [MDN: Microtasks](https://developer.mozilla.org/en-US/docs/Web/API/QueueMicrotask)
- HTML Living Standard – Event Loops

### Next File
**008 - Macrotasks.md**
