# Call Stack

## 1. Definition

The **Call Stack** is a **LIFO (Last-In, First-Out)** data structure used by the JavaScript engine to manage **function execution order**.

Every time a function is invoked, its corresponding **Execution Context** is pushed onto the stack. When the function completes, the context is popped off.

## 2. Why do we need it?

To track which function is currently executing, ensure proper nesting of calls, and handle returns correctly.

## 3. Internal Working

1. Start with **Global Execution Context** always at bottom
2. Each function call adds **Function Execution Context**
3. When a function returns → **its FEC is removed**
4. Stack unwinds until GEC only remains

## 4. Step-by-Step Execution

Sample:
```javascript
function greet() {
  console.log("Hi!");
}
greet();
```

Steps:
1. GEC pushed into stack
2. `greet()` called → FEC pushed
3. Inside `greet`:
   - `console.log("Hi!")` runs
   - Function reaches end → returns
4. FEC popped from stack
5. Back to GEC continuing
6. Script ends → GEC popped

## 5. Syntax

Used implicitly by JavaScript engine.

Example visualization helper:
```javascript
console.log(stack); // Not directly accessible, but conceptually traceable
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function a() {}
a(); // Pushes then pops FEC
```

### Medium
```javascript
function first() { second(); }
function second() { third(); }
function third() { console.log("Chain"); }

first();
```

Call Stack Evolution:
[Global] → [Global → first] → [Global → first → second] → [Global → first → second → third] → pop all

### Advanced
```javascript
async function delayedCall() {
  await fetch("/api/data");
  handleResponse();
}
```

Await suspends current FEC and allows stack to clear while promise resolves.

## 7. Visual Diagram (ASCII)

```
Stack Push Animation

Step 1: GEC Only
┌──────────────────┐
│ Global EC        │ ← Bottom of stack
└──────────────────┘

Step 2: greet() Called
┌──────────────────┐
│ greet FEC        │ ← Top of stack
└──────────────────┘
┌──────────────────┐
│ Global EC        │
└──────────────────┘

Step 3: Done
┌──────────────────┐
│ Global EC        │ ← Only one left
└──────────────────┘
```

## 8. Real-world Example

Angular Router Navigation:
```typescript
export class MyComp {
  navigateToDetail(id: string) {
    this.router.navigate(['/detail', id]); // Internally triggers nested calls
  }
}
```

Router internally spawns several stacked contexts before rendering target component.

## 9. Angular Use Case

| Angular Feature | Call Stack Interaction |
|---|---|
| Lifecycle Hooks | Triggered in sequence via stacked contexts |
| Event Handlers | Push handler FEC onto stack |
| Zone.js Patching | Intercepts and manages call stack |
| Async Pipe Subscriptions | Managed via microtasks/macrotasks |

## 10. Common Mistakes

❌ Infinite recursion overflows stack.
❌ Assuming synchronous execution across async boundaries.

## 11. Edge Cases

1. **Infinite Recursion**
   ```javascript
   function boom() { boom(); } // Stack overflow
   ```

2. **Async Callbacks**
   ```javascript
   setTimeout(() => {}, 0); // Clears stack before firing
   ```

3. **try/finally always restores order**

## 12. Performance Considerations

- Keep stack depth manageable
- Prefer iteration over recursion where possible
- Monitor for excessive context switching

## 13. Time & Space Complexity

- Time to push/pop: O(1)
- Max stack size: Varies (~10k+) across engines
- Stack overflow occurs when exceeded

## 14. Interview Questions

1. What is Call Stack?
2. Describe LIFO principle.
3. What causes stack overflow?
4. How does asynchronous code interact?
5. How do you debug stack traces?

## 15. Follow-up Questions

- "Can you inspect or modify the stack manually?"
- "Why do we see 'Maximum call stack size exceeded'?"

## 16. Production Best Practices

1. Watch for recursive loops
2. Profile deeply nested operations
3. Use iterative approaches in performance paths
4. Leverage browser devtools stack inspection

## 17. Summary

- Tracks active contexts
- LIFO behavior
- Manages control flow
- Critical for debugging

## 18. Revision Notes

- Bottom = Global
- On invoke = push FEC
- On return = pop FEC
- Overflow = recursion gone wrong

## 19. Practice Questions

1. Simulate stack with given code sequence.

2. Detect infinite recursion source:
```javascript
function f() {
  if (Math.random() < 0.9) f();
}
f();
```

3. Implement manual recursion guard.

## 20. References

- [MDN: Call Stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)
- [ECMA-262](https://tc39.es/ecma262/)
- V8 Engine Documentation

### Next File
**008 - Hoisting.md**