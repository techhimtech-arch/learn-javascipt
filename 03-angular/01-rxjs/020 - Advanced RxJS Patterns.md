# Advanced RxJS Patterns

## 1. Definition

**Advanced RxJS Patterns** include higher-order mapping, custom operators, backpressure management, and advanced error handling techniques.

## 2. Why do we need it?

Compose complex asynchronous flows efficiently while avoiding memory leaks and performance bottlenecks.

## 3. Internal Working

Patterns:
1. **Higher-order mapping**: switchMap/mergeMap/concatMap/exhaustMap
2. **Custom operators**: Function returning OperatorFunction
3. **Backpressure control**: buffer/debounce/throttle strategies
4. **State machines**: Using scan/reduce to model system states

## 4. Step-by-Step Execution

Custom operator:
```typescript
function logValue<T>(prefix: string): MonoTypeOperatorFunction<T> {
  return tap({
    next: (value) => console.log(`${prefix}: ${value}`),
    error: (err) => console.error(`${prefix}: ${err}`),
    complete: () => console.log(`${prefix}: completed`)
  });
}
```

Usage:
```typescript
source$.pipe(
  logValue('Data'),
  switchMap(data => process(data)),
  retry(3)
)
```

## 5. Syntax

```typescript
// Custom operator
function myOperator<T, R>(config: Config): OperatorFunction<T, R> {
  return (source: Observable<T>) => source.pipe(
    filter(/*...*/),
    map(/*...*/),
    tap(/*...*/)
  );
}

// Usage
source$.pipe(myOperator({ option: true }))
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Custom tap wrapper
const consoleLog = <T>(msg: string): MonoTypeOperatorFunction<T> =>
  tap(value => console.log(msg, value));

data$.pipe(
  consoleLog('Received'),
  map(x => x * 2),
  consoleLog('Transformed')
)
```

### Medium
```typescript
// Custom retry with exponential backoff
function retryBackoff(maxAttempts: number, baseDelay: number) {
  return <T>(source: Observable<T>) => source.pipe(
    retry({
      count: maxAttempts,
      delay: (_,Attempt) => {
        const delay = Math.pow(2, attempt - 1) * baseDelay;
        return timer(delay);
      }
    })
  );
}

apiCall().pipe(retryBackoff(3, 1000))
```

### Advanced
```typescript
// State machine with scan
type State = 'idle' | 'loading' | 'success' | 'error';

interface MachineState<T> {
  status: State;
  data: T | null;
  error: any | null;
}

const initialState: MachineState<any> = {
  status: 'idle',
  data: null,
  error: null
};

const reducer = (state: MachineState<any>, action: Action): MachineState<any> => {
  switch (action.type) {
    case 'FETCH':
      return { ...state, status: 'loading', error: null };
    case 'SUCCESS':
      return { ...state, status: 'success', data: action.payload, error: null };
    case 'FAILURE':
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
};

const fetchMachine = (actions$: Observable<Action>) =>
  actions$.pipe(scan(reducer, initialState));

// Usage
action$.pipe(
  switchMap(() => 
    api.call().pipe(
      map(data => ({ type: 'SUCCESS', payload: data })),
      catchError(error => of({ type: 'FAILURE', payload: error }))
    )
  ),
  startWith({ type: 'FETCH' }),
  scan(reducer, initialState)
)
```

## 7. Visual Diagram (ASCII)

```
Custom Operator Factory Pattern

User Configuration ──► Operator Factory
                                  │
                         Returns OperatorFn
                                  │
         ┌────────────────────────▼──────────────────┐
         │ source$.pipe(                                │
         │   filter(),                                  │
         │   map(),                                     │
         │   myCustomOperator(config)                   │
         │ )                                            │
         └──────────────────────────────────────────────┘
```

## 8. Real-world Example

Building resilient polling mechanism with backoff.

## 9. Angular Use Case

HTTP error recovery, debounced search, polling, form validation flows.

## 10. Common Mistakes

❌ Creating new observables instead of piping
❌ Not handling completion/unsubscription

## 11. Edge Cases

1. **Operator ordering matters**
   ```typescript
   // Different outcomes:
   source$.pipe(take(1), filter(...))
   source$.pipe(filter(...), take(1))
   ```

2. **Memory leak potential in closures**

## 12. Performance Considerations

Operators execute per emission — minimize per-item cost.

## 13. Time & Space Complexity

Depends on operator composition.

## 14. Interview Questions

1. Building custom operators?
2. Backpressure handling patterns?
3. Switch vs Merge vs Concat vs Exhaust?

## 15. Follow-up Questions

- "Implement retry with exponential backoff?"

## 16. Production Best Practices

1. Use existing operators when possible
2. Keep custom operators pure
3. Handle errors explicitly
4. Consider performance implications

## 17. Summary

Advanced patterns unlock sophisticated asynchronous flow management capabilities.

## 18. Revision Notes

- switchMap for latest-only cancellation
- mergeMap for parallel concurrency
- concatMap for strict ordering
- exhaustMap for ignoring duplicates
- Custom operators via factory functions

## 19. Practice Questions

1. Build debounced search with cancellation.
2. Implement polling with exponential backoff.
3. Create custom retry-with-jitter operator.

## 20. References

- [RxJS Advanced Patterns](https://rxjs.dev/guide/operators)

---

## FINAL SUMMARY
