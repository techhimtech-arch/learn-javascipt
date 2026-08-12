# Error Handling in Angular

## 1. Definition

**Error Handling** catches and gracefully handles exceptions — both expected (validation, network) and unexpected (runtime crashes).

## 2. Why do we need it?

Prevent crashes, provide user-friendly messages, log errors for debugging, maintain app stability.

## 3. Internal Working

Global handler:
```typescript
import { ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global error:', error);
    // Send to error tracking service
  }
}
```

Zone.js hooks intercept async errors.

## 4. Step-by-Step Execution

Error boundary pattern:
```typescript
@Component({...})
export class SafeComponent {
  error: Error | null = null;
  
  tryOperation() {
    try {
      riskyOperation();
    } catch (err) {
      this.error = err as Error;
    }
  }
}
```

## 5. Syntax

```typescript
// HTTP error interceptor
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401: return /* handle unauthorized */;
          case 404: return /* handle not found */;
          default: return throwError(() => error);
        }
      })
    );
  }
}

// Component-level error handler
@Directive({
  selector: '[appErrorBoundary]'
})
export class ErrorBoundaryDirective implements OnInit {
  @Input() appErrorBoundary!: Type<any>;
  constructor(private vc: ViewContainerRef, @SkipSelf() private parent: ErrorHandler) {}
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple try-catch
function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

try {
  divide(10, 0);
} catch (e) {
  console.error(e.message);
}
```

### Medium
```typescript
// HTTP error handling
@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}
  
  getData(): Observable<Data> {
    return this.http.get<Data>('/api/data').pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 404:
              return of({} as Data); // Fallback
            case 500:
              return throwError(() => new Error('Server error occurred'));
          }
        }
        return throwError(() => new Error('Unknown error'));
      })
    );
  }
}
```

### Advanced
```typescript
// Global error handler with user notifications
@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private notifications: NotificationService,
    private logger: LoggingService
  ) {}

  handleError(error: any): void {
    // Log for debugging
    this.logger.logError(error);

    let userMessage = 'An unexpected error occurred.';

    // Extract user-facing message if available
    if (error?.message?.includes('network')) {
      userMessage = 'Network connection failed. Please try again.';
    }

    // Notify user
    this.notifications.showError(userMessage);

    // Prevent default console.error spam in production
    if (!environment.production) {
      console.error('Detailed error:', error);
    }
  }
}
```

## 7. Visual Diagram (ASCII)

```
Angular Error Handling Layers

┌─────────────────────────────────────┐
│ Global Error Handler (ErrorHandler) │
├─────────────────────────────────────┤
│ HTTP Interceptor (HttpErrorResponse)│
├─────────────────────────────────────┤
│ Component try/catch blocks         │
├─────────────────────────────────────┤
│ Async pipe automatic handling      │
└─────────────────────────────────────┘
```

## 8. Real-world Example

API failure fallback to cached data with user notification.

## 9. Angular Use Case

HTTP error interception, global exception logging, user feedback.

## 10. Common Mistakes

❌ Silently swallowing errors
❌ Exposing sensitive info to users

## 11. Edge Cases

1. **Unhandled promise rejections**
2. **Zone.js error wrapping**
3. **Third-party library errors**

## 12. Performance Considerations

Error logging should not block main thread.

## 13. Time & Space Complexity

Minimal unless logging heavily.

## 14. Interview Questions

1. Global error handler setup?
2. HTTP error interception?
3. User-facing error messaging?

## 15. Follow-up Questions

- "Handle global unhandled rejections?"

## 16. Production Best Practices

1. Log errors with context
2. Sanitize sensitive data from logs
3. Show user-friendly messages
4. Monitor error rates centrally
5. Graceful degradation paths

## 17. Summary

Proper error handling prevents cascading failures and improves UX.

## 18. Revision Notes

- Global ErrorHandler for uncaught errors
- HTTP interceptors catch server responses
- Try/catch blocks handle expected errors
- Async pipe auto-handles subscription errors

## 19. Practice Questions

1. Set up global error interceptor.
2. Implement fallback strategies for API failures.
3. Add centralized error logging service.

## 20. References

- [Angular Error Handling](https://angular.io/guide/error-reporting)

### Module 14 (Testing) - Final file ✅
