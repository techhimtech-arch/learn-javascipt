# let and const

## 1. Definition

ES6 introduced `let` and `const` as alternatives to `var`, offering **block-scoping** and **clearer intent** regarding mutability.

- `let`: declares a variable that can be reassigned
- `const`: declares a constant reference (cannot be reassigned)

## 2. Why do we need it?

`var` suffers from:
- Function-scoping (often confusing)
- Hoisting with `undefined`
- Re-declaration allowed silently

`let`/`const` fix these with:
- Block scoping
- Temporal Dead Zone enforcement
- Stricter re-declaration rules

## 3. Internal Working

During Memory Creation Phase:
- Variables declared with `let` or `const` are hoisted but remain uninitialized (in TDZ)
- Accessing before initialization throws ReferenceError
- After declaration line, behaves normally

## 4. Step-by-Step Execution

Example:
```javascript
function example() {
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 10;
}

{
  const PI = 3.14;
  PI = 3.15; // TypeError: Assignment to constant variable
}
```

Step-by-step:
1. Enter function scope → `a` enters TDZ
2. Try to log → ReferenceError because still in TDZ
3. Declare `a = 10` → exits TDZ
4. Block scope ends, redeclare `PI`
5. Attempted reassignment → TypeError

## 5. Syntax

```javascript
let mutableVar = "changeable";
mutableVar = "updated";

const immutableBinding = { name: "Fixed" };
immutableBinding.name = "Changed"; // Allowed - mutating contents!
// immutableBinding = {}; // TypeError!
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
let x = 1;
x = 2;
const y = 3;
// y = 4; // Error
```

### Medium
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}
```

### Advanced
```javascript
const config = Object.freeze({
  API_URL: "https://api.myapp.com",
  TIMEOUT: 5000
});
```

## 7. Visual Diagram (ASCII)

```
Block Scoping Visualization

┌──────────────────┐
│ Outer Scope      │
│ var globalVar    │
└────────┬─────────┘
         │
┌────────▼─────────┐
│ Block Scope      │
│ let localVar     │ ← dies at closing brace
│ const PI         │
└──────────────────┘

 localVar/PI inaccessible outside
```

## 8. Real-world Example

Angular component:
```typescript
@Component({
  selector: 'user-detail',
  template: '<p>{{userName}}</p>'
})
export class UserDetailComponent implements OnInit {
  userName: string;

  ngOnInit(): void {
    let userId = this.route.snapshot.params['id'];
    const endpoint = `/api/users/${userId}`;
    this.userService.get(endpoint).subscribe(user => {
      this.userName = user.name;
    });
  }
}
```

## 9. Angular Use Case

Used extensively throughout Angular applications:
- Component properties (`@Input`, `@Output`)
- Local variables in templates and services
- Configuration objects with `Object.freeze`

## 10. Common Mistakes

❌ Assuming `const` deep-freezes objects
❌ Misunderstanding closure interactions
❌ Reassigning `const` bindings

## 11. Edge Cases

1. **TDZ violation throws ReferenceError**
   ```javascript
   console.log(typeof a); // ReferenceError due to TDZ
   let a;
   ```

2. **`const` objects/arrays modifiable internally**
   ```javascript
   const arr = [1, 2, 3];
   arr.push(4); // OK
   ```

3. **Re-declaration rules stricter than `var`**
   ```javascript
   var a; var a; // OK
   let b; let b; // SyntaxError
   ```

## 12. Performance Considerations

- Generally equivalent performance in modern engines
- Slightly better optimization opportunities due to clearer intent
- TDZ adds negligible overhead

## 13. Time & Space Complexity

- Declaration/check: O(1)
- Access: O(1)
- No additional space cost beyond value storage

## 14. Interview Questions

1. Difference between `var`, `let`, and `const`?
2. What is TDZ and how does it affect access?
3. Can you modify a `const` object?
4. Why prefer `let` over `var` in loops?
5. When should you use `let` vs `const`?

## 15. Follow-up Questions

- "Does `let` in a `for` loop create new scope each iteration?"
- "What happens if you never use a `let` variable?"

## 16. Production Best Practices

1. Prefer `const` whenever possible
2. Use `let` only when reassignment is necessary
3. Avoid `var` entirely in new code
4. Keep related declarations grouped
5. Lint rules should enforce these practices

## 17. Summary

- `let`: Reassignable, block-scoped
- `const`: Immutable binding, block-scoped
- TDZ prevents premature access
- Superior to `var` for most cases

## 18. Revision Notes

- TDZ = period before declaration until accessible
- const ≠ frozen object
- let/const = block scope
- var = function scope

## 19. Practice Questions

1. Demonstrate TDZ.
2. Fix `var` issue in loop.
3. Deep-freeze object with const.

## 20. References

- [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

### Next File
**002 - Arrow Functions.md**
