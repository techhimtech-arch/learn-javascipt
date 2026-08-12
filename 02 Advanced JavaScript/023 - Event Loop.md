# Event Loop

## 1. Definition

The **Event Loop** is JavaScript's mechanism for executing asynchronous operations — continuously processing messages from the queue when the call stack is empty.

## 2. Why do we need it?

JavaScript's single-threaded nature requires coordination for handling timers, I/O, network requests, and user interactions.

## 3. Internal Working

Phases:
1. **Timers**: setTimeout/setInterval callbacks
2. **Pending callbacks**: I/O callbacks
3. **Idle, prepare**: Internal idle processing
4. **Poll**: Receive new I/O events
5. **Check**: setImmediate callbacks
6. **Close callbacks**: close events

Additionally, **microtasks** (Promises, queueMicrotask) drain completely between each macrotask.

## 4. Step-by-Step Execution

Execution order:
1. Run synchronous code
2. Drain microtask queue (Promise.then, queueMicrotask)
3. Process one macrotask
4. Render (if needed)
5. Drain microtasks again
6. Repeat

## 5. Syntax

```javascript
// Microtasks have priority
console.log('start');

setTimeout(() => console.log('timeout 1')); // Macrotask

Promise.resolve().then(() => console.log('promise 1')); // Microtask

queueMicrotask(() => console.log('microtask')); // Microtask

setTimeout(() => { // Macrotask
  console.log('timeout 2');
  Promise.resolve().then(() => console.log('promise 2')); // Microtask
});

console.log('end');

// Console order: start, end, promise 1, microtask, timeout 1, timeout 2, promise 2
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
// Output: A, C, B
```

### Medium
```javascript
// Promise resolution timing
async function example() {
  console.log('start');
  
  await Promise.resolve('middle');
  console.log('after await');
  
  setTimeout(() => console.log('timeout'));
}

example();
// Output: start, after await, timeout
```

### Advanced
```javascript
// Custom scheduler
function runAtEndOfMicrotask(callback: () => void): void {
  // Ensure callback runs after all microtasks but before next macrotask
  queueMicrotask(() => {
    // This will run after current microtasks
    Promise.resolve().then(callback);
  });
}
```

## 7. Visual Diagram (ASCII)

```
Event Loop Execution

Call Stack ──► Empty? ──► Yes ──► Microtask Queue ──► Drain All ──► Macrotask Queue ──► Next
                          │         ↑                  │
                          │         │                  ▼
                          └─────────┴─────────── Run Macrotask
```

## 8. Real-world Example

Race condition prevention in async operations.

## 9. Angular Use Case

Understanding change detection timing, async pipe behavior, zone.js interaction.

## 10. Common Mistakes

❌ Assuming setTimeout(0) fires immediately
❌ Forgetting microtask priority over macrotasks

## 11. Edge Cases

1. **process.nextTick vs microtask priority**
2. **Node.js additional phase (check)**

## 12. Performance Considerations

Excessive microtasks can block macrotasks indefinitely.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Event loop phases order?
2. Microtask vs macrotask priority?
3. setTimeout(0) vs Promise.resolve().then()?

## 15. Follow-up Questions

- "Implement custom scheduler?"

## 16. Production Best Practices

1. Understand async timing implications
2. Avoid blocking microtask queue
3. Use proper async patterns
4. Profile async operation timing

## 17. Summary

Event loop coordinates JavaScript's single-threaded async execution model.

## 18. Revision Notes

- Microtasks always drain before next macrotask
- Promise callbacks are microtasks
- setTimeout/setInterval are macrotasks
- queueMicrotask sits between them in priority

## 19. Practice Questions

1. Predict output of mixed async code.
2. Implement custom microtask wrapper.
3. Debug race conditions in promises.

## 20. References

- [MDN: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Node.js: Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttask)

---
