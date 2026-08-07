# Function Execution Context

## 1. Definition

A **Function Execution Context (FEC)** is created by the JavaScript engine **every time a function is invoked**. It contains its own local memory space, parameter bindings, and references to outer lexical environments.

Each invocation creates a fresh instance — even if it's the same function being called again.

## 2. Why do we need it?

Function Execution Contexts enable:

- Local **scope encapsulation**
- Safe execution with isolated memory
- Proper **parameter passing**
- Correct **variable lookups** via scope chain
- Handling of `this`, `arguments`, and closures

## 3. Internal Working

When a function is called:

1. **Creation Phase**
   - `arguments` object created (in regular functions)
   - Parameters stored as local bindings
   - Local variables declared → hoisted to `undefined`
   - Function declarations hoisted
   - Reference to **outer lexical environment** stored
   - `this` value resolved based on call site

2. **Execution Phase**
   - Function body runs top-to-bottom
   - Variable assignments happen
   - If other functions are called → nested FECs

## 4. Step-by-Step Execution

Code:
```javascript
function multiply(a, b) {
  let result = a * b;
  return result;
}
multiply(3, 4);
```

Steps:
1. GEC created.
2. `multiply` function defined globally.
3. `multiply(3, 4)` called.
4. New FEC pushed to stack.
   - Creation: `a`, `b`, `result` → `undefined`
   - Binding to outer (GEC)
   - `arguments` = {0:3, 1:4}
5. Execution:
   - `result = 12`
   - return `12`
6. FEC completed → popped from stack
7. GEC continues

## 5. Syntax

```javascript
function myFunc(arg1, arg2) {
  // This entire block runs in its own Function Execution Context
  let localVar = arg1 + arg2;
  return localVar;
}
myFunc(1, 2);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function greet(name) {
  console.log(`Hi, ${name}`);
}
greet("Bob"); // Creates FEC
```

### Medium
```javascript
function outer(x) {
  return function inner(y) {
    return x + y;
  };
}
const add5 = outer(5);
add5(3); // Inner FEC
```

### Advanced
```javascript
function asyncTask(callback) {
  const data = fetchData(); // Assume async
  try {
    callback(null, data);
  } catch (err) {
    callback(err);
  }
}
asyncTask((err, res) => {
  if (err) throw err;
  console.log(res);
});
```

## 7. Visual Diagram (ASCII)

```
Call Stack
┌───────────────────────┐
│ Inner FEC             │
│   - y = undefined     │
│   - arguments         │
│   - Lexical Parent:   │
│     Outer FEC         │
└───────────────────────┘
┌───────────────────────┐
│ Outer FEC             │
│   - x = 5             │
│   - inner function    │
│   - Lexical Parent:   │
│     Global FEC        │
└───────────────────────┘
┌───────────────────────┐
│ Global FEC            │
│   - Global vars       │
└───────────────────────┘
```

## 8. Real-world Example

Angular Service Method:
```typescript
@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData(id: number): Observable<any> {
    return of(id).pipe(
      map(val => val * 2)
    );
  }
}
```

When `getData()` is called:
- FEC created for `getData`
- `id` parameter captured
- Returned Observable subscription handled by RxJS runtime

## 9. Angular Use Case

| Angular Code | FEC Relation |
|---|---|
| Component method call | FEC created for each handler invocation |
| `ngOnInit()` | Runs once per component FEC |
| Dependency injection in constructor | Part of FEC setup |
| Template event handlers | Trigger FECs via zone.js |

## 10. Common Mistakes

❌ Believing same function reuses context.
✔ Each call = new FEC.

❌ Ignoring closure implications.
✔ FEC remembers outer references.

❌ Misunderstanding `arguments`.
✔ Only available in non-arrow functions.

## 11. Edge Cases

1. **Recursion**
   ```javascript
   function countdown(n) {
     if (n > 0) countdown(n - 1);
   }
   ```
2. **Arrow Functions**
   - No own `arguments` or `this`
   - Lexical scoping from parent FEC
3. **Constructor Calls**
   - Special behavior with `new`
   - `this` replaced with newly created object

## 12. Performance Considerations

- Deep recursion risks stack overflow
- Closures keep referenced parent contexts alive (memory leak potential)
- Use iterative alternatives where practical

## 13. Time & Space Complexity

- Creation: O(k), k = local declarations count
- Lookup: Depends on scope chain depth
- Space: Grows with number of active FECs

## 14. Interview Questions

1. What happens when a function is invoked?
2. How is FEC different from GEC?
3. What is stored in FEC's lexical environment?
4. Why do arrow functions not have their own `this`?
5. Can two FECs coexist?
6. What is role of `arguments` in FEC?
7. Describe recursion and FEC interaction.
8. How does constructor FEC differ?
9. What happens on repeated calls to same function?
10. When is an FEC removed?

## 15. Follow-up Questions

- "What happens if a function calls itself recursively infinitely?"
- "Can you inspect current FEC manually?"

## 16. Production Best Practices

1. Keep functions short and stateless.
2. Avoid deep recursion.
3. Limit closure usage in loops/performance-critical code.
4. Prefer const/let for local scoping.

## 17. Summary

- FEC = context for every function call
- Created afresh each time
- Contains locals, params, bindings
- Tracks outer lexical environment
- Foundation for closures

## 18. Revision Notes

- FEC = Function Execution Context
- New per call
- Has arguments (unless arrow)
- Lexical parent reference = scope chain
- Closures retain FEC

## 19. Practice Questions

1. Trace how many FECs are created in this code:
```javascript
function a() { b(); }
function b() { c(); }
function c() {}
a();
```

2. Fix this recursive stack issue:
```javascript
function sum(n) {
  return n <= 1 ? 1 : n + sum(n - 1);
}
```

3. Create a closure retaining FEC state.

## 20. References

- [MDN: Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
- ["You Don’t Know JS"](https://github.com/getify/You-Dont-Know-JS)
- [ECMA-262](https://tc39.es/ecma262/)

### Next File
**005 - Memory Creation Phase.md**