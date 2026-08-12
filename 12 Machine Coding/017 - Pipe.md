# Pipe Function

## 1. Definition

**Pipe** is a JavaScript utility that composes multiple unary (single-argument) functions from left-to-right, passing the output of one as input to the next.

## 2. Why do we need it?

Enable readable, declarative transformation chains — especially when dealing with data processing pipelines.

## 3. Internal Working

Implementation:
```javascript
const pipe = (...fns) => (value) => fns.reduce((v, fn) => fn(v), value);
```

Flow:
1. Start with initial value
2. Pass through first function
3. Result becomes next function input
4. Continue until final output

## 4. Step-by-Step Execution

Example:
```javascript
const capitalize = str => str.toUpperCase();
const reverse = str => [...str].reverse().join('');
const emphasize = str => `**${str}**`;

const processString = pipe(capitalize, reverse, emphasize);
processString("hello"); // "**OLLEH**"
```

Steps:
1. Input "hello"
2. Capitalize → "HELLO"
3. Reverse → "OLLEH"
4. Emphasize → "**OLLEH**"

## 5. Syntax

```javascript
const result = pipe(funcA, funcB, funcC)(initialValue);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const double = x => x * 2;
const addOne = x => x + 1;

pipe(double, addOne)(3); // (3*2)+1 = 7
```

### Medium
```javascript
const parse = JSON.parse;
const extractField = field => obj => obj[field];
const format = value => `Result: ${value}`;

const process = pipe(
  parse,
  extractField('name'),
  format
);

process('{"name":"Alice"}'); // "Result: Alice"
```

### Advanced
```typescript
// RxJS-style operator composition
function pipe<T>(
  ...operations: Array<(input: any) => any>
): (source: T) => any {
  return (source: T) => operations.reduce((acc, op) => op(acc), source);
}

// Usage with observables-like structure
const fetchData = pipe(
  fetch,
  response => response.json(),
  data => ({ loaded: true, payload: data }),
  result => console.log(result)
);
```

## 7. Visual Diagram (ASCII)

```
Data Pipeline (Left-to-Right)

Input ──► [f] ──► [g] ──► [h] ──► Output
```

## 8. Real-world Example

Angular HttpInterceptor transforming requests/responses.

## 9. Angular Use Case

Building composable pipes, middleware chains, data processors.

## 10. Common Mistakes

❌ Passing multi-argument functions  
❌ Mutating inputs in pipeline stages

## 11. Edge Cases

1. **Empty pipeline**
   ```javascript
   pipe()(value); // Returns value unchanged
   ```

2. **Error propagation**

## 12. Performance Considerations

Minimal overhead — essentially reduced function calls.

## 13. Time & Space Complexity

O(n) for n functions in composition.

## 14. Interview Questions

1. Implement pipe manually
2. Compare pipe vs compose
3. Error handling in pipes?

## 15. Follow-up Questions

- "How to add error boundaries?"

## 16. Production Best Practices

1. Ensure all functions are unary
2. Handle errors explicitly at boundaries
3. Use for readable transformation chains
4. Consider lazy evaluation for expensive ops

## 17. Summary

Pipe enables clean composition of single-argument functions into coherent data flows.

## 18. Revision Notes

- Left-to-right composition
- Unary function requirement
- Reducer-based implementation
- Composable abstraction

## 19. Practice Questions

1. Implement basic pipe utility.
2. Chain data transformations.
3. Build error-tolerant pipeline wrapper.

## 20. References

- [MDN: Function Composition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_composition)
- [Ramda: pipe](https://ramdajs.com/docs/#pipe)

### Next File
**018 - Compose.md**
