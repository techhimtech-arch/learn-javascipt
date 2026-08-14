# TypeScript Advanced Types

## 1. Definition

**Advanced TypeScript Types** include conditional, mapped, inference, and template literal types enabling type-safe abstractions.

## 2. Why do we need it?

Build type-safe APIs, derive complex types dynamically, catch errors at compile time.

## 3. Internal Working

Type constructs:
- **Conditional Types**: Type logic T extends U ? X : Y
- **Mapped Types**: Transform type keys { [K in keyof T]: ... }
- **Infer**: Extract types within conditional
- **Template Literal Types**: String type patterns
- **Keyof**: Union of object keys

## 4. Step-by-Step Execution

```typescript
// Conditional type
type IsString<T> = T extends string ? 'yes' : 'no';
type Test1 = IsString<string>; // 'yes'
type Test2 = IsString<number>; // 'no'

// Mapped type
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Infer within conditional
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Num = ReturnType<() => number>; // number

// Template literal types
type HexColor = `#${string}`;
type EventName<T extends string> = `on${Capitalize<T>}`;
```

## 5. Syntax

```typescript
// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ExtractString<T> = T extends string ? T : never;

// Mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

// Keyof
type PointKeys = keyof { x: number; y: number }; // 'x' | 'y'

// Template literals
type Status = 'success' | 'error' | 'warning';
type StatusMessage = `${Status}_message`; // 'success_message' | 'error_message' | 'warning_message'
```

## 6. Examples

### Easy
```typescript
// Basic utility types
type OptionalUser = Partial<User>; 
// All User fields become optional

type ReadonlyConfig = Readonly<Config>;
// Can't modify properties
```

### Medium
```typescript
// Extract function parameters
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never;
// Usage: FunctionParams<(name: string, age: number) => void> → [string, number]
```

### Advanced
```typescript
// Deep partial utility
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// String manipulation
type SnakeCase<S extends string> = S extends `${infer T}${infer Rest}`
  ? Rest extends `${T}${string}`
    ? `${Lowercase<T>}_${SnakeCase<Rest>}`
    : S
  : S;
```

## 7. Interview Questions

1. Conditional type use cases?
2. Infer keyword applications?
3. Template literal type creation?

## 8. Summary

Advanced TypeScript types enable powerful compile-time abstractions improving type safety.

## 9. References

- [Advanced Types Guide](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

---
