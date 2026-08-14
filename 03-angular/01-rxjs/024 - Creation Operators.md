# RxJS Creation Operators

## 1. Definition

**Creation Operators** produce Observables from various sources — timers, events, promises, iterables.

## 2. Why do we need it?

Convert anything into observable stream for unified async handling.

## 3. Internal Working

Key creation operators:
- `of()`: Emit arguments synchronously
- `from()`: Convert promise/iterable/array/observable
- `fromEvent()`: Event-based observables
- `fromPromise()`: Promise-to-observable (deprecated in v7)
- `timer()`: Delayed emission, optionally recurring
- `interval()`: Recurring timer
- `ajax()`: AJAX requests returning observables
- `defer()`: Lazy observable creation
- ` EMPTY`: Immediate completion
- `never`: No emissions, never completes
- `throwError`: Immediate error

## 4. Syntax

```typescript
import { of, from, fromEvent, timer, interval, defer, EMPTY, NEVER, throwError } from 'rxjs';

// Emit literal values
of(1, 2, 3).subscribe(console.log); // 1, 2, 3

// Convert various sources
from([1, 2, 3]).subscribe(console.log); // 1, 2, 3
from(Promise.resolve('hello')).subscribe(console.log); // hello

// Timer
timer(1000).subscribe(() => console.log('1s later')); // After 1s
timer(1000, 500).subscribe(() => console.log('every 500ms after 1s'));

// Event creation
const clicks$ = fromEvent(document, 'click');
clicks$.subscribe(event => console.log('Clicked!', event));

// Deferred creation
const deferred$ = defer(() => Math.random() > 0.5 ? of('A') : of('B'));
```

## 5. Examples

### Easy
```typescript
// Create simple observable
const numbers$ = of(1, 2, 3, 4, 5);
numbers$.subscribe({
  next: n => console.log(n),
  complete: () => console.log('Done!')
});
```

### Advanced
```typescript
// Polling with timer + switchMap
const pollData$ = timer(0, 30000).pipe(
  switchMap(() => fetch('/api/data')),
  repeat({ delay: 1000, reportRepeatErrors: true })
);

// Retry failed request
const reliable$ = timer(0, 30000).pipe(
  switchMap(() => api.fetchData()),
  retry({ count: 3, delay: 1000 })
);
```

## 6. Interview Questions

1. Creation vs transformation operators?
2. from() vs of() differences?
3. timer() vs interval()?

## 7. Summary

Creating observables unlocks RxJS patterns for all async data flows.

## 8. References

- [RxJS API: Creation](https://rxjs.dev/api/index/class/Observable)

---
