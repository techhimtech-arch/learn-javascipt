# Proxy

## 1. Definition

A **Proxy** defines custom behavior for fundamental operations on objects (property lookup, assignment, enumeration, function call, etc.).

Created via `new Proxy(target, handler)`.

## 2. Why do we need it?

To intercept and customize object interactions — enabling validation, logging, virtualization, reactive updates, etc.

## 3. Internal Working

- Proxy wraps target object
- Traps defined in `handler` intercept operations
- Fallback to default behavior if trap absent

Core traps:
- `get`, `set`
- `has`, `deleteProperty`
- `ownKeys`
- `apply` (for functions)

## 4. Step-by-Step Execution

Example:
```javascript
const target = { value: 42 };
const handler = {
  get(t, prop) {
    return prop in t ? t[prop] : 'default';
  }
};
const proxy = new Proxy(target, handler);
proxy.value;   // 42
proxy.unknown; // 'default'
```

## 5. Syntax

```javascript
const p = new Proxy(target, {
  get(t, prop) { /* custom logic */ },
  set(t, prop, val) { /* validate before assigning */ }
});
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const log = [];
const target = {};
const proxy = new Proxy(target, {
  set(t, k, v) {
    log.push(`${k}=${v}`);
    return Reflect.set(t, k, v);
  }
});
```

### Medium
```javascript
function makeReactive(obj) {
  return new Proxy(obj, {
    set(t, k, v) {
      console.log(`Setting ${k} to ${v}`);
      t[k] = v;
      render(); // Trigger view update
      return true;
    }
  });
}
```

### Advanced
```javascript
const negativeArrayProxy = (arr) => new Proxy(arr, {
  get(t, index) {
    const len = t.length;
    const idx = Number(index);
    return (idx < 0) ? t[len + idx] : t[index];
  }
});
```

## 7. Visual Diagram (ASCII)

```
Proxy Flow:

User requests property → Trap intercepts → Custom Logic → Target
```

## 8. Real-world Example

Vue 3 reactivity engine built around Proxy-based observation.

## 9. Angular Use Case

Simulating two-way data binding manually or building dynamic validators.

## 10. Common Mistakes

❌ Infinite recursion in traps
❌ Not using Reflect for defaults

## 11. Edge Cases

1. Recursion hazards in `get` trap
2. Returning wrong values from `set`
3. Performance overhead on high-frequency access

## 12. Performance Considerations

Overhead noticeable in hot paths — use selectively.

## 13. Time & Space Complexity

Trap invocation adds constant factor overhead

## 14. Interview Questions

1. Real-world proxy applications?
2. How Vue uses Proxy?
3. Implement getter validation proxy.

## 15. Follow-up Questions

- "Can proxies wrap arrays?"
- "How to prevent infinite loops?"

## 16. Production Best Practices

1. Wrap traps with Reflect calls
2. Cache proxied versions if reused
3. Profile impact of heavy trap logic

## 17. Summary

Powerful meta-programming tool for controlling object interactions.

## 18. Revision Notes

- Traps intercept ops
- Reflect recommended for base behavior
- Overhead possible in hot paths

## 19. Practice Questions

1. Build logging proxy for object.
2. Validate setter inputs.
3. Implement array negative indexing.

## 20. References

- [MDN: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

### Next File
**020 - Reflect.md**
