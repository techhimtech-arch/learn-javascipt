# Positioning

## 1. Definition

CSS **position** property controls how elements are placed in the document flow — `static`, `relative`, `absolute`, `fixed`, `sticky`.

## 2. Why do we need it?

Take elements out of normal flow, layer them, fix headers, create overlays.

## 3. Internal Working

- static: Normal document flow
- relative: Offset from original position but occupies space
- absolute: Removed from flow, positioned relative to nearest positioned ancestor
- fixed: Relative to viewport
- sticky: Hybrid (relative until scroll threshold reached)

## 4. Step-by-Step Execution

Example:
```css
.relative-box {
  position: relative;
  top: 10px;
  left: 20px;
}
.absolute-box {
  position: absolute;
  top: 0;
  right: 0;
}
```

Steps:
1. `.relative-box` shifts 10px down/right from its natural spot
2. Still affects surrounding elements normally
3. `.absolute-box` removed from flow entirely
4. Positioned relative to closest ancestor with `position: relative/absolute`

## 5. Syntax

```css
.selector {
  position: static | relative | absolute | fixed | sticky;
  top/right/bottom/left: <value>;
  z-index: <integer>;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Medium
```css
.sticky-header {
  position: sticky;
  top: 0;
  background: white;
}
```

### Advanced
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
```

## 7. Visual Diagram (ASCII)

```
Position Types

Static  : Normal flow position
Relative: Shifted from normal
Absolute: Removed, anchored to parent
Fixed   : Fixed to viewport
Sticky  : Relative → Fixed on scroll
```

## 8. Real-world Example

Angular CDK overlay positioning:
```typescript
const overlayRef = this.overlay.position()
  .flexibleConnectedTo(anchorElement)
  .toSortedList(['below'], ['center']);
```

## 9. Angular Use Case

Overlays, dropdowns, tooltips, modals.

## 10. Common Mistakes

❌ Using absolute positioning inside non-positioned parents  
❌ Ignoring stacking contexts  

## 11. Edge Cases

1. **Z-index stacking order**
   ```css
   /* Create stacking context */
   .layer { position: relative; z-index: 10; }
   ```

2. **Sticky not working**
   ```css
   /* Must specify offset values */
   .sticky { position: sticky; top: 0; }
   ```

## 12. Performance Considerations

Fixed/sticky cause composite layers — optimize with containment.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Difference between absolute and fixed?
2. How does z-index work?
3. Sticky positioning requirements?

## 15. Follow-up Questions

- "How to center element vertically/horizontally?"

## 16. Production Best Practices

1. Always provide fallback for unsupported features
2. Use relative units (rem/em) where possible
3. Test cross-browser positioning behavior
4. Minimize z-index wars

## 17. Summary

Positioning enables fine-grained control over element placement in the viewport/document.

## 18. Revision Notes

- static: default, no offsets
- relative: offsets from normal flow
- absolute: taken completely out of flow
- fixed: locked to viewport
- sticky: hybrid relative/fixed switching

## 19. Practice Questions

1. Vertically center div.
2. Create sticky navbar.
3. Build modal overlay system.

## 20. References

- [MDN: Position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

### Next File
**004 - Selectors.md**
