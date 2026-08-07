# Namespaces

## 1. Definition

**Namespaces** are a TypeScript-specific way to group related code into logical containers — useful for organizing larger projects before ES modules became standard.

## 2. Why do we need it?

Group cohesive functionality, avoid global namespace pollution, manage internal modules historically.

## 3. Internal Working

Compiles down to nested objects in JavaScript — namespaced identifiers accessible via fully qualified paths.

## 4. Step-by-Step Execution

Example:
```typescript
namespace Geometry {
  export class Circle {
    constructor(public radius: number) {}
    area() { return Math.PI * this.radius ** 2; }
  }
  export const PI = Math.PI;
}

const circle = new Geometry.Circle(5);
```

Steps:
1. Define namespace block
2. Export members inside
3. Access via `Namespace.Member` path
4. Compiled JS nests objects accordingly

## 5. Syntax

```typescript
namespace MyApp.Services {
  export class ApiService {}
  export const ENDPOINT = "/api";
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
namespace Validation {
  export function isValid(s: string): boolean {
    return s.length > 0;
  }
}
```

### Medium
```typescript
/// <reference path="./geometry.ts" />
const area = Geometry.Circle.area();
```

### Advanced
```typescript
declare namespace moment {
  interface Moment {
    format(formatString?: string): string;
  }
}
```

## 7. Visual Diagram (ASCII)

```
Namespace Compilation

TypeScript:
namespace MyLib {
  export class Helper {}
}

JavaScript Output:
var MyLib;
(function (MyLib) {
  class Helper {}
})(MyLib || (MyLib = {}));
```

## 8. Real-world Example

Older Angular codebases used namespaces for organizing services/modules.

## 9. Angular Use Case

Legacy module organization — newer Angular prefers ES modules + NgModules.

## 10. Common Mistakes

❌ Mixing with ES modules  
❌ Overusing nested namespaces  

## 11. Edge Cases

1. **Triple-slash references**
   ```typescript
   /// <reference path="./types.d.ts" />
   ```

2. **Ambient namespaces**
3. **Aliasing imports**

## 12. Performance Considerations

No direct impact — purely organizational.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Namespaces vs ES modules?
2. When to use namespaces?
3. Triple-slash directive purpose?

## 15. Follow-up Questions

- "Do modern TypeScript projects still use namespaces?"

## 16. Production Best Practices

1. Prefer ES modules for new code
2. Use namespaces only when migrating legacy systems
3. Combine with `import`/`export` carefully

## 17. Summary

Legacy TypeScript pattern for grouping related constructs — mostly replaced by ES modules today.

## 18. Revision Notes

- Groups related exports
- Compiled to nested objects
- Triple-slash references link files
- Mostly obsolete with ES modules

## 19. Practice Questions

1. Convert namespace to ES module.
2. Organize utility functions in namespace.
3. Reference across files using triple-slash.

## 20. References

- [TypeScript: Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)

### Module 4 Complete (17 files)
