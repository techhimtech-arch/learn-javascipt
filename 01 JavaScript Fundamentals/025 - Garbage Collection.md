# Garbage Collection

## 1. Definition

**Garbage Collection** is the automatic process of reclaiming memory occupied by objects that are **no longer reachable** from the root set (global scope, call stack, etc.).

Most JavaScript engines use **mark-and-sweep** algorithm.

## 2. Why do we need it?

Prevent memory leaks and manage resources automatically — reducing developer burden.

## 3. Internal Working

1. **Mark Phase**: Traverse reachable objects starting from roots
2. **Sweep Phase**: Remove unreachable marked objects
3. **Compact Phase (optional)**: Defragment remaining memory

## 4. Step-by-Step Execution

Example:
```javascript
let obj = { name: "Test" };
obj = null; // Original object becomes unreachable eventually
```

Steps:
1. Initially: `{ name: "Test" }` reachable via reference
2. Assignment to `null` → no references left
3. Next GC cycle marks and removes it

## 5. Syntax

Not directly controlled by JS developer — handled internally by engine.

## 6. Examples (Easy → Advanced)

### Easy
```javascript
let x = { data: [1, 2, 3] };
x = null; // Eligible for GC
```

### Medium
```javascript
window.largeArray = [...Array(10000)].map(() => ({ val: Math.random() }));
delete window.largeArray; // Removes global reference → GC eligible
```

### Advanced
```javascript
const cache = new WeakMap(); // Automatically cleans entries when keys die
```

## 7. Visual Diagram (ASCII)

```
Reachability Tree

Roots (Variables/Global/etc.)
    │
    ├──▶ Object A
    │        │
    │        └──▶ Object B
    │
    └──▶ Object C
             │
             └──▶ Object D (unreferenced elsewhere)

Unmarked Objects → Swept Away!
```

## 8. Real-world Example

Angular Component Cleanup:
```typescript
ngOnDestroy() {
  this.subscription.unsubscribe(); // Prevents observer leaks
  this.data = null; // Optional manual deref for larger payloads
}
```

## 9. Angular Use Case

Managing RxJS subscriptions to avoid memory leaks in long-lived apps.

## 10. Common Mistakes

❌ Holding accidental references
❌ Circular references blocking GC (older browsers)

## 11. Edge Cases

1. **Memory leaks through closures**
2. **Detached DOM trees**
3. **Event listeners forgotten**
4. **Timers holding scope**

## 12. Performance Considerations

- Frequent GC pauses cause jank
- Minimize object churn in animation loops
- Use object pooling for short-lived frequent allocations

## 13. Time & Space Complexity

- Depends on number of objects
- Generally optimized within engine

## 14. Interview Questions

1. How does GC work?
2. Mark-and-sweep process
3. Signs of memory leaks
4. Tools for detecting them?

## 15. Follow-up Questions

- "How do Angular developers mitigate GC pressure?"

## 16. Production Best Practices

1. Clean up subscriptions/timers
2. Nullify large payloads post-use
3. Profile with browser devtools regularly

## 17. Summary

- Automatic memory reclamation
- Mark/sweep model
- Developer responsibility for proper cleanup

## 18. Revision Notes

- Reachable = retained
- Roots seed traversal
- Closures can trap objects
- Tools help find leaks

## 19. Practice Questions

1. Identify potential leak candidates.

2. Explain cleanup strategy in component.

3. Inspect heap snapshots for growth trends.

## 20. References

- [MDN: Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

### Next File
**026 - Strict Mode.md**