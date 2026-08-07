# Scope

## 1. Definition

**Scope** refers to the visibility and accessibility of variables, functions, and objects in different parts of your code during runtime.

JavaScript uses **lexical scoping** — meaning nested scopes form hierarchies determined by where they were written, not called.

## 2. Why do we need it?

- Prevent naming collisions
- Enforce encapsulation
- Improve maintainability and readability
- Enable modular development

## 3. Internal Working

```
Outer Scope → Inner Scope → Innermost Scope
                ↑              ↑
              Child scope    Parent scope accessible via lexical relationship
```

Variables in outer scopes remain visible to inner ones (Scope Chain).

## 4. Step-by-Step Execution

Example:
```javascript
function outer() {
  let outerVar = "Outside";
  function inner() {
    console.log(outerVar); // Lexically finds outerVar
  }
  inner();
}
outer();
```

Steps:
1. `outer()` creates FEC
2. Defines `outerVar` and `inner`
3. `inner()` invoked → new FEC
4. `inner` looks for `outerVar` → not found locally
5. Follows Scope Chain → finds in `outer` FEC
6. Logs value

## 5. Syntax

```javascript
// Block Scope
{
  var a = 1;    // Function/global scoped
  let b = 2;    // Block scoped
  const c = 3;  // Block scoped
}

console.log(a); // OK
console.log(b); // ReferenceError
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
let x = 10;
function printX() { console.log(x); }
printX();
```

### Medium
```javascript
function counter() {
  let count = 0;
  return () => ++count; // Closure captures scope
}
```

### Advanced
```javascript
export default class Component {
  #privateField; // Truly private field
  protectedField = 1;
}
```

## 7. Visual Diagram (ASCII)

```
Lexical Nested Scopes:

Global Scope
├── outer() FEC
│   ├── outerVar
│   └── inner() FEC
│       └── innerVar
└── another() FEC
    └── localVar
```

## 8. Real-world Example

Angular Module Import Scoping:
```typescript
@NgModule({
  imports: [RouterModule], // Visible only within NgModule metadata
})
export class AppModule {
  private internalState = true; // Hidden from outside injection
}
```

## 9. Angular Use Case

| Scope Type | Angular Application |
|---|---|
| Global | Root module imports, APP_INITIALIZER tokens |
| Component | Component-local state and helpers |
| Service | Constructor-level DI scope |
| Module | Providers visibility |

## 10. Common Mistakes

❌ Using `var` thinking it’s block-scoped.
❌ Mutating parent scope unintentionally.
❌ Confusing dynamic and lexical scope.

## 11. Edge Cases

1. **Hoisting across scopes**
   ```javascript
   console.log(a); // undefined
   var a = 1;
   ```

2. **IIFE creates isolated scope**
   ```javascript
   (function() {
     var privateVar = 10;
   })();
   ```

3. **Module-level scope (ES6)**
   ```javascript
   export const constant = 1;
   ```

## 12. Performance Considerations

- Deeply nested scopes slow variable lookup
- Closures retain entire parent context
- Prefer minimal scope exposure

## 13. Time & Space Complexity

- Variable lookup: O(d), d = nesting depth
- Memory: O(n) for retained closures

## 14. Interview Questions

1. Differentiate global, function, block, module scope.
2. What is lexical scope?
3. How do closures relate to scope?
4. Explain Scope Chain.
5. Are parameters block scoped?
6. Can inner scopes modify outer scope variables?

## 15. Follow-up Questions

- "Can you escape block scope accidentally?"
- "How does dynamic scoping differ from lexical?"

## 16. Production Best Practices

1. Limit variable scope tightly
2. Prefer const > let > var
3. Use IIFEs or modules for namespace protection
4. Avoid global pollution
5. Be mindful of closure capture costs

## 17. Summary

- Scopes define variable access zones
- Lexical scoping enables predictable lookups
- Block scope (`let/const`) improves safety
- Closures leverage scope chains

## 18. Revision Notes

- Scopes form chain
- var → function, let/const → block
- Closures preserve lexical scope
- Module scope isolates

## 19. Practice Questions

1. Predict output:
```javascript
let a = 1;
function outer() {
  let a = 2;
  function inner() {
    console.log(a);
  2. Create isolated counter:
```typescript
function makeCounter(): () => number {
  // ...
}
```

## 20. References

- [MDN: Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [ECMA-262](https://tc39.es/ecma262/)
- ["You Don't Know JS: Scopes and Closures"]

### Next File
**011 - Lexical Environment.md**