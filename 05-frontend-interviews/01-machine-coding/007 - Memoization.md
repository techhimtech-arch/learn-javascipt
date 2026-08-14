# Memoization

## 1. Definition

**Memoization** caches function results based on input arguments — returning prior outputs instantly instead of recomputing.

## 2. Why do we need it?

Speed up expensive computations with repeated identical inputs.

## 3. Internal Working

Uses closure-captured cache Map keyed by serialized input:
1. Compute key from arguments
2. Check cache → return cached value if found
3. Else compute, store, return new result

## 4. Step-by-Step Execution

Implementation:
```javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

Steps:
1. Stringify args into cache key
2. Lookup in Map
3. Hit → return cached
4. Miss → compute → store → return

## 5. Syntax

```javascript
const memoizedFn = memoize(expensiveFunction);
memoizedFn(input); // First call computes and stores
memoizedFn(input); // Subsequent calls return cached
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const fibMemo = memoize(n => {
  if (n <= 1) return n;
  return fibMemo(n - 1) + fibMemo(n - 2);
});
```

### Medium
```javascript
function expensiveCalc(a, b) {
  // Complex math here
  return a * b * Math.random(); // Mock
}
const memoizedCalc = memoize(expensiveCalc);
```

### Advanced
```typescript
@Injectable({ providedIn: 'root' })
export class CachedDataService {
  private readonly cache = new Map<string, Observable<any>>();
  
  getData(path: string): Observable<any> {
    if (this.cache.has(path)) {
      return this.cache.get(path)!;
    }
    
    const data$ = this.http.get<any>(path).pipe(
      shareReplay({ bufferSize: 1 })
    );
    
    this.cache.set(path, data$);
    return data$;
  }
}
```

## 7. Visual Diagram (ASCII)

```
Memoization Flow

Input Args ──► Cache Key Generation
                │
         Cache Hit?──No──► Compute & Store
                 │ Yes
                 ▼
           Return Cached Result
```

## 8. Real-world Example

Angular component memo with NgRx selector memoization.

## 9. Angular Use Case

Optimizing pure pipes, NgRx selectors, recursive operations.

## 10. Common Mistakes

❌ Caching mutable objects  
❌ Key collisions from poor serialization

## 11. Edge Cases

1. **Arguments containing functions**
   ```javascript
   memoize((fn) => fn()); // Poor key generation
   ```

2. **Deep equality for cache keys**
3. **Memory growth without eviction**

## 12. Performance Considerations

Trade memory for speed — bounded caches recommended.

## 13. Time & Space Complexity

Lookup: O(1) average
Storage: O(cache size)

## 14. Interview Questions

1. Implement memoize factory
2. Handle multi-argument caching
3. Cache invalidation strategy?

## 15. Follow-up Questions

- "Difference from React.memo?"

## 16. Production Best Practices

1. Use appropriate key derivation strategy
2. Bound cache size (LRU eviction)
3. Skip memoizing fast operations
4. Ensure deterministic return values

## 17. Summary

Memoization trades memory for CPU cycles — powerful for costly repetitive computations.

## 18. Revision Notes

- Cache Map keyed by inputs
- Pure functions required
- Eviction prevents leaks
- Angular pipe optimization benefit

## 19. Practice Questions

1. Memoize recursive Fibonacci.
2. Cache API response by query params.
3. Implement LRU-aware memoization.

## 20. References

- [MDN: Memoization](https://developer.mozilla.org/en-US/docs/Glossary/Memoization)

### Next File
**008 - groupBy.md**
