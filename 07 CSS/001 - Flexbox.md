# Flexbox

## 1. Definition

**Flexbox** (Flexible Box Layout) is a CSS layout model for arranging items in predictable ways along a single dimension — either row or column.

## 2. Why do we need it?

Simplify vertical/horizontal alignment, distribute space dynamically, create responsive component layouts without float hacks.

## 3. Internal Working

Parent container sets `display: flex`. Children become flex items aligned along main/cross axes. Controlled by properties like `flex-direction`, `justify-content`, `align-items`.

## 4. Step-by-Step Execution

Example:
```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.item { flex: 1; }
```

Steps:
1. Parent becomes flex container
2. Children inherit flexible behavior
3. Main axis determines primary direction
4. Items grow/shrink based on flex factors
5. Free space distributed accordingly

## 5. Syntax

```css
.container {
  display: flex | inline-flex;
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | flex-end | center | baseline;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}

.item {
  flex-grow: <number>;
  flex-shrink: <number>;
  flex-basis: <length> | auto;
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
  order: <integer>;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Medium
```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### Advanced
```css
.grid-flex {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
@media (max-width: 600px) {
  .grid-flex { display: flex; flex-direction: column; }
}
```

## 7. Visual Diagram (ASCII)

```
Flex Container Axes

Main Axis →
┌──────────────────────────────┐
│  Item 1   Item 2   Item 3    │
│  ┌─────┐  ┌─────┐  ┌─────┐   │
│  │ Flex│  │ Flex│  │ Flex│   │
│  └─────┘  └─────┘  └─────┘   │
└─────────Cross Axis───────────┘
```

## 8. Real-world Example

Centering modal vertically and horizontally:
```css
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center;
AlignItems: center;
}
```

## 9. Angular Use Case

Angular Flex Layout uses flexbox under the hood:
```html
<div fxLayout="row" fxLayoutAlign="center center">
  <div fxFlex></div>
</div>
```

## 10. Common Mistakes

❌ Confusing main/cross axis directions  
❌ Overusing flex for grid-like layouts  

## 11. Edge Cases

1. **Flex item shrinking**
   ```css
   .item { flex-shrink: 0; } /* Prevent shrinking */
   ```

2. **Equal height columns**
   ```css
   .row { display: flex; }
   .col { flex: 1; } /* Equal heights */
   ```

## 12. Performance Considerations

Prefer fixed dimensions where possible to reduce recalculations.

## 13. Time & Space Complexity

Layout recalculations O(n) in worst case — mitigated with containment.

## 14. Interview Questions

1. Difference between justify-content and align-items?
2. What is flex-basis vs flex-grow?
3. When to use flex-wrap?

## 15. Follow-up Questions

- "How do you handle equal-width columns?"

## 16. Production Best Practices

1. Define explicit main/cross axis early
2. Limit nested flex containers
3. Use `align-self` sparingly
4. Prefer `gap` for spacing instead of margins

## 17. Summary

Flexbox excels at one-dimensional layouts — aligning content along rows or columns.

## 18. Revision Notes

- Main axis orientation set by flex-direction
- justify-content for main axis distribution
- align-items for cross-axis alignment
- flex-grow/shrink/basis control sizing

## 19. Practice Questions

1. Center box in viewport.
2. Distribute nav links evenly.
3. Create responsive card layout.

## 20. References

- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)

### Next File
**002 - Grid.md**
