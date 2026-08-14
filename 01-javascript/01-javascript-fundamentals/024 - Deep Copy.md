# Deep Copy

## 1. Definition

A **Deep Copy** duplicates **all levels** of an object or array — including nested structures — so that changes to one version don't affect the other.

## 2. Why do we need it?

To completely decouple two data structures — preventing unintended side effects.

## 3. Internal Working

Recursively clones every nested node until reaching primitives (strings, numbers, etc.), which can’t contain further references.

## 4. Step-by-Step Execution

Example:
```javascript
const original = { a: 1, nested: { b: 2 } };
const deep = deepClone(original); // e.g., JSON.parse(JSON.stringify(...))
deep.nested.b = 99;
console.log(original.nested.b); // 2 → unaffected
```

Steps:
1. Traverse full structure recursively
2. Clone every object/array encountered
3. Assign new memory locations for all copies

## 5. Syntax

```javascript
// Built-in (limited support)
const deep = structuredClone(original);

// Common manual approach (loses functions/regexp/etc.)
const deep2 = JSON.parse(JSON.stringify(original));
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const nested = [1, { x: 2 }];
const copy = JSON.parse(JSON.stringify(nested));
copy[1].x = 99;
console.log(nested[1].x); // 2 → unaffected
```

### Medium
```javascript
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  9. Visual Diagram (ASCII)

```
Deep vs Shallow Copy Memory Layout

Original:
┌──────────────┐
│ nested:      │ ──► { b: 2 }
└──────────────┘

Shallow:
┌──────────────┐
│ nested:      │ ──► Same { b: 2 } object
└──────────────┘

Deep:
┌──────────────┐
│ nested:      │ ──► NEW { b: 99 } object (separate from original)
└──────────────┘
```

## 8. Real-world Example

NgRx Reducer State Isolation:
```typescript
case UPDATE_USER:
  return {
    ...state,
    user: {
      ...state.user,
      profile: { ...state.user.profile, ...payload }
    }
  };
```

## 9. Angular Use Case

Used in NgRx/effects for immutable reducers ensuring pure updates.

## 10. Common Mistakes

❌ Using `JSON.parse(JSON.stringify(...))` blindly
❌ Losing special object types (Date, RegExp)

## 11. Edge Cases

1. **Circular references**
   ```javascript
   const obj = {};
   obj.self = obj;
   ```

2. **Functions excluded**
3. **Undefined dropped from JSON**
4. **Special objects**

## 12. Performance Considerations

- Expensive for large nested structures
- Prefer structural sharing when possible (e.g., immer.js)
- Consider lazy cloning strategies

## 13. Time & Space Complexity

- Time: O(n)
- Space: O(n)

## 14. Interview Questions

1. Explain deep copy vs shallow
2. Write deep clone without JSON.stringify
3. Handle circularity in deep clone
4. Preserve special objects

## 15. Follow-up Questions

- "Why avoid JSON-based deep copies?"
- "How would you handle Dates?"

## 16. Production Best Practices

1. Use `structuredClone()` when supported
2. Test edge cases thoroughly
3. Cache cloned results for repeated use
4. Prefer immutables libraries (immer)

## 17. Summary

- Recursive duplication of all nested content
- Full isolation between source and copy
- Costlier but safer

## 18. Revision Notes

- JSON fails for dates/functions/circularity
- structuredClone preserves better
- Write own recursive clone for control
- Mind memory usage on big trees

## 19. Practice Questions

1. Implement recursive deep clone.

2. Handle circular refs in deepcopy.

3. Compare performance with shallow.

## 20. References

- [MDN: structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)

### Next File
**025 - Garbage Collection.md**