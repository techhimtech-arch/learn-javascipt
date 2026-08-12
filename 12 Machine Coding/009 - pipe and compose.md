# pipe and compose

## 1. Definition

**pipe** and **compose** are functional utilities combining multiple unary functions into a single pipeline:
- `pipe(f, g, h)` → executes left-to-right
- `compose(f, g, h)` → executes right-to-left

## 2. Why do we need it?

Enable declarative data flow composition — readable transformations without intermediate variables.

## 3. Internal Working

Return new function chaining calls:
- pipe: f(g(h(x)))
- compose: h(g(f(x)))

Execute sequentially passing output of one as input to next.

## 4. Step-by-Step Execution

Implementation:
```javascript
const pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);
const compose = (...fns) => (x) => fns.reduceRight((v, fn) => fn(v), x);
```

Steps:
1. Collect list of functions
2. Return closure accepting input
3. Reduce through functions transforming value step-by-step

## 5. Syntax

```javascript
pipe(
  parseJson,
  filterValid,
  mapToItems
)(rawData);

compose(
  renderToDom,
  applyStyles,
  formatItems
)(initialData);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const addOne = x => x + 1;
const double = x => x * 2;

pipe(addOne, double)(3); // 8
compose(addOne, double)(3); // 7
```

### Medium
```javascript
const processUser = pipe(
  user => ({ ...user, id: +user.id }),
  user => ({ ...user, fullName: `${user.firstName} ${user.lastName}` }),
  user => ({ ...user, role: user.admin ? 'admin' : 'user' })
);
```

### Advanced
```typescript
// RxJs-inspired stream transformation
const transformStream = pipe(
  filter((item: Item) => item.isActive),
  map((item: Item) => ({ ...item, processed: true })),
  mergeMap((item: ProcessedItem) => api.update(item)),
  catchError((err, caught) => of(null))
);
```

## 7. Visual Diagram (ASCII)

```
Data Pipeline

Input ──► [f] ──► [g] ──► [h] ──► Output

pipe:   f → g → h (left to right)
compose: h → g → f (right to left)
```

## 8. Real-world Example

Angular HttpInterceptor chains:
```typescript
return next.handle(req).pipe(
  map((res: HttpResponse<any>) => res.clone({ headers: ... })),
  catchError(err => throwError(() => err))
);
```

## 9. Angular Use Case

RxJS operator chaining, middleware pipelines, interceptor chains.

## 10. Common Mistakes

❌ Non-unary functions breaking composition  
❌ Side effects in middle functions

## 11. Edge Cases

1. **Empty composition**
   ```javascript
   pipe()(x); // identity function
   ```

2. **Async compositions**
   ```javascript
   pipe(asyncFn, syncFn)(input); // syncFn receives Promise
   ```

## 12. Performance Considerations

No significant overhead — inline function calls.

## 13. Time & Space Complexity

O(n) where n = number of composed functions.

## 14. Interview Questions

1. Difference between pipe and compose?
2. Implement pipe manually
3. Why unary functions preferred?

## 15. Follow-up Questions

- "How does lodash/fp handle arity?"

## 16. Production Best Practices

1. Keep middle functions pure/unary
2. Name composed pipelines descriptively
3. Use TypeScript generics for type inference

## 17. Summary

Functional composition builds expressive data transformation chains.

## 18. Revision Notes

- pipe = left-to-right
- compose = right-to-left
- Each function takes single input/output
- Enable point-free style

## 19. Practice Questions

1. Implement pipe and compose.
2. Chain data validators.
3. Build middleware pipeline.

## 20. References

- [Ramda: pipe/compose](https://ramdajs.com/docs/#pipe)
- [MDN: Functional Programming Concepts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_parameters)

### Next File
**010 - LRU Cache.md**
