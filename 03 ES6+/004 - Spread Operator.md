# Spread Operator

## 1. Definition

The **spread operator (`...`)** expands iterables (arrays, strings, maps, sets) into individual elements, enabling easy copying, merging, and passing as function arguments.

## 2. Why do we need it?

- Shallow-copy arrays/objects effortlessly
- Merge collections cleanly
- Pass arrays as discrete function args
- Create variadic functions

## 3. Internal Working

At parse-time:
- Identifies spread expression
- Iterates over input iterable
- Emits each item as a separate argument/literal

## 4. Step-by-Step Execution

Example:
```javascript
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
```

Steps:
1. Evaluate `[...arr1]`
2. Iterate through `arr1`
3. Copy each element into new array literal
4. Append remaining literals

## 5. Syntax

```javascript
// Array spread
const combined = [...arr1, ...arr2];

// Object spread (shallow copy)
const cloned = { ...original };

// Function calls
Math.max(...[1, 2, 3]);

// Strings to chars
const chars = [...'hello']; // ['h','e','l','l','o']
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const a = [1, 2];
const b = [...a, 3]; // [1,2,3]
```

### Medium
```javascript
const defaultConfig = { timeout: 5000, retries: 3 };
const userConfig = { ...defaultConfig, timeout: 2000 }; // Override
```

### Advanced
```typescript
const mergedMap = new Map([...map1, ...map2]);
const uniqueChars = [...new Set(str)];
```

## 7. Visual Diagram (ASCII)

```
Spread Expansion Visualization

Original:
┌──────────┐
│ [1,2,3]  │
└────┬─────┘
     │ spread
     ▼
Expanded:
┌────┬────┬────┐
│ 1  │ 2  │ 3  │
└────┴────┴────┘
```

## 8. Real-world Example

Angular form builder configuration:
```typescript
this.fb.group({
  ...baseControls,
  ...customControls
});
```

## 9. Angular Use Case

- Cloning component state
- Merging configuration objects
- Variadic utility functions

## 10. Common Mistakes

❌ Deep copying assuming full clone
❌ Passing huge arrays as function args

## 11. Edge Cases

1. **Sparse arrays become dense**
   ```javascript
   const sparse = [1, , 3];
   const dense = [...sparse]; // [1, undefined, 3]
   ```

2. **Object spread is shallow**
   ```javascript
   const nestedClone = { ...obj }; // Still shares inner refs
   ```

3. **Strings become character arrays**
   ```javascript
   [...'abc']; // ['a', 'b', 'c']
   ```

## 12. Performance Considerations

- Efficient for small-to-medium datasets
- Avoid spreading massive arrays (>1e6 items)
- Prefer slice() for large-array copying

## 13. Time & Space Complexity

O(n) where n = spread input size.

## 14. Interview Questions

1. Shallow vs deep copy with spread?
2. Spread vs rest difference?
3. Use with function parameters?

## 15. Follow-up Questions

- "What happens if you spread null?"
- "How does object spread interact with getters?"

## 16. Production Best Practices

1. Validate inputs before spreading
2. Prefer structuredClone for deep copies
3. Watch memory usage with large spreads
4. Use for clean function invocations

## 17. Summary

Flexible tool for expanding collections and merging structures quickly.

## 18. Revision Notes

- Expands iterables
- Shallow copy only
- Object/array/string supported
- Not deep clone mechanism

## 19. Practice Questions

1. Merge multiple arrays.
2. Shallow clone nested object.
3. Pass array to variadic function.

## 20. References

- [MDN: Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### Next File
**005 - Rest Parameters.md**
