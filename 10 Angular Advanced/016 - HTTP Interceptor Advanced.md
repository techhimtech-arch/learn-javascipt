# HTTP Interceptor Advanced

## 1. Definition

**Advanced HTTP Interceptors** handle complex cross-cutting concerns — token refresh, retry strategies, offline queueing, request dedup.

## 2. Why do we need it?

Enterprise apps need robust HTTP handling with centralized error recovery.

## 3. Internal Working

Interceptor chains:
1. Request flows through interceptors in registration order
2. Each may modify request/response
3. Chain reverses direction for responses
4. Final handler sends actual HTTP request

## 4. Step-by-Step Execution

Token refresh interceptor:
```typescript
@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = this.addToken(req, this.getAccessToken());
    
    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !isRefreshing) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenSubject.next(null);

      return this.auth.refreshToken().pipe(
        switchMap(() => {
          isRefreshing = false;
          const token = this.getAccessToken();
          refreshTokenSubject.next(token);
          return next.handle(this.addToken(req, token));
        }),
        catchError(() => {
          isRefreshing = false;
          this.auth.logout();
          return EMPTY;
        })
      );
    }

    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => next.handle(this.addToken(req, token)))
    );
  }
}
```

## 5. Syntax

```typescript
@Injectable()
export class MultiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // Multiple operators
      retryWithBackoff(3),
      catchError(handleHttpError),
      finalize(logRequestMetrics),
      timeout(5000),
      catchError(handleTimeout)
    );
  }
}
```

## 6. Examples

### Easy
```typescript
// Logging interceptor
intercept(req, next) {
  console.log(`${req.method} ${req.url}`);
  const start = performance.now();
  
  return next.handle(req).pipe(
    tap(() => {
      console.log(`Completed in ${performance.now() - start}ms`);
    })
  );
}
```

### Medium
```typescript
// Retry with exponential backoff
intercept(req, next) {
  return next.handle(req).pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => {
        if (retryCount > 3) throw error;
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        return timer(delay);
      }
    })
  );
}
```

### Advanced
```typescript
// Offline request queue
@Injectable()
export class OfflineQueueInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      this.queueRequest(req);
      // Return observable that completes immediately
      return EMPTY;
    }
    
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && isNetworkError(error)) {
          this.queueRequest(req);
          return EMPTY;
        }
        return throwError(() => error);
      })
    );
  }
}
```

## 7. Best Practices

1. Single responsibility per interceptor
2. Clone requests before modification
3. Handle all error scenarios
4. Keep interceptors lightweight
5. Test interceptors in isolation

## 8. Common Mistakes

❌ Mutating original requests
❌ Creating circular interceptor calls
❌ Handling errors inconsistently

## 9. Interview Questions

1. Token refresh strategy?
2. Interceptor ordering importance?
3. Offline request handling?

## 10. Summary

Advanced interceptors handle complex HTTP scenarios robustly.

## 11. References

- [Angular HTTP Interceptors](https://angular.io/guide/http#intercepting-requests-and-response)

---

## Module 9 Complete! Now generating final files...
