# TypeScript Generics

## 1. Definition

**TypeScript Generics** enable creating reusable, type-safe components that work with multiple types.

## 2. Why do we need it?

Avoid type duplication while maintaining compile-time type safety.

## 3. Internal Working

Type substitution:
1. Generic type parameter declared: `<T>`
2. Used within function/class signature
3. Type inferred or explicitly provided at call site
4. Type relationships preserved across transformations

## 4. Syntax

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const output = identity<string>('hello');
const inferred = identity(42); // T inferred as number

// Generic interface
interface GenericArray<T> {
  [index: number]: T;
}

// Generic class
class GenericNumber<T> {
  zeroValue!: T;
  add?: (x: T, y: T) => T;
}
```

## 5. Examples

### Easy
```typescript
function wrapInArray<T>(value: T): T[] {
  return [value];
}
const arr = wrapInArray(42); // number[]
```

### Advanced
```typescript
// Generic constraints
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

// Conditional generic
type ApiResponse<T> = T extends string 
  ? { status: 'ok'; data: T } 
  : { status: 'error'; code: number };
```

## 6. Interview Questions

1. Generic type inference?
2. Constraining generics?
3. Generic utility types?

## 7. Summary

Generics enable flexible yet safe type abstractions.

## 8. References

- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

---
