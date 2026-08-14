# Object Flatten

## 1. Definition

**Object Flatten** converts a nested object structure into a flat key-value map using dot/bracket notation for paths.

## 2. Why do we need it?

Simplify nested data access, serialize complex objects for storage/forms, implement generic form handlers.

## 3. Internal Working

Recursively traverse object properties:
1. For each key-value pair
2. If value is object → recurse with extended key path
3. If value is primitive → assign to result at full path
4. Support arrays via `[index]` notation typically

## 4. Step-by-Step Execution

Implementation:
```javascript
function flatten(obj, prefix = "", result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      flatten(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}
```

Example:
```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'Wonderland',
    coords: { lat: 123, lng: 456 }
  }
};

flatten(user);
// {
//   "name": "Alice",
//   "address.city": "Wonderland",
//   "address.coords.lat": 123,
//   "address.coords.lng": 456
// }
```

## 5. Syntax

```javascript
flatten({a: {b: {c: 1}}});
// { "a.b.c": 1 }
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const obj = { a: 1, b: { c: 2 } };
flatten(obj); // { 'a': 1, 'b.c': 2 }
```

### Medium
```javascript
// Flatten with array indices
function flattenWithArray(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenWithArray(value, newKey, result);
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        result[`${newKey}[${i}]`] = item;
      });
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}
```

### Advanced
```typescript
// Generic typed flattener
type Path<T> = T extends object
  ? { [K in keyof T]: K extends string 
      ? T[K] extends object 
        ? `${K}.${Path<T[K]>}` 
        : K
      : never
    }[keyof T]
  : never;

type Flattened<T> = { [K in Path<T>]: any };

function deepFlatten<T extends Record<string, any>>(obj: T): Flattened<T> {
  const result: Record<string, any> = {};
  
  (function recurse(current: any, path: string[] = []) {
    for (const [key, value] of Object.entries(current)) {
      if (
        value && 
        typeof value === 'object' && 
        !Array.isArray(value) &&
        Object.keys(value).length > 0
      ) {
        recurse(value, [...path, key]);
      } else {
        result[[...path, key].join('.')] = value;
      }
    }
  })(obj);
  
  return result as Flattened<T>;
}

const nested = { user: { profile: { name: "Bob", age: 30 } } };
const flat = deepFlatten(nested);
// { 'user.profile.name': 'Bob', 'user.profile.age': 30 }
```

## 7. Visual Diagram (ASCII)

```
Flattening Process

Before: { a: { b: 1, c: { d: 2 } } }
              │     │        │
              │     │        └── "a.c.d"
              │     └────────── "a.b"
              └──────────────── "a"

After:  { "a.b": 1, "a.c.d": 2 }
```

## 8. Real-world Example

Angular form serialization for API submission.

## 9. Angular Use Case

Converting nested form models to flat payloads, form control path mapping.

## 10. Common Mistakes

❌ Not handling circular references
❌ Losing array index information

## 11. Edge Cases

1. **Null values**
   ```javascript
   { a: null } → { "a": null }
   ```

2. **Empty objects**
3. **Dates treated as objects**
   ```javascript
   { date: new Date() } → Should remain unflattened
   ```

## 12. Performance Considerations

Large/deep objects require deep recursion — watch stack overflow.

## 13. Time & Space Complexity

Time: O(n) where n = total leaf properties
Space: O(d) recursion depth + O(n) output

## 14. Interview Questions

1. Implement flatten/unflatten pair
2. Handle arrays vs objects differently
3. Avoid stack overflow for deep nesting

## 15. Follow-up Questions

- "How to reverse this operation?"

## 16. Production Best Practices

1. Validate input type early
2. Use iterative instead of recursive for safety
3. Handle special object types (Date, RegExp)
4. Add cycle detection

## 17. Summary

Flattening bridges hierarchical and flat data representations — handy for serialization and form handling.

## 18. Revision Notes

- Dot notation for paths
- Recursive traversal
- Handle arrays/special types
- Watch stack depth

## 19. Practice Questions

1. Implement basic deep flatten.
2. Support arrays with bracket notation.
3. Add circular reference detection.

## 20. References

- [MDN: Object Traversal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)

### Next File
**020 - Deep Equal.md**
