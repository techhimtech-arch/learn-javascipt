# Interfaces

## 1. Definition

An **Interface** in TypeScript defines a contract for object shape — describing required/optional properties and methods without providing implementation.

## 2. Why do we need it?

- Ensure objects conform to expected structure
- Enable duck typing in TypeScript
- Create reusable contracts across modules

## 3. Internal Working

Compiler uses interface definitions during type-checking to validate that objects match required signatures.

Interfaces are erased at runtime — have zero effect on generated JS.

## 4. Step-by-Step Execution

Example:
```typescript
interface User {
  id: number;
  name: string;
}

function greet(user: User) {
  console.log(`Hi, ${user.name}`);
}

greet({ id: 1, name: "Alice" }); // Valid
greet({ id: 2 }); // Error: missing 'name'
```

Steps:
1. Interface declaration parsed
2. Argument checked against interface shape
3. Mismatch causes compile-time error

## 5. Syntax

```typescript
interface Name {
  propName: type;
  optional?: type;
  [index: number]: string; // index signature
  methodName(param: type): returnType;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
interface Product {
  id: number;
  title: string;
  price?: number; // optional
}
```

### Medium
```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
```

### Advanced
```typescript
interface Dictionary {
  [key: string]: string | number;
}
const userPrefs: Dictionary = {
  theme: "dark",
  timeout: 3000
};
```

## 7. Visual Diagram (ASCII)

```
Interface Validation

┌──────────────┐
│ Object Literal│
│ { id: 1,     │
│  name: "Bob"}│
└──────┬───────┘
       ▼
Match Against
┌──────────────┐
│ Interface    │
│ id: number;  │
│ name: string;│
└──────┬───────┘
       ▼
Valid → Proceed
Invalid → Compile Error
```

## 8. Real-world Example

Angular component input contract:
```typescript
interface UserCardInput {
  user: User;
  showAvatar?: boolean;
}
```

## 9. Angular Use Case

Define component @Input contracts, service method signatures, route configs.

## 10. Common Mistakes

❌ Forgetting to mark optional properties  
❌ Confusing structural compatibility with exact match

## 11. Edge Cases

1. **Excess property checking**
   ```typescript
   greet({ id: 1, name: "Alice", extra: true }); // Error on extra field
   ```

2. **Index signatures**
   ```typescript
   interface MyArr {
     [index: number]: string; // array-style indexing
   }
   ```

3. **Merging declarations**
   ```typescript
   interface User { name: string; }
   interface User { age: number; } // Auto-merged!
   ```

## 12. Performance Considerations

Compile-time only – no runtime impact.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Difference between interface and type alias?
2. Can interfaces extend classes?
3. What is declaration merging?

## 15. Follow-up Questions

- "Can you make all fields readonly in interface?"

## 16. Production Best Practices

1. Prefer `interface` for object/contract shapes
2. Use `readonly` for immutable props
3. Avoid excessive optional chaining inside interfaces

## 17. Summary

Contracts ensuring correctness across module boundaries.

## 18. Revision Notes

- Structural typing rule applies
- Supports extension/merging
- Index/excess property rules
- Compile-time only

## 19. Practice Questions

1. Define interface for API response.
2. Extend existing interface.
3. Merge duplicate interface declarations.

## 20. References

- [TypeScript: Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

### Next File
**004 - Type Alias.md**
