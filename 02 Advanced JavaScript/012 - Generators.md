# Generators

## 1. Definition

A **Generator** is a special type of function that can pause execution mid-way and later resume, yielding multiple values sequentially.

Marked with `function*` syntax and using `yield` to produce values.

## 2. Why do we need it?

Enables:
- Lazy evaluation patterns
- Infinite sequences without stack overflow
- Custom iterator creation
- Simplified async control flow (pre-async/await era)

## 3. Internal Working

When called:
1. Returns an iterator object immediately
2. Execution halts at each `yield`
3. `.next()` resumes execution until next yield or end
4. `return` sets final value and terminates

## 4. Step-by-Step Execution

Example:
```javascript
function* counter() {
  console.log("Start");
  yield 1;
  console.log("After first yield");
  yield 2;
  return "Done";
}

const gen = counter();
gen.next(); // Logs "Start", returns {value: 1, done: false}
gen.next(); // Logs "After first yield", returns {value: 2, done: false}
gen.next(); // Returns {value: "Done", done: true}
```

Steps:
1. `counter()` invoked → returns iterator (doesn't run yet)
2. First `.next()` runs until `yield 1`
3. Second `.next()` continues from paused state
4. Third `.next()` finishes function

## 5. Syntax

```javascript
function* generatorName(params) {
  yield expression;
  const value = yield anotherExpression;
  return finalValue;
}

const iterator = generatorName(args);
iterator.next();
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

for (const num of numbers()) {
  console.log(num); // 1, 2, 3
}
```

### Medium
```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

console.log([...range(1, 5)]); // [1,2,3,4,5]
```

### Advanced
```javascript
async function* fetchPages(urls) {
  for (const url of urls) {
    yield await fetch(url).then(r => r.json());
  }
}

// Consumption
(async () => {
  for await (const pageData of fetchPages(['/api/page1', '/api/page2'])) {
    console.log(pageData);
  }
})();
```

## 7. Visual Diagram (ASCII)

```
Generator Execution Flow

function* counter() {
  yield 1;   ← Pause here
  yield 2;   ← Resume here
  return 3;
}

Iterator.next() Sequence:
Call 1 → { value: 1, done: false } ← Pause at yield 1
Call 2 → { value: 2, done: false } ← Pause at yield 2
Call 3 → { value: 3, done: true }  ← Completion
```

## 8. Real-world Example

Angular reactive forms sometimes use generators for complex validation sequences:
```typescript
function* validateFields(form: FormGroup) {
  for (const key of Object.keys(form.controls)) {
    const valid = yield form.get(key)?.valid;
    if (!valid) return key; // Return invalid field
  }
  return null;
}
```

## 9. Angular Use Case

Though less common now with async/await, generators power some RxJS internals under the hood.

## 10. Common Mistakes

❌ Forgetting `yield` pauses execution  
❌ Calling generator without `*` prefix  
❌ Expecting immediate execution  

## 11. Edge Cases

1. **Infinite sequences**
   ```javascript
   function* idGenerator() {
     let id = 0;
     while (true) yield id++;
   }
   ```

2. **Generator delegation**
   ```javascript
   function* master() {
     yield* childGenerator();
     yield "master piece";
   }
   ```

3. **Early termination**
   ```javascript
   const gen = myGenerator();
   gen.next();
   gen.return("early"); // Immediately stops iteration
   ```

## 12. Performance Considerations

Lightweight compared to maintaining manual iterators; avoid deeply nested yields in hot paths.

## 13. Time & Space Complexity

Per-yield operation: O(1)
Memory holds execution frame until completion.

## 14. Interview Questions

1. How do generators differ from regular functions?
2. What returns when generator called?
3. Explain `yield*`.
4. Generator vs async iterator?

## 15. Follow-up Questions

- "Can you pass arguments into `.next()`?"
- "How does `for await...of` work with async generators?"

## 16. Production Best Practices

1. Clean up resources with `finally` blocks
2. Handle early `.return()` gracefully
3. Document infinite vs finite generators
4. Prefer async iterators for streaming data

## 17. Summary

Generators offer elegant solutions for sequential/lazy computations.

## 18. Revision Notes

- Pause/resume via yield
- Single-use iterators
- yield* delegates to another generator
- async function* produces async iterators

## 19. Practice Questions

1. Generate Fibonacci sequence.
2. Implement tree traversal recursively.
3. Create async generator fetching paginated API.

## 20. References

- [MDN: Generator Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- [MDN: Async Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#async_iterators_and_generators)

### Next File
**013 - Iterators.md**
