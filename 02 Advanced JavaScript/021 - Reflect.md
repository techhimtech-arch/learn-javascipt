# Reflect

## 1. Definition

**Reflect** is a built-in object that provides methods for **interceptable JavaScript operations** — essentially pairing with `Proxy` traps.

All methods return booleans indicating success/failure unlike many legacy equivalents.

## 2. Why do we need it?

To centralize reflection utilities and improve consistency across object operations.

## 3. Internal Working

Each method corresponds to a language operation:
- `Reflect.get(target, key)` → equivalent to `target[key]`
- `Reflect.set(target, key, val)` → equivalent to `target[key] = val`
- `Reflect.has(target, key)` → equivalent to `key in target`

## 4. Step-by-Step Execution

Example:
```javascript
const obj = { a: 1 };
Reflect.get(obj, "a"); // 1
Reflect.set(obj, "b", 2); // true
Reflect.has(obj, "b"); // true
```

## 5. Syntax

```javascript
Reflect.[method](target, ...args)
```

Key methods:
- get, set, has, deleteProperty
- ownKeys, getOwnPropertyDescriptor
- apply, construct, isExtensible, preventExtensions

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const obj = { x: 10 };
console.log(Reflect.has(obj, "x")); // true
```

### Medium
```javascript
const handler = {
  set(target, property, value) {
    console.log(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};
```

### Advanced
```javascript
const fn = (...args) => args.reduce((acc, v) => acc + v, 0);
const sum = Reflect.apply(fn, null, [1, 2, 3]); // 6
```

## 7. Visual Diagram (ASCII)

```
Proxy Trap ↔ Reflect Method Mapping

Proxy Trap    → Reflect Equivalent
get           → Reflect.get
set           → Reflect.set
has           → Reflect.has
apply         → Reflect.apply
construct     → Reflect.construct
deleteProperty → Reflect.deleteProperty
```

## 8. Real-world Example

Vue 3 source extensively uses `Reflect` alongside `Proxy`.

## 9. Angular Use Case

Custom directive implementations needing low-level object manipulation.

## 10. Common Mistakes

❌ Ignoring return values
❌ Bypassing traps accidentally

## 11. Edge Cases

1. **Boolean return semantics differ from older APIs**
   ```javascript
   delete obj.prop; // true/false silently
   Reflect.deleteProperty(obj, "prop"); // explicit boolean
   ```

## 12. Performance Considerations

Minimal overhead; preferred in Proxy contexts

## 13. Time & Space Complexity

Equivalent to base operations

## 14. Interview Questions

1. Purpose of Reflect API?
2. Pair with Proxy usage?
3. Advantages over built-ins?

## 15. Follow-up Questions

- "Why did ES6 introduce Reflect?"

## 16. Production Best Practices

1. Use Reflect.set instead of direct assignment in Proxy traps
2. Leverage return values for robust error handling
3. Prefer Reflect.apply over Function.prototype.call/apply

## 17. Summary

Modern, consistent reflection utilities enhancing Proxy capabilities.

## 18. Revision Notes

- 1:1 with Proxy traps
- Returns booleans
- Used inside Proxy handlers commonly
- Replaces some older unsafe patterns

## 19. Practice Questions

1. Rewrite proxy trap using Reflect.
2. Safely delete nested property.
3. Dynamically apply function with args.

## 20. References

- [MDN: Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

---

🎉 **Module 2 Complete!**  
All 21 topics generated covering Promises, async patterns, Event Loop, Web APIs, data structures, and metaprogramming.  

Ready for Module 3 (ES6+) next. Let me know when to start! 🚀

### Next File
**Back to Module 1 (already completed)**  
**Proceed to Module 3 → 001 - let, const.md**
