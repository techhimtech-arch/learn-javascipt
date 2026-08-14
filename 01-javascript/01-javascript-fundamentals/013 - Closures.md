# Closures

## 1. Definition

A **Closure** is a function bundled together with its **outer lexical environment** — allowing the function to access and manipulate variables from its parent scope even after the parent has finished executing.

## 2. Why do we need it?

- Preserve private state
- Enable factory functions and currying
- Maintain context without global variables
- Implement powerful functional patterns

## 3. Internal Working

When a function is defined inside another, it remembers the environment where it was created.

```javascript
function outer() {
  let secret = "hidden";
  return function inner() {
    console.log(secret); // Remembers secret from outer
  };
}
const closureFn = outer();
closureFn(); // Still logs "hidden"
```

Even though `outer` completed, `inner`'s closure keeps `secret` alive.

## 4. Step-by-Step Execution

Steps:
1. `outer()` runs, creates `secret`, returns `inner`
2. `inner` retains reference to `outer`'s lexical env
3. `closureFn()` called → `inner` executes
4. `secret` accessed → still valid because of closure

## 5. Syntax

```javascript
// Classic Closure Pattern
function makeCounter() {
  let count = 0;
  return () => ++count;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function init() {
  let name = "Mozilla";
  function showName() {
    console.log(name); // Closure
  }
  return showName;
}
init()();
```

### Medium
```javascript
function multiply(a) {
  return function(b) { return a * b; };
}
const double = multiply(2);
double(5); // 10
```

### Advanced
```javascript
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key);
  };
};
```

## 7. Visual Diagram (ASCII)

```
Closure Capture Memory Layout

Stack:            Heap:
┌──────┐          ┌────────────────────┐
│inner │--------→│ {secret: 'hidden'} │
└──────┘          └────────────────────┘
                  ↑ Retained by closure
```

## 8. Real-world Example

Angular Stateful Services:
```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light');
  
  getTheme() {
    return this.themeSubject.asObservable(); // Captured state exposed safely
  }
}
```

## 9. Angular Use Case

- Angular services act as singletons preserving captured state
- RxJS Subjects retain latest emission for subscribers (closure-like)
- DI providers often use factory methods leveraging closures

## 10. Common Mistakes

❌ Forgetting that closures retain full parent environment
❌ Memory leaks from holding large objects in closures

## 11. Edge Cases

1. **Loop with `var` and closures**
   ```javascript
   for (var i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 0); // Logs 3 thrice
   }
   ```

2. **Closures over loop vars with `let`**
   ```javascript
   for (let i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 0); // 0,1,2
   }
   ```

3. **Closures capturing changing values**
   ```javascript
   let x = 1;
   function getX() { return x; }
   x = 2;
   console.log(getX()); // 2
   ```

## 12. Performance Considerations

- Closures prevent GC of captured scopes
- Store lightweight references only
- Avoid capturing DOM nodes unnecessarily

## 13. Time & Space Complexity

- Lookup within closure: O(depth)
- Memory overhead: proportional to captured data

## 14. Interview Questions

1. Define closure
2. Examples of closure uses in practice
3. Does closure preserve value or reference?
4. Memory implications of closures
5. How to avoid closure-based memory leaks?

## 15. Follow-up Questions

- "How does Angular manage service lifecycles with closures?"
- "Can closures simulate private class members?"

## 16. Production Best Practices

1. Clean up event listeners that close over large contexts
2. Pass primitives, not huge objects
3. Explicitly nullify references when done
4. Profile closure-heavy modules regularly

## 17. Summary

- Function + surrounding scope = closure
- Captures variables by reference
- Enables stateful logic without classes
- Powerful tool but must manage memory responsibly

## 18. Revision Notes

- Closures retain lexical env
- By reference, not copy
- Private vars possible
- Watch memory leaks

## 19. Practice Questions

1. Build a memoization closure.

2. Fix this closure bug:
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i); }, 0);
}
```

3. Create bank account simulator with closures.

## 20. References

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- ["You Don't Know JS: Scope & Closures"]

### Next File
**014 - this Keyword.md**