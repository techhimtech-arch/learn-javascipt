# Type Alias

## 1. Definition

A **Type Alias** gives a name to any valid TypeScript type including primitives, unions, tuples, and complex combinations — unlike interfaces which only describe object shapes.

## 2. Why do we need it?

Flexibility to alias ANY type – not just objects. Useful for complex unions, computed types, mapped types.

## 3. Internal Working

Creates a symbolic name pointing to a specific type definition — used purely for developer convenience; removed at compile time.

## 4. Step-by-Step Execution

Example:
```typescript
type ID = string | number;

function logId(id: ID) {
  console.log(id);
}

logId("abc");
logId(123);
```

Steps:
1. Define union alias `ID`
2. Usage substitutes the actual union type
3. Checked normally by compiler

## 5. Syntax

```typescript
type AliasName = ExistingType;
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
type Username = string;
type Age = number;
```

### Medium
```typescript
type Status = "active" | "inactive" | "pending";
type Handler<T> = (value: T) => void;
```

### Advanced
```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

## 7. Visual Diagram (ASCII)

```
Type Alias Expansion

type ID = string | number;

function getId(): ID
↓
Expands To:
function getId(): string | number
```

## 8. Real-world Example

Angular form control wrapper:
```typescript
type FormControlValue<T> = T extends string ? string : T | null;
```

## 9. Angular Use Case

Generic service base classes, typed observables, form models.

## 10. Common Mistakes

❌ Confusing with interface (limited to object types)  
❌ Recomputing expensive aliases repeatedly

## 11. Edge Cases

1. **Unions vs intersections**
   ```typescript
   type A = { id: number };
   type B = { id: string };
   type AB = A & B; // impossible => never
   ```

2. **Recursive aliases**
   ```typescript
   type LinkedList<T> = { value: T; next?: LinkedList<T> };
   ```

## 12. Performance Considerations

No runtime cost.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Type alias vs interface differences?
2. When to choose one over the other?
3. Intersection/unions in aliases?

## 15. Follow-up Questions

- "Can you extend multiple types with alias?"

## 16. Production Best Practices

1. Prefer type alias for primitives/unions/tuples
2. Favor interface for public-facing shapes
3. Leverage utility types (Partial, Pick, Omit)

## 17. Summary

Versatile typing tool supporting all TypeScript constructs.

## 18. Revision Notes

- Any type can be aliased
- Supports recursion
- Useful for generics/mapped types
- Compile-time only

## 19. Practice Questions

1. Define recursive tree structure.
2. Build conditional wrapper type.
3. Alias complex nested shape.

## 20. References

- [TypeScript: Type Aliases](https://www.typescriptlang.org/docs/handbook/type-aliases.html)

### Next File
**005 - Enums.md**
