# Virtual Scroll

## 1. Definition

**Virtual Scroll** renders only visible items in a long list — dynamically recycling DOM nodes as user scrolls.

## 2. Why do we need it?

Prevent performance degradation/memory bloat when rendering thousands of rows/items.

## 3. Internal Working

1. Measure average item height
2. Calculate visible range given viewport
3. Render placeholder + visible items only
4. On scroll → shift visible window and recycle elements

Reduces DOM nodes from N → ~window size.

## 4. Step-by-Step Execution

Angular CDK Virtual Scroll:
```html
<cdk-virtual-scroll-ytp [items]="items" class="example-container">
  <div *cdkVirtualFor="let item of items">{{item}}</div>
</cdk-virtual-scroll-ytp>

<style>
  .example-container {
    height: 500px;
    border: 1px solid #ccc;
  }
</style>
```

Steps:
1. Container has fixed height
2. Items rendered based on scroll offset
3. Viewport calculates visible range
4. Only those items attached to DOM
5. As scrolled → new items swapped in

## 5. Syntax

```html
<!-- CDK -->
<cdk-virtual-scroll-ytp [items]="data" [itemSize]="50">
  <div *cdkVirtualFor="let item of data">{{item}}</div>
</cdk-virtual-scroll-ytp>
```

```typescript
// Programmatic access
@ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

ngAfterViewInit() {
  this.viewport.scrollToIndex(100); // Scroll to specific item
}
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<cdk-virtual-scroll-ytp [items]="numbers" itemSize="24">
  <div class="item" *cdkVirtualFor="let num of numbers">
    Item #{{num}}
  </div>
</cdk-virtual-scroll-ytp>
```

### Medium
```typescript
// Dynamic size calculation
@ViewChild(VirtualScrollViewport) vsb!: VirtualScrollViewport;

this.items.forEach((_, i) => {
  this.vsb.checkForRowSizeChange(i);
});
```

### Advanced
```typescript
// Nested virtual scroll
@Component({
  template: `
    <cdk-virtual-scroll-ytp [items]="groups" itemSize="320">
      <ng-container *cdkVirtualFor="let group of groups">
        <h3>{{group.name}}</h3>
        <cdk-virtual-scroll-ytp [items]="group.items" itemSize="48">
          <div *cdkVirtualFor="let item of group.items" class="item">
            {{item.value}}
          </div>
        </cdk-virtual-scroll-ytp>
      </ng-container>
    </cdk-virtual-scroll-ytp>
  `
})
export class NestedVirtualListComponent {
  groups: GroupedData[] = [];

  constructor(private api: DataService) {}

  ngOnInit(): void {
    this.api.loadLargeDataset().subscribe(data => {
      this.groups = groupBy(data, 'category');
    });
  }
}
```

## 7. Visual Diagram (ASCII)

```
Traditional vs Virtual Scrolling

Traditional (render all):
┌────────────────────┐
│ Item 1             │
│ Item 2             │
│ ...                │
│ Item 10000         │
└────────────────────┘ ← All rendered in DOM

Virtual (render visible):
┌────────────────────┐ ← Viewport
│ [Item 450]         │
│ [Item 451]         │
│ ...                │
│ [Item 470]         │
└────────────────────┘ ← Only ~20 items rendered
```

## 8. Real-world Example

Large data tables in enterprise dashboards (orders, invoices, logs).

## 9. Angular Use Case

CDK virtual scroll in tables/lists, custom grid components.

## 10. Common Mistakes

❌ Incorrect item size estimates  
❌ Not handling dynamic heights  

## 11. Edge Cases

1. **Dynamic content heights**
   ```typescript
   this.virtualScroll.checkNoImmediateResidualElementStyles();
   ```

2. **Variable-size items**
   ```html
   <cdk-virtual-scroll-ytp [items]="items" [itemSize]="dynamicItemSize">
   ```

3. **Sticky headers**
   ```html
   <cdk-virtual-scroll-ytp>
     <div sticky>{{group.header}}</div>
   </cdk-virtual-scroll-ytp>
   ```

## 12. Performance Considerations

Accurate `itemSize` critical for smooth scrolling performance.

## 13. Time & Space Complexity

Renders ~viewport height worth of items regardless of total count.

## 14. Interview Questions

1. How does CDK Virtual Scroll optimize?
2. Challenges with dynamic sizes?
3. Alternative approaches?

## 15. Follow-up Questions

- "How to estimate item heights efficiently?"

## 16. Production Best Practices

1. Provide accurate itemSize estimate
2. Recalculate on window resize
3. Use trackBy for stable identity
4. Monitor scroll events for UX feedback

## 17. Summary

Virtual scroll enables handling massive datasets in the browser efficiently.

## 18. Revision Notes

- Renders only visible items
- Uses spacer elements to maintain scrollbar
- Depends heavily on item size accuracy
- Great for large datasets

## 19. Practice Questions

1. Implement basic virtual list.
2. Support dynamic item heights.
3. Add smooth scroll-to-index.

## 20. References

- [Angular CDK Virtual Scroll](https://material.angular.io/cdk/scrolling/overview)

### Next File
**018 - Custom Pagination.md**
