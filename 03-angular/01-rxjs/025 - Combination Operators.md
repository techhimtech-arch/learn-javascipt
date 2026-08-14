# RxJS Combination Operators

## 1. Definition

**Combination Operators** merge multiple Observables into one — coordinating parallel async flows.

## 2. Why do we need it?

Aggregate related data streams, synchronize async dependencies, orchestrate complex flows.

## 3. Internal Working

Common operators:
- `combineLatest`: Emits when all inputs emit
- `forkJoin`: Emits last values on all complete
- `zip`: Emits in parallel until shortest completes
- `concat`: Sequential emission
- `merge`: Concurrent emission

## 4. Syntax

```typescript
import { combineLatest, forkJoin, zip, concat, merge, of, timer } from 'rxjs';

// combineLatest
combineLatest([of(1), of(2), of(3)]).subscribe(console.log); // [1, 2, 3]

// forkJoin
forkJoin([of(1), of(2)]).subscribe(console.log); // [1, 2]

// zip
zip([1,2,3], ['a','b','c']).pipe(toArray()).subscribe(console.log); // [[1,'a'],[2,'b'],[3,'c']]
```

## 5. Examples

### Easy
```typescript
// Merge login streams
const loginSuccess$ = api.login$.pipe(filter(r => !r.error));
const loginFailure$ = api.login$.pipe(filter(r => r.error));

const status$ = merge(
  loginSuccess$.pipe(mapTo('authenticated')),
  loginFailure$.pipe(mapTo('error'))
);
```

### Advanced
```typescript
// Combine data streams
const user$ = timer(0, 1000).pipe(switchMap(() => api.getUser()));
const posts$ = timer(1000, 5000).pipe(switchMap(() => api.getPosts()));

const viewModel$ = combineLatest([user$, posts$]).pipe(
  map(([user, posts]) => ({
    userName: user.name,
    postCount: posts.length,
    recentPosts: posts.slice(0, 3)
  }))
);
```

## 6. Interview Questions

1. combineLatest vs forkJoin when to use?
2. zip ordering guarantees?

## 7. Summary

Combination operators synchronize parallel streams efficiently.

## 8. References

- [RxJS Combination Operators](https://rxjs.dev/guide/operators)

---
