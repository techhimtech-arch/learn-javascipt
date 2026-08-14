# BigInt

## 1. Definition

**BigInt** is a primitive wrapper object enabling representation of **arbitrarily large integers** beyond the `Number.MAX_SAFE_INTEGER` limit.

Denoted by appending `n` to integer literal or calling `BigInt()`.

## 2. Why do we need it?

Standard Numbers lose precision for large integers (> 2^53). BigInt preserves exact values.

## 3. Internal Working

Internally represented as arbitrary precision signed integers.

Cannot mix with regular Numbers directly — requires explicit conversion.

## 4. Step-by-Step Execution

Example:
```javascript
const big = 9007199254740993n; // Beyond Number.MAX_SAFE_INTEGER
console.log(big + 1n); // 9007199254740994n
```

## 5. Syntax

```javascript
const a = 123456789012345678901234567890n;
const b = BigInt("123456789012345678901234567890");
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const count = 100000000000000000000000000n;
console.log(count + 1n);
```

### Medium
```javascript
function factorial(n) {
  if (n <= 1) return 1n;
  return BigInt(n) * factorial(BigInt(n) - 1n);
}
```

### Advanced
```javascript
const cryptoHash = BigInt("0x") + "abc123def456" === someValue;
```

## 7. Visual Diagram

```
Number vs BigInt Range

Number: [-2^53, 2^53]
BigInt: Unlimited precision ✨
```

## 8. Real-world Example

Timestamps or cryptographic libraries requiring high precision.

## 9. Angular Use Case

Precision-sensitive calculations in financial dashboards.

## 10. Common Mistakes

❌ Mixing BigInt and Number directly
❌ Using `JSON.stringify` (serializes as number)

## 11. Edge Cases

1. **Cannot mix types** in arithmetic
2. **Precision loss in conversions**
3. **String conversion needed for display**

## 12. Performance Considerations

Slower than Number arithmetic due to arbitrary-size handling.

## 13. Time & Space Complexity

Arithmetic operations slower; memory scales with digit count.

## 14. Interview Questions

1. How to detect BigInt?
2. Compare with Number limitations?
3. Safe mixing strategy?

## 15. Follow-up Questions

- "Can you use Math functions on BigInt?"

## 16. Production Best Practices

1. Convert carefully at boundaries (API responses)
2. Use libraries like decimal.js for decimal precision
3. Avoid in performance-sensitive loops

## 17. Summary

Solves integer overflow/precision issues safely.

## 18. Revision Notes

- Append 'n' or wrap with BigInt()
- Cannot mix with Number
- Not compatible with Math object

## 19. Practice Questions

1. Calculate large Fibonacci sequence safely.
2. Detect safe integer ranges.
3. Convert timestamp to BigInt.

## 20. References

- [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

### Next File
**015 - WeakMap.md**
