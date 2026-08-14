# Iterators

## 1. Definition

An **Iterator** is an object that implements a standard interface for producing a sequence of values — either finite or infinite.

It exposes a `.next()` method returning `{ value, done }`.

## 2. Why do we need it?

To provide a uniform way to iterate over collections (arrays, strings, maps, sets) without exposing internal structure.

## 3. Internal Working

1. Object gets `[Symbol.iterator]` method
2. Calling it returns iterator object
3. `.next()` produces next value (`{value, done}`)
4. Loop (`for...of`) uses iterator until `done: true`

## 4. Step-by-Step Execution

Example:
```javascript
const arr = [10, 20, 30];
const iter = arr[Symbol.iterator]();
iter.next(); // { value: 10, done: false }
iter.next(); // { value: 20, done: false }
iter.next(); // { value: 30, done: false }
iter.next(); // { value: undefined, done: true }
```

## 5. Syntax

```javascript
const myIterable = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step <= 3) return { value: step, done: false };
        return { value: undefined, done: true };
      }
    };
  }
};
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
for (const char of "hello") console.log(char);
```

### Medium
```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```

### Advanced
```javascript
class RangeIterator {
  constructor(from, to) {
    this.current = from;
    this.last = to;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    return this.current <= this.last
      ? { value: this.current++, done: false }
      : { value: undefined, done: true };
  }
}
```

## 7. Visual Diagram (ASCII)

```
Iterator Flow

Iterable Object
    ↓ [Symbol.iterator]()
Iterator Object
    ↓ .next()
{value: X, done: false} ← Repeat until done:true
```

## 8. Real-world Example

Angular CDK Virtual Scroll uses iterators for efficient rendering of large lists.

## 9. Angular Use Case

Building custom data structures that integrate with `*ngForOf`.

## 10. Common Mistakes

❌ Forgetting `[Symbol.iterator]` method
❌ Not returning `{value,done}`

## 11. Edge Cases

1. Infinite sequences must break manually
2. Re-entry resets state
3. Nested iteration issues

## 12. Performance Considerations

Lightweight; but avoid side-effects in iterator functions.

## 13. Time & Space Complexity

Depends on implementation — generally O(1) space per call.

## 14. Interview Questions

1. Difference between iterable & iterator?
2. How does for...of use them?
3. Implement basic counter iterator.

## 15. Follow-up Questions

- "Can you make strings iterable?"

## 16. Production Best Practices

1. Ensure idempotency of `.next()`
2. Return correct `{value,done}` format
3. Document expected sequence length

## 17. Summary

Uniform traversal interface used throughout JS.

## 18. Revision Notes

- `[Symbol.iterator]` key method
- Iterator returns `{value,done}`
- Used by for...of, spread operator

## 19. Practice Questions

1. Create custom iterable object.
2. Convert array-like to iterable.
3. Implement map iterator.

## 20. References

- [MDN: Iteration Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

### Next File
**013 - Symbols.md**
