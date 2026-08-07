# TypeScript Modules

## 1. Definition

TypeScript follows standard ES module syntax for organizing code into separate files and namespaces — supporting both **named** and **default exports**.

## 2. Why do we need it?

Organize large codebases logically, enable tree-shaking, and support modular development patterns.

## 3. Internal Working

TypeScript adds type-aware compilation over native JavaScript modules:
1. Files compiled to `.js`
2. Imports resolved statically
3. Types stripped out
4. Bundlers (Webpack/Rollup) perform tree-shaking

## 4. Step-by-Step Execution

Example:
```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// main.ts
import { add } from './math';
console.log(add(2, 3));
```

Steps:
1. TypeScript compiles `math.ts`
2. Exports flagged for external use
3. `main.ts` imports symbol
4. Bundler links both correctly during build

## 5. Syntax

```typescript
// Named export
export const PI = 3.14;
export function greet() {}

// Default export
export default class Component {}

// Re-export
export { PI, greet } from './constants';
export * from './utils';
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// utils.ts
export function formatDate(date: Date): string {
  return date.toISOString();
}
```

### Medium
```typescript
// models/user.ts
export interface User { id: number; name: string };
export const defaultUser: User = { id: 1, name: "Guest" };
```

### Advanced
```typescript
// barrel/index.ts
export * from './models/user';
export * from './services/api';
export * from './components/index';
```

## 7. Visual Diagram (ASCII)

```
Module Resolution Chain

Importer ──► Resolver ──► File System
                        ├── ./local-file.ts
                        ├── ./utils/index.ts
                        └── ../../lib/module.ts
                              │
                              ▼
                        Module Exports
```

## 8. Real-world Example

Angular project structure:
```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       └── api.service.ts → export class ApiService
│   ├── shared/
│   │   └── pipes/
│   │       └── date.pipe.ts → export class DatePipe
│   └── app.module.ts → imports ApiService, DatePipe
```

## 9. Angular Use Case

Organizing feature modules, core/shared injectables, component libraries.

## 10. Common Mistakes

❌ Circular imports between modules  
❌ Missing barrel files  
❌ Incorrect relative paths  

## 11. Edge Cases

1. **Circular Dependencies**
   ```typescript
   // a.ts imports B
   // b.ts imports A ← careful with init order
   ```

2. **Global augmentation**
   ```typescript
   declare global {
     interface Window { myVar: string }
   }
   ```

3. **Ambient modules**
   ```typescript
   declare module '*.svg' {
     const content: string;
     export default content;
   }
   ```

## 12. Performance Considerations

Use barrel files (`index.ts`) to simplify import paths — but avoid re-exporting too much at once.

## 13. Time & Space Complexity

N/A – design-time construct.

## 14. Interview Questions

1. Difference between relative/absolute imports?
2. How to avoid circular imports?
3. Purpose of barrel/index files?

## 15. Follow-up Questions

- "How does Angular resolve module paths?"
- "What is path mapping in tsconfig?"

## 16. Production Best Practices

1. Use consistent naming (e.g., `.module.ts`)
2. Separate public/private members clearly
3. Group logically related exports
4. Enable strict module resolution

## 17. Summary

Modules organize code into cohesive units — essential for scaling TypeScript projects.

## 18. Revision Notes

- import/export based on ES6
- Relative/absolute resolution
- Barrel files simplify
- Watch for cycles

## 19. Practice Questions

1. Refactor nested imports with barrel.
2. Fix circular dependency issue.
3. Create reusable UI component module.

## 20. References

- [TypeScript: Modules](https://www.typescriptlang.org/docs/handbook/modules.html)

### Next File
**015 - Namespaces.md**
