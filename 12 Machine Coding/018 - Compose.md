# Compose

## 1. Definition

**Compose** is a JavaScript utility that composes multiple unary functions from right-to-left — conceptually equivalent to mathematical function composition f(g(x)).

## 2. Why do we need it?

Express mathematical/logical relationships naturally — particularly useful with libraries like Ramda.

## 3. Internal Working

Implementation:
```javascript
const compose = (...fns) => (value) => 
  fns.reduceRight((v, fn) => fn(v), value);
```

Flow:
1. Start with initial value
2. Pass through rightmost function first
3. Pass its result to next function (moving leftward)
4. Final leftmost function output is returned

## 4. Step-by-Step Execution

Example:
```javascript
const double = x => x * 2;
const addOne = x => x + 1;

compose(double, addOne)(3); 
// addOne first: 4, then double: 8
```

Steps:
1. Input starts as 3
2. `addOne(3)` → 4
3. `double(4)` → 8
4. Final result: 8

## 5. Syntax

```javascript
const result = compose(fnA, fnB, fnC)(initialValue);
// Execution order: fnC → fnB → fnA
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const square = x => x * x;
const increment = x => x + 1;

compose(increment, square)(3); // (3²) + 1 = 10
```

### Medium
```javascript
const split = str => str.split('');
const reverse = arr => arr.reverse();
const join = arr => arr.join('');

const reverseAndJoin = compose(join, reverse, split);
reverseAndJoin("hello"); // "olleh"
```

### Advanced
```typescript
// Point-free style for complex transformations
const transformData = compose(
  JSON.stringify,
  applyFormatting,
  normalizeFields,
  validateInput
);

transformData(rawData);
```

## 7. Visual Diagram (ASCII)

```
Mathematical Composition (Right-to-Left)

Input ──► [h] ──► [g] ──► [f] ──► Output
```

## 8. Real-world Example

Creating readable business rules pipeline.

## 9. Angular Use Case

RxJS operator chaining internally uses pipe-like patterns.

## 10. Common Mistakes

❌ Confusing evaluation order with pipe
❌ Impure functions breaking composition

## 11. Edge Cases

1. **Empty composition**
   ```javascript
   compose()(value); // Returns value
   ```

2. **Single function**
   ```javascript
   compose(fn)(x); // Equivalent to fn(x)
   ```

## 12. Performance Considerations

Equivalent to nested function calls — minimal overhead.

## 13. Time & Space Complexity

O(n) for n composed functions.

## 14. Interview Questions

1. Relationship to pipe?
2. Mathematical composition equivalent?
3. Practical usage scenarios?

## 15. Follow-up Questions

- "Which style is more readable?"

## 16. Production Best Practices

1. Prefer readable naming for composed functions
2. Ensure unary functions for clean composition
3. Combine with error wrapping at boundaries

## 17. Summary

Compose offers math-inspired right-to-left function chaining — powerful for point-free programming.

## 18. Revision Notes

- Right-to-left execution
- Equivalent to f(g(x))
- Often used with point-free style
- Less intuitive than pipe for left-to-right readers

## 19. Practice Questions

1. Implement compose utility.
2. Reverse-engineer pipe using compose.
3. Build middleware chain via compose.

## 20. References

- [Ramda: compose](https://ramdajs.com/docs/#compose)
- [MDN: Function Composition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_composition)

### Module 12 (Machine Coding) - Continuing important patterns ✅
