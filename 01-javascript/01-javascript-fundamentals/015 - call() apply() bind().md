# call(), apply(), bind()

## 1. Definition

These three **explicit binding functions** let you control what `this` refers to inside a function:

- **`call()`** — invokes function immediately with specified `this`
- **`apply()`** — like `.call()` but accepts arguments as array
- **`bind()`** — returns a new function permanently bound to given `this`

## 2. Why do we need it?

To override or fix `this` context when needed — especially useful in callbacks, events, and reusable utility functions.

## 3. Internal Working

All three rely on JS engine’s **explicit binding rule** — overriding default/implicit `this` assignment.

```javascript
fn.call(thisArg, arg1, arg2...)
fn.apply(thisArg, [argsList])
fn.bind(thisArg)(arg1, arg2...)
```

## 4. Step-by-Step Execution

Example with `.call()`:
```javascript
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}
const user = { name: "Raman" };
greet.call(user, "Hello"); // Hello, Raman
```

Steps:
1. `.call(user, …)` sets `this = user`
2. Passes `"Hello"` as first positional arg
3. Prints `Hello, Raman`

## 5. Syntax

```javascript
// call()
greet.call(contextObj, arg1, arg2);

// apply()
greet.apply(contextObj, [arg1, arg2]);

// bind()
const boundGreet = greet.bind(contextObj);
boundGreet(arg1);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function speak() { console.log(this.sound); }
speak.call({ sound: "Woof!" });
```

### Medium
```javascript
function sum(a, b, c) { return a + b + c; }
sum.apply(null, [1, 2, 3]); // 6
```

### Advanced
```javascript
class Counter {
  constructor(count = 0) { this.count = count; }
  increment(step = 1) {
    this.count += step;
    return this;
  }
}

const counter = new Counter(5);
const incByTwo = counter.increment.bind(counter, 2);
incByTwo(); // count = 7
```

## 7. Visual Diagram (ASCII)

```
Function Invocation Comparison

┌────────────┐
│ Normal     │ → this resolved via implicit/default rules
└────────────┘

┌────────────┐
│ Call       │ → Manually sets this + passes discrete args
└────────────┘

┌────────────┐
│ Apply      │ → Manually sets this + passes array of args
└────────────┘

┌────────────┐
│ Bind       │ → Returns new function with fixed this
└────────────┘
```

## 8. Real-world Example

Angular Event Handler Binding:
```typescript
@Component({
  selector: 'app-timer',
  template: '<button (click)="start()">Start Timer</button>'
})
export class TimerComponent {
  seconds = 0;

  start() {
    setInterval(this.tick, 1000); // WRONG: `this` lost!
    // Correct fix:
    setInterval(this.tick.bind(this), 1000);
    // Or better yet: arrow class field
    // tick = () => { this.seconds++; }
  }

  tick() {
    this.seconds++;
  }
}
```

## 9. Angular Use Case

| Angular Pattern | Use of call/apply/bind |
|---|---|
| Binding component context to callbacks | `.bind(this)` |
| Dynamically invoking methods | `.call(objMethod)` |
| Partial application in services | `.bind(service)` |

## 10. Common Mistakes

❌ Forgetting `.bind()` inside Angular components leads to `undefined this`
❌ Misusing `apply` incorrectly (passing args wrongly)

## 11. Edge Cases

1. **`null` becomes global in non-strict mode**
   ```javascript
   fn.call(null);
   ```

2. **Double binding ignored**
   ```javascript
   const bound = fn.bind(obj1);
   const rebound = bound.bind(obj2);
   rebound(); // `this` remains obj1
   ```

3. **Partial application with bind**
   ```javascript
   const power = Math.pow.bind(Math, 2); // Always square
   power(8); // 256
   ```

## 12. Performance Considerations

- `.bind()` creates new function every time — cache when repeated
- Prefer arrow functions or class fields over `.bind()` in loops/components

## 13. Time & Space Complexity

- Call/apply: O(1)
- Bind: O(n), where n = number of arguments to partially apply

## 14. Interview Questions

1. How do `call`, `apply`, and `bind` differ?
2. Which ones invoke immediately?
3. Can you change `this` twice?
4. Where would you use `apply`?
5. Why avoid `bind` in render methods?

## 15. Follow-up Questions

- "How do Angular developers typically bind context?"
- "What’s faster—arrow or bind?"

## 16. Production Best Practices

1. Cache bound functions
2. Prefer arrow/class properties in Angular components
3. Use `apply` sparingly for variadic argument handling

## 17. Summary

- Three ways to set `this` explicitly
- `call`/`apply` invoke now
- `bind` returns bound version
- Bind cannot be overridden after once set

## 18. Revision Notes

- call(context, args…)
- apply(context, [args])
- bind(context) → new function
- Double-bind ignored
- Cache bound functions!

## 19. Practice Questions

1. Use `apply` to call function with array args.

2. Fix broken context with `bind`.

3. Simulate `call()` polyfill.

## 20. References

- [MDN: call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/function/call)
- [MDN: apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/function/apply)
- [MDN: bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/function/bind)

### Next File
**016 - Objects.md**