# Global Execution Context

## 1. Definition

The **Global Execution Context (GEC)** is the **default execution context** created by the JavaScript engine when a script first loads in the browser or Node.js environment.

It represents the **top-level scope** of your entire JavaScript program.

There can be **only ONE** Global Execution Context per script/program execution.

## 2. Why do we need it?

The Global Execution Context:

1. Initializes memory for all **global-level variables** and **functions**.
2. Sets up the **global object** (`window` in browsers, `global` in Node.js).
3. Defines the value of `this` at the top level (which is the global object).
4. Acts as the **base** for all other contexts' scope chains.
5. Ensures safe execution of code without polluting outer environments.

## 3. Internal Working

When the JavaScript engine starts executing a script:

1. **Creation Phase**
   - All global-level variables are hoisted → assigned `undefined`
   - All global-level functions are hoisted → assigned full function reference
   - Global object (`window` / `global`) is created
   - `this` keyword is bound to the global object
   - Memory is allocated for variables

2. **Execution Phase**
   - Global variables get their actual values
   - Function declarations are executed
   - Function expressions/calls create new Function Execution Contexts as needed

## 4. Step-by-Step Execution

Example:
```javascript
let name = "Alice";
var age = 25;
function greet() { console.log(`Hi, I am ${name}, age ${age}`); }
greet();
```

Steps:
1. GEC created.
2. Creation phase:
   - `name` → `undefined`
   - `age` → `undefined`
   - `greet` → full function stored
   - `window.name`, `window.age`, `window.greet` initialized (browser)
   - `this` → points to `window`
3. Execution phase:
   - `name = "Alice"`
   - `age = 25`
   - `greet()` called → Function Execution Context created & pushed to stack
4. After `greet()` finishes → popped from stack
5. Script ends → GEC destroyed

## 5. Syntax

```javascript
// This whole script runs under the Global Execution Context
const globalVar = "I belong to the global context";

function globalFunction() {
  console.log(globalVar);
}
```

## 6. Examples (Easy → Advanced)

### Easy — Basic GEC use
```javascript
console.log(window === this); // true in browser
```

### Medium — Hoisting within GEC
```javascript
console.log(x); // undefined (due to hoisting)
var x = 5;
```

### Advanced — Interaction with modules
```javascript
// In Node.js modules, top-level 'this' isn't global, but still tied to module wrapper
module.exports = {};
console.log(this === module.exports); // true
```

## 7. Visual Diagram (ASCII)

```
Global Memory Space
┌────────────────────────────┐
│ Window Object Reference    │
├────────────────────────────┤
│ 'name' : undefined         │ ← Hoisted during Creation Phase
│ 'age' : undefined          │
│ 'greet' : function() {...} │ ← Function Hoisted Fully
└────────────────────────────┘
                │
                ▼
Creation Phase Done
                │
                ▼
Execution Phase Begins
                │
                ▼
Values assigned:
name = "Alice"
age = 25
```

## 8. Real-world Example

Angular App Entry Point (main.ts):
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule); // Runs here
```

Here:
- Entire file executes under GEC.
- `import` statements resolve to module bindings.
- `platformBrowserDynamic()` runs inside GEC.
- When `bootstrapModule()` executes, it internally creates FECs for Angular internals.

## 9. Angular Use Case

In Angular:

- Bootstrap code runs in GEC.
- Environment files like `environment.ts` are loaded at GEC level.
- Root-level imports and constants exist in GEC scope.
- All components/services eventually trace back to the root scope originating in GEC.

## 10. Common Mistakes

❌ Confusing GEC with global scope.
✔ GEC *is* the runtime representation of global scope.

❌ Thinking there are multiple GECs.
✔ Only one exists per script session.

❌ Believing `this` always points to global.
✔ In ES modules or strict mode, `this` may be `undefined`.

## 11. Edge Cases

1. **Node.js REPL vs Script Files**  
   - REPL wraps code differently than script files.
2. **Strict Mode Alterations**  
   ```javascript
   "use strict";
   console.log(this); // undefined instead of Window
   ```
3. **ES Modules**  
   Modules have their own scope, wrapped in a module context.
4. **Multiple Scripts**  
   Each separately loaded script still shares the same GEC.

## 12. Performance Considerations

- Minimizing number of globals helps performance (fewer property lookups).
- Wrapping scripts in IIFEs avoids accidental global leaks.
- Avoid modifying the global object excessively.

## 13. Time & Space Complexity

- Creating GEC: O(n), where n = total number of declarations
- Accessing global properties: O(1) average
- Memory footprint grows with number of declared globals

## 14. Interview Questions

1. What is Global Execution Context?
2. How many Global Execution Contexts can there be?
3. What gets initialized during its creation phase?
4. How does `this` behave in GEC?
5. What is the relationship between `window` and GEC?
6. Why isn't `this === window` in strict mode?
7. When is GEC destroyed?
8. What is difference between global scope and global execution context?
9. How do multiple scripts interact with GEC?
10. Is GEC part of the JS specification?

## 15. Follow-up Questions

- "How would you detect if someone accidentally pollutes global scope?"
- "Can you force a new GEC to form?"
- "What happens if you delete a global variable declared with `var`?"

## 16. Production Best Practices

1. Avoid declaring too many globals.
2. Use `const`/`let` over `var` to limit accidental exposure.
3. Enable strict mode to prevent unintended global mutations.
4. Encapsulate logic into functions/modules to avoid cluttering GEC.
5. Monitor global usage via browser dev tools.

## 17. Summary

- GEC is created once at script start.
- Hoists all top-level variables and functions.
- Sets up global object and `this`.
- Basis for all future functional contexts.
- Central to understanding variable resolution, hoisting, and memory management.

## 18. Revision Notes

- One GEC per script
- Phases: Creation ➜ Execution
- Global Object: window (browser) / global (Node)
- `this` ➜ global object (non-strict), undefined (strict)
- Hoisting applies in creation phase

## 19. Practice Questions

1. What is the output?
```javascript
var a = 10;
function b() { return a; }
console.log(typeof b); // ?
```

2. Explain how global variables end up on `window`.

3. Demonstrate preventing global leakage using closure or IIFE.

## 20. References

- [MDN: Global Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
- [ECMA-262](https://tc39.es/ecascript/)
- ["You Dont Know JS - Scopes & Closures"](https://github.com/getify/You-Dont-Know-JS)

### Next File
**004 - Function Execution Context.md**
