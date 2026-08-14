# Rest Parameters

## 1. Definition

**Rest parameters** collect multiple elements into a single **array**, opposite to spread — aggregating remaining inputs into one parameter.

Syntax: `...parameterName`

## 2. Why do we need it?

Cleanly capture variadic arguments without relying on legacy `arguments` object.

## 3. Internal Working

Parser identifies rest syntax during function definition phase, generates code that gathers trailing arguments into named array.

## 4. Step-by-Step Execution

Example:
```javascript
function logAll(label, ...messages) {
  console.log(`[${label}]`, messages);
}
logAll("Info", "Hello", "World"); // ["Info"] ["Hello","World"]
```

Steps:
1. Function invoked with multiple args
2. First arg matched to `label`
3. Remaining args collected into `messages` array
4. Function body executes with rest param populated

## 5. Syntax

```javascript
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function printArgs(...args) {
  console.log(args);
}
printArgs(1, 2, 3); // [1,2,3]
```

### Medium
```javascript
function average(...scores) {
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}
```

### Advanced
```typescript
function connectToDatabase(uri: string, options: ConnectionOptions, ...middlewares: Middleware[]) {
  // Use middlewares array directly
}
```

## 7. Visual Diagram (ASCII)

```
Rest Parameter Conversion:

Input Arguments:
[arg1][arg2][arg3][arg4][arg5]

Function Signature:
function fn(first, second, ...rest)

Mapping:
┌────────────┬────────────┬────────────────────┐
│ first=arg1 │ second=arg2│ rest=[arg3,arg4,arg5]│
└────────────┴────────────┴────────────────────┘
```

## 8. Real-world Example

Angular utility functions aggregating inputs:
```typescript
export function combineValidators(...validators: ValidatorFn[]): ValidatorFn {
  return (control: AbstractControl) => {
    // Aggregate validator results
  };
}
```

## 9. Angular Use Case

Variadic helper functions, composable validators/formatters, middleware pipelines.

## 10. Common Mistakes

❌ Mixing rest with regular parameters improperly
❌ Confusing rest with spread

## 11. Edge Cases

1. **No remaining args → empty array**
   ```javascript
   function test(...rest) { console.log(rest.length); }
   test(); // 0
   ```

2. **Must come last**
   ```javascript
   function bad(a, ...middle, b) {} // SyntaxError
   ```

3. **Capturing all arguments**
   ```javascript
   const all = (...args) => args;
   ```

## 12. Performance Considerations

Minimal overhead — just wraps remaining args.

## 13. Time & Space Complexity

O(n) where n = number of extra args.

## 14. Interview Questions

1. Rest vs Spread?
2. Capture all function args?
3. Restrictions on rest placement?

## 15. Follow-up Questions

- "Can rest capture named args too?"
- "How does Angular use variadic functions?"

## 16. Production Best Practices

1. Validate length of rest array when needed
2. Prefer named params for clarity in public APIs
3. Combine with destructuring for flexible signatures

## 17. Summary

Powerful tool for designing flexible, variadic functions without losing clarity.

## 18. Revision Notes

- Aggregates trailing args into array
- Must be rightmost parameter
- Safer than arguments object
- Works with destructuring

## 19. Practice Questions

1. Build variadic logger.
2. Implement custom `Math.max` analog.
3. Capture optional middle args.

## 20. References

- [MDN: Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

### Next File
**006 - Destructuring.md**
