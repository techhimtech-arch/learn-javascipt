# Memory Creation Phase

## 1. Definition

The **Memory Creation Phase** (also called the **Creation Phase**) is the first phase of any Execution Context. During this phase:

- Variables get placeholder memory (set to `undefined`)
- Functions are fully parsed and stored in memory
- The global object and `this` binding are initialized

## 2. Why do we need it?

This phase allows JavaScript to:

- Support **hoisting**
- Guarantee that function declarations and variables are accessible before they’re executed
- Pre-allocate memory slots for declarations

## 3. Internal Working

```
JS Engine
    │
    ▼
Start Execution Context
    │
    ▼
┌────────────────────────────┐
│ Memory Creation Phase      │
│ 1. Allocate space for      │
│    all variables           │
│ 2. Set vars to `undefined`  │
│ 3. Store full function refs │
└────────────────────────────┘
    │
    ▼
Begin Execution Phase
```

## 4. Step-by-Step Execution

Given:
```javascript
function sayHi() { return "Hello"; }
let msg = "World";
```

Memory Creation Phase:
- `sayHi`: full function reference stored
- `msg`: memory allocated, set to `undefined`

Execution Phase:
- `msg = "World"` → now `"World"`

## 5. Syntax

No explicit syntax needed; it's part of JS engine workflow.

Example showing effect:
```javascript
hoistedVar;
var hoistedVar = 5;

callLater();
function callLater() {
  console.log("Called before assignment");
}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
console.log(x); // undefined (memory allocated)
var x = 10;
```

### Medium
```javascript
myFunc(); // Works due to hoisting
function myFunc() {}
```

### Advanced
```javascript
class MyClass {
  static method() {}
}
new MyClass(); // Throws error! (TDZ related)
```

## 7. Visual Diagram (ASCII)

```
Execution Context
┌────────────────────────────┐
│ Memory Creation Phase      │
├────────────────────────────┤
│ x: undefined               │ ← var hoisted
│ y: full function pointer   │ ← function hoisted
│ z: undefined               │
└────────────────────────────┘
│ this: global object        │
│ window: reference          │
└────────────────────────────┘

Transition to Execution Phase:
x gets value 10
```

## 8. Real-world Example

In Angular:
```typescript
const apiUrl = environment.apiUrl;
class AppModule {}

@NgModule({ })
export class AppModule {}
```

During module load:
- `apiUrl` is hoisted but `undefined` initially
- `AppModule` fully available in memory

## 9. Angular Use Case

- Angular module definitions are parsed early thanks to this phase.
- Decorators applied at design/compile time benefit from prior knowledge of structure.

## 10. Common Mistakes

❌ Thinking hoisting gives meaningful values.
✔ Hoisting gives `undefined`.

❌ Assuming class declaration supports calling earlier.
✔ Classes follow Temporal Dead Zone (TDZ).

## 11. Edge Cases

1. **Function expressions won't be usable before assignment**
2. **Class declarations throw TDZ errors**
3. **Variable redeclaration conflicts**
4. **let/const vs var hoisting differences**

## 12. Performance Considerations

- Hoisting large objects wastes memory temporarily.
- Unused function declarations still take full space.
- Prefer lazy-loading/deferred initialization for heavy data.

## 13. Time & Space Complexity

- Time: O(n), n = number of declarations
- Space: O(n)

## 14. Interview Questions

1. What is hoisting?
2. Explain memory creation phase steps.
3. Difference between var, let, const hoisting.
4. Why can’t you use classes before declaration?
5. What is Temporal Dead Zone?

## 15. Follow-up Questions

- "Does hoisting copy or move code?"

## 16. Production Best Practices

1. Declare variables at top of block/scope.
2. Initialize function expressions immediately.
3. Avoid relying on hoisting heavily.

## 17. Summary

- Phase 1 of EC
- Hoists variables/functions
- Allocates memory
- Sets placeholders

## 18. Revision Notes

- Variables → undefined
- Functions → full references
- let/const → TDZ zone
- Part of GEC/FEC

## 19. Practice Questions

1. Predict output:
```javascript
function test() {
  console.log(a);
  let a = 10;
}
test();
```

2. Draw memory snapshot after creation phase.

3. Compare hoisting behaviors of var/let/const/functions.

## 20. References

- [MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [ECMA-262](https://tc39.es/ecma262/)

### Next File
**006 - Execution Phase.md**