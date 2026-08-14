# CSS Grid

## 1. Definition

**CSS Grid** enables two-dimensional layout — arranging items in rows and columns simultaneously.

## 2. Why do we need it?

Complex layouts requiring both axis alignment impossible with Flexbox alone.

## 3. Internal Working

Grid model:
1. **Grid Container**: Parent element with `display: grid`
2. **Grid Items**: Child elements
3. **Grid Tracks**: Rows/columns between grid lines
4. **Grid Cells**: Intersection of row/column
5. **Grid Areas**: Rectangular region of cells

## 4. Step-by-Step Execution

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 100px auto;
  gap: 10px;
}

.item {
  grid-column: 1 / 3;
  grid-row: 1 / span 2;
}
```

## 5. Syntax

```css
/* Container properties */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 200px auto;
  gap: 20px;
  justify-items: center;
  align-items: start;
}

/* Item properties */
.grid-item {
  grid-column: 1 / 4;
  grid-row: 2;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
/* Simple 3-column layout */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
```

### Medium
```css
/* Holy Grail layout */
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}

.header { grid-area: header; }
.main { grid-area: main; }
.sidebar { grid-area: sidebar; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

### Advanced
```css
/* Responsive grid with minmax */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Complex nested grid */
.complex-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 1fr 50px;
  grid-template-areas:
    "header header"
    "nav main"
    "nav footer";
}
```

## 7. Visual Diagram (ASCII)

```
Grid Terminology

       Column Lines
Row    ┌───┬───┬───┐
Lines  │   │   │   │
       ├───┼───┼───┤
       │   │   │   │
       ├───┼───┼───┤
       │   │   │   │
       └───┴───┴───┘
       
Items placed by line numbers:
grid-column: 1 / 3
grid-row: 1 / span 2
```

## 8. Real-world Example

Dashboard layout with header, sidebar, main content, and widgets.

## 9. Angular Use Case

Dashboard layouts, responsive grids, complex form arrangements.

## 10. Common Mistakes

❌ Forgetting explicit grid dimensions
❌ Overusing grid-column span

## 11. Edge Cases

1. **Subgrid support (limited)**
2. **Responsive minmax combinations**

## 12. Performance Considerations

Grid layout calculations minimal — highly optimized in browsers.

## 13. Time & Space Complexity

Layout computation O(items) per frame.

## 14. Interview Questions

1. Grid vs Flexbox comparison?
2. grid-auto-flow behavior?
3. Responsive grid implementation?

## 15. Follow-up Questions

- "Create masonry-style grid?"

## 16. Production Best Practices

1. Use minmax for flexible tracks
2. Prefer repeat(auto-fit) / auto-fill
3. Name grid lines for clarity
4. Test responsiveness across breakpoints
5. Combine with Flexbox for mixed layouts

## 17. Summary

CSS Grid provides complete two-dimensional layout control.

## 18. Revision Notes

- Container defines grid tracks
- Items positioned by line numbers or areas
- auto-fit vs auto-fill behavior differs
- grid-gap sets spacing consistently
- Implicit grid creates tracks as needed

## 19. Practice Questions

1. Build responsive masonry layout.
2. Create complex dashboard grid.
3. Implement responsive form layout.

## 20. References

- [CSS Grid Layout Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/)

---
