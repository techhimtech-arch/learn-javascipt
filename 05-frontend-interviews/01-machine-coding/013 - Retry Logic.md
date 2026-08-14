# Retry Logic

## 1. Definition

**Retry Logic** automatically re-attempts failed operations within defined constraints — improving resilience against transient failures.

## 2. Why do we need it?

Network hiccups, rate limiting, temporary outages shouldn't hard-fail applications.

## 3. Internal Working

Configurable loop:
1. Attempt operation
2. On failure: delay then retry
3. Track attempt count
4. Stop on success/max attempts/timeout

Strategies include fixed/backoff/exponential delays.

## 4. Step-by-Step Execution

Basic implementation:
```javascript
async function retry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}
```

Steps:
1. Invoke provided async function
2. Failed? Increment retry counter
3. Wait delay period
4. Retry until max reached or success

## 5. Syntax

```javascript
retry(() => fetch('/api/data'), 3, 1000);

// RxJS
source$.pipe(retry({ count: 3, delay: 1000 }))
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
async function fetchWithRetry(url, retries = 2) {
  try {
    return await fetch(url);
  } catch (err) {
    if (retries > 0) return fetchWithRetry(url, retries - 1);
    throw err;
  }
}
```

### Medium
```javascript
const fetchRetry = (url, options = {}, retries = 3) =>
  fetch(url, options).catch(err => {
    if (retries === 0) throw err;
    console.log(`Retrying... attempts left: ${retries - 1}`);
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => fetchRetry(url, options, retries - 1));
  });
```

### Advanced
```typescript
@Injectable()
export class RobustHttpClient {
  private readonly MAX_RETRIES = 3;
  
  request<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      retry({
        count: this.MAX_RETRIES,
        delay: (error, attempt) => timer(Math.min(1000 * 2 ** attempt, 10000))
      }),
      catchError(error => {
        this.logError(error);
        return throwError(() => new Error('Request failed permanently'));
      })
    );
  }
}
```

## 7. Visual Diagram (ASCII)

```
Retry Workflow

Attempt 1 ──Fail──► Wait 1s
Attempt 2 ──Fail──► Wait 2s
Attempt 3 ──Fail──► Wait 4s
Attempt 4 ──Success──► Done

Backoff Multiplier: 1s → 2s → 4s (exponential)
```

## 8. Real-world Example

Angular HTTP interceptor retrying failed requests:
```typescript
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(req).pipe(
    retry({
      count: 2,
      delay: (_, attempt) => timer(Math.pow(2, attempt) * 1000)
    }),
    catchError(err => {
      this.notifications.showError('Request failed');
      return throwError(() => err);
    })
  );
}
```

## 9. Angular Use Case

HTTP interceptors, WebSocket reconnections, background sync mechanisms.

## 10. Common Mistakes

❌ Infinite retries without cap  
❌ Not respecting HTTP status codes (only retry network/5xx)

## 11. Edge Cases

1. **Non-idempotent operations**
   ```javascript
   retry(() => POST('/transfer', payload)); // Risky!
   ```

2. **Rate-limited APIs**
   ```javascript
   retryConditional((err) => err.status === 429);
   ```

3. **Cascading failures**

## 12. Performance Considerations

Exponential backoff prevents thundering herd problems.

## 13. Time & Space Complexity

Depends on retry policy and backoff strategy.

## 14. Interview Questions

1. Design retry mechanism
2. Backoff strategies explained
3. Idempotency concerns?

## 15. Follow-up Questions

- "How to stop retrying on certain statuses?"

## 16. Production Best Practices

1. Exponential backoff with jitter
2. Circuit breaker integration
3. Respect Retry-After header
4. Log retry attempts for observability

## 17. Summary

Retry improves reliability — but must balance persistence vs resource exhaustion intelligently.

## 18. Revision Notes

- Max attempts guard infinite looping
- Delays between attempts
- Backoff prevents overload
- Consider idempotency

## 19. Practice Questions

1. Build configurable retry utility.
2. Add exponential backoff.
3. Only retry on specific HTTP statuses.

## 20. References

- [MDN: Fetch retry](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [RxJS: retry](https://rxjs.dev/api/operators/retry)

### Next File
**014 - Autocomplete RxJS.md**
