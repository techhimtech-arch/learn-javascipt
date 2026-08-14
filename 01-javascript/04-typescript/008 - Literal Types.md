# Literal Types

## 1. Definition

Literal types narrow primitive types to specific values — `"active"`, `"inactive"` — enhancing type precision.

## 2. Why do we need it?

Prevent invalid states, enforce valid inputs at compile time.

## 3. Internal Working

Type-checker treats exact primitives as distinct types — usable in unions/interfaces.

## 4. Step-by-Step Execution

Example:
```typescript
type Status = "active" | "inactive";
function setStatus(s: Status) {}
setStatus("active"); // OK
setStatus("unknown"); // Compile Error
```

## 5. Syntax

```typescript
let direction: "up" | "down";
const role: "admin" = "admin";
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
type Direction = "left" | "right";
```

### Medium
```typescript
type LogLevel = "debug" | "warn" | "error";
```

### Advanced
```typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
```

## 7. Visual Diagram (ASCII)

```
Literal Narrowing

"active" ──► type "active"
"pending" ─▶ type "pending"

Union:
"active" | "pending" | "closed"
```

## 8. Real-world Example

Angular form control status:
```typescript
type ControlStatus = "VALID" | "INVALID" | "PENDING" | "DISABLED";
```

## 9. Angular Use Case

Input variants, route matcher constraints, component lifecycle states.

## 10. Common Mistakes

❌ Forgetting readonly prevents literal inference  
❌ Mixing with broader types carelessly

## 11. Edge Cases

1. **Inference depends on context**
   ```typescript
   const s = "static"; // type: "static"
   let t = "toggle";   // type: string
   ```

2. **With const assertions**
   ```typescript
   const colors = ["red", "green"] as const;
   // type: readonly ["red", "green"]
   ```

## 12. Performance Considerations

No runtime cost.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. When do literal types auto-narrow?
2. Difference between let/const literal inference?
3. Use with union types effectively?

## 15. Follow-up Questions

- "How does `as const` affect literals?"

## 16. Production Best Practices

1. Freeze literal types with `as const`
2. Enumerate valid states explicitly
3. Pair with discriminated unions

## 17. Summary

Precise typing for constrained domain values.

## 18. Revision Notes

- Literal = exact value as type
- const infers literal
- let widens to base primitive
- Combine with | for enums

## 19. Practice Questions

1. Enumerate button click statuses.
2. Model finite form field states.
3. Constrain action payloads.

## 20. References

- [TypeScript: Literal Types](https://www.typescriptlang.org/docs/handbook/literal-types.html)

### Module 4 Complete! (8/20 planned)
