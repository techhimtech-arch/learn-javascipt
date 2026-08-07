# WeakMap

## 1. Definition

A **WeakMap** is a collection of key/value pairs where keys are objects (or functions) and values can be arbitrary data.

Keys are held **weakly** — eligible for garbage collection when no other strong references exist.

## 2. Why do we need it?

Used in scenarios where:
- You want to attach data to objects **without preventing GC**
- Preventing circular reference leaks
- Caching associated data cleanly

## 3. Internal Working

- Keys must be objects
- Values removed automatically when key dies
- No iteration or size tracking (intentionally limited)

## 4. Step-by-Step Execution

Example:
```javascript
const wm = new WeakMap();
const obj = {};
wm.set(obj, "metadata");
console.log(wm.get(obj)); // "metadata"
obj = null; // Original object eligible for GC
wm has(obj); // false (eventually)
```

Steps:
1. Create WeakMap
2. Set object key + value
3. Retrieve value later via same object
4. Once object has no strong refs, entry disappears

## 5. Syntax

```javascript
const wm = new WeakMap();
wm.set(obj, value);
wm.get(obj); // value
wm.has(obj); // true/false
wm.delete(obj); // remove entry
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const cache = new WeakMap();
const userEl = document.getElementById('user');
cache.set(userEl, { lastSeen: Date.now() });
```

### Medium
```javascript
const privateData = new WeakMap();
class Counter {
  constructor(initial = 0) {
    privateData.set(this, { count: initial });
  }
  increment() {
    const data = privateData.get(this);
    data.count++;
  }
}
```

### Advanced
```javascript
// Memoize expensive computation with automatic cleanup
const memo = new WeakMap();
function expensive(obj) {
  if (!memo.has(obj)) memo.set(obj, compute(obj));
  return memo.get(obj);
}
```

## 7. Visual Diagram (ASCII)

```
WeakMap Entry Lifecycle

┌────────────┐        ┌────────────┐
│ Key Obj    │───────▶│ Value      │
└────────────┘        └────────────┘
       │
       ▼ No more strong refs
Entry becomes eligible for GC
```

## 8. Real-world Example

Angular internal caches and DI container metadata management.

## 9. Angular Use Case

Tracking directive state tied to DOM elements or component instances.

## 10. Common Mistakes

❌ Using primitive keys
❌ Expecting enumeration methods

## 11. Edge Cases

1. Keys must be objects
2. No `.clear()` method
3. No iteration support

## 12. Performance Considerations

Fast insertions/removals; automatic cleanup saves memory.

## 13. Time & Space Complexity

- Get/Set/Delete: O(1)
- Memory freed automatically when keys GC'd

## 14. Interview Questions

1. What makes WeakMap different from Map?
2. Use cases in frameworks?
3. Why can’t you enumerate WeakMaps?

## 15. Follow-up Questions

- "How does Angular use WeakMaps internally?"

## 16. Production Best Practices

1. Use for attaching metadata to DOM/component objects
2. Prefer over manual cleanup approaches
3. Combine with WeakRef for soft references

## 17. Summary

Efficient, leak-safe storage of metadata associated with objects.

## 18. Revision Notes

- Keys = objects only
- Values = anything
- Keys die → entries vanish
- No iteration

## 19. Practice Questions

1. Cache expensive results per object.
2. Attach metadata to DOM nodes.
3. Detect memory leak prevention pattern.

## 20. References

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

### Next File
**016 - WeakSet.md**
