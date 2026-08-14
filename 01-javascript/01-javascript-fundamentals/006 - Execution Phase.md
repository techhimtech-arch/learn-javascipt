# Execution Phase

## 1. Definition

The **Execution Phase** is the second stage of an Execution Context. After memory has been allocated and identifiers hoisted, the engine proceeds to run the actual code statements line-by-line.

## 2. Why do we need it?

To execute logic, assign real values, evaluate expressions, and trigger side effects such as DOM manipulation or API calls.

## 3. Internal Working

1. **Code runs top-to-bottom**
2. **Variables receive final assigned values**
3. **Function bodies are executed when called**
4. **New Function Execution Contexts may appear**
5. **Return values resolve and propagate upward**

## 4. Step-by-Step Execution

Example:
```javascript
let counter = 0;
counter++;
console.log(counter);
```

Steps:
1. Memory phase: `counter = undefined`
2. Execution phase:
   - `counter = 0`
   - `counter++` → `counter = 1`
   - `console.log(1)`

## 5. Syntax

Standard JavaScript syntax executes here.

## 6. Examples (Easy → Advanced)

### Easy
```javascript
var name = "Alice";
console.log(name.length); // 5
```

### Medium
```javascript
function calculate(a, b) {
  return a + b;
}
let result = calculate(2, 3);
```

### Advanced
```javascript
setTimeout(() => {
  console.log("Delayed!");
}, 1000);
```
Triggers Web APIs + Event Loop integration.

## 7. Visual Diagram (ASCII)

```
Execution Phase Begins
┌──────────────────────────────┐
│ Line 1: counter = 0          │ ← Assignment done
│ Line 2: counter++            │ ← Increment applied
│ Line 3: console.log(counter) │ ← Output: 1
└──────────────────────────────┘

If function encountered:
Push new FEC
Run until return
Pop FEC
Continue next line
```

## 8. Real-world Example

Angular component lifecycle:
```typescript
export class MyComponent implements OnInit {
  data$: DataService;

  constructor(data$: DataService) {
    this.data$ = data$;
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.items = this.data$.getItems();
  }
}
```

Execution phase:
1. Constructor runs (initial assignment)
2. `ngOnInit` called → FEC pushed
3. `fetchItems` called → another FEC
4. Results propagate up

## 9. Angular Use Case

- Angular DI system relies on ordered execution of constructor and lifecycle methods.
- Change detection cycles execute during zone.js-triggered contexts.
- Async operations defer parts of execution.

## 10. Common Mistakes

❌ Mixing sync and async expectations.
❌ Not accounting for deferred callbacks.
❌ Forgetting return propagation.

## 11. Edge Cases

1. **Early returns stop further execution**
2. **Exceptions halt normal flow**
3. **Async breaks sequential model**
4. **Loops repeat execution segments**

## 12. Performance Considerations

- Minimize long-running tasks
- Batch DOM reads/writes
- Use microtasks/macrotasks wisely

## 13. Time & Space Complexity

- Typically linear relative to code size
- Dependent on nested function calls

## 14. Interview Questions

1. What happens step-by-step in execution phase?
2. How does return statement affect context stack?
3. Can execution phase be interrupted?

## 15. Follow-up Questions

- "What happens when an exception occurs?"

## 16. Production Best Practices

1. Avoid blocking main thread
2. Defer expensive computations
3. Break up long sequences with requestAnimationFrame

## 17. Summary

- Phase 2 of EC
- Code executes top-down
- Values assigned
- Returns resolved

## 18. Revision Notes

- Runs after creation phase
- Line-by-line
- Triggers FEC creation
- Manages control flow

## 19. Practice Questions

1. Identify execution order:
```javascript
function a() { b(); }
function b() { c(); }
function c() { console.log("Last"); }
a();
```

2. Simulate execution trace with returns.

3. Handle async scenario manually.

## 20. References

- [MDN: Execution Context](https://developer.mozilla.org/en-US/docs/Glossary/Execution_Context)
- [ECMA Standards](https://tc39.es/ecma262/)

### Next File
**007 - Call Stack.md**