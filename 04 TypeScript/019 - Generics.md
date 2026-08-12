# Generics

## 1. Definition

**Generics** in TypeScript allow creating components that work with multiple types while preserving type safety — enabling reusable, flexible code.

## 2. Why do we need it?

Write generic algorithms/data structures that operate on various types without sacrificing type checking.

## 3. Internal Working

1. Define type parameter `<T>` in function/class/interface
2. Return type expressed in terms of parameter
3. Compiler infers actual types at call sites
4. No runtime overhead — erased during compilation

## 4. Step-by-Step Execution

Example:
```typescript
function identity<T>(value: T): T {
  return value;
}

const result = identity<string>('hello');
// result typed specifically as string
```

Steps:
1. Declare generic function with `<T>` placeholder
2. Use `T` in parameters and return type
3. Call with explicit type or let compiler infer
4. Receive type-checked result

## 5. Syntax

```typescript
// Function generics
function genericIdentity<T>(value: T): T { return value; }

// Class generics
class GenericCollection<T> {
  private items: T[] = [];
  add(item: T): void { this.items.push(item); }
  getAll(): T[] { return this.items; }
}

// Interface generics
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
function wrapInArray<T>(value: T): T[] {
  return [value];
}
```

### Medium
```typescript
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
}
```

### Advanced
```typescript
// Generic constraints
interface LengthWise {
  length: number;
}

function logLength<T extends LengthWise>(value: T): number {
  return value.length;
}

// Conditional generics
type TypeName<T> = T extends string ? 'string' :
                   T extends number ? 'number' :
                   T extends boolean ? 'boolean' : 'other';

// Utility types using generics
type Partial<T> = { [P in keyof T]?: T[P] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
```

## 7. Visual Diagram (ASCII)

```
Generic Resolution

Call Site
┌────────────────────┐
│ identity<string>(x)│
└──────────┬─────────┘
           ▼
  Compiler Type Inference
           ▼
┌────────────────────┐
│   T = string       │
└────────────────────┘
           ▼
 Function returns string
```

## 8. Real-world Example

Angular HttpClient.get<T>() returning strongly-typed API responses.

## 9. Angular Use Case

Http interceptor typing, generic component inputs, service abstractions.

## 10. Common Mistakes

❌ Over-constraining generic parameters
❌ Forgetting explicit types where inference fails

## 11. Edge Cases

1. **Default generic parameters**
   ```typescript
   interface ApiResponse<T = User> {
     data: T;
     error?: string;
   }
   ```

2. **Generic utility types**
3. **Generic conditional inference**

## 12. Performance Considerations

Zero runtime cost — fully erased at compile time.

## 13. Time & Space Complexity

N/A (compile-time feature).

## 14. Interview Questions

1. Generic constraints syntax?
2. keyof operator with generics?
3. Default generic parameters?

## 15. Follow-up Questions

- "How to type React props with generics?"

## 16. Production Best Practices

1. Use constraints judiciously
2. Prefer explicit types when inference is unclear
3. Document generic contracts clearly
4. Leverage utility types

## 17. Summary

Generics deliver compile-time flexibility without runtime penalties.

## 18. Revision Notes

- `<T>` declares type parameter
- Constraints via `extends`
- Default values supported
- Erased at compile time

## 19. Practice Questions

1. Build generic array utility class.
2. Implement type-safe event emitter.
3. Create constrained identity function.

## 20. References

- [TypeScript: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### Module 4 (TypeScript) Complete! ✅
