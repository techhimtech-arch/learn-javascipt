# Default Parameters

## 1. Definition

**Default parameters** allow initializing function parameters with fallback values when none (or `undefined`) are passed.

## 2. Why do we need it?

Avoid boilerplate null-checks, ensure valid argument defaults.

## 3. Internal Working

If passed value is `undefined`, substitute default expression — evaluated lazily at invocation time.

## 4. Step-by-Step Execution

```javascript
function greet(name = "Guest") {
  console.log(`Hi, ${name}`);
}
greet(); // Hi, Guest
```

Steps:
1. Called without arg → `name` = undefined
2. Default kicks in → `"Guest"`
3. Function body logs it

## 5. Syntax

```javascript
function example(param = defaultValue) {}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function sayHello(name = "World") {
  console.log(`Hello, ${name}!`);
}
```

### Medium
```javascript
function paginate(page = 1, limit = 10) {
  return { page, limit };
}
```

### Advanced
```javascript
function connect({
  host = 'localhost',
  port = 8080,
  secure = false
} = {}) {
  // ...
}
```

## 7. Visual Diagram (ASCII)

```
Default Param Resolution

Function Call
    │
    ▼
Check Args vs Defaults
    │
    ├── Passed? → Use arg
    └── Undefined? → Use default
```

## 8. Real-world Example

Angular route resolver default options:
```typescript
resolve({ page = 1 }: { page?: number }) {
  return this.api.getPage(page);
}
```

## 9. Angular Use Case

Service method defaults, component input defaults.

## 10. Common Mistakes

❌ Treating falsy values as absent (only `undefined` triggers default)

## 11. Edge Cases

1. **Falsy values bypass defaults**
   ```javascript
   function fn(a = 1) { return a; }
   fn(0); // 0, not 1
   ```

2. **Expressions are lazy**
   ```javascript
   function expensive() { /* costly */ }
   function lazy(a = expensive()) {}
   ```

3. **Default referencing earlier params**
   ```javascript
   function f(a, b = a * 2) {}
   ```

## 12. Performance Considerations

Negligible overhead.

## 13. Time & Space Complexity

O(1).

## 14. Interview Questions

1. Trigger condition for defaults?
2. Expression evaluation timing?
3. Interaction with destructuring?

## 15. Follow-up Questions

- "Can defaults refer to prior params?"

## 16. Production Best Practices

1. Use for optional inputs
2. Validate types explicitly when critical
3. Avoid side-effects in defaults

## 17. Summary

Simple way to provide sensible fallbacks in function signatures.

## 18. Revision Notes

- Only `undefined` triggers default
- Evaluated lazily
- Falsy values bypass
- Supports prior param refs

## 19. Practice Questions

1. Default nested destructuring.
2. Fallback based on prior param.
3. Lazy expensive defaults.

## 20. References

- [MDN: Default Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)

### Next File
**008 - Optional Chaining.md**
