# this Keyword

## 1. Definition

The **`this` keyword** in JavaScript refers to the **context** in which a function is called. Its value depends entirely on **how the function is invoked**, NOT on where it’s defined.

## 2. Why do we need it?

- Allows functions to operate on different objects
- Enables method chaining and fluent APIs
- Supports object-oriented programming patterns
- Required for DOM event handling

## 3. Internal Working

The JavaScript engine determines `this` using four binding rules:

1. **Default Binding**
2. **Implicit Binding**
3. **Explicit Binding (`call`, `apply`, `bind`)**
4. **New Binding**

## 4. Step-by-Step Execution

Example:
```javascript
function sayAge() { console.log(this.age); }
const person = {
  age: 25,
  greet: sayAge
};
person.greet(); // Implicit Binding → person.age = 25
```

Steps:
1. `person.greet()` — called as property of `person`
2. Engine sets `this = person`
3. `this.age == 25`

## 5. Syntax

```javascript
obj.method();        // this = obj (implicit)
fn.call(obj);        // this = obj (explicit)
new Constructor();   // this = new obj (new)
fn();                // this = undefined/global (default)
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function show() { console.log(this); }
show(); // window in browser
```

### Medium
```javascript
const user = {
  name: "Alice",
  introduce() { console.log(`Hi, I'm ${this.name}`); }
};
user.introduce();
```

### Advanced
```javascript
class Calculator {
  constructor(initial = 0) { this.value = initial; }
  add(n) { this.value += n; return this; } // Method chaining
}
```

## 7. Visual Diagram (ASCII)

```
Binding Rules Tree

Invocation Style
        │
        ├── Default → global/undefined
        │
        ├── Implicit → owner object
        │
        ├── Explicit → arg passed to call/apply/bind
        │
        └── New → newly created instance

Arrow Functions Bypass These Rules!
```

## 8. Real-world Example

Angular Component Context:
```typescript
@Component({
  selector: 'app-user',
  template: '<button (click)="onClick()">Click</button>'
})
export class UserComponent {
  onClick(event: MouseEvent) {
    console.log(this); // Reference to UserComponent instance
  }
}
```

## 9. Angular Use Case

| Angular Construct | `this` Context |
|---|---|
| Component class | Refers to component instance |
| Arrow in class fields | Captures component `this` |
| Template event handlers | Bound to component |
| DI constructor params | Injected services available via `this` |

## 10. Common Mistakes

❌ Losing `this` when passing methods around
❌ Arrow functions breaking intended dynamic binding

## 11. Edge Cases

1. **Detaching method loses `this`**
   ```javascript
   const fn = obj.method;
   fn(); // this default
   ```

2. **Arrow functions ignore binding**
   ```javascript
   const arrow = () => console.log(this);
   arrow.call({ custom: true }); // this unchanged
   ```

3. **DOM event handlers set `this` to element**
   ```javascript
   btn.addEventListener('click', function(e) {
     console.log(this === btn); // true
   });
   ```

4. **Classes auto-bind strict mode behavior**
   ```javascript
   class Foo { bar() { console.log(this); } }
   Foo.prototype.bar(); // undefined if detached
   ```

## 12. Performance Considerations

- Avoid re-binding repeatedly
- Use `.bind()` sparingly in hot paths
- Prefer arrow syntax in constructors for performance and clarity

## 13. Time & Space Complexity

- Determining `this`: O(1)
- `.bind()` allocates new function: minor overhead

## 14. Interview Questions

1. Four binding rules?
2. `this` in arrow functions?
3. Difference between `call`, `apply`, `bind`?
4. What happens in strict mode?
5. DOM event handler `this`?
6. Class method `this`?

## 15. Follow-up Questions

- "Can you change what `this` refers to permanently?"
- "What happens if you double-bind?"

## 16. Production Best Practices

1. Always bind handlers passed to third-party libraries
2. Use class property arrows for callbacks needing component context
3. Never mutate DOM inside non-bound contexts
4. Test edge-case invocations thoroughly

## 17. Summary

- `this` resolves based on invocation style
- Arrow functions do not rebind `this`
- Binding can be forced explicitly
- Angular leverages `this` heavily in component lifecycle

## 18. Revision Notes

- 4 binding rules: default, implicit, explicit, new
- Arrow ignores bind/call/apply
- DOM events → element as `this`
- Strict mode affects default binding

## 19. Practice Questions

1. Determine `this` output:
```javascript
function f1() { return this; }
f1();
const o = { f1 };
o.f1();
```

2. Correctly bind event handler.

3. Convert detached method to safe callback.

## 20. References

- [MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [ECMAScript Spec](https://tc39.es/ecma262/)

### Next File
**015 - call(), apply(), bind().md**