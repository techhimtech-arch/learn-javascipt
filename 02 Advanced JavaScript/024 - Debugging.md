# JavaScript Debugging

## 1. Definition

**JavaScript Debugging** systematically identifies, diagnoses, and fixes code defects using tools and techniques.

## 2. Why do we need it?

Resolve errors, unexpected behavior, and performance issues efficiently.

## 3. Internal Working

Debugging phases:
1. **Reproduce**: Trigger the issue consistently
2. **Isolate**: Narrow down source location
3. **Diagnose**: Understand root cause
4. **Fix**: Apply solution
5. **Verify**: Confirm issue resolved

## 4. Step-by-Step Execution

Chrome DevTools workflow:
1. Open DevTools (F12)
2. Navigate to Sources > Page
3. Set breakpoints by clicking line numbers
4. Trigger code execution
5. Inspect variables in Scope panel
6. Step through with controls

## 5. Syntax

```javascript
// Console debugging
console.log('State:', obj);
console.table(array);
console.group('Group Label');
console.warn('Warning');
console.error('Error');
console.trace('Stack trace');

// Conditional breakpoints
// Right-click breakpoint → Edit condition → "variable === targetValue"

// Debugger statement
function buggyFunction() {
  debugger; // Execution pauses here
  // Inspect variables
}
```

## 6. Examples

### Easy
```javascript
// Console inspection
function calculateTotal(items) {
  console.log('Items:', items);
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Advanced
```javascript
// Watch expressions and conditional breakpoints
function processAsync(data) {
  for (let i = 0; i < data.length; i++) {
    debugger; // Pause iteration
    processData(data[i]); // Inspect each item
  }
}
```

## 7. Debugging Tools

- **Console**: Log inspection
- **Breakpoints**: Pause at lines
- **Watch**: Track expressions
- **Call Stack**: Trace execution path
- **Network**: Inspect requests
- **Memory**: Heap snapshots

## 8. Common Patterns

1. Binary search debugging
2. Rubber duck explanation
3. Git bisect for regression
4. Reduce reproduction case

## 9. Interview Questions

1. Debugging workflow?
2. Conditional breakpoints?
3. Memory leak debugging?

## 10. Summary

Effective debugging skills accelerate problem resolution significantly.

## 11. References

- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---
