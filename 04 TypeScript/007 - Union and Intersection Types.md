# Union and Intersection Types

## 1. Definition

- **Union (`|`)** – represents a value that can be one of multiple types
- **Intersection (`&`)** – combines multiple types into one

Both enhance expressiveness in type definitions.

## 2. Why do we need it?

Allow flexible typing while maintaining safety — essential for polymorphic APIs and component contracts.

## 3. Internal Working

Compiler performs structural analysis to determine which variant applies at given call-site.

Unions require narrowing via type guards. Intersections blend property sets from all member types.

## 4. Step-by-Step Execution

Example:
```typescript
type ID = string | number;
type Details = { name: string } & { age: number };

const myId: ID = "abc";
const person: Details = { name: "Alice", age: 30 };
```

Steps:
1. For union: check if value satisfies one member
2. For intersection: verify value has all required properties

## 5. Syntax

```typescript
let x: string | number;
type Combined = A & B;
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
function display(input: string | number) {
  console.log(input.toString());
}
```

### Medium
```typescript
type ButtonProps = BaseProps & { onClick: () => void };
```

### Advanced
```typescript
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```

## 7. Visual Diagram (ASCII)

```
Union: string | number
┌───────┐ ┌───────┐
│string │ │number │
└───────┘ └───────┘
         │ OR
         ▼
Valid if matches either

Intersection: A & B
┌───────┐ ┌───────┐
│Prop X │ │Prop Y │
└───────┘ └───────┘
         │ AND
         ▼
Must have both props
```

## 8. Real-world Example

Angular input accepting multiple types:
```typescript
@Input() config: string | ConfigObject = "default";
```

## 9. Angular Use Case

Flexible directives, component variant props, form control value accessors.

## 10. Common Mistakes

❌ Forgetting to narrow union before using  
❌ Misunderstanding distributive behavior

## 11. Edge Cases

1. **Distributive conditionals with unions**
   ```typescript
   type ToArray<T> = T extends any[] ? T : T[];
   ToArray<string | number>; // [(string|number)[]] ??
   ```

2. **Intersection conflicts**
   ```typescript
   type Impossible = string & number; // => never
   ```

## 12. Performance Considerations

No runtime cost.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. When would you use intersection vs union?
2. Narrowing a union variable safely?
3. Conflict between intersected types?

## 15. Follow-up Questions

- "How do you check runtime type of union?"
- "Can you flatten nested unions?"

## 16. Production Best Practices

1. Use discriminated unions for state machines
2. Prefer intersections for mixin-style composition
3. Validate input thoroughly when widening unions

## 17. Summary

Powerful constructs for modeling diverse data shapes precisely.

## 18. Revision Notes

- `|` = either type allowed
- `&` = both required
- Narrow unions before accessing
- Intersections merge member properties

## 19. Practice Questions

1. Create config accepting string or object.
2. Build discriminated union for toggle states.
3. Combine interfaces with intersection.

## 20. References

- [TypeScript: Union Types](https://www.typescriptlang.org/docs/handbook/union-types.html)
- [TypeScript: Intersection Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types)

### Next File
**008 - Literal Types.md**
