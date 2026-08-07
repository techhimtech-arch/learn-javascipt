# Nullish Coalescing

## 1. Definition

The **nullish coalescing operator (`??`)** returns its right-hand operand when the left is `null` or `undefined`; otherwise returns the left-hand value.

## 2. Why do we need it?

To distinguish intentional empty/falsy values (like `0`, `""`) from absent ones (`null`/`undefined`).

## 3. Internal Working

Checks left operand strictly against null/undefined — if so, evaluates and returns RHS.

## 4. Step-by-Step Execution

```javascript
const name = passedName ?? "Guest";
```

If `passedName` is `null` or `undefined` → `"Guest"` else pass through.

## 5. Syntax

```javascript
leftOperand ?? rightOperand
```

Cannot combine with `||` or `&&` directly without parentheses.

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const timeout = config.timeout ?? 5000;
```

### Medium
```javascript
const list = items.length > 0 ? items : fallbackList ?? [];
```

### Advanced
```typescript
const value = computedValue ?? fallbackValue ?? defaultValue;
```

## 7. Visual Diagram (ASCII)

```
Nullish Coalescing Logic

left ?? right

┌─────────────┐
│ left value  │
└─────┬───────┘
      │
      ▼
Is it null OR undefined?
      │
   Yes│No
      ▼
   right   left
```

## 8. Real-world Example

Angular form default value resolution:
```typescript
this.model.value = userInput ?? previousValue ?? "default";
```

## 9. Angular Use Case

Config fallback chains, default service values.

## 10. Common Mistakes

❌ Using `||` instead of `??` for falsy-zero scenarios

## 11. Edge Cases

1. **Works with any falsy non-nullish values**
   ```javascript
   0 ?? 10; // 0
   "" ?? "x"; // ""
   false ?? true; // false
   ```

2. **Must use parens when mixing with && / ||**
   ```javascript
   (a || b) ?? c; // OK
   a || b ?? c; // SyntaxError
   ```

## 12. Performance Considerations

Negligible overhead.

## 13. Time & Space Complexity

O(1).

## 14. Interview Questions

1. `??` vs `||`?
2. Precedence issues?
3. With optional chaining interaction?

## 15. Follow-up Questions

- "How transpiles to lower targets?"

## 16. Production Best Practices

1. Use for optional numeric/string defaults
2. Pair with `?.` for robust paths
3. Avoid complex expressions in RHS

## 17. Summary

Targeted replacement for `||` in nullish-check contexts.

## 18. Revision Notes

- Triggers only on null/undefined
- Better than || for numeric values
- Parentheses needed in mixed expressions

## 19. Practice Questions

1. Differentiate user input vs default.
2. Replace verbose ternary with ??.
3. Handle zero/falsy edge cases.

## 20. References

- [MDN: Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_Coalescing)

### Next File
**010 - Dynamic Imports.md**
