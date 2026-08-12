# Custom Structural Directives

## 1. Definition

**Custom Structural Directives** create new `*`-prefixed control flow syntax — abstracting template manipulation logic into reusable building blocks.

## 2. Why do we need it?

Encapsulate complex view manipulation patterns into declarative syntax for cleaner templates.

## 3. Internal Working

1. TemplateRef holds view definition
2. ViewContainerRef manages embedded views
3. Directive logic decides when to insert/clear views
4. Context provides data to embedded view

## 4. Step-by-Step Execution

Example: Permission-based visibility directive
```typescript
@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {
  private tmpl = inject(TemplateRef<any>);
  private vc = inject(ViewContainerRef);
  private auth = inject(AuthService);

  @Input() set hasPermission(permission: string) {
    this.vc.clear();
    
    if (this.auth.hasPermission(permission)) {
      const view = this.vc.createEmbeddedView(this.tmpl);
      view.detectChanges();
    }
  }
}
```

Usage:
```html
<div *hasPermission="'admin'">
  Admin-only content
</div>
```

## 5. Syntax

```typescript
@Directive({
  selector: '[myDirective]'  // Note: NO asterisk here!
})
export class MyDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  
  @Input() set myDirective(condition: boolean) {
    // Insert/clear logic here
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Show/hide based on condition
@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  @Input() set appToggle(shouldShow: boolean) {
    this.viewContainer.clear();
    if (shouldShow) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
```

### Medium
```typescript
// Switch between multiple views
@Directive({
  selector: '[appSwitch]'
})
export class SwitchDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  @Input() set appSwitch(condition: boolean) {
    this.viewContainer.clear();
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
```

### Advanced
```typescript
// Custom ngFor with filtering
@Directive({
  selector: '[appSmartForOf]'
})
export class SmartForDirective<T> {
  private templateRef = inject(TemplateRef<{ $implicit: T; index: number; count: number }>);
  private viewContainer = inject(ViewContainerRef);

  private _items: T[] = [];
  private _keyFn: (item: T) => any = (item) => item as any;

  @Input('appSmartForOf')
  set items(items: T[]) {
    this._items = items || [];
    this._render();
  }

  @Input('appSmartForKey')
  set keyFn(fn: (item: T) => any) {
    this._keyFn = fn || this._keyFn;
    this._render(); // Re-render with new key function
  }

  private _render() {
    this.viewContainer.clear();
    
    this._items.forEach((item, index) => {
      const view = this.viewContainer.createEmbeddedView(
        this.templateRef,
        { $implicit: item, index, count: this._items.length }
      );
      view.detectChanges();
    });
  }
}
```

## 7. Visual Diagram (ASCII)

```
Custom Structural Directive Flow

Host Template: <div *myDir="...">
               Content
             </div>

Angular Translation:
<ng-template myDir="...">
  <div>Content</div>
</ng-template>

Directive Logic:
TemplateRef ──► ViewFactory
ViewContainerRef ──► ViewManager
                    (insert/clear/update)
```

## 8. Real-world Example

Role-based UI visibility controller with permission system.

## 9. Angular Use Case

Abstracting complex conditional rendering patterns.

## 10. Common Mistakes

❌ Accessing elements before AfterViewInit
❌ Not clearing old views

## 11. Edge Cases

1. **Context passing**
   ```typescript
   createEmbeddedView(templateRef, { $implicit: item, index })
   ```

2. **Multiple instances**
3. **View disposal**

## 12. Performance Considerations

Cache views when possible; avoid recreating unchanged ones.

## 13. Time & Space Complexity

O(views managed) — minimal per view.

## 14. Interview Questions

1. TemplateRef vs ViewContainerRef?
2. Context variable injection ($implicit)?
3. Lifecycle management?

## 15. Follow-up Questions

- "Debug directive view issues?"

## 16. Production Best Practices

1. Always clear old views before inserting new
2. Provide proper context for debugging
3. Handle empty/null inputs gracefully
4. Use trackBy-like optimizations where applicable

## 17. Summary

Custom structural directives turn complex view logic into simple declarative APIs.

## 18. Revision Notes

- Must use TemplateRef + ViewContainerRef
- Input setter triggers view changes
- Context object passes data to embedded view
- Remember to clear/manage view lifecycle

## 19. Practice Questions

1. Build conditional visibility directive.
2. Create filtered list repeater.
3. Implement switch-case directive.

## 20. References

- [Angular: Structural Directives](https://angular.io/guide/structural-directives)
- [Angular: Template Reference](https://angular.io/api/core/TemplateRef)

### Module 10 (Angular Advanced) - Continuing...
