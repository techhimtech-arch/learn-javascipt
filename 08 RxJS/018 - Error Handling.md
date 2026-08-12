# Error Handling

## 1. Definition

RxJS **Error Handling** manages failures in observable pipelines — stopping propagation via catchError or handling globally with retry/backoff strategies.

## 2. Why do we need it?

Prevent uncaught exceptions crashing async flows; retry transient failures gracefully.

## 3. Internal Working

1. When operator throws → error propagates down chain toward consumers
2. Without handler → terminates observable stream
3. `catchError` intercepts → returns fallback/error observable
4. `retry*` operators attempt re-subscription

## 4. Step-by-Step Execution

Example:
```typescript
source$.pipe(
  catchError(err => {
    if (err.status === 0) {
      return of([]); // Fallback to empty array
    }
    return throwError(() => new Error('API failure'));
  })
).subscribe({
  error: err => console.error('Final error:', err)
});
```

Steps:
1. Source emits error
2. catchError catches before it reaches subscriber
3. Returns safe fallback observable
4. Subscriber continues receiving fallback data
5. Error path not triggered (no fatal error)

## 5. Syntax

```typescript
// Catch & recover
source$.pipe(
  catchError(err => of(defaultValue))
)

// Retry attempts
source$.pipe(
  retry({ count: 3, delay: 1000 })
)

// Exponential backoff
source$.pipe(
  retry({ 
    count: 3, 
    delay: (error, retryCount) => timer(Math.pow(2, retryCount) * 1000) 
  })
)
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
const safe$ = of('data').pipe(
  map(() => JSON.parse('invalid')), // Throws
  catchError(err => of('default value'))
);

safe$.subscribe(val => console.log(val)); // 'default value'
```

### Medium
```typescript
// Resilient HTTP call
http.get<Data[]>('/api/data').pipe(
  retry({ count: 3, delay: 1000 }),
  catchError(err => {
    if (err instanceof HttpErrorResponse) {
      return []; // Return empty array on HTTP error
    }
    return throwError(() => err); // Re-throw unknown errors
  })
).subscribe({
  next: data => this.displayData(data),
  error: err => this.showError(err.message)
});
```

### Advanced
```typescript
// Global error handler interceptor
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private notificationService: NotificationService) {}

  handleError(error: any): void {
    // Log locally
    console.error('Global error:', error);
    
    // Send to backend for tracking
    this.sendErrorToBackend(error);
    
    // User feedback
    this.notificationService.showError('An unexpected error occurred');
  }

  private sendErrorToBackend(error: any) {
    // Avoid infinite loops with timeout/safe path
    navigator.sendBeacon('/api/errors', JSON.stringify({
      message: error.message,
      stack: error.stack
    }));
  }
}

// Operator combining retry + fallback + error handling
function resilientFetch<T>(
  url: string,
  retries = 3,
  fallback: T[] = []
): Observable<T[]> {
  return timer(0, 2000).pipe(
    switchMap(() => this.http.get<T[]>(url)),
    retry({ count: retries }),
    catchError(err => {
      console.warn('Fetch failed after retries:', err);
      return of(fallback);
    })
  );
}
```

## 7. Visual Diagram (ASCII)

```
Error Propagation & Recovery Flow

Observable Sequence
┌─────────────────────────────┐
│ emit(v1) → subscriber.next  │
│ emit(v2) → subscriber.next  │
│ THROW ERROR                 │
└─────────────┬───────────────┘
              │
       [catchError]
              │
    ┌─────────┴─────────┐
    │ Fallback Observable │
    └─────────┬─────────┘
              │
 subscriber.next(fallbackValue)
```

## 8. Real-world Example

API health check that retries before giving up.

## 9. Angular Use Case

HTTP interceptors for global retry logic, graceful degradation fallbacks.

## 10. Common Mistakes

❌ Swallowing errors silently
❌ Not handling subscription errors appropriately

## 11. Edge Cases

1. **Catch returning same failing observable**
   ```typescript
   // Infinite retry loop potential
   ```

2. **Nested error handling contexts**
3. **Retry exhaustion handling**

## 12. Performance Considerations

Retry delays should balance resilience and responsiveness.

## 13. Time & Space Complexity

Per-error overhead is constant.

## 14. Interview Questions

1. How to retry with exponential backoff?
2. catchError vs retry difference?
3. Handle stream completion vs error?

## 15. Follow-up Questions

- "Custom retry strategy with jitter?"

## 16. Production Best Practices

1. Log errors before recovery
2. Limit retry attempts
3. Implement exponential backoff with jitter
4. Separate infrastructure errors from business errors
5. Provide user-facing feedback

## 17. Summary

Proactive error handling prevents stream disruptions and enhances reliability.

## 18. Revision Notes

- Errors terminate by default
- catchError replaces error path
- retry attempts re-subscription
- Always log before silent recovery

## 19. Practice Questions

1. Implement exponential backoff retry.
2. Build API wrapper with graceful fallbacks.
3. Add global error logging handler.

## 20. References

- [RxJS Error Handling](https://rxjs.dev/guide/overview#error-handling)

### Next File
**018 - Higher Order Mapping.md**
