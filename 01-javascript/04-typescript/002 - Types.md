# Types in TypeScript

## 1. Definition

TypeScript extends JavaScript with a rich set of **built-in types** including primitives, compound types, and utility constructs.

Key built-ins:
- Primitives: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- Object types: `object`, `array`, `tuple`
- Special: `unknown`, `never`, `void`, `any`

## 2. Why do we need it?

To enforce correctness and documentation at design-time rather than discovery at runtime.

## 3. Internal Working

Type information exists only during compilation — erased before runtime execution.

Type-checker validates assignments and operations according to rules defined in `.ts`/`.d.ts` files.

## 4. Step-by-Step Execution

Example:
```typescript
let username: string = "Alice";
username = 42; // Compile time error
```

Steps:
1. Parser sees declaration with type annotation
2. Type checker compares assignment compatibility
3. Mismatch detected → compiler emits error

## 5. Syntax

```typescript
// Primitives
let isActive: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3];

// Tuples
let person: [string, number] = ["Bob", 30];

// Enums
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
const message: string = "Hello World";
const count: number = 100;
const flag: boolean = true;
```

### Medium
```typescript
function identity<T>(value: T): T {
  return value;
}
identity("hello"); // string
identity(42);      // number
```

### Advanced
```typescript
type ApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error?: string;
};

const response: ApiResponse<User[]> = {
  data: null,
  isLoading: true,
};
```

## 7. Visual Diagram (ASCII)

```
Type Checking Flow

Source Code (.ts)
    ↓
Parser + Type Checker
    ↓
Errors Reported Here
    ↓
JavaScript Output (.js)
```

## 8. Real-world Example

Angular HttpClient typed responses:
```typescript
http.get<User[]>('/api/users').subscribe(users => {
  // `users` is already known to be User array
});
```

## 9. Angular Use Case

Every input/output, service method returns typed values — reducing bugs significantly.

## 10. Common Mistakes

❌ Relying too much on `any` defeats purpose  
❌ Forgetting to install `@types/node` for Node APIs

## 11. Edge Cases

1. **Union types in arrays**
   ```typescript
   const mixed: (string | number)[] = ["a", 1];
   ```

2. **Tuple vs Array**
   ```typescript
   const t: [string, number] = ["x", 1]; // Fixed positions
   const a: Array<string | number> = ["x", 1]; // Any order
   ```

3. **Unknown type safety**
   ```typescript
   function safeParse(value: unknown): string {
     if (typeof value === "string") return value.toUpperCase();
     throw new Error("Expected string");
   }
   ```

## 12. Performance Considerations

No runtime performance impact.

## 13. Time & Space Complexity

N/A – compile-time only.

## 14. Interview Questions

1. What are primitive types?
2. Difference between `unknown` and `any`?
3. How do tuples differ from arrays?

## 15. Follow-up Questions

- "What’s `never` used for?"
- "Can a variable change types after declaration?"

## 16. Production Best Practices

1. Enable `noImplicitAny`
2. Prefer interfaces over `object`
3. Use `as const` for immutable literals

## 17. Summary

Rich type system improves correctness and developer ergonomics.

## 18. Revision Notes

- Primitives + objects
- Union, intersection types
- unknown/never/void differences
- Compile-time only

## 19. Practice Questions

1. Annotate function returning mixed array.
2. Use union types for status flags.
3. Convert JS object to typed interface.

## 20. References

- [TypeScript: Basic Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

### Next File
**003 - Interfaces.md**
