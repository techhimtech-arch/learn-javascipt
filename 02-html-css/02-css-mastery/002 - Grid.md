# Grid

## 1. Definition

**CSS Grid** is a two-dimensional layout system — enabling precise control over both rows and columns simultaneously.

## 2. Why do we need it?

Create complex responsive layouts (header/sidebar/content) with less code than floats/flexbox combos.

## 3. Internal Working

Applies to parent (`display: grid`), children become grid items placed in cells defined by lines/areas. Controlled via `grid-template-*`, `grid-area`, `fr` units.

## 4. Step-by-Step Execution

Example:
```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
}
.header { grid-column: 1 / -1; }
.sidebar { grid-column: 1; }
.content { grid-column: 2; }
.aside { grid-column: 3; }
.footer { grid-column: 1 / -1; }
```

Steps:
1. Container becomes grid with 3 columns, 3 rows
2. Each child placed by grid-line numbers
3. Gap inserted between cells
4. Layout adapts responsively

## 5. Syntax

```css
.container {
  display: grid;
  grid-template-columns: ...;
  grid-template-rows: ...;
  grid-gap: ...;
  grid-auto-flow: row | column | dense;
  grid-template-areas: "...";
}

.item {
  grid-column-start/end;
  grid-row-start/end;
  grid-area: areaName;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
.simple-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

### Medium
```css
.layout {
  display: grid;
  grid-template:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-areas: ...;
}
```

### Advanced
```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: 1fr 2fr 1fr;
  }
}
```

## 7. Visual Diagram (ASCII)

```
Grid Layout Example

┌───────────────┬─────────────────┬──────────────┐
│ Header        │                 │              │
├───────────────┼─────────────────┼──────────────┤
│ Sidebar       │ Main Content    │ Aside        │
├───────────────┴─────────────────┼──────────────┤
│ Footer                                       │
└──────────────────────────────────────────────┘
```

## 8. Real-world Example

Dashboard layout in Angular:
```scss
.dashboard-grid {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}
```

## 9. Angular Use Case

Structural layouts, dashboards, responsive grids.

## 10. Common Mistakes

❌ Mixing grid/flex incorrectly  
❌ Not accounting for implicit tracks  

## 11. Edge Cases

1. **Auto-placement order**
   ```css
   .item-a { grid-column: 2; } /* Others shift */
   ```

2. **Minmax responsive columns**
   ```css
   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
   ```

## 12. Performance Considerations

Grid can be more performant than nested flexboxes for complex layouts.

## 13. Time & Space Complexity

Layout calculation similar to block/inline flow — O(n).

## 14. Interview Questions

1. Grid vs Flexbox choice?
2. What are grid lines?
3. Explain `fr` unit.

## 15. Follow-up Questions

- "How to make responsive grid columns?"

## 16. Production Best Practices

1. Start mobile-first with simple grid
2. Use named areas for readability
3. Combine with media queries gradually
4. Avoid overriding auto-placement unnecessarily

## 17. Summary

Grid brings powerful two-dimensional layout capabilities directly to CSS.

## 18. Revision Notes

- Parent: `display: grid`
- Tracks defined by `grid-template-*`
- `fr` = fraction of free space
- Auto-fit/auto-fill adjust responsiveness
- Gap separates cells cleanly

## 19. Practice Questions

1. Create magazine-style layout.
2. Make responsive photo gallery.
3. Build dashboard with sidebar/main/aside/footer.

## 20. References

- [MDN: Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)

### Next File
**003 - Positioning.md**
