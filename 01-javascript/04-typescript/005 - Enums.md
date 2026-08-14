# Enums

## 1. Definition

An **Enum** (short for "enumerated type") is a way to define a set of named constants — making code more readable and maintainable.

## 2. Why do we need it?

Replace magic numbers/strings with descriptive labels, reduce errors, centralize value definitions.

## 3. Internal Working

Enums create a reverse mapping between symbolic names and numeric/string values.

Numeric enums generate bidirectional lookup tables; string enums do not.

## 4. Step-by-Step Execution

Example:
```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}
console.log(Direction.Up); // 0
console.log(Direction[0]); // "Up"
```

Steps:
1. Enum compiles to JS object with keys/values
2. Reverse mappings created for numeric enums
3. Referenced symbolically in code

## 5. Syntax

```typescript
enum Name {
  Value1,
  Value2,
  ...
}
```

String variant:
```typescript
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
```

### Medium
```typescript
enum HttpStatus { OK = 200, NotFound = 404, ServerError = 500 }
if (status === HttpStatus.OK) { ... }
```

### Advanced
```typescript
const enum Direction {
  Up = "UP",
  Down = "DOWN"
}
// Inlined at usage site (no runtime object)
```

## 7. Visual Diagram (ASCII)

```
Enum Compilation

Source:
enum Direction { Up, Down }

Output:
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
})(Direction || (Direction = {}));
```

## 8. Real-world Example

Angular router event types:
```typescript
enum RouterEvent {
  NavigationStart = "NAVIGATION_START",
  NavigationEnd = "NAVIGATION_END"
}
```

## 9. Angular Use Case

Route path constants, HTTP status codes, action types in state management.

## 10. Common Mistakes

❌ Using `const enum` with isolatedModules flag  
❌ Expecting string enums to have reverse mapping

## 11. Edge Cases

1. **Heterogeneous enums**
   ```typescript
   enum Mixed {
     No = "NO",
     Yes = 1
   }
   ```

2. **Computed member values**
   ```typescript
   enum E { A, B = "x".length } // B = 1
   ```

3. **Ambient enums**
   ```typescript
   declare enum Ambient { A, B } // No output
   ```

## 12. Performance Considerations

Avoid `const enum` with certain build setups.

## 13. Time & Space Complexity

Single lookup table allocated per enum.

## 13. Interview Questions

1. Numeric vs string enum differences?
2. Reverse mapping behavior?
3. Const enum caveats?

## 15. Follow-up Questions

- "How do enums compile to JavaScript?"

## 16. Production Best Practices

1. Prefer string enums for clarity/debuggability
2. Use const enum cautiously with bundlers
3. Centralize related constants

## 17. Summary

Named constants improve readability and prevent magic-number bugs.

## 18. Revision Notes

- Numeric: bidirectional mapping
- String: one-way mapping
- const enum: inline substitution
- Avoid heterogeneous mixes

## 19. Practice Questions

1. Define HTTP method enum.
2. Convert magic numbers to enum.
3. Compare string vs numeric tradeoffs.

## 20. References

- [TypeScript: Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

### Next File
**006 - Generics.md**
