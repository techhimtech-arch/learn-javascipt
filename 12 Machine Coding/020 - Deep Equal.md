# Deep Equal

## 1. Definition

**Deep Equal** performs structural comparison between two values — checking equality recursively across nested objects/arrays.

## 2. Why do we need it?

Compare complex state objects accurately — essential in testing, memoization, change detection.

## 3. Internal Working

Compare recursively:
1. If both primitives → strict equality
2. If both arrays → compare lengths, recurse each index
3. If both objects → compare keys, recurse each value
4. Handle special cases (Date, RegExp, functions)

## 4. Step-by-Step Execution

Implementation:
```javascript
function deepEqual(a, b) {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => 
    Object.prototype.hasOwnProperty.call(b, key) && 
    deepEqual(a[key], b[key])
  );
}
```

## 5. Syntax

```javascript
deepEqual(obj1, obj2);
// Returns boolean
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
deepEqual(1, 1); // true
deepEqual({a:1}, {a:1}); // true
```

### Medium
```javascript
const obj1 = { user: { name: 'Alice', roles: ['admin'] } };
const obj2 = { user: { name: 'Alice', roles: ['admin'] } };
deepEqual(obj1, obj2); // true (not ===)
```

### Advanced
```typescript
// Fast path optimizations
function fastDeepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!fastDeepEqual(a[i], b[i])) return false;
      }
      return true;
    }
    
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!fastDeepEqual(a[key], b[key])) return false;
    }
    
    return true;
  }
  
  return false;
}
```

## 7. Visual Diagram (ASCII)

```
Recursive Comparison Tree

Compare A.x to B.x
├─ Primitive check
├─ Array length check
├─ Object key count check
└─ Recurse A.x.y to B.x.y
   ...
```

## 8. Real-world Example

Angular OnPush change detection strategy uses identity checks — deepEqual helps when immutable updates needed.

## 9. Angular Use Case

NgRx selector memoization, form validation diffs, custom change detection.

## 10. Common Mistakes

❌ Using == instead of ===
❌ Not handling circular refs
❌ Missing key ordering assumptions

## 11. Edge Cases

1. **NaN comparison**
   ```javascript
   NaN !== NaN but both are numbers
   ```

2. **Prototype checks**
   ```javascript
   deepEqual({}, Object.create(null)); // Should they be equal?
   ```

3. **Symbol keys**

## 12. Performance Considerations

Expensive O(n) operation — cache results where possible.

## 13. Time & Space Complexity

Time: O(n) worst case (all properties compared)
Space: O(d) recursion stack depth

## 14. Interview Questions

1. Implement deepEqual
2. Handle circular references?
3. Why not use JSON.stringify?

## 15. Follow-up Questions

- "Optimize for common shallow differences?"

## 16. Production Best Practices

1. Use battle-tested libraries (fast-deep-equal)
2. Consider shallow-first optimizations
3. Profile before rolling custom impl
4. Define expected comparison semantics clearly

## 17. Summary

Deep comparison enables correctness in stateful reactive systems.

## 18. Revision Notes

- Strict equality first
- Arrays vs objects handled distinctly
- Circular detection required for robustness
- Libraries exist for production use

## 19. Practice Questions

1. Implement deepEqual for primitives/arrays/objects.
2. Detect and handle circular structures.
3. Optimize for common early-exit cases.

## 20. References

- [MDN: Deep Equivalence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EqualityComparisons)
- [fast-deep-equal npm](https://www.npmjs.com/package/fast-deep-equal)

### Module 12 (Machine Coding) - Continuing with more patterns ✅
