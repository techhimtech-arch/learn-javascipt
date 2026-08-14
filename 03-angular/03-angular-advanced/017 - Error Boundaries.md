# Error Boundaries and Global Handlers

## 1. Definition

**Error Boundaries** catch rendering errors preventing full application crashes — displaying fallbacks gracefully.

## 2. Why do we need it?

UI errors shouldn't break entire application — isolate failures to small regions.

## 3. Internal Working

Error boundaries (Angular approach):
1. Component throws during render
2. Angular catches error
3. Renders fallback template
4. Optionally logs error to service
5. Allows recovery/retry

## 4. Step-by-Step Execution

Angular error component:
```typescript
@Component({
  template: `
    <div class="error-container" *ngIf="HasError; else normalView">
      <h2>Something went wrong</h2>
      <button (click)="reload()">Retry</button>
    </div>
    <ng-template #normalView>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class ErrorBoundryComponent {
  hasError = false;

  reload(): void {
    this.hasError = false;
    window.location.reload();
  }
}
```

## 5. Syntax

```typescript
// Global error handler
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Log to monitoring service
    this.logger.error(error);
    
    // Graceful degradation
    if (error.name === 'ChunkLoadError') {
      window.location.reload();
    }
  }
}
```

## 6. Examples

### Easy
```typescript
// Component-level error state
@Component({
  template: `
    <div *ngIf="errorState" class="error-fallback">
      <h3>Component Failed</h3>
      <button (click)="retry()">Try Again</button>
    </div>
    <ng-container *ngIf="!errorState">
      <ng-content></ng-content>
    </ng-container>
  `
})
export class FallbackComponent {
  errorState = false;
  
  retry() {
    this.errorState = false;
  }
}
```

## 7. Interview Questions

1. Angular error handling approaches?
2. Prevent chunk load errors?
3. Component-level error isolation?

## 8. Summary

Error boundaries isolate failures gracefully.

## 9. References

- [Angular Error Handling](https://angular.io/guide/error-handling)

---

