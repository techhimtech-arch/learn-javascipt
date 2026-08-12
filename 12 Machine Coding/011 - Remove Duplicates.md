# Remove Duplicates

## 1. Definition

**Remove Duplicates** eliminates repeated objects/values from arrays — producing collections with unique entries based on identity or custom equality.

## 2. Why do we need it?

Prevent redundant rendering/processing, maintain clean dataset for aggregation/reporting.

## 3. Internal Working

Approaches:
1. Set-based (primitive values): O(n) time/space
2. Map-based (object keys): maintain seen keys
3. Custom comparator: slower O(n²) comparison approach

## 4. Step-by-Step Execution

Primitive approach:
```javascript
const unique = [...new Set([1,2,2,3,3,3])]; // [1,2,3]
```

Object approach:
```javascript
function uniqueByKey(arr, key) {
  const seen = new Set();
  return arr.filter(item => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
```

Steps:
1. Iterate each element
2. Track seen identifiers
3. Filter out duplicates
4. Return cleaned list

## 5. Syntax

```javascript
// Primitives
const unique = [...new Set(array)];

// Objects by key
array.filter((v,i,arr) => arr.findIndex(t => t.id === v.id) === i);

// With lodash
_.uniqBy(array, 'id');
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const nums = [1, 2, 2, 3, 4, 4, 5];
const uniqueNums = [...new Set(nums)]; // [1,2,3,4,5]
```

### Medium
```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice Duplicate' }
];

const uniqueUsers = users.filter(
  (user, idx, arr) => arr.findIndex(u => u.id === user.id) === idx
);
```

### Advanced
```javascript
// Deep equality deduplication
function deepUniqBy(arr, deepEqual) {
  return arr.reduce((unique, obj) => {
    const exists = unique.some(existing => deepEqual(existing, obj));
    if (!exists) unique.push(obj);
    return unique;
  }, []);
}
```

## 7. Visual Diagram (ASCII)

```
Deduplication Process

Input:  [A, B, A, C, B]

Tracking Seen:
A → seen[A] = true → keep A
B → seen[B] = true → keep B
A → already seen → skip
C → seen[C] = true → keep C
B → already seen → skip

Output: [A, B, C]
```

## 8. Real-world Example

Angular material table filtering:
```typescript
this.dataSource.data = uniqBy(data, 'id');
// Or with RxJS:
data$.pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
```

## 9. Angular Use Case

Cleaning API response lists, preventing duplicate route entries, deduplicating user selections.

## 10. Common Mistakes

❌ Mutating original array  
❌ Deep equality checks unnecessarily costly

## 11. Edge Cases

1. **NaN handling**
   ```javascript
   [NaN, NaN].filter((v,i,a) => a.indexOf(v) === i); // Keeps one NaN
   ```

2. **Object references**
   ```javascript
   const obj = {};
   [obj, obj]; // Same reference but different array slots
   ```

3. **Mixed types**

## 12. Performance Considerations

Use Set/Map for O(1) lookups instead of O(n) indexOf/filter.

## 13. Time & Space Complexity

Basic Set:  
Time: O(n)  
Space: O(n)  

Key-based filtering:  
Time: O(n)  
Space: O(k) where k = unique keys

## 14. Interview Questions

1. Deduplicate primitives efficiently?
2. Remove duplicate objects by property?
3. Handle deep equality case?

## 15. Follow-up Questions

- "How to preserve insertion order?"

## 16. Production Best Practices

1. Choose appropriate key extractor
2. Use native Set for primitives
3. Memoize results for static datasets

## 17. Summary

Smart deduplication balances correctness and performance — depends on value uniqueness rules.

## 18. Revision Notes

- Set for primitives O(n)
- Map/seen tracking for objects
- Custom comparator for deep equality
- Watch out for NaN edge case

## 19. Practice Questions

1. Dedupe array of numbers.
2. Remove objects with same property value.
3. Preserve order while deduplicating.

## 20. References

- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

### Next File
**012 - First Non-Repeating Char.md**
