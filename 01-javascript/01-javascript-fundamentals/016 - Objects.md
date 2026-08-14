# Objects

## 1. Definition

An **Object** in JavaScript is a collection of key-value pairs representing a real-world entity or structured data.

## 2. Why do we need it?

To store organized, grouped information and model relationships between entities.

## 3. Internal Working

Objects store data in **properties**, indexed by string keys (or Symbols), with associated values which can be:

- Primitives (`string`, `number`, `boolean`, etc.)
- Other objects
- Functions (methods)

Internally, the JavaScript engine may optimize storage depending on shape consistency (V8 hidden classes).

## 4. Step-by-Step Execution

Creating an object:
```javascript
const person = { name: "Alice", age: 30 };
person.job = "Engineer";
```

Steps:
1. Object literal `{...}` parsed
2. Property slots allocated in memory
3. Keys mapped to property descriptors
4. Dynamic additions like `.job` require shape transition (hidden class update)

## 5. Syntax

```javascript
// Literal notation
const obj = { key: value };

// Dot notation
obj.key;

// Bracket notation
obj['key'];

// Computed properties
const key = 'dynamic';
const obj2 = { [key]: 'value' };
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const user = { name: "John", age: 28 };
console.log(user.name);
```

### Medium
```javascript
const calculator = {
  value: 0,
  add(n) { this.value += n; return this; } // Method chaining
};
calculator.add(5).add(3);
```

### Advanced
```javascript
const ProxyExample = new Proxy({}, {
  get(target, prop) {
    return target[prop] ?? `Unknown property ${prop}`;
  }
});
```

## 7. Visual Diagram (ASCII)

```
Memory Layout of Object

┌────────────────────┐
│ Key: name          │ → String
├────────────────────┤
│ Key: age           │ → Number
├────────────────────┤
│ Key: greet         │ → Function Pointer
└────────────────────┘
     ↑ Stored in heap, accessed via reference
```

## 8. Real-world Example

Angular Interface Modeling:
```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

const currentUser: User = {
  id: 101,
  name: "Raman",
  email: "raman@example.com"
```

## 9. Angular Use Case

| Angular Feature | Object Usage |
|---|---|
| Component Inputs (`@Input`) | Accept object configs |
| Service State Models | Hold app-wide data structures |
| Router Config Objects | Define route paths and resolvers |
| HTTP Interceptors | Transform request/response objects |

## 10. Common Mistakes

❌ Shallow copying objects unintentionally
❌ Comparing object references instead of contents

## 11. Edge Cases

1. **Property descriptors affect behavior**
   ```javascript
   const frozen = Object.freeze({ x: 1 });
   frozen.x = 2; // silent failure
   ```

2. **Accessing missing properties**
   ```javascript
   console.log(obj.missing); // undefined, not error
   ```

3. **Key coercion**
   ```javascript
   const obj = {};
   obj[123] = "value"; // stored as string '123'
   ```

## 12. Performance Considerations

- Consistent object shapes improve optimization
- Avoid deleting properties dynamically
- Prefer predefined property sets

## 13. Time & Space Complexity

- Access: O(1) average
- Iteration: O(n), n = number of properties
- Memory: O(n)

## 14. Interview Questions

1. Ways to create objects?
2. Difference between dot/bracket access?
3. Enumerate, configurable, writable flags?
4. How does `Object.freeze` work?
5. What is shallow copy limitation?

## 15. Follow-up Questions

- "How efficient is property lookup?"
- "Can objects trigger side effects via getters?"

## 16. Production Best Practices

1. Freeze or seal models where mutation shouldn’t happen
2. Use interfaces/types to enforce shape
3. Validate external object inputs

## 17. Summary

- Objects store key-value mappings
- Flexible structure, fast access
- Supports methods and prototypes
- Central to JS data modeling

## 18. Revision Notes

- Literal `{}` / `new Object()`
- Dot vs bracket access
- Property descriptors matter
- Shallow copy ≠ deep copy

## 19. Practice Questions

1. Deep clone an object manually (without JSON).

2. Compare two objects deeply.

3. Implement getter/setter pattern.

## 20. References

- [MDN: Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [ECMAScript Spec](https://tc39.es/ecma262/)

### Next File
**017 - Object.create().md**