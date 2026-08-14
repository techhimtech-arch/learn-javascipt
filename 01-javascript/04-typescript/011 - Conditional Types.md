# Conditional Types

## 1. Definition

**Conditional types** allow expressing type relationships through conditional logic at the type level — `T extends U ? X : Y`.

## 2. Why do we need it?

Enable powerful abstractions like type inference, filtering, and dynamic shape derivation.

## 3. Internal Working

Compiler evaluates condition during type-checking; selects branch based on compatibility.

Supports:
- Distributive behavior with union types
- Inference via `infer` keyword

## 4. Step-by-Step Execution

Example:
```typescript
type IsString<T> = T extends string ? "yes" : "no";
type Test1 = IsString<string>; // "yes"
type Test2 = IsString<number>; // "no"
```

## 5. Syntax

```typescript
T extends U ? X : Y
```

With inference:
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
type ToArray<T> = T extends any[] ? T : T[];
type Result = ToArray<string | number>; // (string | number)[]
```

### Medium
```typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Data = UnwrapPromise<Promise<number>>; // number
```

### Advanced
```typescript
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];
```

## 7. Visual Diagram (ASCII)

```
Conditional Type Evaluation

T extends U?
   ├── TRUE → choose X
   └── FALSE → choose Y

With Union Distribution:
(A | B) extends U ? X : Y
→ A extends U ? X : Y | B extends U ? X : Y
```

## 8. Real-world Example

Inferring service method signatures:
```typescript
type AsyncMethods<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => R
    : T[K];
};
```

## 9. Angular Use Case

Typing reactive forms dynamically, deriving safe wrappers from interfaces.

## 10. Common Mistakes

❌ Unexpected distributive behavior  
❌ Recursive circular types causing stack overflow

## 11. Edge Cases

1. **Distributive behavior**
   ```typescript
   type ToArray<T> = T extends any[] ? T : T[];
   ToArray<string | number>;
   // (string | number)[]
   ```

2. **Naked vs wrapped types**
   ```typescript
   type Wrapped<T> = [T] extends [any[]] ? T : T[];
   ```

3. **Inference with rest tuples**
   ```typescript
   type Parameters<T> = T extends (...args: infer P) => any ? P : never;
   ```

## 12. Performance Considerations

Complex conditions slow down type-checker.

## 13. Time & Space Complexity

Varies – can be expensive with deep nesting.

## 14. Interview Questions

1. How to prevent distribution in conditional?
2. Use `infer` for extracting function types?
3. When recursive conditional types problematic?

## 15. Follow-up Questions

- "How do you extract return type manually?"

## 16. Production Best Practices

1. Annotate inferred types where needed
2. Avoid overly deep chains
3. Test with various input combinations

## 17. Summary

Advanced typing capability enabling meta-programming at type level.

## 18. Revision Notes

- Distributive if naked generic
- infer captures sub-types
- Supports tuple/rest inference
- Watch recursion limits

## 19. Practice Questions

1. Filter types from union.
2. Extract function parameter list.
3. Flip promise-returning fn to sync type.

## 20. References

- [TypeScript: Conditional Types](https://www.typescriptlang.org/docs/handbook/conditional-types.html)

### Next File
**011 - Decorators.md**
