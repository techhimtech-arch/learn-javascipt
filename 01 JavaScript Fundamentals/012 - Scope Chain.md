# Scope Chain

## 1. Definition

The **Scope Chain** is the process by which the JavaScript engine resolves variable names through nested **Lexical Environments** until it finds a match or reaches the global scope.

Every time a variable is referenced, the engine walks up the chain of outer environments looking for the identifier.

## 2. Why do we need it?

- Enables nested functions to access outer variables
- Provides predictable variable resolution
- Allows encapsulation with controlled leakage

## 3. Internal Working

```
Innermost Scope
    ↓   (outer pointer)
Parent Scope
    ↓
Grandparent Scope
    ↓
...
    ↓
Global Scope
    ↓
null (end of chain)
```

Resolution stops at outermost level — either finds variable or returns `undefined`.

## 4. Step-by-Step Execution

Example:
```javascript
var a = 1;
function outer() {
  var b = 2;
  function inner() {
    var c = 3;
    console.log(a + b + c); // Resolves: a=1, b=2, c=3
  }
  inner();
}
outer();
```

Steps:
1. `a=1`, `outer` defined
2. `outer()` called → FEC created
3. `inner()` called → FEC created
4. `console.log(a+b+c)` runs inside `inner`
5. Resolves each:
   - `c` → found in inner FEC
   - `b` → not found here, check outer FEC → found
   - `a` → not found in outer FEC, check GEC → found
6. Result logged.

## 5. Syntax

```javascript
var x = 1;
function level1() {
  var y = 2;
  function level2() {
    console.log(x + y); // Scope chain resolves x from global, y from level1
  }
  level2();
}
level1();
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
var greeting = "Hello";
function sayHello() { console.log(greeting); }
sayHello();
```

### Medium
```javascript
function createCounter() {
  let count = 0;
  return function increment() {
    count++;
    return count;
  };
}
```

### Advanced
```javascript
function wrap(obj) {
  return function deepAccess(...keys) {
    return keys.reduce((acc, key) => acc?.[key], obj);
  };
}
```

## 7. Visual Diagram (ASCII)

```
Reference Chain During Lookup

┌──────────────┐
│ Inner FEC    │ ← console.log(b)
│ b = 2        │
└─────↑────────┘
      │
┌─────┘────────┐
│ Outer FEC    │ ← b not found, fall back
│ outerVar     │
└─────↑────────┘
      │
┌─────┘────────┐
│ Global FEC   │ ← Found!
│ b = 1        │
└─────↑────────┘
      │
     null
```

## 8. Real-world Example

Angular DI Chain:
```typescript
@Injectable()
class BaseService {
  protected config = new Config();
}

@Injectable()
class DerivedService extends BaseService {
  getConfig() {
    return this.config; // Scope-like resolution via prototype chain
  }
}
```

## 9. Angular Use Case

| Angular Concept | Scope Chain Analogy |
|---|---|
| DI hierarchy resolution | Walks up injectors till root |
| Template context lookup | Component → NgModule → Global |
| CSS encapsulation | Scoped styles bubble up predictably |

## 10. Common Mistakes

❌ Believing scope chain breaks with `this`.
✔ Scope chain handles variables; `this` uses call-site rules.

❌ Overriding shadowing vars incorrectly.

## 11. Edge Cases

1. **Shadowing**
   ```javascript
   var a = 1;
   function f() {
     var a = 2;
     console.log(a); // 2
   }
   ```

2. **Closures preserve full chain**
   ```javascript
   for (var i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 0); // All log 3
   }
   ```

3. **Missing properties in objects don't trigger scope chain**
   ```javascript
   var obj = { nested: { prop: 1 } };
   console.log(obj.deeper?.safe); // null, not scope fallback
   ```

## 12. Performance Considerations

- Avoid unnecessary closure captures
- Cache resolved references externally if reused
- Prefer const for static lookups

## 13. Time & Space Complexity

- Worst-case lookup: O(d), d = nesting depth
- Memory retention: proportional to closure size

## 14. Interview Questions

1. What is Scope Chain?
2. When does Scope Chain formation occur?
3. How is Scope Chain related to Lexical Environment?
4. What ends the chain?
5. Can Scope Chain be manipulated?
6. Why do closures work?

## 15. Follow-up Questions

- "Does adding `with()` break scope chain?"
- "Is scope chain same as prototype chain?"

## 16. Production Best Practices

1. Keep nesting shallow when possible
2. Document dependencies clearly
3. Prefer explicit passing over implicit closure reliance
4. Watch for memory leaks from heavy closure usage

## 17. Summary

- Variables resolved by walking outer environments
- Chain terminates at global scope
- Supports closures and nested scoping
- Key mechanism behind JavaScript’s functional programming model

## 18. Revision Notes

- Scope chain = lexical env links
- Ends in global/null
- Closures retain entire chain
- Shadowed vars stop search early

## 19. Practice Questions

1. Trace scope chain:
```javascript
var a = 1;
function b() {
  var a = 2;
  function c() {
    console.log(a); // ?
  }}
b();
```

2. Refactor to avoid closure leak:
```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(() => console.log(i), 0);
}
```

3. Implement simple variable resolver simulation.

## 20. References

- [MDN: Scope Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Scope#scope_chaining)
- [ECMAScript Spec](https://tc39.es/ecma262/)

### Next File
**013 - Closures.md**