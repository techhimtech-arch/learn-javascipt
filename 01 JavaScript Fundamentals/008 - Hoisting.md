# Hoisting

## 1. Definition

**Hoisting** is a JavaScript mechanism where variable and function declarations are moved ("hoisted") to the top of their containing scope during the **Memory Creation Phase**, before any code is executed.

⚠️ Important: Only the **declarations** are hoisted — not their initializations.

## 2. Why do we need it?

- Enables **forward references** to functions/variables within same scope
- Supports cleaner functional programming styles
- Ensures consistent behavior regardless of declaration placement

## 3. Internal Working

```
Before Execution:
let x = 10;
console.log(x);

Internally transformed:
let x;
x = 10;
console.log(x);
```

Only assignment moves down; declaration stays up.

## 4. Step-by-Step Execution

Given:
```javascript
hoistedFunction();

var greeting = "Hello";
function hoistedFunction() {
  return greeting;
}
```

Phases:
1. **Memory Creation Phase**:
   - `greeting` → `undefined`
   - `hoistedFunction` → full function reference
2. **Execution Phase**:
   - `hoistedFunction()` called
   - Inside function: reads `greeting` → currently `undefined`
   - Assignment `greeting = "Hello"` happens later

## 5. Syntax

```javascript
// Declaration first
const fn = () => {};
fn();

// Also works because declaration is hoisted
hoisted();
function hoisted() {}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
console.log(a); // undefined
var a = 10;
```

### Medium
```javascript
printMsg();
function printMsg() { console.log("Hoisted"); }
```

### Advanced
```javascript
class Foo extends Bar {} // ReferenceError: Cannot access 'Bar' before initialization
class Bar {}
```

## 7. Visual Diagram (ASCII)

```
Original Code:
┌────────────────────────────┐
│ greeting = "Hello"         │
│ console.log(greeting);     │
└────────────────────────────┘

After Hoisting:
┌────────────────────────────┐
│ var greeting = undefined;  │ ← Hoisted
│ greeting = "Hello"         │
│ console.log(greeting);     │
└────────────────────────────┘
```

## 8. Real-world Example

In Angular components:
```typescript
export class MyComponent {
  data = this.loadData(); // Called during class field eval
  
  loadData(): any[] {
    return [];
  }
}
```

`loadData()` is hoisted inside class scope.

## 9. Angular Use Case

- Angular’s DI system leverages hoisting for service metadata.
- Decorator evaluation order follows hoisting rules.
- Class member evaluation respects hoisting context.

## 10. Common Mistakes

❌ Thinking hoisting copies function bodies.
✔ Hoisting moves declarations, not implementations.

❌ Expecting `let`/`const` to be usable before declaration.
✔ They exist in TDZ until initialized.

## 11. Edge Cases

1. **let/const in TDZ throw ReferenceError**
2. **Class declarations aren't hoisted like functions**
3. **Function expressions behave differently from declarations**
4. **Hoisting inside blocks vs functions**
5. **Reassignment precedence matters**

## 12. Performance Considerations

- Accessing hoisted vars before initialization returns undefined
- Avoid misuse of hoisting in production code
- Helps with cleaner top-down readability

## 13. Time & Space Complexity

- Time: O(1) per declaration check
- Space: Minimal — just pointer adjustments

## 14. Interview Questions

1. What is hoisting?
2. What gets hoisted?
3. Difference between function declaration and expression hoisting?
4. Why does `let` cause ReferenceError?
5. Can class be used before definition?
6. Relationship between hoisting and TDZ?

## 15. Follow-up Questions

- "Is hoisting copying code or moving it?"

## 16. Production Best Practices

1. Initialize variables at top
2. Declare functions before calling them
3. Use strict mode to catch issues
4. Prefer const for constants

## 17. Summary

- Hoisting lifts declarations
- Vars → undefined, Functions → ready
- let/const subject to TDZ
- Part of Memory Creation Phase

## 18. Revision Notes

- Hoist = move to top of scope
- Function decl → usable early
- Var → undefined, not error
- let/const → ReferenceError in TDZ

## 19. Practice Questions

1. Predict:
```javascript
x();
y();

function x() { console.log("x"); }
var y = function() { console.log("y"); };
```

2. Explain TDZ impact:
```javascript
console.log(typeof t);
let t = 10;
```

3. Fix hoisting confusion:
```javascript
greet();
let greet = () => console.log("Hi!");
```

## 20. References

- [MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [ECMAScript Spec](https://tc39.es/ecma262/)
- ["You Don’t Know JS: Scope & Closures"]

### Next File
**009 - Temporal Dead Zone.md**