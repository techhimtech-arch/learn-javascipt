# Virtual Scrolling

## 1. Definition

**Virtual Scrolling** renders only visible items in large lists — recycling DOM nodes as user scrolls to maintain high performance.

## 2. Why do we need it?

Rendering thousands of DOM nodes causes severe performance degradation — memory bloat and jank.

## 3. Internal Working

1. Measure viewport height
2. Calculate item height
3. Render only visible window (+ buffer)
4. Recycle views during scroll
5. Adjust offsets dynamically

## 4. Step-by-Step Execution

CDK implementation:
```html
<cdk-virtual-scroll-ytp [items]="items" itemSize="50">
  <div *cdkVirtualFor="let item of virtualScroll.selectRange">
    {{ item.name }}
  </div>
</cdk-virtual-scroll-ytp>
```

Steps:
1. Measure container dimensions
2. Compute rendered range
3. Create/destroy views as needed
4. Update offsets during scrolling

## 5. Syntax

```html
<cdk-virtual-scroll-ytp [items]="items" itemSize="50" class="viewport">
  <div *cdkVirtualFor="let item of cdkVirtualForOf">
    {{ item }}
  </div>
</cdk-virtual-scroll-ytp>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Basic virtual scroll -->
<cdk-virtual-scroll-ytp [items]="numbers" itemSize="30">
  <div *cdkVirtualFor="let num of numbers">{{ num }}</div>
</cdk-virtual-scroll-ytp>
```

### Medium
```typescript
// Custom virtual scroll with dynamic sizing
@Component({
  template: `
    <cdk-virtual-scroll-ytp #scrollViewport [items]="items" [itemSize]="estimateSize">
      <div *cdkVirtualFor="let item of scrollViewport.selectRange">
        <app-dynamic-item [item]="item"></app-dynamic-item>
      </div>
    </cdk-virtual-scroll-ytp>
  `
})
export class DynamicListController {
  items: any[] = [];
  estimateSize = 50;
}
```

### Advanced
```typescript
// Implementing custom virtual scroll logic
class CustomVirtualScrollStrategy implements VirtualScrollStrategy {
  private viewportHeight = 0;
  private itemSize = 0;
  
  updateOffset(): void {
    const visibleStart = Math.floor(this.scrollTop / this.itemSize);
    const visibleEnd = visibleStart + Math.ceil(this.viewportHeight / this.itemSize);
    this renderedRange = { start: visibleStart, end: visibleEnd };
  }
}
```

## 7. Visual Diagram (ASCII)

```
Virtual Scroll Window

Scrollable Area: [=======================================]
Visible Window:  [======== Viewport ========]
Buffered Items:  [=== Buffer ===][=== Visible ===][=== Buffer ===]

Only rendered items = ~15-20 instead of 1000+
```

## 8. Real-world Example

Contact lists in messaging apps, log viewers.

## 9. Angular Use Case

Large dataset tables, chat message lists, infinite scroll.

## 10. Common Mistakes

❌ Not setting fixed item size
❌ Missing trackBy functions

## 11. Edge Cases

1. **Variable-sized items**
2. **Dynamic content loading**

## 12. Performance Considerations

Reduces DOM count from O(n) to O(visible_items).

## 13. Time & Space Complexity

Rendering cost constant regardless of dataset size.

## 14. Interview Questions

1. Virtual scroll mechanism?
2. Handle variable item heights?
3. Performance tradeoffs?

## 15. Follow-up Questions

- "Implement custom scroll strategy?"

## 16. Production Best Practices

1. Use fixed item sizes when possible
2. Implement proper trackBy functions
3. Consider loading placeholders
4. Test scrolling performance

## 17. Summary

Virtual scrolling handles massive lists efficiently.

## 18. Revision Notes

- Renders only visible items
- Requires fixed container height
- Item size affects calculation accuracy
- trackBy prevents unnecessary re-renders

## 19. Practice Questions

1. Implement basic virtual scroll.
2. Handle dynamic item heights.
3. Add loading placeholders.

## 20. References

- [Angular CDK Virtual Scroll](https://material.angular.io/cdk/scrolling/overview)

### Next File
**014 - Lazy Loading.md**
