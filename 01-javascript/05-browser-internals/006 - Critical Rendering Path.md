# Critical Rendering Path

## 1. Definition

The **Critical Rendering Path** (CRP) describes the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into rendered pixels on the screen.

## 2. Why do we need it?

Optimizing CRP reduces perceived load time and improves user experience.

## 3. Internal Working

Steps:
1. HTML Parser → DOM
2. CSS Parser → CSSOM
3. DOM + CSSOM → Render Tree
4. Layout calculation
5. Paint operations
6. Composite layers to form final image

JavaScript execution can block DOM/CSS construction unless deferred/async.

## 4. Step-by-Step Execution

Example:
```html
<!DOCTYPE html>
<html>
<head>
  <style>body { color: blue; }</style>
</head>
<body>
  <h1>Hello</h1>
  <script>document.body.style.color = "red";</script>
</body>
</html>
```

Steps:
1. Parse `<html>` → create DOM element
2. Parse `<style>` → build CSSOM
3. Encounter `<script>` → pause parsing, execute JS
4. JS modifies style → triggers reflow later
5. Continue parsing remaining markup
6. After full parse → layout/paint/composite

## 5. Syntax

No syntax — conceptual model.

## 6. Examples (Easy → Advanced)

### Easy
Inline critical CSS avoids render-blocking round trips.

### Medium
Defer non-critical scripts:
```html
<script src="main.js" defer></script>
```

### Advanced
Extract above-the-fold CSS inline and lazy-load rest:
```html
<style>
  /* Above-the-fold styles here */
</style>
<link rel="preload" href="rest.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## 7. Visual Diagram (ASCII)

```
Critical Rendering Path Flow

HTML ──► Parser ──► DOM
                   │
CSS ──► Parser ──► CSSOM
                   │
           Merge DOM + CSSOM → Render Tree
                   │
              Layout Calculation
                   │
                 Paint Tiles
                   │
             Composite Layers
```

## 8. Real-world Example

Angular Universal performs SSR to send pre-rendered HTML reducing CRP for first paint.

## 9. Angular Use Case

Optimize initial bundle size, defer loading heavy modules.

## 10. Common Mistakes

❌ Blocking critical resources unnecessarily  
❌ Not prioritizing visible content  

## 11. Edge Cases

1. **Async/Defer trade-offs**
   - `async`: executes as soon as downloaded, may interrupt parser
   - `defer`: downloaded in parallel, executed after parser completes

2. **Font loading FOIT/FOUT**
   ```html
   <link rel="font-display: swap;" href="font.woff2"> <!-- Prevents invisible text -->
   ```

## 12. Performance Considerations

Inline small critical CSS, lazy-load fonts/media, minify bundles.

## 13. Time & Space Complexity

Depends on amount of content/resources involved.

## 14. Interview Questions

1. Steps in CRP?
2. How to minimize render blocking?
3. Role of defer/async?

## 15. Follow-up Questions

- "How does SSR affect CRP?"
- "Why inline critical CSS?"

## 16. Production Best Practices

1. Inline above-fold styles
2. Async/defer non-critical JS
3. Optimize font loading
4. Reduce server response time

## 🔍 Quick Recap
- 6-step path from source to pixels
- HTML/CSS parsers build tree structures
- JS can block parsing/rendering
- Defer/async optimize loading

## 📝 Summary
The Critical Rendering Path dictates page load performance. By optimizing resource loading order, inlining critical assets, and deferring non-essential JS, developers drastically reduce time to first meaningful paint — vital for UX and SEO.

## 17. Summary

Optimization path ensures fast first meaningful paint.

## 18. Revision Notes

- HTML/CSS parsed separately then merged
- JS may interrupt parsing
- Render-blocking resources delay pixels
- Minimize round trips & payload size

## 19. Practice Questions

1. Measure CRP stages with DevTools.
2. Prioritize critical assets.
3. Defer non-critical JS effectively.

## 20. References

- [MDN: CRP](https://web.dev/articles/crp)
- Google PageSpeed Insights docs

### Next File
**007 - CSSOM.md**
