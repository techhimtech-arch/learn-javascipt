# ES6 Classes

## 1. Definition

ES6 introduced the `class` keyword as syntactic sugar over JavaScript's existing prototype-based inheritance model.

Classes provide cleaner syntax for constructors, methods, static members, and inheritance via `extends`.

## 2. Why do we need it?

- Cleaner, more readable syntax compared to constructor functions + prototypes
- Built-in support for extending classes (`extends`)
- Encapsulation features like private fields (`#`)
- Static method inheritance

## 3. Internal Working

Behind the scenes, the JS engine transforms class definitions into constructor functions with associated prototype methods — still fundamentally prototypal under the hood.

Key behaviors:

- Functions are **not hoisted** (unlike function declarations)
- Must be called with `new`
- Cannot be invoked without `new` (throws TypeError)

## 4. Step-by-Step Execution

Example:
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  2. constructor called via `new` → sets `name`
  3. Methods accessed via prototype chain

## 5. Syntax

```javascript
class ClassName [extends BaseClass] {
  constructor(...) {}
  methodName(...) {}
  static staticMethod(...) {}
  #privateField = value;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
class Greeter {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}
const g = new Greeter("Raman");
g.greet(); // Hello, Raman
```

### Medium
```javascript
class Counter {
  #count = 0;
  increment() { this.#count++; }
  get value() { return this.#count; }
}
```

### Advanced
```javascript
class Singleton {
  static instance;
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}
```

## 7. Visual Diagram (ASCII)

```
Class Transformation Behind the Scenes:

class Animal { speak(); }
    ↓
Internally becomes:
function Animal() {}
Animal.prototype.speak = function() {};
```

## 8. Real-world Example

Angular Components:
```typescript
@Component({
  selector: 'user-card',
  template: `<div>{{ name }}</div>`
})
export class UserCardComponent {
  name = '';
}
```

## 9. Angular Use Case

All Angular decorators rely on class semantics — especially components, services, guards, pipes.

## 10. Common Mistakes

❌ Calling class without `new` → `TypeError`
❌ Using class before declaration → TDZ

## 11. Edge Cases

1. **Expression classes**
2. **Private fields**
3. **Static blocks**
4. **Inheritance edge cases**

## 12. Performance Considerations

- Optimized well by V8 and other engines
- Avoid unnecessary inheritance chains

## 13. Time & Space Complexity

- Same as underlying prototype operations

## 14. Interview Questions

1. Are JavaScript classes real OOP?
2. Can you instantiate class without `new`?
3. What’s private field syntax?
4. Difference between constructor and method?
5. Can you override static method?

## 15. Follow-up Questions

- "What happens when you forget `new`?"
- "How do private fields compile in older browsers?"

## 16. Production Best Practices

1. Favor composition over inheritance
2. Use readonly/static where appropriate
3. Leverage private identifiers for encapsulation

## 17. Summary

- Syntactic wrapper around prototypes
- Cleaner than constructor functions
- Supports encapsulation/modern features

## 18. Revision Notes

- Not hoisted
- Must use new
- Extends keyword
- Private #field syntax
- Static methods on constructor

## 19. Practice Questions

1. Convert legacy constructor to class.

2. Implement singleton pattern using class.

3. Show private field usage.

## 20. References

- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### Next File
**022 - Inheritance.md**