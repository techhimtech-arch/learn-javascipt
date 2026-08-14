# Utility Types

## 1. Definition

TypeScript ships with built-in helper types like `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, and `NonNullable`.

## 2. Why do we need it?

Simplify transforming existing types without rewriting manual definitions.

## 3. Internal Working

Compiler applies predefined type transformations based on input — all resolved during compile-time.

## 4. Step-by-Step Execution

Example:
```typescript
type User = {
  id: number;
  name: string;
  email?: string;
};

type EditableUser = Partial<User>; // all props optional
type Identified = Pick<User, "id">; // only id
type SafeUser = Omit<User, "id">; // id removed
```

Steps:
1. Compiler resolves `Partial<T>`
2. Transforms each property to optional
3. Maintains underlying type info

## 5. Syntax

```typescript
type Partial<T>
type Required<T>
type Pick<T, K extends keyof T>
type Omit<T, K extends keyof any>
type Readonly<T>
type Record<K extends keyof any, T>
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
type Point = { x: number; y: number };
type OptionalPoint = Partial<Point>;
// { x?: number; y?: number }
```

### Medium
```typescript
type Status = "active" | "inactive" | "banned";
type AdminStatus = Exclude<Status, "banned">; // active | inactive
```

### Advanced
```typescript
type AsyncAction<T> = T extends (...args: infer A) => Promise<infer R>
  ? (...args: A) => R
  : never;
```

## 7. Visual Diagram (ASCII)

```
Utility Type Mapping

Input:
interface User { id: number; name: string; }

Apply:
type P = Partial<User>;

Output:
{ id?: number; name?: string }
```

## 8. Real-world Example

Angular form controls with partial updates:
```typescript
type FormUpdate = Partial<MyFormModel>;
```

## 9. Angular Use Case

Typing component inputs/outputs, model transformations, HTTP response mapping.

## 10. Common Mistakes

❌ Misunderstanding `Omit` vs `Pick`  
❌ Forgetting that utility types return new types

## 11. Edge Cases

1. **Readonly arrays**
   ```typescript
   type ROArr = ReadonlyArray<number>;
   ```

2. **Extract filtering**
   ```typescript
   type NumbersOnly = Extract<"a" | 1 | "b", number>; // 1
   ```

3. **ReturnType inference**
   ```typescript
   type T = ReturnType<() => string>; // string
   ```

## 12. Performance Considerations

No runtime cost – compile only.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Explain Partial/Required/Readonly
2. Pick vs Omit differences?
3. When to use Record utility?

## 15. Follow-up Questions

- "How does ReturnType work?"

## 16. Production Best Practices

1. Combine utilities for DRY code
2. Create custom utility aliases if needed
3. Prefer built-ins over reinventing

## 17. Summary

Built-in helpers for transforming types concisely.

## 18. Revision Notes

- Partial → optional all
- Required → required all
- Pick/Omit → select/deselect
- Record → map keys to values

## 19. Practice Questions

1. Derive editable form model.
2. Extract subset of interface.
3. Create async version of sync function type.

## 20. References

- [TypeScript: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Next File
**009 - Mapped Types.md**
