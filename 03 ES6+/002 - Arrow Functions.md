# Arrow Functions

## 1. Definition

An **Arrow Function** is a concise alternative to regular functions using `=>` syntax. It doesn't bind its own `this`, `arguments`, `super`, or `new.target`.

## 2. Why do we need it?

Concise syntax, lexical `this` binding (important for callbacks in Angular), cleaner functional programming style.

## 3. Internal Working

- Does NOT have own `this` — inherits from enclosing scope
- No `arguments` object — use rest params instead
- Cannot be used as constructor (`new` throws)
- Always anonymous unless assigned to variable

## 4. Step-by-Step Execution

Example:
```javascript
const greet = (name) => {
  return `Hello, ${name}`;
};
```

Steps:
1. Parser recognizes arrow `=>`
2. Creates compact function expression
3. Lexical `this` captured from current context
4. Invoked like normal function with same parameters

## 5. Syntax

Single-line:
```javascript
const square = x => x * x;
```

Multi-line:
```javascript
const sum = (a, b) => {
  return a + b;
};
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const add = (x, y) => x + y;
add(2, 3); // 5
```

### Medium
```javascript
const processArray = arr => arr.map(x => x * 2);
processArray([1, 2, 3]); // [2, 4, 6]
```

### Advanced
```typescript
// Angular service method using arrow for consistent this
@Injectable({ providedIn: 'root' })
export class DataService {
  fetchData = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };
}
```

## 7. Visual Diagram (ASCII)

```
Lexical `this` Binding Comparison

Regular Function:
┌──────────────────┐
│ this → depends   │
│   on invocation   │
└──────────────────┘

Arrow Function:
┌──────────────────┐
│ this → inherits  │
│   from scope      │
└──────────────────┘
```

## 8. Real-world Example

Angular event binding:
```typescript
@Component({
  selector: 'click-counter',
  template: '<button (click)="onClick()">Count: {{count}}</button>'
})
export class ClickCounterComponent {
  count = 0;
  onClick = () => {
    this.count++; // Always correct `this`
  };
}
```

## 9. Angular Use Case

Preferred for:
- Component class fields (ensures `this` correctness)
- Callback functions in async operations
- Functional array methods in pipes/services

## 10. Common Mistakes

❌ Using arrows where dynamic `this` needed
❌ Trying to use arrow as class method with `super`
❌ Expecting `arguments` object

## 11. Edge Cases

1. **No own `this`**
   ```javascript
   const obj = {
     value: 1,
     getValue: () => this.value // undefined!
   };
   ```

2. **No `arguments`**
   ```javascript
   const fn = () => arguments; // ReferenceError
   ```

3. **Cannot be constructors**
   ```javascript
   const Foo = () => {};
   new Foo(); // TypeError
   ```

4. **Returned from arrow**
   ```javascript
   const makeHandler = () => () => console.log("Clicked");
   ```

## 12. Performance Considerations

- Slightly faster than regular functions in tight loops
- No allocation of new `arguments` object
- Can be optimized well by JIT compilers

## 13. Time & Space Complexity

Equivalent to regular function calls.

## 14. Interview Questions

1. Does arrow function have its own `this`?
2. When to use/not use arrow function?
3. Can arrow function be used as constructor?
4. Difference between arrow and regular in callbacks?

## 15. Follow-up Questions

- "Will arrow function work inside Angular component decorator?"
- "How to preserve `this` without arrow?"

## 16. Production Best Practices

1. Use for callbacks needing lexical `this`
2. Avoid for object methods requiring dynamic binding
3. Prefer concise body where readability maintained
4. Be cautious in Angular templates (use class fields)

## 17. Summary

Arrow functions offer cleaner syntax and lexical binding — essential for modern JS/Angular development.

## 18. Revision Notes

- Lexical this/arguments
- Not constructors
- Concise single-expression form
- Best for callbacks

## 19. Practice Questions

1. Refactor callback to arrow.
2. Fix `this` mistake in class method.
3. Convert multi-statement function to arrow.

## 20. References

- [MDN: Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

### Next File
**003 - Template Literals.md**
