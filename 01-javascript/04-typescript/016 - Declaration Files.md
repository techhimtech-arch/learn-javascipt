# Declaration Files

## 1. Definition

TypeScript **declaration files** (`.d.ts`) describe types of existing JavaScript libraries — bridging the gap between TS and untyped code.

## 2. Why do we need it?

Allow type-checking and autocompletion when consuming third-party JS modules without native TS definitions.

## 3. Internal Working

Compiler loads `.d.ts` files alongside regular source code — type definitions only exist at compile-time.

## 4. Step-by-Step Execution

Example:
```typescript
// math-lib.d.ts
declare module 'math-lib' {
  export function add(a: number, b: number): number;
}
```

Steps:
1. Declare module name matching package
2. Define exported symbols with types
3. Imported normally in project code
4. Type-checked but erased at runtime

## 5. Syntax

```typescript
declare module 'name' {
  export function fn(param: Type): ReturnType;
}

declare global {
  interface Window { myFunc(): void }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// globals.d.ts
interface Window {
  myCustomProp: string;
}
```

### Medium
```typescript
// third-party.d.ts
declare module 'legacy-callback-lib' {
  export function fetchData(url: string, callback: (err: Error | null, data?: any) => void): void;
}
```

### Advanced
```typescript
// react-component.d.ts
declare module 'react-component-lib' {
  import { ComponentType } from 'react';
  export const MyComponent: ComponentType<{ label: string }>;
}
```

## 7. Visual Diagram (ASCII)

```
Declaration File Integration

┌──────────────┐
│ main.ts      │ ← imports module
└─────┬────────┘
      ▼
┌──────────────┐
│ math-lib.d.ts│ ← provides types
└─────┬────────┘
      ▼
┌──────────────┐
│ math-lib.js  │ ← actual runtime
└──────────────┘
```

## 8. Real-world Example

Angular Material ships `.d.ts` alongside `.js` for seamless consumption.

## 9. Angular Use Case

Typing third-party JS libraries, augmenting global types, module augmentation.

## 10. Common Mistakes

❌ Incorrect module names  
❌ Over-declaration leading to conflicts

## 11. Edge Cases

1. **Module augmentation**
   ```typescript
   declare module './existing' {
     export function newFn(): void;
   }
   ```

2. **Globals vs modules**
3. **Triple-slash directives**

## 12. Performance Considerations

None – purely compile-time.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Purpose of `.d.ts` files?
2. Difference from regular `.ts`?
3. How to generate automatically?

## 15. Follow-up Questions

- "How does DefinitelyTyped work?"

## 16. Production Best Practices

1. Place custom declarations in `src/typings`
2. Prefer official `@types/*` packages
3. Keep minimal, accurate declarations

## 17. Summary

Bridges JS ecosystem into typed world — crucial for library interoperability.

## 18. Revision Notes

- .d.ts extension
- erased at runtime
- declare keyword used
- Often auto-generated or via @types/*

## 19. Practice Questions

1. Type untyped JS function.
2. Augment existing module.
3. Create ambient global declaration.

## 20. References

- [TypeScript: Declarations](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

### Next File
**017 - Namespaces.md**
