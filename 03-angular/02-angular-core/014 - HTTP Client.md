# HTTP Client

## 1. Definition

**HttpClient** is Angular’s enhanced HTTP client built on XMLHttpRequest/XHR browser API — providing type-safe request/response handling with RxJS integration.

## 2. Why do we need it?

Simplify server communication with interceptors, typed responses, progress tracking, and automatic JSON parsing.

## 3. Internal Working

1. Sends HTTP request via underlying browser mechanism
2. Returns Observable of response
3. Interceptors can modify requests/responses globally
4. Response auto-parsed based on `responseType`

## 4. Step-by-Step Execution

Basic request:
```typescript
constructor(private http: HttpClient) {}

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}
```

Interceptor flow:
1. Request passes through forward chain
2. Interceptor modifies headers/params
3. Forwarded to next handler
4. Response flows back through chain

## 5. Syntax

```typescript
// GET
this.http.get<T>(url, options);
// POST
this.http.post<T>(url, body, options);
// PUT/DELETE
this.http.put<T>(url, body);
this.http.delete<T>(url);

// Options
{ params: new HttpParams().set('page', 1), headers: {...} }
{ observe: 'response', responseType: 'blob' }
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
```

### Medium
```typescript
// With loading state
getUsersWithLoading(): Observable<User[]> {
  this.loading = true;
  return this.http.get<User[]>('/api/users').pipe(
    finalize(() => this.loading = false),
    catchError(err => {
      this.error = err.message;
      return throwError(() => err);
    })
  );
}

// File download
downloadReport(): Observable<Blob> {
  return this.http.get('/api/report.pdf', {
    responseType: 'blob'
  });
}
```

### Advanced
```typescript
// Custom interceptor with retry/backoff
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry({
        count: 3,
        delay: (err, count) => timer(Math.pow(2, count) * 1000),
        retryOn: (err) => err.status >= 500
      }),
      catchError(err => {
        console.error('HTTP Error:', err);
        return throwError(() => new Error('Service unavailable'));
      })
    );
  }
}
```

## 7. Visual Diagram (ASCII)

```
HTTP Request Pipeline

Component ──► HttpClient ──► Interceptors ──► Backend
                                   │    ▲
                                   │    └── Response flows back
                                   ▼
                              Observable ←── Response received
```

## 8. Real-world Example

Token refresh interceptor with retry-once logic.

## 9. Angular Use Case

All API interactions, authentication flows, file uploads/downloads.

## 10. Common Mistakes

❌ Not handling HTTP errors explicitly
❌ Missing proper typing of responses

## 11. Edge Cases

1. **Cross-origin issues**
2. **Timeout handling**
   ```typescript
   timeout(5000)
   ```

3. **Large payload streaming**

## 12. Performance Considerations

Interceptors add overhead — keep them lightweight.

## 13. Time & Space Complexity

Network-bound — varies by payload size/latency.

## 14. Interview Questions

1. Interceptor execution order?
2. Handle token expiry?
3. Type-safe responses?

## 15. Follow-up Questions

- "Cancel duplicate requests?"

## 16. Production Best Practices

1. Type all API responses
2. Global error handling via interceptors
3. Authentication token injection centrally
4. Use progress events for uploads
5. Combine with retry/backoff strategies

## 17. Summary

HttpClient streamlines server integration while interceptors enable cross-cutting concerns.

## 18. Revision Notes

- Observable-based API
- Interceptors modify chain
- Typed response generics
- Automatic JSON parsing

## 19. Practice Questions

1. Build auth token interceptor.
2. Implement retry-with-backoff logic.
3. Add progress bar to file upload.

## 20. References

- [Angular HttpClient](https://angular.io/guide/http)
- [Angular HTTP Tests](https://angular.io/guide/http#testing-http-requests)

### Next File
**015 - ViewChild and ContentChild.md**
