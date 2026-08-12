# Structural Directives

## 1. Definition

**Structural Directives** (`ngIf`, `ngFor`, `ngSwitch`) manipulate DOM structure by adding/removing elements.

## 2. Why do we need it?

Conditionally render views, repeat templates dynamically, switch content based on state.

## 3. Internal Working

Angular translates `*` syntax to `<ng-template>` with ViewContainerRef insertion points:
```html
<div *ngIf="visible">...</div>
<!-- Becomes -->
<ng-template [ngIf]="visible">
  <div>...</div>
</ng-template>
```

## 4. Step-by-Step Execution

ngFor lifecycle:
1. Template parsed and compiled
2. ViewContainerRef created for insertion point
3. For each item, EmbeddedViewRef instantiated
4. Bound data passed to view context
5. Views inserted/attached/detached dynamically

## 5. Syntax

```html
<!-- Built-in -->
<div *ngIf="isLoggedIn; else loggedOut">
  Welcome back!
</div>
<ng-template #loggedOut>Please log in</ng-template>

<ul>
  <li *ngFor="let item of items; let i = index; trackBy: trackById">
    {{ i }}: {{ item.name }}
  </li>
</ul>

<div [ngSwitch]="route">
  <dashboard *ngSwitchCase="'dashboard'"></dashboard>
  <settings *ngSwitchDefault></settings>
</div>

<!-- Custom directive -->
<div *appLoader="loading">Loading...</div>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- ngIf with else -->
<div *ngIf="user; else loginPrompt">
  Hello {{user.name}}
</div>
<ng-template #loginPrompt>
  <button (click)="login()">Login</button>
</ng-template>
```

### Medium
```html
<!-- Table with empty state -->
<table>
  <tr *ngFor="let row of rows; trackBy: trackByRow">
    <td>{{ row.data }}</td>
  </tr>
  <tr *ngIf="(rows | async)?.length === 0">
    <td colspan="2">No data available</td>
  </tr>
</table>
```

### Advanced
```typescript
// Custom structural directive
@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  constructor() {}

  @Input() set appLoading(condition: boolean) {
    this.viewContainer.clear();
    if (condition) {
      const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
      viewRef.detectChanges();
    }
  }
}
```

## 7. Visual Diagram (ASCII)

```
Structural Directive Internals

App Template
<div *ngIf="show">
  Content
</div>

↓ Compiles to ↓

<ng-template [ngIf]="show">
  <div>Content</div>
</ng-template>

↓ Runtime ↓

ViewContainerRef.insert(embeddedViewRef) OR clear()
```

## 8. Real-world Example

Skeleton loaders with conditional templates.

## 9. Angular Use Case

All dynamic view composition scenarios — forms, lists, conditional layouts.

## 10. Common Mistakes

❌ Overusing *ngIf causing content flickering
❌ Missing trackBy causing full re-renders

## 11. Edge Cases

1. **Microsyntax syntax**
   ```html
   <!-- Multiple structural directives -->
   <div *ngIf="show" *ngFor="let x of items">...</div>
   ```

2. **ViewContainerRef vs TemplateRef**

## 12. Performance Considerations

trackBy prevents unnecessary DOM operations on list changes.

## 13. Time & Space Complexity

O(n) for rendering n views.

## 14. Interview Questions

1. How does *ngIf work under the hood?
2. ViewContainerRef vs TemplateRef?
3. trackBy optimization benefits?

## 15. Follow-up Questions

- "Custom structural directive implementation?"

## 16. Production Best Practices

1. Use trackBy with *ngFor
2. Avoid stacking multiple structural directives
3. Prefer async pipe to reduce manual subscription management

## 17. Summary

Structural directives control dynamic DOM structure — foundational for templated UIs.

## 18. Revision Notes

- * syntax syntactic sugar over ng-template
- ViewContainerRef manages embedded views
- trackBy prevents unnecessary re-renders
- Custom via TemplateRef/ViewContainerRef

## 19. Practice Questions

1. Implement skeleton loader with ngIf.
2. Add trackBy to optimize list rendering.
3. Create custom loading state directive.

## 20. References

- [Angular: Structural Directives](https://angular.io/guide/structural-directives)

### Module 10 (Angular Advanced) - Continuing...
