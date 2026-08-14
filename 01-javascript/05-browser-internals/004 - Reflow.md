# Reflow

## 1. Definition

**Reflow** is the process by which browsers recalculate the layout of part or whole document — triggered by DOM/CSS structural changes.

## 2. Why do we need it?

Layout must update when elements resize, appear, or move — reflow ensures visual correctness.

## 3. Internal Working

Changes that trigger reflow:
- Resizing window
- Modifying geometry (width, height, position)
- Adding/removing DOM nodes
- Changing CSS classes affecting layout

Reflow propagates up/down/up the DOM tree.

## 4. Step-by-Step Execution

Example:
```javascript
document.body.appendChild(el);
el.style.width = "100px";
console.log(el.offsetHeight); // Forces synchronous reflow
```

Steps:
1. Append child → layout invalidated
2. Style change → geometry altered
3. `offsetHeight` read → forces layout sync
4. Recalculates sizes/positions recursively

## 5. Syntax

Triggered implicitly by DOM/CSS changes requiring recalculation.

## 6. Examples (Easy → Advanced)

### Easy
```javascript
el.classList.add("expanded"); // May cause reflow if size changes
```

### Medium
```javascript
// Layout thrashing anti-pattern
for (let i = 0; i < items.length; i++) {
  items[i].style.width = items[i].offsetWidth + 10 + "px"; // Forces reflow each time
}
```

### Advanced
```javascript
// Efficient batched reads/writes
requestAnimationFrame(() => {
  // Batch all measurements first
  const heights = elems.map(el => el.offsetHeight);

  // Then apply mutations
  elems.forEach((el, i) => el.style.height = `${heights[i] * 2}px`);
});
```

## 7. Visual Diagram (ASCII)

```
Reflow Trigger & Propagation

Parent Node
├─ Child A ← Geometry Changed
│   ├─ Subtree invalidated
│   └─ Layout recalculated downward
└─ Parent recalculates dimensions upward
```

## 8. Real-world Example

Angular CDK Overlay positioning engine calculates preferred placement using offset measurements.

## 9. Angular Use Case

Overlay positioning, virtual scroll calculations, responsive component sizing.

## 10. Common Mistakes

❌ Reading offsetWidth immediately after write  
❌ Looping reads/writes without batching

## 11. Edge Cases

1. **Forced synchronous layout**
   ```javascript
   const h = el.offsetHeight; // Blocks until layout resolved
   ```

2. **Cumulative shift impacts**
   ```css
   /* Reserve space upfront */
   aspect-ratio: 16/9;
   ```

## 12. Performance Considerations

Batch DOM writes together, batch reads separately.

## 13. Time & Space Complexity

O(n) where n = affected subtree size.

## 14. Interview Questions

1. What triggers reflow?
2. How to minimize reflows?
3. Difference between reflow and repaint?

## 15. Follow-up Questions

- "What is layout thrashing?"
- "How does resize observer help?"

## 16. Production Best Practices

1. Use `transform` instead of geometry changes
2. Batch DOM mutations
3. Read measurements outside animation frames
4. Prefer CSS containment (`contain: layout`)

## 🔍 Quick Recap
- Reflow triggered by layout changes (DOM/geometry/CSS)
- Propagates through DOM tree inefficiently
- Layout thrashing: interleaved reads/writes
- Use transform instead of changing geometry props

## 📝 Summary
Reflow recalculates positions/sizes whenever layout changes. Heavy DOM mutations or interleaved reads/writes cause expensive reflows ("layout thrashing"). Optimize with batching using `requestAnimationFrame` and prefer CSS `transform` over geometry properties.

## 17. Summary

Critical performance bottleneck — optimize aggressively in dynamic UIs.

## 18. Revision Notes

- Caused by layout changes
- Propagates through DOM
- Expensive operation
- Avoid forced sync layout

## 19. Practice Questions

1. Identify causes of layout thrashing.
2. Refactor loop to batched approach.
3. Optimize dynamic sizing logic.

## 20. References

- [Google Web Fundamentals: Reflow](https://developers.google.com/speed/docs/insights/Invalid_Fragment)
- [MDN: Reflow](https://developer.mozilla.org/en-US/docs/Web/API/Window/offsetHeight)

### Next File
**005 - Repaint.md**
