# Flatten Nested Array

## 1. Definition

**Flatten** transforms a deeply nested array into a single-level flat array recursively.

## 2. Why do we need it?

Simplify nested data structures for uniform processing, mapping, or rendering lists uniformly.

## 3. Internal Working

Recursively traverse array:
1. If element is array → recurse deeper
2. Else → push to result
3. Supports depth control (flatten(n)) or infinite depth

Base implementations vary by recursion strategy/stack usage.

## 4. Step-by-Step Execution

Basic recursive:
```javascript
function flatten(arr) {
  return arr.reduce((acc, el) => {
    return acc.concat(Array.isArray(el) ? flatten(el) : el);
  }, []);
}
```

Steps for `[1, [2, [3, [4]]]]`:
1. Start with empty accumulator
2. 1 pushed directly
3. [2,[3,[4]]] recursed
4. 2 pushed
5. [3,[4]] recursed again
6. Eventually produces [1,2,3,4]

## 5. Syntax

```javascript
arr.flat(depth);
// Manual recursion alternative
function deepFlatten(arr) { ... }
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
[[1,2],[3,4]].flat(); // [1,2,3,4]
```

### Medium
```javascript
[1,[2,[3,[4]]]].flat(Infinity); // [1,2,3,4]
```

### Advanced
```javascript
function flattenWithDepth(arr, depth = Infinity) {
  if (!Array.isArray(arr)) return [arr];
  if (depth === 0) return arr;
  
  return arr.reduce((acc, val) => {
    const flattened = Array.isArray(val) 
      ? flattenWithDepth(val, depth - 1) 
      : [val];
    return acc.concat(flattened);
  }, []);
}
```

## 7. Visual Diagram (ASCII)

```
Recursive Flatten Process

Input:  [1, [2, [3, [4]]]]
        ↓
[1] + flatten([2, [3, [4]]])
      ↓
      [2] + flatten([[3, [4]]])
            ↓
            [3] + flatten([[4]])
                  ↓
                  [4]

Result: [1, 2, 3, 4]
```

## 8. Real-world Example

Processing nested menu structures in Angular:
```typescript
const menuItems = [
  { label: 'Home' },
  { label: 'Settings', children: [
    { label: 'Profile' },
    { label: 'Security', children: [...] }
  ]}
];

// Flatten for rendering
const flattenedMenu = menuItems.flat(Infinity); 
// Note: Requires recursive adaptation for objects
```

## 9. Angular Use Case

Flattening menu/navigation trees, normalizing API responses.

## 10. Common Mistakes

❌ Infinite recursion on circular refs  
❌ Incorrect depth handling  

## 11. Edge Cases

1. **Empty arrays preserved**
   ```javascript
   [1, [], 2].flat(); // [1, 2]
   ```

2. **Non-array inputs**
   ```javascript
   [1, undefined, 2].flat(); // [1, undefined, 2]
   ```

3. **Deeply nested (>10k levels)**
   Stack overflow risk — prefer iterative solution

## 12. Performance Considerations

Iterative stack-based versions prevent stack overflow on extreme depths.

## 13. Time & Space Complexity

Time: O(n) where n = total elements
Space: O(d) for recursion depth + O(n) output array

## 14. Interview Questions

1. Multiple ways to flatten arrays?
2. Handle arbitrarily deep nesting?
3. What happens with sparse arrays?

## 15. Follow-up Questions

- "Implement flatten with custom predicate?"

## 16. Production Best Practices

1. Guard against excessively deep nesting
2. Consider iterative stack-based approach for safety
3. Preserve empty slots correctly

## 17. Summary

Flattening bridges hierarchical and linear views — essential utility in data transformation toolkits.

## 18. Revision Notes

- Native `.flat()` since ES2019
- Recursive vs iterative tradeoffs
- Depth parameter controls flattening extent
- Watch stack limits for extreme depths

## 19. Practice Questions

1. Implement flatten manually.
2. Handle circular references.
3. Flatten with custom predicate/filter.

## 20. References

- [MDN: Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

### Next File
**004 - Promise.all.md**
