# Optimize Rendering for 100k Records

## 1. Definition

Rendering 100,000+ records efficiently requires virtualization, windowing, or chunked rendering techniques to avoid DOM bloat.

## 2. Why do we need it?

Native rendering of large lists causes severe performance issues — slow initial load, janky scrolling, memory pressure.

## 3. Internal Working

Strategies:
- Virtual scrolling (render only visible items)
- Windowing (render subsets around viewport)
- Pagination/infinite scroll (limit DOM size)
- Web Workers (move computation off main thread)

## 4. Step-by-Step Execution

Virtual scroll implementation:
```typescript
// CDK Virtual Scroll viewport
<cdk-virtual-scroll-ytp [items]="largeList" itemSize="50">
  <div *cdkVirtualFor="let item of largeList">{{ item }}</div>
</cdk-virtual-scroll-ytp>

// With custom windowing
this.window = new CdkVirtualScrollViewport();
this.window renderedRangeStream.subscribe(range => {
  this.visibleItems = this.items.slice(range.start, range.end);
});
```

Steps:
1. Set container height + overflow
2. Calculate item height
3. Determine visible range
4. Render only those items (with buffer)
5. Update on scroll

## 5. Syntax

```html
<!-- Angular CDK -->
<cdk-virtual-scroll-ytp [items]="items" itemSize="50">
  <div *cdkVirtualFor="let item of items">
    {{ item.name }}
  </div>
</cdk-virtual-scroll-ytp>
```

```typescript
// React Window equivalent concept
const Row = ({ index, style }) => (
  <div style={style}>Item {index}</div>
);

<FixedSizeList height={500} itemCount={100000} itemSize={35}>
  <Row />
</FixedSizeList>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Simple virtual scroll container -->
<div style="height: 400px; overflow-y: auto">
  <cdk-virtual-scroll-ytp [items]="Array.from({length: 100000})" itemSize="24">
    <div *cdkVirtualFor="let item">{{ item }}</div>
  </cdk-virtual-scroll-ytp>
</div>
```

### Medium
```typescript
// Performance monitoring
class VirtualizedListComponent {
  items: any[] = [];
  batchSize = 1000;
  renderedBatch: any[] = [];
  private loadedUntil = 0;

  ngAfterViewInit() {
    this.renderVisibleBatch(this.items.slice(0, this.batchSize));
    this.loadedUntil = this.batchSize;

    // Lazy load additional batches as user scrolls
    fromEvent(this.scrollContainer, 'scroll')
      .pipe(
        throttleTime(100),
        filter(() => this.shouldLoadMore()),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        const nextBatch = this.items.slice(this.loadedUntil, this.loadedUntil + this.batchSize);
        this.renderedBatch.push(...nextBatch);
        this.loadedUntil += this.batchSize;
      });
  }
}
```

### Advanced
```typescript
// Web Worker-powered virtualization
// main-thread.ts
const worker = new Worker('./data-worker.ts');
worker.postMessage(largeDataset);

worker.onmessage = ({ data }) => {
  this.processedData = data; // Already chunked/grouped
};

// data-worker.ts
self.onmessage = ({ data }) => {
  const grouped = groupInChunks(data, 1000); // Split processing
  grouped.forEach((chunk, i) => {
    const processed = chunk.map(processItem);
    self.postMessage({ chunkIndex: i, items: processed });
  });
};
```

## 7. Visual Diagram (ASCII)

```
Virtual Scrolling Concept

Full Dataset: [0][1][2]...[99998][99999]
                ↓
Rendered DOM:   [45][46][47][48][49][50][51][52][53]
                ↑ Buffer Zone ↑ Visible Window ↑ Buffer Zone ↑

Only ~15 items rendered instead of 100,000
```

## 8. Real-world Example

Infinite contact list in messaging apps like WhatsApp Web.

## 9. Angular Use Case

Material table virtual scroll, CDK List/Tree components, custom grid implementations.

## 10. Common Mistakes

❌ Rendering entire dataset naively  
❌ Not accounting for variable item sizes

## 11. Edge Cases

1. **Variable-sized items**
   ```typescript
   // Auto-size detection needed
   virtualScroll.measureItemSizes(); // Expensive operation
   ```

2. **Complex item templates**
3. **Cross-browser scroll inconsistencies**

## 12. Performance Considerations

- Keep templates lightweight
- Use `trackBy` to minimize DOM churn
- Debounce scroll handlers
- Consider fixed vs variable height tradeoffs

## 13. Time & Space Complexity

Rendering cost reduced from O(n) to O(visible_items).

## 14. Interview Questions

1. Techniques for massive list rendering?
2. Virtual scroll internals?
3. How to measure item heights?

## 15. Follow-up Questions

- "React Window vs react-virtualized?"
- "Chunked rendering vs virtualization?"

## 16. Production Best Practices

1. Profile before optimizing
2. Use `trackBy` for stable identities
3. Lazy-load content chunks
4. Monitor frame rates during scroll

## 17. Summary

Virtual scrolling makes large lists feasible — key optimization for data-dense apps.

## 18. Revision Notes

- Renders only visible items
- Requires fixed height containers
- Buffer zone prevents flicker
- trackBy reduces unnecessary updates

## 19. Practice Questions

1. Implement basic virtual list.
2. Add dynamic item heights.
3. Optimize template rendering cost.

## 20. References

- [Angular CDK Virtual Scroll](https://material.angular.io/cdk/scrolling/overview)
- [React Window Library](https://react-window.vercel.app/)

### Next File
**021 - Memory Leaks.md**
