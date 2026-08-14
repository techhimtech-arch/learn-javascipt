# Testing Reactivity

## 1. Definition

**Reactivity Testing** verifies reactive systems respond correctly to state changes — covering emission chains, timing, and side effects.

## 2. Why do we need it?

Reactive logic often has complex timing/interaction behaviors difficult to verify manually.

## 3. Internal Working

Testing approaches:
1. **Synchronous**: Use sync schedulers or immediate emissions
2. **Asynchronous**: Time-based marble testing
3. **State assertions**: Verify side effects/outputs
4. **Subscription tracking**: Ensure proper cleanup

## 4. Step-by-Step Execution

Marble testing setup:
```typescript
import { cold, hot, expectObservable } from 'jasmine-marbles';

it('should emit doubled values', () => {
  const source$ = cold('--a--b--c', { a: 1, b: 2, c: 3 });
  const expected = cold('--x--y--z', { x: 2, y: 4, z: 6 });
  
  const result$ = source$.pipe(map(x => x * 2));
  expectObservable(result$).toBe(expected);
});
```

## 5. Syntax

```typescript
// Jest with rxjs-marbles
it('emits correctly', () => {
  const scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
  
  scheduler.run(({ cold, hot, expectObservable }) => {
    const source$ = cold('a--b--|', { a: 'Hello', b: 'World' });
    const result$ = source$.pipe(
      map(s => s.length),
      filter(n => n > 3)
    );
    
    const expected = cold('1--2--|', { 1: 5, 2: 5 });
    expectObservable(result$).toBe(expected);
  });
});
```

## 6. Examples

### Easy
```typescript
// Simple emission test
it('should emit hello', () => {
  const result = [];
  of('hello').subscribe(val => result.push(val));
  expect(result).toEqual(['hello']);
});
```

### Advanced
```typescript
// Error propagation
it('should propagate errors', () => {
  scheduler.run(({ cold, expectObservable }) => {
    const error = { error: new Error('Test error') };
    const source$ = cold('#', error);
    
    expectObservable(source$).toBe('#', error);
  });
});
```

## 7. Testing Libraries

- **RxJS Marbles**: Visual marble testing
- **Jest-Scheduler**: Scheduler utilities
- **TestScheduler**: Official testing utility
- **Cold/Hot observables**: Control timing

## 8. Interview Questions

1. Marble testing syntax?
2. Cold vs hot observables?
3. Test async timing?

## 9. Summary

Reactive testing catches subtle timing/ordering bugs in event streams.

## 10. References

- [RxJS Testing](https://rxjs.dev/guide/testing)

---
