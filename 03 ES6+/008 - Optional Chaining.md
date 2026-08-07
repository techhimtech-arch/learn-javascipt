# Optional Chaining

## 1. Definition

Optional chaining (`?.`) short-circuits evaluation of nested property access, returning `undefined` if any portion of the chain is `null`/`undefined` instead of throwing.

## 2. Why do we need it?

Prevent crashes from nullish chains like `obj.a.b.c`.

## 3. Internal Working

Checks each level during traversal — halts at first nullish (`null`/`undefined`) encountered.

Supports:
- Property access
- Array indexing
- Function calls

## 4. Step-by-Step Execution

```javascript
const street = user?.address?.street;
```

Steps:
1. Check `user`
2. Nullish? → returns undefined
3. Else access `.address`
4. Repeat recursively

## 5. Syntax

```javascript
obj?.prop
obj?.[expr]
func?.()
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const name = user?.profile?.name ?? "Unknown";
```

### Medium
```javascript
const items = data?.list?.items ?? [];
items.forEach(renderItem);
```

### Advanced
```typescript
class ApiService {
  private endpoint = config?.endpoints?.primary ?? "/default";
  
  async fetch() {
    const response = await this.http.get(this.endpoint);
    return response?.body?.data ?? null;
  }
}
```

## 7. Visual Diagram (ASCII)

```
Optional Chaining Flow

user?.address?.street

┌──────┐
│ user │ → exists?
└──────┘
   │ yes
   ▼
┌────────┐
│address │ → exists?
└────────┘
   │ yes
   ▼
┌────────┐
│ street │ → return value
└────────┘
   │ no/undefined
   ▼
return undefined
```

## 8. Real-world Example

Angular template binding:
```html
<span *ngIf="user?.name">{{ user.name }}</span>
```

## 9. Angular Use Case

Template safety (`?.`), service config fallbacks.

## 10. Common Mistakes

❌ Confusion with nullish coalescing (`??`) precedence
❌ Expecting falsy (not just nullish) short-circuit

## 11. Edge Cases

1. **Short-circuits on null/undefined only**
   ```javascript
   "".prop?.x; // TypeError if .prop is nullish, not string
   ```

2. **Chaining multiple**
   ```javascript
   a?.b?.c?.d; // All levels checked
   ```

3. **Optional function call**
   ```javascript
   maybeFn?.(); // Calls only if callable
   ```

## 12. Performance Considerations

Negligible.

## 13. Time & Space Complexity

O(depth), depth = chained property count.

## 14. Interview Questions

1. Behavior with null vs 0?
2. Mix with nullish coalescing?
3. Use with arrays/functions?

## 15. Follow-up Questions

- "How does compiler transpile optional chaining?"

## 16. Production Best Practices

1. Combine with `??` defaults
2. Place carefully to avoid masking errors
3. Use for known optional paths

## 17. Summary

Elegant guard against nullish chains — reduces defensive checks.

## 18. Revision Notes

- Stops only at null/undefined
- Three forms: prop/index/call
- Pairs with ?? naturally
- Transpiles well downlevel

## 19. Practice Questions

1. Safely traverse deeply nested structure.
2. Guard optional callback.
3. Merge with default value pattern.

## 20. References

- [MDN: Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

### Next File
**009 - Nullish Coalescing.md**
