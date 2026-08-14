# ViewChild and ContentChild

## 1. Definition

**ViewChild/ContentChild** decorators query DOM elements/components within template/content projection — enabling parent-child interaction post-rendering.

## 2. Why do we need it?

Access child components/inputs/elements programmatically for interaction/validation/control.

## 3. Internal Working

Queries resolve after initial render:
- ViewChild: queries component's own template
- ContentChild: queries projected content (ng-content slots)
- Static vs dynamic resolution timing

## 4. Step-by-Step Execution

```typescript
@ViewChild('childRef') child!: ElementRef;

ngAfterViewInit(): void {
  this.child.nativeElement.focus();
}
```

Resolution steps:
1. Template compiled
2. View initialized
3. Query list populated
4. AfterViewInit callback fires
5. Child accessible

## 5. Syntax

```typescript
@ViewChild(ComponentClass) child!: ComponentClass;
@ViewChild('templateVar') element!: ElementRef;
@ViewChildren(QueryListClass) children!: QueryList<QueryListClass>;
@ContentChild(ProjectedComponent) projected!: ProjectedComponent;
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
@ViewChild('focusInput') inputEl!: ElementRef;

@ViewChild('childComp') childComp!: ChildComponent;

ngAfterViewInit() {
  this.inputEl.nativeElement.focus();
  this.childComp.someMethod();
}
```

### Medium
```typescript
// With static resolution for early access
@ViewChild(TemplateRef, { static: true }) tpl!: TemplateRef<any>;

// QueryList for multiple matches
@ViewChildren(MatFormFieldControl) formFields!: QueryList<MatFormFieldControl<any>>;

ngAfterViewInit(): void {
  this.formFields.changes.subscribe(fields => {
    console.log(`${fields.length} form fields found`);
  });
}
```

### Advanced
```typescript
// Dynamic component management
@Component({
  template: `
    <ng-template #anchor></ng-template>
  `
})
export class HostComponent implements AfterViewInit {
  @ViewChild('anchor', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  ngAfterViewInit(): void {
    const cmpFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    const viewRef = this.vcr.createComponent(compFactory);
    
    // Interact with dynamically created component
    const dynamicCmp = viewRef.instance;
    dynamicCmp.config = { theme: 'dark' };
  }
}
```

## 7. Visual Diagram (ASCII)

```
View Query Relationship

Parent Component
├─ Template ──► <app-child #child="AppComponent">
├─ @ViewChild(child) resolves here
├─ <ng-content> ──► Projected Content
└─ @ContentChild resolves there
```

## 8. Real-world Example

Form validation focusing first invalid field.

## 9. Angular Use Case

Focus management, component interaction, dynamic component injection.

## 10. Common Mistakes

❌ Accessing queries before AfterViewInit
❌ Mixing ViewChild with ContentChild incorrectly

## 11. Edge Cases

1. **Static vs dynamic timing**
   ```typescript
   // static:true for early access (required for some structural directives)
   ```

2. **Template reference querying**
3. **Multiple matches via ViewChildren**

## 12. Performance Considerations

Queries add minor overhead — prefer @Input bindings when possible.

## 13. Time & Space Complexity

O(1) resolution per query.

## 14. Interview Questions

1. ViewChild vs ContentChild?
2. Static resolution timing?
3. Access projected content?

## 15. Follow-up Questions

- "When to use read token?"

## 16. Production Best Practices

1. Prefer Input bindings for data flow
2. Use static:false (default) unless necessary
3. Clean up ViewChildren subscriptions
4. Combine with proper error checking

## 17. Summary

ViewChild/ContentChild enable imperative DOM/component interaction while maintaining declarative structure.

## 18. Revision Notes

- Queries populate after view init
- ViewChild = own template, ContentChild = projected content
- static flag affects timing
- QueryList provides observable changes

## 19. Practice Questions

1. Access and focus child component method.
2. Build form focusing invalid fields.
3. Dynamically insert components via ViewContainerRef.

## 20. References

- [Angular: Component Interaction](https://angular.io/guide/component-interaction)
- [Angular: View Encapsulation](https://angular.io/api/core/ViewChild)

### Module 9 (Angular Core) - Continuing important files ✅
