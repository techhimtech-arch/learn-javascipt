# HTTP Interceptors

## 1. Definition

**HTTP Interceptors** modify requests/responses flowing through Angular's HttpClient pipeline — enabling cross-cutting concerns like auth, logging, caching.

## 2. Why do we need it?

Centralize request/response handling logic — avoid duplicating authentication/token logic.

## 3. Internal Working

Interceptor chain:
1. HTTP request created
2. Passes through registered interceptors in order
3. Each may modify request/response
4. Final request sent to backend
5. Responses flow back through chain

## 4. Step-by-Step Execution

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.getToken()}`)
    });
    return next.handle(authReq);
  }
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
```

## 5. Syntax

```typescript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Transform request
    const transformed = req.clone({
      setHeaders: { 'X-Custom': 'value' }
    });
    
    return next.handle(transformed).pipe(
      // Handle response
      tap(event => {
        if (event instanceof HttpResponse) {
          // Do something with response
        }
      }),
      catchError(err => {
        // Handle errors
        return throwError(() => err);
      })
    );
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Token injection
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
```

### Medium
```typescript
// Logging interceptor with timing
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = performance.now();
    const id = this.generateId();
    
    console.log(`${id} ${req.method} ${req.url} STARTED`);

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const duration = performance.now() - startTime;
          console.log(`${id} ${req.method} ${req.url} COMPLETED in ${duration.toFixed(2)}ms`);
        }
      }),
      catchError(err => {
        const duration = performance.now() - startTime;
        console.error(`${id} ${req.method} ${req.url} ERROR in ${duration.toFixed(2)}ms`, err);
        return throwError(() => err);
      })
    );
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
```

### Advanced
```typescript
// Retry with exponential backoff
@Injectable()
export class RetryInterceptor implements HttpIntercept {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry({ count: 3 }),
      delay(1000)
    ).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              // Redirect to login
              break;
            case 500:
              // Retry with backoff
              return next.handle(req).pipe(delay(2000));
            default:
              return throwError(() => error);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
```

## 7. Visual Diagram (ASCII)

```
HTTP Interceptor Chain

Request ──► ┌─────────────┐
            │ Interceptor 1 │
            └──────┬───────┘
                   ▼
            ┌─────────────┐
            │ Interceptor 2 │
            └──────┬───────┘
                   ▼
            ┌─────────────┐
            │  HttpClient  │
            └──────┬───────┘
                   ▼
              Backend Server
                   │
                   ▼
            ┌─────────────┐
            │ Interceptor 2 │ (response)
            └──────┬───────┘
                   ▼
            ┌─────────────┐
            │ Interceptor 1 │
            └─────────────┘
                   │
                   ▼
                 Response
```

## 8. Real-world Example

Authentication token refresh with automatic retry.

## 9. Angular Use Case

Authentication, logging, error handling, caching, request/response transformation.

## 10. Common Mistakes

❌ Mutating original requests
❌ Not handling errors properly
❌ Circular interceptor calls

## 11. Edge Cases

1. **Circular call prevention**
2. **Large response interception**

## 12. Performance Considerations

Interceptors add small overhead — keep lightweight.

## 13. Time & Space Complexity

O(interceptors) chain traversal.

## 14. Interview Questions

1. Interceptor execution order?
2. Modify request immutably?
3. Handle response transformation?

## 15. Follow-up Questions

- "Implement request cancellation?"

## 16. Production Best Practices

1. Clone requests before modification
2. Handle all error scenarios
3. Avoid unnecessary cloning
4. Log meaningful diagnostic info
5. Keep interceptors focused (single responsibility)

## 17. Summary

HTTP interceptors centralize cross-cutting concerns for HTTP operations.

## 18. Revision Notes

- Multi-provider injection for multiple interceptors
- Clone requests immutably
- Handle both request/response
- Chain execution order matters

## 19. Practice Questions

1. Build auth token injection interceptor.
2. Add request/response logging.
3. Implement retry-with-backoff interceptor.

## 20. References

- [Angular: HTTP Interceptors](https://angular.io/guide/http#intercepting-requests-and-response)

---
