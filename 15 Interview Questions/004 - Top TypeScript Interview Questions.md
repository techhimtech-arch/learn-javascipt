# Top TypeScript Interview Questions

## 1. Definition

Compilation of frequently encountered TypeScript interview questions addressing types, interfaces, generics, utility types, and real-world usage scenarios.

## 2. Why do we need it?

TypeScript adoption is widespread — employers expect strong typing fundamentals alongside JavaScript knowledge.

## 3. Internal Working

Questions span:
- Basic type system
- Advanced generics and conditional types
- Utility types application
- Decorators and metadata
- Module system intricacies

## 4. Step-by-Step Execution

Review path:
1. Primitive/special types (void, never, unknown)
2. Interface vs type alias distinctions
3. Generic constraint patterns
4. Utility type compositions
5. Advanced conditional/mapped types

## 5. Syntax

N/A – reference material format.

## 6. Examples (Easy → Advanced)

### Easy
**Q: Difference between interface and type alias?**
A: Interfaces:
- Declaration merging supported
- Extends keyword only
- Object/class shapes primarily

Type aliases:
- Can represent unions, tuples, primitives
- More flexible composition
- Union types easier

### Medium
**Q: Explain unknown vs any.**
A: `unknown` enforces type checking before use — safer alternative for untrusted inputs.
`any` disables type checking entirely — avoid unless absolutely necessary.

### Advanced
**Q: How does conditional typing work?**
A:
```typescript
type TypeName<T> = T extends string ? 'string' :
                   T extends number ? 'number' :
                   T extends boolean ? 'boolean' :
                   T extends symbol ? 'symbol' :
                   T extends object ? 'object' : 'any';
```

## 7. Visual Diagram (ASCII)

```
TypeScript Type System Layers

┌────────────────────┐
│ Basic Primitives   │
├────────────────────┤
│ Interfaces/Types   │
├────────────────────┤
│ Generics           │
├────────────────────┤
│ Utility Types      │
├────────────────────┤
│ Conditional/Mapped │
└────────────────────┘
```

## 8. Real-world Example

Building reusable UI component libraries.

## 9. Angular Use Case

Angular itself written in TypeScript — understanding aids framework mastery.

## 10. Common Mistakes

❌ Overusing `as` casts
❌ Ignoring compiler strictness warnings
❌ Misunderstanding structural typing

## 11. Edge Cases

1. **Generic inference limitations**
2. **Union distribution subtleties**
3. **Type narrowing pitfalls**

## 12. Performance Considerations

Excessive type complexity increases compile times.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

Sample Questions:

1. Basic types in TypeScript?
2. Interface vs type difference?
3. What is strict mode?
4. Explain generics with examples.
5. Union vs intersection types.
6. Utility types (Partial, Pick, Omit)?
7. Conditional types syntax.
8. keyof/infer/lookup types.
9. Mapped types explanation.
10. Decorators usage?

## 15. Follow-up Questions

- "Design type-safe configuration object."

## 16. Production Best Practices

1. Enable strict mode
2. Prefer interfaces over types for objects
3. Use generics liberally but avoid over-engineering
4. Leverage strict null checks

## 17. Summary

Strong typing reduces bugs at scale — mastering TypeScript pays dividends.

## 18. Revision Notes

- Understand structural vs nominal typing
- Know utility types intimately
- Practice advanced type manipulations
- Know compiler options deeply

## 19. Practice Questions

1. Build reusable table component with typed columns.
2. Implement type-safe fetch wrapper.
3. Create validation helper with typed schemas.

## 20. References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Next File
**005 - Top CSS Interview Questions.md**
