# Symbols

## 1. Definition

**Symbol** is a primitive data type introduced in ES6 that represents a **unique, immutable identifier**.

Symbols cannot be accessed accidentally because their string keys are unavailable.

## 2. Why do we need it?

- Safe property naming to avoid collisions
- Add metadata without fear of overwriting
- Hide implementation details

## 3. Internal Working

Each `Symbol()` call creates a globally unique value — no two Symbols are equal.

Global registry (`Symbol.for`) ensures consistency across realms.

## 4. Step-by-Step Execution

Example:
```javascript
const id = Symbol('id');
const user = {};
user[id] = 123;
Object.keys(user); // []
Object.getOwnPropertySymbols(user); // [Symbol(id)]
```

Steps:
1. `Symbol('id')` creates unique key
2. Assigned to object as hidden property
3. Not enumerable via normal loops
4. Retrieved separately via reflection APIs

## 5. Syntax

```javascript
const sym = Symbol(description);
obj[sym] = value;
const global = Symbol.for(key); // Shared symbol
Symbol.keyFor(global); // Retrieve associated description string
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const ID = Symbol('userId');
const user = { [ID]: 1, name: 'Alice' };
console.log(Object.keys(user)); // ['name']
```

### Medium
```javascript
const iterable = Symbol.iterator;
class MyCollection {
  [iterable]() { /* custom iterator */ }
}
```

### Advanced
```javascript
class Observable {
  static [Symbol.hasInstance](instance) {
    return instance && typeof instance.subscribe === 'function';
  }
}
```

## 7. Visual Diagram (ASCII)

```
Hidden Property Access:

Normal keys:
┌────────────┐
│ name       │ → "Alice"
│ age        │ → 30
└────────────┘

Symbol key:
┌────────────┐
│ Symbol(id) │ → 123 ← Hidden from keys()
└────────────┘
```

## 8. Real-world Example

Angular uses Symbols internally for DI tokens and directive markers.

## 9. Angular Use Case

Custom structural directives or component queries may use Symbols internally.

## 10. Common Mistakes

❌ Comparing Symbols with strings
❌ Expecting Symbol properties in JSON.stringify

## 11. Edge Cases

1. **Symbol coercion throws**
   ```javascript
   `${Symbol()}`; // TypeError
   ```

2. **Shared symbols with Symbol.for**
3. **Keys ignored in JSON serialization**

## 12. Performance Considerations

Fast equality checks; minimal memory footprint.

## 13. Time & Space Complexity

Creation: O(1)
Equality: O(1)

## 14. Interview Questions

1. How to check if value is Symbol?
2. When to use Symbol.for?
3. Why hide properties?

## 15. Follow-up Questions

- "How does Angular leverage Symbol.iterator?"
- "Can you pass Symbols to other scopes?"

## 16. Production Best Practices

1. Prefer Symbol for internal bookkeeping
2. Always describe your Symbols clearly
3. Avoid leaking Symbols unintentionally

## 17. Summary

Unique identifiers ensuring safe extensibility.

## 18. Revision Notes

- Primitives, unique-by-default
- Not auto-coerced to strings
- Accessible via Reflect/Object APIs

## 19. Practice Questions

1. Create hidden flag on class instance.
2. Extend built-in Symbol.iterator pattern.
3. Use Symbol.hasInstance creatively.

## 20. References

- [MDN: Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

### Next File
**014 - BigInt.md**
