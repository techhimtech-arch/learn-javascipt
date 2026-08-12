# Async Pipe

## 1. Definition

**Async Pipe** subscribes/unsubscribes from observables/promises automatically — rendering emitted values and managing lifecycle.

## 2. Why do we need it?

Eliminate manual subscription management — prevent memory leaks and simplify template logic.

## 3. Internal Working

1. Detects observable/promise in template expression
2. Subscribes on init
3. Updates view on emission
4. Unsubscribes automatically on destroy

## 4. Step-by-Step Execution

```typescript
// Component
export class AsyncExampleComponent {
  items$ = this.service.getItems(); // Observable
  userData = fetch('/api/user');   // Promise
}
```

Template:
```html
<ul>
  <li *ngFor="let item of items$ | async">{{ item }}</li>
</ul>

<span>{{ (userData | async)?.name }}</span>
```

## 5. Syntax

```html
<!-- Observable binding -->
{{ observable$ | async }}
<input [value]="stream$ | async">
<div *ngIf="observable$ | async as data">
  {{ data }}
</div>

<!-- Promise binding -->
{{ promise | async }}
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Simple async binding -->
<p>Current time: {{ time$ | async }}</p>

<!-- With *ngIf as syntax -->
<div *ngIf="user$ | async as user; else loading">
  Welcome, {{ user.name }}!
</div>
<ng-template #loading>Loading...</ng-template>
```

### Medium
```html
<!-- Multiple async operations -->
<div class="dashboard">
  <app-user-card 
    [user]="(user$ | async)">
  </app-user-card>
  
  <app-stats 
    [data]="(stats$ | async)">
  </app-stats>
</div>
```

### Advanced
```typescript
// Async pipe with OnPush optimized component
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="data$ | async as data; else loading">
      <ul>
        <li *ngFor="let item of data.items">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <ng-template #loading>Loading...</ng-template>
  `
})
export class OptimizedListComponent {
  readonly data$ = this.apiService.getData().pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  
  constructor(private apiService: ApiService) {}
}
```

## 7. Visual Diagram (ASCII)

```
Async Pipe Subscription Management

Observable ──► Async Pipe ──► View Update
              │               │
         Subscribe           Render
              │               │
           Emit Value        │
              │               ▼
              │          Updated Display
              │
 Component Destroy
              │
              ▼
          Unsubscribe
```

## 8. Real-world Example

Reactive forms using async pipe for live validation status.

## 9. Angular Use Case

Displaying async data streams, form control value/status, route parameters.

## 10. Common Mistakes

❌ Using async pipe with synchronous transformations
❌ Not handling null/undefined emissions

## 11. Edge Cases

1. **Context variables with as-syntax**
   ```html
   <div *ngIf="data$ | async as data; else loading">
   ```

2. **Multiple async bindings with shared observable**

## 12. Performance Considerations

Async pipe efficiently manages subscriptions — prefer over manual.

## 13. Time & Space Complexity

O(1) subscription management overhead.

## 14. Interview Questions

1. Async pipe subscription lifecycle?
2. Memory leak prevention?
3. Combine with OnPush effectively?

## 15. Follow-up Questions

- "Async pipe vs manual subscription?"

## 16. Production Best Practices

1. Use with OnPush change detection
2. Combine with shareReplay for caching
3. Handle null emissions gracefully
4. Avoid complex logic inside async bindings

## 17. Summary

Async pipe simplifies reactive template development while preventing common leaks.

## 18. Revision Notes

- Auto subscribes/unsubscribes
- Works with Observable and Promise
- `as` syntax for cleaner templates
- Integrates well with OnPush

## 19. Practice Questions

1. Convert manual subscription to async pipe.
2. Combine async with error/error states.
3. Optimize async-heavy component with OnPush.

## 20. References

- [Angular Async Pipe](https://angular.io/api/common/AsyncPipe)

---

## FINAL COUNT VERIFICATION:
