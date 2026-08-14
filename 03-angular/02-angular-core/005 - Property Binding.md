# Property Binding

## 1. Definition

**Property Binding** (`[property]="expression"`) sets DOM element properties or Angular component members dynamically from template expressions.

## 2. Why do we need it?

Connect component state to view attributes reactively without manual DOM manipulation.

## 3. Internal Working

Angular tracks bound expressions:
1. Evaluates expression in component scope
2. Watches dependency changes
3. Updates corresponding DOM property when changed

## 4. Step-by-Step Execution

Example:
```html
<img [src]="avatarUrl" [alt]="userName">
<button [disabled]="form.invalid">Submit</button>
```

Steps:
1. Compile: detect `[src]`, `[disabled]` bindings
2. Evaluate in component context
3. Set DOM properties programmatically
4. Revalidate on expression changes

## 5. Syntax

```html
<!-- Property binding -->
<img [src]="imageSrc">
<input [value]="defaultValue">
<button [disabled]="isSubmitting">Save</button>

<!-- Class binding -->
<div [class.active]="isActive"></div>
<div [class]="classNames"></div>

<!-- Style binding -->
<div [style.color]="textColor"></div>
<div [style.marginTop.px]="marginValue"></div>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<img [src]="productImageUrl" [alt]="productName">
```

### Medium
```html
<button 
  [disabled]="loading || !form.valid" 
  [class.submitting]="loading">
  {{ loading ? 'Saving...' : 'Save Changes' }}
</button>
```

### Advanced
```html
<!-- Dynamic component inputs -->
<app-chart 
  [type]="chartType"
  [data]="chartData"
  [options]="chartOptions">
</app-chart>

<!-- Conditional styling -->
<div
  [ngClass]="getStatusClass(item.status)"
  [ngStyle]="getStatusStyle(item.priority)">
  {{ item.title }}
</div>
```

## 7. Visual Diagram (ASCII)

```
Binding Connection

Component Context
┌────────────────────┐
│ imageUrl = '/x.png'│
└─────────┬──────────┘
          ▼
    Expression Evaluator
          ▼
┌────────────────────┐
│ DOM Property Update │
│ <img src="/x.png"> │
└────────────────────┘
```

## 8. Real-world Example

Form validation indicators with dynamic classes/styles.

## 9. Angular Use Case

Component inputs, element attributes, conditional styling.

## 10. Common Mistakes

❌ Mixing interpolation with property binding (`[value]="{{val}}"`)
❌ Binding non-existent properties

## 11. Edge Cases

1. **Property vs attribute**
   ```html
   <!-- Property -->
   <input [value]="userInput">
   <!-- Attribute -->
   <input value="{{ userInput }}"> <!-- Less reliable -->
   ```

2. **Boolean properties**
   ```html
   <input [checked]="isChecked"> <!-- Works correctly -->
   <input checked="{{ isChecked }}"> <!-- May not behave as expected -->
   ```

## 12. Performance Considerations

Binding to frequently changing values triggers frequent DOM updates.

## 13. Time & Space Complexity

Same as interpolation — minimal overhead per binding.

## 14. Interview Questions

1. Property vs attribute binding?
2. When to use class/style binding?
3. Safe DOM updates?

## 15. Follow-up Questions

- "Difference between [class] and ngClass?"

## 16. Production Best Practices

1. Prefer property binding over interpolation for values
2. Use OnPush strategy to minimize checks
3. Avoid overly complex expressions

## 17. Summary

Property binding enables reactive DOM updates tied to component state.

## 18. Revision Notes

- [prop]="expr" syntax
- Updates DOM properties reactively
- Supports class/style special cases
- Triggers change detection

## 19. Practice Questions

1. Bind image sources conditionally.
2. Toggle button disabled state.
3. Apply dynamic class lists.

## 20. References

- [Angular: Property Binding](https://angular.io/guide/property-binding)

### Next File
**006 - Event Binding.md**
