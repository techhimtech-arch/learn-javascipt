# TypeScript Utility Types Guide

## 1. Definition

**TypeScript Utility Types** provide built-in helpers for transforming and creating new types.

## 2. Why do we need it?

Avoid repeating type definitions, enable type composition patterns.

## 3. Internal Working

Common utilities:
- `Partial<T>`: All properties optional
- `Required<T>`: All properties required
- `Readonly<T>`: All properties readonly
- `Pick<T,K>`: Select subset of keys
- `Omit<T,K>`: Exclude keys
- `Record<K,T>`: Map keys to type T
- `Exclude<T,U>`: Exclude union members
- `Extract<T,U>`: Extract common members
- `NonNullable<T>`: Remove null/undefined

## 4. Syntax

```typescript
// Make all optional
partial: Partial<User> = { name: 'Alice' };

// Pick specific props
nameOnly: Pick<User, 'name'> = { name: 'Alice' };

// Omit certain props
noId: Omit<User, 'id'> = { name: 'Alice', email: 'a@b.com' };

// Record mapping
const options: Record<string, boolean> = {
  darkMode: true,
  notifications: false
};
```

## 5. Interview Questions

1. Use Partial in function params?
2. Pick vs Omit differences?
3. Record utility purpose?

## 6. Summary

Utility types transform existing types elegantly.

## 7. References

- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---
