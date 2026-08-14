# Constructor Functions

## 1. Definition

A **Constructor Function** is a regular function invoked with the `new` keyword to create **new instances** of objects.

## 2. Why do we need it?

To encapsulate object creation logic and instantiate multiple similar objects consistently.

## 3. Internal Working

Using `new` triggers these steps:

1. New empty object created
2. Its `[[Prototype]]` set to `Constructor.prototype`
3. `this` inside function refers to new object
4. If no return → new object returned automatically

## 4. Step-by-Step Execution

```javascript
function Person(name) {
  this.name = name;
}
const john = new Person("John");
```

Steps:
1. `new` triggers internal steps
2. `this` = newly created object
3. `name` set on that object
4. Returns object → assigned to `john`

## 5. Syntax

```javascript
function MyType(...args) {
  this.property = value;
}
const instance = new MyType(args);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function User(name) {
  this.name = name;
}
const u1 = new User("Raman");
```

### Medium
```javascript
function Stack() {
  let items = [];

  this.push = function(value) {
    items.push(value);
  };

  this.pop = function() {
    return items.pop();
  };
}
```

### Advanced
```javascript
function Calculator(initial = 0) {
  this.result = initial;
  return { result: this.result }; // Overrides default
}
const calc = new Calculator(5); // { result: 5 }
```

## 7. Visual Diagram (ASCII)

```
New Object Creation Process

Function Call with 'new'
        │
        ▼
┌────────────────────────┐
│ 1. Create empty object │
└─────────┬──────────────┘
          ▼
┌────────────────────────┐
│ 2. Set [[Prototype]]   │
│    to Constructor.prototype |
└─────────┬──────────────┘
          ▼
┌────────────────────────┐
│ 3. Execute Constructor │
│    with this=newObject |
└─────────┬──────────────┘
          ▼
┌────────────────────────┐
│ 4. Return newObject    │
└────────────────────────┘
```

## 8. Real-world Example

Angular Component Factory Pattern:
```typescript
function ComponentFactory<T>(type: Type<T>) {
  this.componentType = type;
}
```

## 9. Angular Use Case

- Used historically before ES6 classes became standard
- Sometimes used in dynamic instantiation scenarios
- DI containers simulate constructor patterns

## 10. Common Mistakes

❌ Missing `new` leads to incorrect behavior
❌ Returning non-object ignores result

## 11. Edge Cases

1. **Returning objects overrides new result**
2. **Calling without `new` breaks `this`**
3. **Mixing return types**

## 12. Performance Considerations

- Modern engines optimize class syntax more
- Prefer ES6+ classes unless legacy support needed

## 13. Time & Space Complexity

- Instantiation: O(1)
- Space: depends on instance data size

## 14. Interview Questions

1. What does `new` do?
2. Can constructor skip returning?
3. What happens without `new`?
4. How to detect if called with `new`?

## 15. Follow-up Questions

- "How to safely call constructors optionally with `new`?"

## 16. Production Best Practices

1. Prefer class syntax for clarity
2. Document required instantiation method
3. Guard against misuse with assertions

## 17. Summary

- `new` enables instance creation
- Sets prototype automatically
- Handles returning objects sensibly

## 18. Revision Notes

- Steps: create → proto set → run fn → return
- this bound automatically
- Objects returned override default

## 19. Practice Questions

1. Recreate `new` manually:
```javascript
function myNew(Constructor, ...args) { ... }
```

2. Convert class to constructor function.

3. Handle edge case where constructor returns primitive.

## 20. References

- [MDN: Constructor](https://developer.mozilla.org/en-US/docs/Glossary/Constructor)

### Next File
**021 - ES6 Classes.md**