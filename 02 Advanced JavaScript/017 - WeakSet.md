# WeakSet

## 1. Definition

A **WeakSet** is a collection of **unique objects** stored weakly — meaning objects in the set will be removed automatically once they're no longer referenced anywhere else.

Similar to `Set`, but restricted to object values only, and items subject to **garbage collection**.

## 2. Why do we need it?

To maintain groups of related objects without preventing their garbage collection — ideal for tracking sets in memory-safe ways.

## 3. Internal Working

- Holds weak references to object entries
- Items disappear when externally unreferenced
- No iteration or enumeration allowed (by design)

## 4. Step-by-Step Execution

Example:
```javascript
const seen = new WeakSet();
const obj = {};
seen.add(obj);
console.log(seen.has(obj)); // true
obj = null; // Now eligible for GC
seen.has(obj); // false (after GC)
```

## 5. Syntax

```javascript
const ws = new WeakSet();
ws.add(obj);
ws.has(obj); // boolean
ws.delete(obj); // boolean indicating success
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const touchedNodes = new WeakSet();
document.querySelectorAll('div').forEach(el => touchedNodes.add(el));
setTimeout(() => console.log(touchedNodes.has(someDiv)), 1000);
```

### Medium
```javascript
class UniqueTracker {
  #tracked = new WeakSet();
  track(obj) {
    if (this.#tracked.has(obj)) return;
    this.#tracked.add(obj);
    // Perform action
  }
}
```

### Advanced
```javascript
// Prevent duplicate DOM interactions
const interacted = new WeakSet();
element.addEventListener('click', (e) => {
  if (interacted.has(e.target)) return;
  interacted.add(e.target);
  handleInteraction(e.target);
});
```

## 7. Visual Diagram (ASCII)

```
WeakSet Behavior:

[Object A] ──┐
             ▼
        ┌────────┐
        │ WeakSet│
        └────────┘
[Object B] ──┘
      │
      ▼ (when all refs gone...)
Entry vanishes automatically
```

## 8. Real-world Example

Angular internal checks for visited component instances.

## 9. Angular Use Case

Prevents redundant processing of components in complex tree traversals.

## 10. Common Mistakes

❌ Adding primitives throws TypeError
❌ Expecting `.size` or `.forEach`

## 11. Edge Cases

1. Must add objects only
2. No iteration methods available
3. Automatic cleanup behavior depends on GC timing

## 12. Performance Considerations

Extremely lightweight; automatic cleanup saves memory.

## 13. Time & Space Complexity

O(1) add/has/delete

## 14. Interview Questions

1. Compare `WeakSet` vs `Set`.
2. Why restrict to objects?
3. Real-world use cases?

## 15. Follow-up Questions

- "How would you implement a similar structure?"

## 16. Production Best Practices

1. Use for marking visited objects in traversal algorithms
2. Avoid relying on deterministic cleanup timing
3. Combine with `IntersectionObserver` for efficient DOM tracking

## 17. Summary

Safe way to store object collections with automatic memory cleanup.

## 18. Revision Notes

- Only objects allowed
- Auto-cleaned when unreferenced
- No size/iteration support

## 19. Practice Questions

1. Track unique DOM selections.
2. Deduplicate processed items.
3. Detect visited nodes.

## 20. References

- [MDN: WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

### Next File
**017 - Map.md**
