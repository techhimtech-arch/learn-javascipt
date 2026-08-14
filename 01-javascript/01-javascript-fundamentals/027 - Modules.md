# Modules

## 1. Definition

A **module** is a reusable piece of code contained in a separate file or unit — exporting and importing values to promote modularity and separation of concerns.

Modern JavaScript uses **native import/export** syntax (ESM — ECMAScript Modules), though prior versions relied heavily on **CommonJS** (`require/module.exports`).

## 2. Why do we need it?

Enable modular architecture, dependency management, bundling, tree-shaking, and improved maintainability in large applications like Angular projects.

## 3. Internal Working

Modules follow a strict **module system contract**:

- Each module runs in its own private scope
- Exports define what's available externally
- Imports pull in bindings
- Loaders/bundlers resolve dependencies

## 4. Step-by-Step Execution

Loading a module:
```javascript
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }

// app.js
import { PI, add } from './math.js';
console.log(add(2, 3)); // 5
```

Steps:
1. Parse module file
2. Execute top-level code once
3. Collect exports
4. Provide exports to importing modules

## 5. Syntax

```javascript
// Export named items
export const name = "Alice";
export function greet() {}

// Export default
export default class Widget {}

// Import named/default
import Widget, { greet, name } from './module.js';
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// math.js
export function sum(x, y) { return x + y; }

// main.js
import { sum } from './math.js';
console.log(sum(2, 3)); // 5
```

### Medium
```javascript
// config.js
export const API_URL = "https://api.example.com";
export const TIMEOUT = 5000;

// service.js
import * as config from './config.js';
fetch(`${config.API_URL}/users`);
```

### Advanced
```javascript
// Lazy loading chunk via dynamic import
button.onclick = async () => {
  const { showModal } = await import('./modal.js';
}
```

## 7. Visual Diagram (ASCII)

```
Module Dependency Graph

app.js
├─ import { greet } from utils.js
│     ├── utils.js ──► exports greet()
└─ import Logger from logger.js
      └── logger.js ──► default export Logger class
```

## 8. Real-world Example

Angular Feature Module:
```typescript
@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}
```

## 9. Angular Use Case

Angular CLI generates standalone modules and components using ESM principles. Lazy-loaded modules leverage dynamic imports.

## 10. Common Mistakes

❌ Mixing CommonJS and ESM carelessly
❌ Circular dependencies causing undefined values

## 11. Edge Cases

1. **Circular imports**
   ```javascript
   // a.js imports from b.js, which imports back from a.js
   ```

2. **Live bindings**
   ```javascript
   let count = 0;
   export { count }; // Always reflects latest value
   ```

3. **Top-level await**

## 12. Performance Considerations

- Tree-shaking removes unused exports
- Dynamic imports reduce initial bundle size
- Static analysis enables optimization

## 13. Time & Space Complexity

- Module instantiation: O(n)
- Resolution: varies with bundler complexity

## 14. Interview Questions

1. What is difference between require() and import?
2. Benefits of ESM?
3. Explain live bindings.
4. How does tree-shaking work?
5. Lazy loading technique?

## 15. Follow-up Questions

- "Why prefer ESM in Angular apps?"
- "How do circular deps behave?"

## 16. Production Best Practices

1. Use named exports for clarity
2. Split large modules logically
3. Leverage barrel/index files
4. Enable strict typing in TS modules

## 17. Summary

- Native module system improves scalability
- Import/export syntax enables static analysis
- Angular leverages ESM extensively

## 18. Revision Notes

- ESM = static import/export
- Named vs default exports
- Dynamic import () for async chunks
- Tree-shaking possible due to static nature

## 19. Practice Questions

1. Create modular calculator library.

2. Resolve circular dependency issue.

3. Implement lazy-loaded feature.

## 20. References

- [MDN: Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Angular CLI Docs: Workspace Lang]

### Next File
**028 - JavaScript Runtime.md** (Final File in Module 1)