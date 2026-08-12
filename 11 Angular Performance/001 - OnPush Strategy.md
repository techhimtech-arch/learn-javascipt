# OnPush Strategy

## 1. Definition

**OnPush Change Detection** is an optimization strategy where Angular runs CD only when input references change, async pipes emit, or events originate inside the component.

## 2. Why do we need it?

Prevent unnecessary checks in large component trees — dramatically improving performance.

## 3. Internal Working

Default strategy checks every component every cycle.
OnPush skips subtree unless:
1. @Input reference changes
2. Event emitted within component
3. Async pipe emits new value
4. Manual markForCheck()

## 4. Step-by-Step Execution

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  @Input() user!: User;
}
```

Flow:
1. Parent passes new reference to user input
2. Angular detects reference change
3. Marks component dirty
4. Runs CD on next tick
5. Rest of tree skipped

## 5. Syntax

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div>{{ user.name }}</div>`
})
export class MyComponent {
  @Input() user!: User;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Basic OnPush
@Component({
  selector: 'product-card',
  template: `<h3>{{ product.name }}</h3>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!: Product;
}
```

### Medium
```typescript
// Immutable update pattern
updateProduct(updatedFields: Partial<Product>): void {
  // Wrong - mutates input
  // this.product.name = updatedFields.name;
  
  // Correct - creates new reference
  this.product = { ...this.product, ...updatedFields };
}
```

### Advanced
```typescript
// Combining OnPush with trackBy
@Component({
  template: `
    <li *ngFor="let item of items; trackBy: trackById">
      {{ item.name }}
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedListComponent {
  items: Item[];
  
  trackById(index: number, item: Item): string {
    return item.id.toString();
  }
  
  addItem(newItem: Item): void {
    // Immutable update
    this.items = [...this.items, newItem];
  }
}
```

## 7. Visual Diagram (ASCII)

```
CD Comparison

Default:   Root → Child A → Child B → Child C → Child D (All checked)

OnPush:    Root → Child A (Changed!) → Child B (Skipped)
                                 ──→ Child C (Skipped)
                                 ──→ Child D (Skipped)
```

## 8. Real-world Example

Large tree-table or dashboard with many widget components.

## 9. Angular Use Case

Performance-critical lists, dashboards, real-time data displays.

## 10. Common Mistakes

❌ Mutating @Input objects instead of replacing references
❌ Forgetting markForCheck() for async events

## 11. Edge Cases

1. **Third-party mutable inputs**
   ```typescript
   // Wrap external data in new objects/arrays
   ```

2. **Complex object references**

## 12. Performance Considerations

Essential for large applications — combine with trackBy and async pipe.

## 13. Time & Space Complexity

Reduces CD from O(all) to O(changed) components.

## 14. Interview Questions

1. OnPush requirements for inputs?
2. When does OnPush skip checks?
3. Debugging OnPush issues?

## 15. Follow-up Questions

- "Immutable update patterns?"

## 16. Production Best Practices

1. Enable OnPush everywhere by default
2. Use immutable data patterns
3. Combine with async pipe
4. Use trackBy with lists

## 17. Summary

OnPush strategy is crucial for scalable Angular app performance.

## 18. Revision Notes

- Reference equality triggers checks
- Events inside component trigger check
- Async pipe marks for check automatically
- Immutable updates required

## 19. Practice Questions

1. Convert list to OnPush with trackBy.
2. Fix OnPush missing updates.
3. Optimize dashboard widgets.

## 20. References

- [Angular OnPush Guide](https://indepth.dev/angular-onpush-change-detection/)

### Next File
**12 - Memory Management.md**
