# Reflect

## 1. Definition

**Reflect** is a built-in object providing methods for interceptable JavaScript operations — pairing with `Proxy` traps and offering safer alternatives to older patterns.

## 2. Why do we need it?

Provide consistent, predictable ways to perform language operations that were previously scattered or error-prone.

## 3. Internal Working

Mirror operator semantics:
- `Reflect.getOwnPropertyDescriptor`
- `Reflect.defineProperty`
- `Reflect.deleteProperty`
- `Reflect.set`

Used primarily within Proxy handlers.

## 4. Step-by-Step Execution

Example:
```javascript
const obj = { a: 1 };
Reflect.set(obj, "b", 2);
console.log(obj.b); // 2

const proxy = new Proxy(obj, {
  get(target, prop) {
    return Reflect.get(target, prop); // Safer than direct access
  }
});
```

## 5. Syntax

```javascript
Reflect.method(target, [property], [value], [receiver])
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const obj = {};
Reflect.defineProperty(obj, 'x', { value: 42 });
```

### Medium
```javascript
// Proxy with Reflect
const handler = {
  get(target, prop) {
    console.log(`GET ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log(`SET ${prop} = ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const p = new Proxy({}, handler);
p.name = "Alice"; // logs "SET name = Alice"
console.log(p.name); // logs "GET name"
```

### Advanced
```javascript
// Observable-like proxy
function makeObservable(obj, callback) {
  return new Proxy(obj, {
    set(target, prop, value) {
      callback(prop, value);
      return Reflect.set(target, prop, value);
    }
  });
}

const obj = makeObservable({}, (key, val) => {
  console.log(`${key} changed to ${val}`);
});

obj.name = "Alice"; // logs: "name changed to Alice"
```

## 7. Visual Diagram (ASCII)

```
Reflect vs Direct Operations

Direct: obj.prop = value
        → Returns assigned value, may invoke setter

Reflect.set(obj, "prop", value)
        → Returns boolean success/failure, safer
        
Proxy Handler:
get(target, key) { return Reflect.get(target, key); }
set(target, key, val) { return Reflect.set(target, key, val); }
```

## 8. Real-world Example

Building reactive systems without libraries using Proxy + Reflect.

## 9. Angular Use Case

Internal use in change detection systems (though Angular abstracts this).

## 10. Common Mistakes

❌ Mixing Reflect and direct operations inconsistently
❌ Forgetting return values/booleans

## 11. Edge Cases

1. **Receiver parameter importance**
   ```javascript
   Reflect.get(obj, '__proto__', receiver);
   ```

2. **Enumerate deleted properties**
3. **Proxy recursion prevention**

## 12. Performance Considerations

Nearly identical overhead to direct operations.

## 13. Time & Space Complexity

O(1) per operation.

## 14. Interview Questions

1. Why use Reflect over direct access?
2. Relationship to Proxy?
3. Return value differences?

## 15. Follow-up Questions

- "Compare Reflect.apply vs Function.prototype.call?"

## 16. Production Best Practices

1. Prefer Reflect in Proxy handlers
2. Use consistent operation style
3. Leverage return values for error checking

## 17. Summary

Reflect standardizes meta-programming primitives — safer than legacy alternatives.

## 18. Revision Notes

- 13 static methods
- Return booleans where applicable
- Designed for use with Proxy
- Safer default behaviors

## 19. Practice Questions

1. Create logging proxy with Reflect.
2. Implement observable object wrapper.
3. Safely define properties en masse.

## 20. References

- [MDN: Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

### Module 2 Complete (22 files)! ✅
