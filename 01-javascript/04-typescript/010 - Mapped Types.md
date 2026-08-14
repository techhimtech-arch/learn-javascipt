# Mapped Types

## 1. Definition

**Mapped types** produce new types by iterating over keys of an existing type — transforming each property according to a rule.

## 2. Why do we need it?

Dynamically modify property modifiers (optional/readonly), reshape entire interfaces programmatically.

## 3. Internal Working

Syntax `{ [P in keyof T]?: ... }` generates new type mapping each key — enabling powerful type-level transformations.

## 4. Step-by-Step Execution

Example:
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type User = { name: string; age: number };
type ROUser = Readonly<User>; // both fields readonly
```

## 5. Syntax

```typescript
{
  [Property in keyof Type]: Transformation
}

// Variants:
readonly [P in keyof T]: T[P]
[P in keyof T]?: T[P]
+readonly [P in keyof T]: T[P]
-modify [P in keyof T]: T[P]
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
type Optional<T> = { [K in keyof T]?: T[K] };
```

### Medium
```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
```

### Advanced
```typescript
type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};
```

## 7. Visual Diagram (ASCII)

```
Mapped Type Expansion

type T = { a: number; b: string }

mapped:
{ [K in keyof T]?: T[K] }

result:
{
  a?: number
  b?: string
}
```

## 8. Real-world Example

Angular form model generation from schema:
```typescript
type FormModel<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
```

## 9. Angular Use Case

Reactive form typing, wrapper component props derivation.

## 10. Common Mistakes

❌ Not preserving original structure  
❌ Missing index signatures in transformations

## 11. Edge Cases

1. **Key remapping**
   ```typescript
   type Events<T> = { [K in keyof T as `on${Capitalize<K>}`]: T[K] };
   ```

2. **Infer inside mapped types**
   ```typescript
   {[K in keyof T]: T[K] extends Promise<infer U> ? U : T[K]}
   ```

3. **Recursive mapped types**
   ```typescript
   type DeepPartial<T> = {
     [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
   };
   ```

## 12. Performance Considerations

Can increase compilation time if overly complex.

## 13. Time & Space Complexity

Compile-time computation – no runtime cost.

## 14. Interview Questions

1. Create optional version of interface?
2. Add readonly to nested object?
3. Key remapping capabilities?

## 15. Follow-up Questions

- "How deep can recursive mapped types go?"
- "Does it preserve index signatures?"

## 16. Production Best Practices

1. Keep mappings readable with comments
2. Limit recursion depth in generic utilities
3. Reuse known utility types where applicable

## 17. Summary

Dynamic type transformation engine powered by generics and iteration.

## 18. Revision Notes

- `[K in keyof T]` core syntax
- Supports `?`, `+`, `-` modifiers
- Infer usable in body
- Recursive types possible

## 19. Practice Questions

1. Build deep readonly mapper.
2. Convert interface to event handlers.
3. Strip out nested private fields.

## 20. References

- [TypeScript: Mapped Types](https://www.typescriptlang.org/docs/handbook/mapped-types.html)

### Next File
**010 - Conditional Types.md**
