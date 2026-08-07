# Shallow Copy

## 1. Definition

A **Shallow Copy** creates a **new top-level object/container**, but nested objects/arrays are **copied by reference** — meaning modifications to nested values will affect both originals.

## 2. Why do we need it?

To safely duplicate objects while minimizing memory overhead and performance cost.

## 3. Internal Working

Only duplicates surface-level entries — deeper layers point to same memory addresses as source.

## 4. Step-by-Step Execution

Example:
```javascript
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 → affected!
```

Steps:
1. Spread operator copies top-level keys
2. `nested` property assigned by reference
3. Mutation propagates to original

## 5. Syntax

```javascript
const copy = { ...original };
const copy2 = Object.assign({}, original);
const copy3 = original.slice();
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const arr = [1, 2, 3];
const copy = [...arr];
copy.push(4);
console.log(arr.length); // 3 → unaffected
```

### Medium
```javascript
const obj = { a: 1, list: [1, 2] };
const copy = Object.assign({}, obj);
copy.list.push(3);
console.log(obj.list.length); // 3 → affected
```

### Advanced
```javascript
const stateClone = Object.assign(
  {},
  currentState,
  { metadata: currentState.metadata } // Explicitly preserve nested ref
);
```

## 7. Visual Diagram (ASCII)

```
Shallow vs Deep Difference

Original:
┌─────────────┐
│ a: 1        │
│ nested: ──► │ → { b: 2 }
└─────────────┘

Shallow Copy:
┌─────────────┐
│ a: 1 (copy) │
│ nested: ──► │ → SAME { b: 2 } object
└─────────────┘
```

## 8. Real-world Example

Angular Immutable Updates:
```typescript
this.state = {
  ...this.state,
  user: {
    ...this.state.user,
    name: "New Name" // Replace entire user block
  }
};
```

## 9. Angular Use Case

Used heavily in Redux-style state management, ngrx, signal stores.

## 10. Common Mistakes

❌ Expecting deep duplication with spread
❌ Forgetting references carry mutations

## 11. Edge Cases

1. **Nested arrays**
2. **Objects with circular refs**
3. **Functions in objects**

## 12. Performance Considerations

- Very fast for flat structures
- Inefficient for deep nesting requiring deep copies

## 13. Time & Space Complexity

- Time: O(n)
- Space: O(n)

## 14. Interview Questions

1. Define shallow copy
2. Demonstrate difference between shallow/deep
3. How does spread work?
4. What happens with nested objects?

## 15. Follow-up Questions

- "When should you prefer deep over shallow?"
- "Can shallow copy handle circular structures?"

## 16. Production Best Practices

1. Use structuredClone for deep copy needs
2. Be careful with immutable updates in frameworks
3. Document copying assumptions in code comments

## 17. Summary

- Duplicates top-level entries
- References preserved below surface
- Lightweight alternative to deep copy

## 18. Revision Notes

- Spread / Object.assign = shallow
- Nested refs shared
- Fast but limited isolation
- Know your data structure depth

## 19. Practice Questions

1. Copy object partially using assign.

2. Show shallow behavior with arrays.

3. Illustrate nested mutation propagation.

## 20. References

- [MDN: Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### Next File
**024 - Deep Copy.md**