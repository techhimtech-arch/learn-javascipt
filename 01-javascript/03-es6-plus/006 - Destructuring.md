# Destructuring

## 1. Definition

**Destructuring** extracts values from arrays or properties from objects into distinct variables using a concise syntax mirroring object/array literals.

## 2. Why do we need it?

Cleaner extraction of nested data, less boilerplate, easier refactoring.

## 3. Internal Working

Syntax transforms into indexed/property-access assignments behind the scenes.

## 4. Step-by-Step Execution

```javascript
const { name, age } = { name: "Bob", age: 30 };
```

Steps:
1. Parse LHS pattern `{ name, age }`
2. Assign `obj.name → name`, `obj.age → age`

## 5. Syntax

```javascript
// Array
const [a, b] = [1, 2];

// Object
const { x, y } = { x: 1, y: 2 };

// Nested
const { a: { b: inner } } = { a: { b: 10 } };
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const [first, second] = [1, 2];
const { name } = { name: "Alice" };
```

### Medium
```javascript
const [head, ...tail] = [1,2,3,4]; // head=1, tail=[2,3,4]
```

### Advanced
```javascript
const {
  user: {
    profile: {
      firstName,
      lastName
    }
  }
} = userData;
```

## 7. Visual Diagram (ASCII)

```
Destructuring Flow:

Object:
{ x: 1, y: 2 }

Syntax:
const { x, y } = obj;

Result:
x = 1, y = 2
```

## 8. Real-world Example

Angular component input extraction:
```typescript
const { userId, theme }: ComponentInputs = this.inputs;
```

## 9. Angular Use Case

Extracting configuration/data from services/components.

## 10. Common Mistakes

❌ Default value misplacement
❌ Deeply nested destructuring fragility

## 11. Edge Cases

1. **Missing keys → undefined**
   ```javascript
   const { missing } = { present: true }; // undefined
   ```

2. **Defaults**
   ```javascript
   const { a = 1 } = { a: undefined }; // 1
   ```

3. **Computed keys**
   ```javascript
   const { [dynamicKey]: value } = obj;
   ```

## 12. Performance Considerations

Negligible overhead.

## 13. Time & Space Complexity

O(k) where k = destructured count.

## 14. Interview Questions

1. Extract nested object fields?
2. Swap variables with destructuring?
3. Rename while destructuring?

## 15. Follow-up Questions

- "Can you destructure Map entries?"

## 16. Production Best Practices

1. Limit nesting depth
2. Use defaults for optional fields
3. Prefer clear naming over cryptic shortcuts

## 17. Summary

Simplifies extracting values from complex structures.

## 18. Revision Notes

- Array → index match
- Object → key match
- Supports renaming/defaults
- Nested safe patterns

## 19. Practice Questions

1. Swap two variables.
2. Parse HTTP response headers.
3. Destructure deeply nested config.

## 20. References

- [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### Next File
**007 - Default Parameters.md**
