# Generics

## 1. Definition

**Generics** enable writing reusable components that work with multiple types while preserving type information — allowing consumers to specify concrete types at instantiation.

## 2. Why do we need it?

Avoid duplicating logic for different data shapes. Enable compile-time type verification even when abstracted.

## 3. Internal Working

Type parameters are placeholder variables resolved by consumer at call-site — compiler substitutes real types during type-checking phase.

## 4. Step-by-Step Execution

Example:
```typescript
function identity<T>(arg: T): T {
  return arg;
}

identity<string>("hello"); // T = string
identity<number>(42);      // T = number
```

Steps:
1. Function parsed with `<T>` generic placeholder
2. Caller specifies concrete type argument
3. Substitution applied throughout body/types
4. Validated accordingly

## 5. Syntax

```typescript
function fn<T>(param: T): T { ... }
class Collection<T> { ... }
interface Box<T> { value: T; }
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse();
}
reverseArray([1,2,3]); // number[]
reverseArray(["a","b"]); // string[]
```

### Medium
```typescript
interface Repository<T> {
  findById(id: number): T | undefined;
  save(entity: T): void;
}
class InMemoryRepo<T> implements Repository<T> { /* impl */ }
```

### Advanced
```typescript
type ApiResponse<T extends object> = {
  data: T;
  meta: { count: number };
  links?: Record<string, string>;
};
```

## 7. Visual Diagram (ASCII)

```
Generic Type Resolution

Caller:
identity<string>("hello")

Compiler Substitutes:
T → string

Becomes:
identity("hello"): string
```

## 8. Real-world Example

Angular HttpClient typed requests:
```typescript
http.get<User[]>('/api/users').subscribe(users => { ... });
```

## 9. Angular Use Case

Typed services/repositories, form control wrappers, directive generics.

## 10. Common Mistakes

❌ Over-constraining generic bounds  
❌ Forgetting to constrain where necessary

## 11. Edge Cases

1. **Default generics**
   ```typescript
   interface ApiOptions<T = string> { ... }
   ```

2. **Generic constraints**
   ```typescript
   function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
   ```

3. **Infer from generic usage**
   ```typescript
   async function unwrap<T>(p: Promise<T>): Promise<T> {
     return await p;
   }
   ```

## 12. Performance Considerations

No runtime cost.

## 13. Time & Space Complexity

N/A – compile-time only.

## 14. Interview Questions

1. What problem do generics solve?
2. Generic vs `any`?
3. Constraints with `extends`?

## 15. Follow-up Questions

- "How do you constrain to specific keys?"
- "What’s conditional type inference?"

## 16. Production Best Practices

1. Constrain generics tightly (`extends`)
2. Provide sensible defaults
3. Test generic edge cases

## 17. Summary

Enables flexible yet strongly-typed reusable abstractions.

## 18. Revision Notes

- Parameterized types
- Substituted at instantiation
- Constrained with extends
- No runtime footprint

## 19. Practice Questions

1. Generic cache implementation.
2. Typed array processor.
3. Constrained key-value getter.

## 20. References

- [TypeScript: Generics](https://www.typescriptlang.org/docs/handbook/generics.html)

### Next File
**007 - Union and Intersection Types.md**
