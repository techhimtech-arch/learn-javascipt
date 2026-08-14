# Repaint

## 1. Definition

**Repaint** occurs when elements are updated visually — colors, backgrounds, visibility — without altering layout or geometry.

## 2. Why do we need it?

To reflect visual changes that don’t affect spatial arrangement.

## 3. Internal Working

After reflow (if triggered), browser paints pixels for changed regions.

If no geometry change → repaint only (lighter than full reflow).

## 4. Step-by-Step Execution

Example:
```javascript
element.style.backgroundColor = "blue"; // Triggers repaint
```

Steps:
1. Style change applied
2. No geometry impact → skip reflow
3. Paint affected pixels
4. Composite layer onto frame buffer

## 5. Syntax

Triggered indirectly through visual property updates.

## 6. Examples (Easy → Advanced)

### Easy
```javascript
el.style.visibility = "hidden";
```

### Medium
```css
:hover { background-color: green; } /* Pure repaint */
```

### Advanced
```javascript
// Animate only opacity/transform (best practice)
el.style.opacity = "0.5";
```

## 7. Visual Diagram (ASCII)

```
Repaint vs Reflow

Style Change Only (Color):
┌──────────────┐
│ No Layout    │ ← Skip reflow
├──────────────┤
│ Paint Region │ ← Redraw pixels
└──────────────┘

Full Update (Size):
┌──────────────┐
│ Layout Update│ ← Full reflow
├──────────────┤
│ Paint All    │
└──────────────┘
```

## 8. Real-world Example

Angular animations modifying opacity/transform perform well due to layer promotion.

## 9. Angular Use Case

CSS transitions/animations on repaint-friendly properties (`opacity`, `transform`).

## 10. Common Mistakes

❌ Animating non-transform properties (`left`, `top`) causing reflow
❌ Applying visual effects globally without layer isolation

## 11. Edge Cases

1. **Opacity changes isolate layers**
   ```css
   .fade-layer { opacity: 0.99; } /* Creates new composite layer */
   ```

2. **Backface-visibility trick**
   ```css
   .hardware-accelerated {
     transform: translateZ(0);
   }
   ```

## 12. Performance Considerations

Prefer transform/opacity animations — avoid triggering reflow/repaint where possible.

## 13. Time & Space Complexity

Faster than reflow — depends on painted area size.

## 14. Interview Questions

1. Repaint vs reflow?
2. Which properties trigger pure repaint?
3. Why is repaint generally cheaper?

## 15. Follow-up Questions

- "How does GPU acceleration reduce repaint cost?"
- "What is will-change for?"

## 16. Production Best Practices

1. Animate only transform/opacity
2. Promote layers using `will-change`
3. Contain repaints with `overflow: hidden` or `isolation`

## 🔍 Quick Recap
- Repaint = visual-only changes (colors, visibility)
- Cheaper than reflow (no layout calc)
- Animating transform/opacity is fastest
- Use will-change to pre-promote layers

## 📝 Summary
Repaint refreshes pixels without affecting layout. Though lighter than reflow, it still incurs cost proportional to painted area. Optimizing with GPU-accelerated properties (`transform`, `opacity`) minimizes impact.

## 17. Summary

Visual-only updates cheaper than structural changes.

## 18. Revision Notes

- Color changes only
- Skip reflow step
- Still expensive on large areas
- Prefer GPU-accelerated properties

## 19. Practice Questions

1. Which CSS props cause repaint only?
2. Improve slow animation performance.
3. Isolate animated element visually.

## 20. References

- [MDN: Repaint](https://developer.mozilla.org/en-US/docs/Web/CSS/Performance)
- [Web.dev: Animations](https://web.dev/articles/animations)

### Next File
**006 - Critical Rendering Path.md**
