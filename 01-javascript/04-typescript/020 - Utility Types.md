# Utility Types

## 1. Definition

TypeScript **Utility Types** transform existing types into new ones — enabling composition and reuse without manual re-declaration.

## 2. Why do we need it?

Reduce duplication, derive precise types from domain models, prevent drift between source and derived types.

## 3. Internal Working

Mapped/distributed operations:
1. `Partial<T>` makes all props optional
2. `Pick<T, K>` selects subset of keys
3. `Omit<T, K>` excludes keys from T
4. `Record<K, T>` constructs object with key-value mapping

## 4. Step-by-Step Execution

Example:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

type PartialUser = Partial<User>; // All fields optional
type UserUpdate = Pick<User, 'name' | 'email'>; // Subset
type PublicUser = Omit<User, 'id'>; // Exclude sensitive field
```

## 5. Syntax

```typescript
Partial<T>, Required<T>, Readonly<T>, Record<K,T>,
Pick<T,K>, Omit<T,K>, Exclude<T,U>, Extract<T,U>,
NonNullable<T>, ReturnType<T>, InstanceType<T>
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

const updates: Partial<Product> = { name: 'Updated' };
```

### Medium
```typescript
// API response transformation
interface User {
  id: number;
  email: string;
  internalNotes: string;
}

type SafeUser = Omit<User, 'internalNotes'>;
type UserForm = Pick<User, 'email'> & { confirmEmail: string };
```

### Advanced
```typescript
// Complex type derivation
type Nullable<T> = { [K in keyof T]: T[K] | null };
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
};

type ApiResponse<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

type ApiData<T> = Extract<ApiResponse<T>, { status: 'success' }>['data'];
```

## 7. Visual Diagram (ASCII)

```
Utility Type Transformation Examples

User ──► Partial ──► { id?: number, name?: string }
User ──► Pick ────► { email: string }
User ──► Omit ────► { name: string, role: 'admin'|'user' }
```

## 8. Real-world Example

API request/response type derivation using Pick/Omit.

## 9. Angular Use Case

HttpClient response typing, form control mappings, component prop derivation.

## 10. Common Mistakes

❌ Deep vs shallow partial confusion
❌ Misunderstanding distributive behavior

## 11. Edge Cases

1. **Distributive conditionals**
   ```typescript
   type ToArray<T> = T extends any ? T[] : never;
   ```

2. **Key remapping in mapped types**
3. **Inference with Extract/Exclude**

## 12. Performance Considerations

Compile-time only — zero runtime cost.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Most used utility types?
2. How to make nested properties optional?
3. Difference Pick vs Omit?

## 15. Follow-up Questions

- "Create custom utility type?"

## 16. Production Best Practices

1. Leverage built-ins before writing manual types
2. Combine utilities for precise derivations
3. Document complex type compositions
4. Use type aliases for readability

## 17. Summary

Utility types enable powerful declarative type transformations.

## 18. Revision Notes

- Partial/Required/Readonly for mutability flags
- Pick/Omit for property subsets
- Record for key-value maps
- Extract/Exclude for union manipulation

## 19. Practice Questions

1. Make all props optional except one.
2. Derive DTO from entity model.
3. Implement deep partial type.

## 20. References

- [TypeScript: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Next File
**021 - Modules.md** (continuing... already exists)
