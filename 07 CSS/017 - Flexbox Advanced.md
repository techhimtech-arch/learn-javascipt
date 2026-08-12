# Flexbox Advanced

## 1. Definition

**Advanced Flexbox** covers alignment, distribution, wrapping, and responsive techniques beyond basic one-dimensional layouts.

## 2. Why do we need it?

Align and distribute space along main/cross axes flexibly and responsively.

## 3. Internal Working

Container properties:
- `flex-direction`: main axis (row/row-reverse/column/column-reverse)
- `flex-wrap`: wrapping control
- `justify-content`: main-axis alignment
- `align-items`: cross-axis alignment
- `align-content`: multi-line alignment

Item properties:
- `flex-grow/shrink/basis`: sizing flexibility
- `align-self`: individual cross-axis override

## 4. Step-by-Step Execution

```css
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: flex-start;
}

.flex-item {
  flex: 1 1 auto; /* grow:1 shrink:1 basis:auto */
}
```

## 5. Syntax

```css
/* Container */
.flex-box {
  display: inline-flex; /* or flex */
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  flex-flow: <direction> <wrap>;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right | normal | stretch;
  align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | self-start | self-end;
  align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | normal | baseline;
  gap: 1rem;
}

/* Items */
.flex-item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  order: 0;
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
.equal-columns {
  display: flex;
  .column {
    flex: 1; /* Equal width */
  }
}
```

### Medium
```css
.sticky-footer {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  
  .content {
    flex: 1; /* Expands to push footer down */
  }
}
```

### Advanced
```css
.responsive-flex-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  .item {
    flex: 1 1 clamp(200px, 30%, 1fr); /* Responsive item widths */
  }
}
```

## 7. Visual Diagram (ASCII)

```
Flexbox Axes

Main Axis (row direction)
┌───────────────────────────────┐
│ flex-start                    flex-end │
│ ◄───────────────────────────────►     │
│                                   │
│        justify-content          │
│                                   │
├───────────────────────────────────┤
│  align-items: cross axis          │
│  (perpendicular to main axis)    │
└───────────────────────────────────┘

Flex Direction Options:
row:     → → →      column:    ↓ ↓ ↓
          items      items
```

## 8. Real-world Example

Responsive navigation bar with space-between logo and menu items.

## 9. Angular Use Case

Component layout alignment, responsive containers, navigation layouts.

## 10. Common Mistakes

❌ Confusing main/cross axis orientation
❌ Setting explicit dimensions on flex items

## 11. Edge Cases

1. **flex-basis auto vs 0 behavior**
   ```css
   flex: 1; /* flex: 1 1 0% - ignores content size */
   flex: 1 1 auto; /* flex-basis: auto - respects content */
   ```

## 12. Performance Considerations

Layout calculations efficient — preferred over floats.

## 13. Time & Space Complexity

O(n) per layout pass.

## 14. Interview Questions

1. Main vs cross axis concepts?
2. justify-content vs align-items differences?
3. Flex item sizing mechanics?

## 15. Follow-up Questions

- "Create responsive sticky footer?"

## 16. Production Best Practices

1. Understand flex-basis initial value behavior
2. Use flex shorthand properly
3. Consider wrapping implications
4. Test with dynamic content heights
5. Use gap instead of margins where possible

## 17. Summary

Flexbox provides powerful one-dimensional layout alignment and distribution capabilities.

## 18. Revision Notes

- Main axis direction controlled by flex-direction
- Main axis: justify-content
- Cross axis: align-items/align-self
- Flex shorthand: grow shrink basis
- Gap property works in flexbox

## 19. Practice Questions

1. Build responsive navbar with flex.
2. Create equal height columns.
3. Implement vertical centering solution.

## 20. References

- [CSS Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/)

---
