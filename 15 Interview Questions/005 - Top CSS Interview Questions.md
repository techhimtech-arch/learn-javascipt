# Top CSS Interview Questions

## 1. Definition

Collection of frequently asked CSS interview questions covering layout systems, specificity, responsive design, animations, and modern browser features.

## 2. Why do we need it?

CSS remains core to frontend work — despite frameworks abstracting it, interviewers probe fundamentals deeply.

## 3. Internal Working

Topics covered:
- Box model variations
- Layout engines (Flexbox/Grid)
- Painting/reflow performance
- Responsive strategies
- Animation/frame optimization

## 4. Step-by-Step Execution

1. Master box-sizing and positioning
2. Understand flexbox/grid tradeoffs
3. Learn specificity/cascade resolution
4. Practice responsive patterns
5. Optimize animations/transitions

## 5. Syntax

N/A – educational reference.

## 6. Examples (Easy → Advanced)

### Easy
**Q: Explain CSS box model.**
A: Total width = width + padding + border + margin (default).
With `box-sizing: border-box`: width includes padding/border.

### Medium
**Q: How to center a div horizontally/vertically?**
A: Multiple ways:
- Flexbox: `display:flex; align-items:center; justify-content:center`
- Grid: `display:grid; place-items:center`
- Absolute positioning with translate

### Advanced
**Q: What triggers layout thrashing and how to avoid?**
A: Reading layout then writing forces reflow. Batch DOM reads/writes separately or use requestAnimationFrame.

## 7. Visual Diagram (ASCII)

```
CSS Layout Engine Pipeline

Parse Rules ──► Style Tree ──► Layout Tree ──► Paint Tree ──► Render Layers
```

## 8. Real-world Example

Creating accessible, responsive form layouts.

## 9. Angular Use Case

Component encapsulation models, responsive design patterns, performance tuning.

## 10. Common Mistakes

❌ Not knowing specificity calculation
❌ Ignoring accessibility implications

## 11. Edge Cases

1. **Subpixel rounding errors**
2. **Z-index stacking context issues**
3. **Mobile viewport quirks**

## 12. Performance Considerations

Avoid forced synchronous layouts; optimize repaints/animations.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

Sample Questions:

1. Box model explanation?
2. How to vertically center a div?
3. CSS specificity calculation?
4. Flexbox vs Grid comparison?
5. What triggers reflow/repaint?
6. Responsive design techniques?
7. Media queries usage?
8. CSS animations performance?
9. BEM methodology benefits?
10. CSS variables advantages?

## 15. Follow-up Questions

- "How to implement sticky header?"

## 16. Production Best Practices

1. Use logical properties for internationalization
2. Prefer flexbox/grid over floats
3. Optimize animations for GPU acceleration
4. Test across devices/resolutions

## 17. Summary

Master CSS fundamentals — layout, performance, responsiveness.

## 18. Revision Notes

- Master flexbox/grid combinations
- Understand rendering pipeline
- Practice specificity rules
- Know modern responsive patterns

## 19. Practice Questions

1. Build responsive navbar collapsing to hamburger.
2. Create masonry layout without JS.
3. Optimize complex animation performance.

## 20. References

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

### Next File
**006 - Behavioral and HR Questions.md**
