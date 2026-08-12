# Templates

## 1. Definition

An Angular **Template** is an enhanced HTML syntax combining declarative bindings, structural directives, and components to define view rendering.

## 2. Why do we need it?

Bridge application data and DOM presentation declaratively.

## 3. Internal Working

Angular compiles templates into highly optimized DOM instructions:
1. Parses HTML with Angular extensions
2. Generates factory functions
3. Binds data via property/event interpolations
4. Instantiates structural directives

## 4. Step-by-Step Execution

Template compilation phases:
1. Parse template AST
2. Identify bindings/directives
3. Generate view definitions
4. At runtime → create/update DOM nodes

## 5. Syntax

```html
<!-- Interpolation -->
<span>{{ title }}</span>

<!-- Property binding -->
<img [src]="imageUrl">

<!-- Event binding -->
<button (click)="save()">Save</button>

<!-- Two-way binding -->
<input [(ngModel)]="name">

<!-- Structural directives -->
<div *ngIf="visible">...</div>
<div *ngFor="let item of items">{{ item }}</div>

<!-- Component usage -->
<app-user-card [user]="currentUser"></app-user-card>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<h1>{{ pageTitle }}</h1>
<p>Welcome, {{ userName }}!</p>
```

### Medium
```html
<form (ngSubmit)="onSubmit()">
  <input [(ngModel)]="email" required placeholder="Email">
  <textarea [(ngModel)]="message"></textarea>
  <button type="submit" [disabled]="!form.valid">Send</button>
</form>
```

### Advanced
```html
<!-- Dynamic component loading -->
<ng-container *ngComponentOutlet="componentRef; injector: customInjector"></ng-container>

<!-- Template reference variables -->
<input #nameInput placeholder="Type something..." (keyup)="handleKey($event, nameInput.value)">

<!-- Content projection -->
<ng-content select="[slot=header]"></ng-content>
<ng-content></ng-content>
<ng-content select="[slot=footer]"></ng-content>
```

## 7. Visual Diagram (ASCII)

```
Template Compilation Pipeline

Template Source Code
        ↓
AST Parser
        ↓
Template Definition Functions
        ↓
Runtime View Creation/Update Instructions
        ↓
Final DOM Output
```

## 8. Real-world Example

Dashboard widget with dynamic chart rendering.

## 9. Angular Use Case

All component views, dynamic component wrappers, custom structural directives.

## 10. Common Mistakes

❌ Complex expressions in templates (call pipes/methods)
❌ Direct DOM mutations instead of data-bound updates

## 11. Edge Cases

1. **Safe navigation operator**
   ```html
   {{ user?.address?.city }}
   ```

2. **Template references**
   ```html
   <input #inputRef>
   {{ inputRef.value }}
   ```

## 12. Performance Considerations

Avoid expensive operations/pipes in templates; memoize with pure pipes or OnPush.

## 13. Time & Space Complexity

Rendering scales with template complexity and bound data volume.

## 14. Interview Questions

1. Types of data binding syntaxes?
2. Structural vs attribute directives?
3. Safe navigation usage?

## 15. Follow-up Questions

- "How does trackBy improve performance?"

## 16. Production Best Practices

1. Keep templates clean and readable
2. Move heavy logic to component class
3. Use trackBy with *ngFor
4. Leverage built-in safe navigation

## 17. Summary

Templates declare UI structure declaratively — core to Angular's reactive rendering model.

## 18. Revision Notes

- Interpolation {{ }}, property [], event ()
- Two-way [()]
- Structural *ngIf/*ngFor
- Safe navigation (?.)

## 19. Practice Questions

1. Build reusable form template.
2. Implement dynamic list with empty state.
3. Create content-projected card layout.

## 20. References

- [Angular: Template Syntax](https://angular.io/guide/template-syntax)

### Next File
**004 - Interpolation.md**
