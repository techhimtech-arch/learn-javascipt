# TypeScript Overview

## 1. Definition

TypeScript is a **typed superset of JavaScript** that compiles to plain JavaScript. It adds optional static typing, interfaces, enums, generics, and advanced tooling support.

## 2. Why do we need it?

- Early error detection at compile-time
- Better IDE autocomplete and refactoring
- Self-documenting code via type annotations
- Easier maintenance in large-scale applications

## 3. Internal Working

TypeScript compiler (`tsc`) parses source code → performs type-checking → strips types → outputs plain JS.

## 4. Step-by-Step Execution

1. Developer writes `.ts` file with types
2. Compiler checks types during build
3. Generates corresponding `.js` file
4. Runtime executes plain JavaScript

## 5. Syntax

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}

class Person {
  name: string;
  constructor(name: string) { this.name = name; }
  speak() { console.log(this.name); }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
let age: number = 30;
age = "thirty"; // Type Error!
```

### Medium
```typescript
interface User {
  id: number;
  name: string;
}
function processUser(user: User): boolean {
  return !!user.id && !!user.name;
}
```

### Advanced
```typescript
type Result<T, E = string> = { success: true; value: T } | { success: false; error: E };
function parseData(input: string): Result<number> {
  const num = parseFloat(input);
  if (isNaN(num)) return { success: false, error: "Not a number" };
  return { success: true, value: num };
}
```

## 7. Visual Diagram (ASCII)

```
TypeScript Compilation Pipeline

┌─────────────┐
│ .ts Source  │
└─────┬──────┘
      ▼
┌─────────────┐
│ Type Check  │ ← Errors caught here
└─────┬──────┘
      ▼
┌─────────────┐
│ .js Output  │ ← Plain JavaScript
└─────────────┘
```

## 8. Real-world Example

Angular components written in TypeScript:
```typescript
@Component({
  selector: 'user-card',
  template: '<p>{{ user.name }}</p>'
})
export class UserCardComponent {
  @Input() user!: { id: number; name: string };
}
```

## 9. Angular Use Case

All Angular applications are written in TypeScript by default — leveraging strong typing for safer DI, routing, and component APIs.

## 10. Common Mistakes

❌ Over-typing simple scripts unnecessarily  
❌ Misusing `any` type

## 11. Edge Cases

1. **Type widening**
   ```typescript
   let x = 10; // type is `number`, not literal `10`
   ```

2. **Structural typing vs nominal typing**
   ```typescript
   interface A { id: number; }
   interface B { id: number; }
   const a: A = { id: 1 }; const b: B = a; // Allowed!
   ```

## 12. Performance Considerations

Compile-time only – zero runtime performance cost.

## 13. Time & Space Complexity

N/A – compile-time concern.

## 14. Interview Questions

1. Advantages of TypeScript over JavaScript?
2. How does structural typing work?
3. Trade-offs of using TypeScript?

## 15. Follow-up Questions

- "How do Angular apps benefit from TS types?"
- "Can you migrate JS project to TS incrementally?"

## 16. Production Best Practices

1. Enable strict mode (`"strict": true`)
2. Use interfaces over type aliases for objects
3. Avoid `any` whenever possible
4. Gradual migration from JS allowed

## 17. Summary

TypeScript enhances developer experience and application reliability through optional static typing.

## 18. Revision Notes

- Superset of JS
- Compiles away at build time
- Strict mode recommended
- Structural typing system

## 19. Practice Questions

1. Convert JS function to typed TS equivalent.
2. Identify type mismatches in sample code.
3. Define interface for complex nested object.

## 20. References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Next File
**002 - Types.md**
