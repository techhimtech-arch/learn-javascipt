# Deep Clone

## 1. Definition

**Deep Clone** creates a fully independent copy of an object — including all nested properties — so mutations to one don't affect the other.

## 2. Why do we need it?

Avoid unintended side-effects when modifying complex data structures.

## 3. Internal Working

Approach varies:
1. Recursive traversal copying nested structures
2. Handle special cases (Date, RegExp, Map, Set, etc.)
3. Preserve constructor/prototypes
4. Skip non-enumerable/circular references safely

## 4. Step-by-Step Execution

Simple recursive:
```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  
  if (hash.has(obj)) return hash.get(obj); // Circular reference
  
  let clone;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else {
    clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone);
    for (const key in obj) {
      clone[key] = deepClone(obj[key], hash);
    }
  }
  
  return clone;
}
```

Steps:
1. Check base/primitive case
2. Detect circular ref via WeakMap
3. Handle typed objects (Date/RegExp)
4. Recursively clone nested props

## 5. Syntax

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = deepClone(original);
copy.b.c = 99;
console.log(original.b.c); // Still 2
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const obj = { name: "Alice", age: 30 };
const copy = Object.assign({}, obj);
```

### Medium
```javascript
const arr = [{ id: 1 }, { id: 2 }];
const copy = arr.map(item => ({ ...item }));
```

### Advanced
```javascript
function structuredClone(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  // Handle browser-native structuredClone if available
  if (typeof window !== 'undefined' && window.structuredClone) {
    return window.structuredClone(obj);
  }
  
  // Manual fallback
  const clone = Array.isArray(obj) ? [] : {};
  for (const key of Object.keys(obj)) {
    clone[key] = structuredClone(obj[key]);
  }
  return clone;
}
```

## 7. Visual Diagram (ASCII)

```
Deep Clone vs Shallow Copy

Original: { a: 1, nested: { b: 2 } }
           ↘      ↘
Shallow:  Same ref for 'nested'
Deep:     Independent copy of 'nested'
```

## 8. Real-world Example

Cloning NgRx store snapshot for debugging:
```typescript
store.select('user').pipe(
  map(user => ({ ...user })), // Shallow enough?
  // Better yet:
  map(user => structuredClone(user.toJS())) // Deep clone
).subscribe()
```

## 9. Angular Use Case

Preserving immutable state updates, NgRx/ NgXS reducers, form state snapshots.

## 10. Common Mistakes

❌ Using JSON.parse(JSON.stringify()) blindly  
❌ Not handling circular references

## 11. Edge Cases

1. **Functions lose identity**
   ```javascript
   typeof fn === 'function' ? copyFn : originalCopy
   ```

2. **Undefined values dropped by JSON**
   ```javascript
   JSON.stringify({ a: undefined }); // "{}"
   ```

3. **Symbol keys ignored by JSON**
4. **Prototype chain lost**

## 12. Performance Considerations

Avoid deep cloning unless absolutely necessary — expensive for large objects.

## 13. Time & Space Complexity

Time: O(n) where n = number of enumerable properties
Space: O(n) for copied structure

## 14. Interview Questions

1. Deep vs shallow copy differences?
2. Why avoid JSON hack?
3. Cloning circular structures?

## 15. Follow-up Questions

- "How to preserve prototypes correctly?"

## 16. Production Best Practices

1. Prefer immutability libraries (immer.js)
2. Know limitations of `structuredClone`
3. Profile clone-heavy operations
4. Use lazy cloning for large trees

## 17. Summary

Deep cloning creates fully independent duplicates — critical for predictable functional programming.

## 18. Revision Notes

- JSON hack breaks Dates/Symbols/functions
- Recursive traversal handles nesting
- WeakMap tracks visited refs
- Native `structuredClone` preferred now

## 19. Practice Questions

1. Clone object preserving prototype chain.
2. Handle circular reference in clone.
3. Safely clone complex state tree.

## 20. References

- [MDN: structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
- [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)

### Next File
**006 - EventEmitter.md**
