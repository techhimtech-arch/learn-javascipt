# Temporal Dead Zone

## 1. Definition

The **Temporal Dead Zone (TDZ)** refers to the period between entering a scope and the moment a variable declared with `let` or `const` is initialized. During this interval, accessing the variable throws a `ReferenceError`.

## 2. Why do we need it?

To enforce safer coding practices by ensuring variables are accessed only after being declared.

## 3. Internal Working

```
Scope Entry → TDZ starts → Declaration Encountered → Initialized → Usable
```

Variables are hoisted but not initialized.

## 4. Step-by-Step Execution

Example:
```javascript
console.log(x); // ReferenceError
let x = 5;
```

Steps:
1. Scope entered
2. `x` exists but uninitialized (in TDZ)
3. `console.log(x)` attempts access → ReferenceError thrown
4. `let x = 5` initializes → x usable thereafter

## 5. Syntax

```javascript
{
  console.log(temp); // ❌ ReferenceError: TDZ
  let temp = 10;
  console.log(temp); // ✅ Now accessible
}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function demo() {
  console.log(a); // ReferenceError
  let a = 1;
}
```

### Medium
```javascript
function outer() {
  let b = 2;
  inner();
  
  function inner() {
    console.log(b); // Still accessible from closure
  }
}
```

### Advanced
```javascript
class Example {
  static prop = getValue(); // Evaluated lazily
  static method() {}
}
```

## 7. Visual Diagram (ASCII)

```
Scope Lifecycle with TDZ

Enter Scope
    ↓
[ TDZ Period Begins ]
    ↓
Declaration executed
    ↓
[ Variable Now Available ]
    ↓
End of Scope
```

## 8. Real-world Example

Angular Template Errors:
```typescript
export class ItemComponent {
  items: Item[] | undefined;

  getItems() {
    this.items?.map(item => item.name); // Safe navigation avoids TDZ
  }
}
```

## 9. Angular Use Case

- Angular change detection avoids TDZ errors via safe navigation operators (`?.`, `??`)
- DI tokens resolved after class fields evaluated

## 10. Common Mistakes

❌ Accessing `let`/`const` before initializing.
❌ Assuming `typeof` works in TDZ.

## 11. Edge Cases

1. **`typeof` doesn’t help in TDZ**
   ```javascript
   console.log(typeof x); // Error, not "undefined"
   let x;
   ```

2. **Closures still respect TDZ**
   ```javascript
   function outer() {
     return () => {
       console.log(innerVar); // May be okay depending on timing
     };
     let innerVar = 10;
   }
   ```

3. **For loops create new TDZ contexts**
   ```javascript
   for (let i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 0); // Each iteration gets own binding
   }
   ```

## 12. Performance Considerations

- TDZ introduces extra checks at runtime
- Helps prevent bugs proactively
- Can be avoided by proper declaration ordering

## 13. Time & Space Complexity

- Constant overhead per check
- No significant perf impact in normal apps

## 14. Interview Questions

1. Define TDZ
2. Compare `var`, `let`, `const` under TDZ
3. When exactly does TDZ begin/end?
4. Is `typeof` safe in TDZ?
5. How to avoid TDZ errors?

## 15. Follow-up Questions

- "Can TDZ exist for function parameters?"
- "Does TDZ apply to destructuring?"

## 16. Production Best Practices

1. Declare variables at top of scope
2. Don't rely on older JS quirks
3. Use strict mode
4. Lint for accidental TDZ access

## 17. Summary

- TDZ = period before initialization for `let`/`const`
- Accessing during TDZ throws error
- Improves safety over `var`

## 18. Revision Notes

- let/const → TDZ zone
- typeof fails in TDZ
- Closures affected
- Loop creates fresh bindings

## 19. Practice Questions

1. What happens here?
```javascript
function test() {
  try {
    console.log(z);
  6. Fix this:
```typescript
name: string;
console.log(this.name);
```

## 20. References

- [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [ECMAScript Spec](https://tc39.es/ecma262/)

### Next File
**010 - Scope.md**