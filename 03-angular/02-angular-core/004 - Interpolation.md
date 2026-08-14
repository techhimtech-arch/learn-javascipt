# Interpolation

## 1. Definition

**Interpolation** (`{{ }}`) embeds component expressions directly into template text — rendering dynamic values into DOM.

## 2. Why do we need it?

Display live data within static template markup without imperative DOM updates.

## 3. Internal Working

Parsed into expressions:
1. Evaluated against component context
2. Updated when dependencies change
3. Escaped for HTML safety

## 4. Step-by-Step Execution

Example:
```typescript
@Component({
  template: `<h1>Hello, {{ name }}!</h1>`
})
export class HelloComponent {
  name = 'Angular';
}
```

Steps:
1. Compile: detect `{{ name }}`
2. Evaluate expression against component
3. Replace placeholder with computed value
4. Watch `name` → update on change

## 5. Syntax

```html
<!-- Basic -->
<span>{{ componentProperty }}</span>

<!-- Expressions -->
<span>{{ price * quantity }}</span>
<span>{{ user.name | titlecase }}</span>
<span>{{ date | date:'shortDate' }}</span>

<!-- Method calls (discouraged) -->
<span>{{ formatCurrency(amount) }}</span>

<!-- Safe navigation -->
<span>{{ user?.profile?.name }}</span>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<p>Welcome back, {{ userName }}!</p>
<p>Current score: {{ score }}</p>
```

### Medium
```html
<div class="status">
  Status: {{ order.status | uppercase }} — Price: {{ order.total | currency }}
</div>
```

### Advanced
```html
<!-- Computed property usage -->
<span class="discount">
  Save {{ (originalPrice - discountedPrice) / originalPrice * 100 }}%!
</span>

<!-- Conditional content -->
<span>{{ items.length > 0 ? items.length : 'No items' }} found</span>
```

## 7. Visual Diagram (ASCII)

```
Interpolation Lifecycle

Component Data ──► Template Expression
         │                │
         ▼                ▼
    Change Detector   Evaluator
         │                │
         ▼                ▼
   Updated DOM Value
```

## 8. Real-world Example

Product listing showing item count and prices.

## 9. Angular Use Case

Displaying dynamic data anywhere in templates.

## 10. Common Mistakes

❌ Calling methods in interpolation (causes extra checks)
❌ Using interpolation for security-sensitive content (XSS-prone)

## 11. Edge Cases

1. **Null/undefined values**
   ```html
   {{ obj?.property }} <!-- Safely handles null/undefined -->
   ```

2. **HTML content injection**
   ```html
   <!-- UNSAFE - use DomSanitizer instead -->
   <div [innerHTML]="unsafeHtml"></div>
   ```

## 12. Performance Considerations

Interpolated values trigger change detection when updated.

## 13. Time & Space Complexity

O(1) evaluation per expression per change cycle.

## 14. Interview Questions

1. How often do interpolations re-evaluate?
2. Difference between interpolation and property binding?
3. Security implications?

## 15. Follow-up Questions

- "How to safely render HTML?"

## 16. Production Best Practices

1. Keep interpolated expressions simple
2. Use pipes for formatting
3. Use safe navigation for optional chains
4. Avoid method calls in templates

## 17. Summary

Interpolation bridges static markup and reactive application state.

## 18. Revision Notes

- {{ }} delimiters
- Evaluated in component context
- Change detection triggers updates
- Pipes format output

## 19. Practice Questions

1. Display conditional message.
2. Format date/time in template.
3. Safely navigate nested objects.

## 20. References

- [Angular: Interpolation](https://angular.io/guide/built-in-templates#interpolation---)

### Module 9 (Angular Core) - 3 of 19 topics complete. Continuing...
