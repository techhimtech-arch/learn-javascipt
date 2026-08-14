# Execution Context

## 1. Definition

An **Execution Context (EC)** is the abstract concept used by the JavaScript Engine to track the environment within which JavaScript code is being executed.

There are **three types**:

1. **Global Execution Context (GEC)** — created once when the script starts.
2. **Function Execution Context (FEC)** — created every time a function is invoked.
3. **Eval Execution Context** — created inside an `eval()` function.

Each execution context has two phases:

- **Creation Phase (Memory Allocation / Pre-parsing)**
- **Execution Phase (Actual Execution)**

## 2. Why do we need it?

Execution Contexts provide **scope isolation** and **memory management** for variables, functions, and references. They ensure:

- Each function has its own local variable space.
- Variables declared in one context don't pollute others.
- The engine knows which variables and functions are available at any point.
- The `this` value is correctly resolved.
- Closures and scope chains work properly.

Without execution contexts, JavaScript variable scoping would be ambiguous and inconsistent.

## 3. Internal Working

```
JavaScript Code
        │
        ▼
Engine creates Global Execution Context (GEC)
        │
        ├── Creation Phase:
        │       • Hoist variables → undefined
        │       • Hoist functions → full function reference
        │       • Initialize global object (window in browser)
        │       • Initialize "this" reference
        │
        ▼
        │
Execution Phase:
        • Code runs top-to-bottom
        • Function calls create new Function Execution Contexts
        • Each FEC goes through the same two phases
        • Stack maintains LIFO order of contexts
```

## 4. Step-by-Step Execution

Consider:

```javascript
let globalVar = "I'm global";
function greet(name) {
  let localVar = `Hello, ${name}!`;
  console.log(globalVar + " - " + localVar);
}
greet("Raman");
```

### Steps

1. **Global Execution Context created**.
   - Creation Phase: `globalVar` hoisted as `undefined`, `greet` function fully hoisted.
   - Global object (`window`) initialized.
   - `this` set to `global` or `window`.

2. **Execution Phase begins**.
   - `globalVar` assigned `"I'm global"`.
   - `greet("Raman")` called → a **new Function Execution Context** is pushed onto the stack.

3. **Inside greet()**
   - Creation Phase: `name` → parameter, `localVar` → `undefined`.
   - Execution Phase: `localVar` assigned `` `Hello, Raman!` ``
   - `console.log(...)` prints the message.
   - After function ends → FEC popped from stack.

4. Control returns to GEC. Script ends. GEC destroyed.

## 5. Syntax

```javascript
// Global Execution Context
let age = 25;

function sayHi(name) {
  // Function Execution Context
  const greeting = "Hello";
  console.log(`${greeting}, ${name}! You are ${age}`);
}

sayHi("Alice"); // Creates FEC internally
```

## 6. Examples (Easy → Advanced)

### Easy — Two contexts
```javascript
var x = 10;
function printX() { console.log(x); }
printX(); // FEC reads x from GEC via Scope Chain
```

### Medium — Nested functions
```javascript
function outer() {
  let outerVar = "Outer";

  function inner() {
    console.log(outerVar); // Uses lexical scope from outer FEC
  }
  
  inner(); // New FEC pushed
}

outer(); // GEC → outer FEC → inner FEC
```

### Advanced — Nested + closures + this
```javascript
var globalVar = "Global";

class User {
  constructor(name) {
    this.name = name;
  }

  greet(delay) {
    var prefix = "User says:";

    setTimeout(() => {
      console.log(`${prefix}: ${this.name}`); // Closure + this binding
    }, delay);
  }
}
```

## 7. Visual Diagram (ASCII)

```
Stack (Call Stack)
┌─────────────────────┐
│ Inner FEC           │ (Function: inner())
│   - Variables: none │
│   - this: undefined │
│   - parent: outer FEC│
└─────────────────────┘
┌─────────────────────┐
│ Outer FEC           │ (Function: outer())
│   - outerVar        │
│   - inner function  │
│   - this: undefined │
└─────────────────────┘
┌─────────────────────┐
│ Global FEC          │
│   - globalVar       │
│   - this: window    │
└─────────────────────┘

Flow: outer() → inner()
Scope Chain: inner FEC → outer FEC → GEC
```

## 8. Real-world Example

Angular uses Execution Contexts internally for DI bootstrapping:

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
  providers: [{ provide: ApiService, useClass: ApiService }]
})
export class AppModule {}
```

1. **GEC** is created when the Angular bundle loads.
2. `@NgModule` decorator is evaluated → triggers module compilation.
3. `platformBrowserDynamic().bootstrapModule(AppModule)` → creates **FEC** for the bootstrap function.
4. Angular resolves providers → creates instances within **DI Injection Context**.
5. Component constructor runs inside its own **FEC**.

## 9. Angular Use Case

| Angular Code | Execution Context Impact |
|---|---|
| `constructor()` in component | Each instance = new Function Execution Context |
| Global `environment.ts` | Loaded into Global Execution Context |
| `@Input('property') input; set` | Setter runs in FEC of component |
| `ngOnInit()` | Runs during component FEC setup phase |
| `inject()` from services | Runs in DI context tied to current FEC |

## 10. Common Mistakes

❌ Assuming only one context exists.
✔ Every function call creates its own context.

❌ Forgetting scope chaining rules.
✔ Contexts follow lexical nesting, not call order.

❌ Thinking context == closure.
✔ A closure *results from* an execution context retaining lexical access to its parent.

❌ Confusion about `this`.
✔ `this` is determined at call time and varies by context type.

## 11. Edge Cases

1. **Constructor functions with `new`**:
   ```javascript
   function Person(name) {
     this.name = name;
   }
   const bob = new Person("Bob"); // Special EC for 'new'
   ```
2. **Recursive calls**:
   ```javascript
   function factorial(n) {
     return n <= 1 ? 1 : n * factorial(n - 1);
   }
   ```
   Multiple FECs are created until base case.

3. **Anonymous functions / arrow functions**:
   Arrow functions do *not* bind their own `this`. They inherit from the enclosing context.

4. **Event handlers and callbacks**:
   ```javascript
   button.addEventListener('click', function () { /* new EC */ });
   ```

## 12. Performance Considerations

- Contexts are lightweight objects but allocating many nested contexts can increase GC pressure.
- Avoid long-running synchronous functions — they block context cleanup and stack unwinding.
- Arrow functions reduce overhead slightly by skipping `this` binding.

## 13. Time & Space Complexity

- Creating an Execution Context: O(1)
- Memory cost per context depends on number of bindings (variables, params)
- Worst-case recursion depth affects space complexity linearly with recursion depth.

## 14. Interview Questions

1. What is an execution context?
2. Describe the phases of an execution context.
3. What is the difference between GEC and FEC?
4. How does the call stack relate to execution contexts?
5. Why does JavaScript have a single global execution context?
6. What happens to the stack when a function returns?
7. How would you simulate the execution context lifecycle manually?
8. Can more than one execution context exist simultaneously?
9. What is the role of Hoisting in the creation phase?
10. What triggers creation of a new execution context?

## 15. Follow-up Questions

- "How does V8 manage contexts internally?"
- "Why can't we see execution contexts directly?"
- "Explain how closures preserve context."
- "Can execution contexts be nested infinitely?"
- "What tools expose execution context info?"

## 16. Production Best Practices

1. Keep functions small and focused to reduce context size.
2. Be cautious with deeply recursive patterns — risk stack overflow.
3. Use strict mode to avoid implicit globals in unexpected contexts.
4. Profile memory usage in browser dev tools under performance tab.
5. Prefer declarative functional logic over imperative loops where possible.

## 17. Summary

- Execution Context = abstract wrapper containing variable/function info + scope info.
- Created for: global script, function call, eval block.
- Phases: Creation (hoisting, memory allocation) → Execution (code runs).
- Context hierarchy forms the backbone of: Scope Chain, Closures, Variable Resolution.
- Critical to Angular lifecycle hooks, dependency injection, and component instantiation.

## 18. Revision Notes

- EC phases: Creation ➜ Execution
- Types: Global, Function, Eval
- Stack: Last In First Out (LIFO)
- Scope Chain arises from parent-child EC relationships
- `this`, closures depend heavily on EC behavior

## 19. Practice Questions

1. What is the output?
```javascript
function test() {
  console.log("Context 1");

  function inner() {
    console.log("Context 2");
  }

  return inner;
}

let result = test();
result();
```

2. Trace through how many execution contexts get pushed onto the stack in this code.

3. Write a simple counter closure that hides state using execution context isolation.

## 20. References

- ["You Don't Know JS: Scope & Closures"](https://github.com/getify/You-Dont-Know-JS)
- [MDN Web Docs - Execution Context](https://developer.mozilla.org/en-US/docs/Glossary/Execution_Context)
- ["Composing Software" by Eric Elliott](https://medium.com/javascript-scene)

### Next File
**003 - Global Execution Context.md**