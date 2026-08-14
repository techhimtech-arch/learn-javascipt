# Strict Mode

## 1. Definition

**Strict Mode** (`"use strict";`) is an opt-in feature that enforces stricter parsing and error handling on JavaScript code.

Introduces safer, more predictable semantics by catching silent errors and preventing certain risky operations.

## 2. Why do we need it?

To encourage better coding habits, avoid silent mistakes, and prepare codebases for future ECMAScript upgrades.

## 3. Internal Working

Acts as compiler directive — tells JS engine to switch into stricter execution mode with enhanced validation rules.

## 4. Step-by-Step Execution

Enabling globally:
```javascript
"use strict";
x = 5; // TypeError: x is not defined
```

Or per-function/file/scope basis.

Rules enforced:
- Implicit global variable assignments disallowed
- Duplicate parameter names forbidden
- Octal literals (like `010`) rejected
- Read-only properties assignment throws
- `with` statements disallowed

## 5. Syntax

Top of file:
```javascript
"use strict";
```

Inside function:
```javascript
function strictFunc() {
  "use strict";
  ...
}
```

Module context (automatic):
```javascript
// ES Modules run in strict mode implicitly
export {};
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
"use strict";
function demo() {
  y = 1; // TypeError: y is not defined
}
```

### Medium
```javascript
"use strict";
const obj = {};
Object.defineProperty(obj, "name", { value: "Alice", writable: false });
obj.name = "Bob"; // TypeError
```

### Advanced
```javascript
// Preventing unsafe eval usage
eval("var x = 1"); // In strict mode, 'x' not added to enclosing scope
```

## 7. Visual Diagram (ASCII)

```
Parsing Pipeline

Source Code
    │
    ▼
Strict Parser (if 'use strict')
    │
    ▼
Enforce stricter grammar rules
    │
    ▼
Same runtime, fewer silent failures
```

## 8. Real-world Example

Angular Compilation:
```typescript
// TypeScript compiles down to strict-compliant JS
export class MyComponent {}
// Ensures safety through generated output
```

## 9. Angular Use Case

TypeScript automatically emits `"use strict"` in compiled modules — aligning with Angular's preference for safe defaults.

## 10. Common Mistakes

❌ Mixing strict and non-strict code accidentally
❌ Expecting same behavior in legacy environments

## 11. Edge Cases

1. **Eval scope isolation**
2. **Octal literal rejection**
3. **Function parameter name uniqueness**

## 12. Performance Considerations

- Slightly improves engine optimizations
- Helps catch bugs early in development

## 13. Time & Space Complexity

N/A – parsing-time directive.

## 14. Interview Questions

1. Purpose of strict mode?
2. Examples of things now forbidden?
3. How to enable it?
4. Relation to modules?

## 15. Follow-up Questions

- "Does strict mode slow execution?"
- "Can you enable globally?"

## 16. Production Best Practices

1. Enable globally via linters/compiler flags
2. Prefer ES modules for automatic strictness
3. Review strict-mode violations during CI

## 17. Summary

- Compiler flag enhancing safety
- Eliminates silent failures
- Encouraged in modern JS/TS development

## 18. Revision Notes

- use strict enables tighter checks
- Modules strict by default
- Avoids many footguns
- Catches typos and misuse

## 19. Practice Questions

1. Convert legacy function to strict mode.

2. List what strict mode prevents.

3. Show eval difference pre/post strict.

## 20. References

- [MDN: Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

### Next File
**027 - Modules.md*
