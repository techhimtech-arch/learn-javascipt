# Lexical Environment

## 1. Definition

A **Lexical Environment** is an internal structure in the JavaScript engine that maps variable names to their values within a particular scope. It holds:

1. **Environment Record**: Stores all variable/function bindings.
2. **Outer Environment Reference**: Pointer to parent Lexical Environment.

Lexical Environments form the foundation of the **Scope Chain**.

## 2. Why do we need it?

- Maintains variable-to-value mappings
- Enables variable lookup via scope chain
- Supports closures and nested functions
- Facilitates memory management and cleanup

## 3. Internal Working

```
┌──────────────────────┐
│ Lexical Environment  │
├──────────────────────┤
│ { name: "Alice" }    │ ← Environment Record
│ outer: parentEnv     │ ← Outer Env Reference
└──────────────────────┘
```

Each Execution Context creates its own Lexical Environment upon creation.

## 4. Step-by-Step Execution

Example:
```javascript
let name = "Alice";
function greet(msg) {
  console.log(`${name}: ${msg}`);
}
greet("Hello");
```

Steps:
1. **GEC** created → G-Lexical Environment initialized
   - Record: `{ name: undefined, greet: <Function> }`
   - Outer pointer: null
2. **Execution Phase**:
   - `name = "Alice"`
   - `greet("Hello")` called → FEC created
3. **FEC** created → greet-Lexical Environment initialized
   - Record: `{ msg: "Hello" }`
   - Outer pointer: G-Lexical Environment
4. Inside `greet`, lookup `name` → falls back to outer env → finds `"Alice"`

## 5. Syntax

```javascript
// Every function/block implicitly creates a lexical environment
function example() {
  // Inside this function, a new lexical environment is created
}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
var x = 1;
function getX() { return x; }
```

### Medium
```javascript
function buildClosure() {
  let secret = Math.random();
  return () => secret;
}
```

### Advanced
```javascript
class Counter {
  #count = 0;
  increment() { this.#count++; }
}
```

## 7. Visual Diagram (ASCII)

```
Global Lexical Env
┌─────────────┬─────────────┐
│ name: Alice │ greet Fn    │
│             │ outer: null │
└─────────────┴─────────────┘

greet() FEC Lexical Env
┌───────────┬───────────────┐
│ msg: "Hi" │ outer → GLE   │
└───────────┴───────────────┘

Lookup path:
msg local → name falls back to GLE
```

## 8. Real-world Example

Angular Component Context:
```typescript
@Component({
  selector: 'my-component',
  template: '<p>{{title}}</p>'
})
export class MyComponent {
  title = 'Hello';
  showTitle() { alert(this.title); }
}
```

Each component instance has its own lexical context tied to Angular’s change detection context.

## 9. Angular Use Case

- Angular DI container maintains contexts for injectors.
- Each NgModule creates its own injector context (lexical-like).
- Component templates bind to the component's lexical environment.

## 10. Common Mistakes

❌ Thinking lexical env is same as execution context.
✔ Context includes both lexical env and `this`.

❌ Forgetting closures hold outer lexical references.

## 11. Edge Cases

1. **Arrow functions inherit lexical env**
   ```javascript
   const obj = {
     val: 1,
     method: () => this.val // Not obj, but global!
   };
   ```

2. **eval creates dynamic environments**
   ```javascript
   eval("var x = 1"); // Modifies current lexical env
   ```

3. **With statement alters lexical scope**
   ```javascript
   with(obj) { prop = 1; }
   ```

## 12. Performance Considerations

- Retaining lexical environments increases memory footprint
- Deeply nested lexical chains slow down lookups
- Properly nullifying closures helps garbage collection

## 13. Time & Space Complexity

- Lookup cost: O(d), d = nesting depth
- Memory cost: O(n), n = retained variables

## 14. Interview Questions

1. What is Lexical Environment?
2. Difference between Lexical Environment and Variable Environment?
3. How does Scope Chain arise from Lexical Environments?
4. Role of outer environment pointer?
5. How do closures maintain lexical links?
6. Does modifying outer scope affect lexical env structure?

## 15. Follow-up Questions

- "Can you access lexical environment manually?"
- "How does JavaScript engine optimize lexical lookups?"

## 16. Production Best Practices

1. Minimize closure scope depth
2. Clean up event listeners/delegates referencing outer scopes
3. Reuse stable references instead of recreating closures

## 17. Summary

- Core concept linking scope and memory
- Each EC has its lexical context
- Outer pointers form chains
- Basis for closures and scope resolution

## 18. Revision Notes

- Lexical Env = bindings + outer ref
- Every EC has one
- Closures keep lex envs alive
- Scope Chain formed by outer pointers

## 19. Practice Questions

1. Trace lexical environment creation:
```javascript
function a() {
  var x = 1;
  function b() {
    console.log(x);
  }
  b();
}
a();
```

2. Show how closure preserves lexical env.

3. Demonstrate scope chain via outer pointers.

## 20. References

- [MDN: Lexical Environment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_context#lexical_environment)
- [ECMAScript Specification](https://tc39.es/ecma262/)

### Next File
**012 - Scope Chain.md**