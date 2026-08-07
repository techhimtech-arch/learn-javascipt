# Rendering Pipeline

## 1. Definition

The **Rendering Pipeline** is the sequence of steps browsers perform to convert HTML/CSS/JS into pixels on screen — also known as the **Critical Rendering Path**.

## 2. Why do we need it?

Understanding rendering improves performance — identifying bottlenecks like layout thrashing, paint storms, reflow cascades.

## 3. Internal Working

Steps:
1. Parse HTML → DOM tree
2. Parse CSS → CSSOM tree
3. Merge DOM + CSSOM → Render tree
4. Layout (Recalculate positions/sizes)
5. Paint (fill pixels)
6. Composite layers to final frame

JavaScript can interrupt this flow at any point.

## 4. Step-by-Step Execution

Example:
```html
<div id="box">Hello</div>
<style>
  #box { color: red; width: 100px; }
</style>
```

Steps:
1. HTML parser builds DOM `<div>`
2. CSS parser builds CSSOM rule for `#box`
3. DOM & CSSOM combined → Render Tree node with styles
4. Layout calculates position/size of `#box`
5. Paint fills pixel data
6. Compositor draws layer onto screen

## 5. Syntax

Implicit — no syntax. Triggered automatically by DOM/CSS modifications.

## 6. Examples (Easy → Advanced)

### Easy
```javascript
document.body.style.color = "blue"; // Triggers style recalc → repaint
```

### Medium
```javascript
const el = document.createElement('div');
document.body.appendChild(el); // Forces layout
```

### Advanced
```javascript
// Optimize batched reads/writes
requestAnimationFrame(() => {
  const height = el.offsetHeight; // Read
  el.style.height = `${height * 2}px`; // Write
});
```

## 7. Visual Diagram (ASCII)

```
Critical Rendering Path

HTML ──► Parser ──► DOM
CSS ──► Parser ──► CSSOM
                 │
                 ▼
            Render Tree
                 │
                 ▼
            Layout
                 │
                 ▼
            Paint
                 │
                 ▼
           Composite Layers
```

## 8. Real-world Example

Angular animations trigger composite layers via `transform`/`opacity`.

## 9. Angular Use Case

Use `NgZone` to control change detection timing around renders.

## 10. Common Mistakes

❌ Forcing synchronous layout thrash  
❌ Too many paints/reflows

## 11. Edge Cases

1. **Layout thrashing**
   ```javascript
   el.style.width = `${el.offsetWidth}px`; // Bad — forces recalc twice
   ```

2. **Will-change optimization**
   ```css
   .will-transform { will-change: transform; }
   ```

## 12. Performance Considerations

Batch DOM writes, prefer transforms/over opacity.

## 13. Time & Space Complexity

Varies with DOM size.

## 14. Interview Questions

1. Describe CRP steps.
2. What triggers reflow/paint?
3. How to reduce rendering overhead?

## 15. Follow-up Questions

- "Difference between repaint and reflow?"
- "How do layers help rendering?"

## 16. Production Best Practices

1. Minimize forced reflows
2. Use transform/opacity animations
3. Offload heavy work to web workers
4. Apply `contain` property where appropriate

## 17. Summary

Browser converts markup into viewable pixels via deterministic pipeline.

## 18. Revision Notes

- DOM + CSSOM → Render Tree
- Layout computes geometry
- Paint fills pixel data
- Composite merges layers

## 19. Practice Questions

1. Measure rendering cost of DOM change.
2. Identify layout thrash culprits.
3. Apply performant animation technique.

## 20. References

- [Google Web Fundamentals: CRP](https://web.dev/articles/crp)

### Next File
**002 - DOM.md**
