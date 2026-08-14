# JavaScript Modules

## 1. Definition

**JavaScript Modules** organize code into reusable, encapsulated units with explicit dependencies.

## 2. Why do we need it?

Manage dependencies, avoid global scope pollution, enable code reuse.

## 3. Internal Working

ES Module system:
- `export`: Expose bindings
- `import`: Consume dependencies
- Live bindings: Updates propagate automatically
- Static analysis: Tree-shaking possible

## 4. Syntax

```javascript
// Named exports
export const PI = 3.14159;
export function calculateArea(radius) {
  return PI * radius * radius;
}

// Default export
export default class Circle {
  constructor(radius) {
    this.radius = radius;
  }
}

// Re-exports
export { PI, calculateArea } from './math.js';
export { default as Circle } from './shapes.js';

// Imports
import Circle, { PI, calculateArea } from './geometry.js';
import * as MathUtils from './math.js'; // Namespace import
```

## 5. Examples

### Easy
```javascript
// math.js
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// app.js
import { add, multiply } from './math.js';
console.log(add(2, 3)); // 5
```

### Advanced
```javascript
// Dynamic imports
async function loadFeature(moduleName) {
  const module = await import(`./features/${moduleName}.js`);
  return module.default;
}

// Circular dependency handling
// a.js
export function getData() {
  return 'from a';
}
// b.js  
import { getData } from './a.js';
// Works because live bindings
```

## 6. ES Modules vs CommonJS

| Feature | ES Modules | CommonJS |
|---------|-----------|----------|
| Syntax | import/export | require/module.exports |
| Loading | Static | Runtime |
| Bindings | Live | Copy |

## 7. Interview Questions

1. Live bindings behavior?
2. ES Modules vs CommonJS?
3. Tree-shaking requirements?

## 8. Summary

ES Modules provide standardized modularity with static structure enabling optimization.

## 9. References

- [MDN: ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

---
