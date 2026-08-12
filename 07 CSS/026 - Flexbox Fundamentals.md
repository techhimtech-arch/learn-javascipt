# CSS Flexbox Fundamentals

## 1. Definition

**CSS Flexbox** is a one-dimensional layout model for distributing space along main/cross axes — aligning content efficiently.

## 2. Why do we need it?

Simplify vertical centering, equal height columns, and responsive distribution without floats.

## 3. Internal Working

Container properties (parent):
- `display: flex | inline-flex`
- `flex-direction`: row/col orientation
- `flex-wrap`: Allow wrapping
- `justify-content`: Align items along main axis
- `align-items`: Align items along cross axis
- `align-content`: Align wrapped lines

Item properties (children):
- `flex-grow`: Expansion ratio
- `flex-shrink`: Shrink allowance  
- `flex-basis`: Initial size
- `align-self`: Override container alignment
- `order`: Visual ordering

## 4. Step-by-Step Execution

Vertical centering example:
```css
.container {
  display: flex;
  justify-content: center;  /* horizontal center */
  align-items: center;      /* vertical center */
  height: 100vh;
}
```

## 5. Syntax

```css
/* Container */
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 1rem;
}

/* Items */
.flex-item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: stretch;
  order: 0;
}

/* Shorthands */
.item {
  flex: 1 1 auto;  /* grow shrink basis */
  flex: 1;        /* = flex: 1 1 0 */
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
/* Simple centering */
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Medium
```css
/* Three equal columns */
.equal-columns {
  display: flex;
  .col {
    flex: 1; /* Equal width */
  }
}
```

### Advanced
```css
/* Holy Grail with flexbox */
.holy-grail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  
  .header { flex: none; }
  .nav { flex: 0 0 250px; }
  .main { flex: 1; }
  .footer { flex: none; }
}
```

## 7. Visual Diagram (ASCII)

```
Flexbox Axes

Main Axis (row direction by default)
↓ flex-direction: row
┌─────────────────────────────────────┐
│ main-start                        main-end │
│   ↓                                 │
│ item1  item2  item3                 │
│                                     │
│ Cross axis ←── align-items: center ──→
└─────────────────────────────────────┘
```

## 8. Real-world Example

Navigation bar with space-between logo and menu items, vertical centered icons.

## 9. Angular Use Case

Component alignment, responsive layouts, card grids.

## 10. Common Mistakes

❌ Not setting flex-basis appropriately
❌ Confusion over main/cross axes

## 11. Edge Cases

1. **Minimum content sizing**
2. **Nested flex containers**
3. **Flexible images/media**

## 12. Performance Considerations

Layout computations efficient but complex layouts add cost.

## 13. Interview Questions

1. Center element vertically and horizontally?
2. Equal height columns approach?
3. flex-grow/shrink/basis relationship?

## 14. Summary

Flexbox handles one-dimensional layout problems elegantly.

## 15. Revision Notes

- Main axis depends on flex-direction
- justify-content aligns main axis
- align-items aligns cross axis
- flex shorthand order: grow shrink basis

## 16. Practice Questions

1. Vertically center element.
2. Create responsive nav bar.
3. Build equal-width column layout.

## 17. References

- [CSS Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/)

---
