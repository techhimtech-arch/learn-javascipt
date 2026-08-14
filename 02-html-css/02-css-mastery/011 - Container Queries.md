# Container Queries

## 1. Definition

**Container Queries (CQ)** allow applying styles based on an element’s **own size or state** rather than viewport dimensions — enabling truly modular responsive design.

## 2. Why do we need it?

Components shouldn't care about global viewport — they should adapt based on their container size.

## 3. Internal Working

1. Set `container-type` on parent element
2. Define `@container` rule with condition
3. Styles inside apply based on parent's measured size

Unlike media queries, CQs evaluate per-component instance independently.

## 4. Step-by-Step Execution

Example:
```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { flex-direction: row; }
  .card img { width: 40%; }
}
```

Steps:
1. `.card-container` defines itself as a query container
2. Inside its scope → `@container` applies conditionally
3. When container ≥400px → card flips to horizontal layout
4. Each card instance responds independently

## 5. Syntax

```css
.parent {
  container-type: size | inline-size | normal;
  container-name: myContainer;
}

@container myContainer (min-width: 500px) {
  .child { ... }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
.wrapper {
  container-type: inline-size;
}

@container (max-width: 300px) {
  h2 { font-size: 1rem; }
}
```

### Medium
```css
.article-wrapper {
  container-type: inline-size;
  container-name: article;
}

@container article (min-width: 600px) {
  .content { display: grid; grid-template-columns: 2fr 1fr; }
  img { width: 40%; float: right; }
}
```

### Advanced
```css
.card-grid {
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

@container (min-width: 500px) {
  .card-content { display: flex; align-items: center; }
}

@container (min-width: 800px) {
  .card-content { flex-direction: row-reverse; }
}
```

## 7. Visual Diagram (ASCII)

```
Container Query vs Media Query

Media Query (viewport-based):
┌──────────────────────────────┐
│ Entire Viewport (1200px)     │ ← Applies @media here
└──────────────────────────────┘

Container Query (element-based):
┌────────────┐
│ Component A│ ← Own size triggers @container
│ 300px wide │
└────────────┘

┌──────────────────────────────┐
│ Component B                  │ ← Different size → different styles
│ 900px wide                   │
└──────────────────────────────┘
```

## 8. Real-world Example

Angular reusable card component adapting to parent size:
```scss
:host {
  display: block;
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-body { display: flex; }
  .avatar { width: 80px; }
}
```

## 9. Angular Use Case

Creating truly modular UI components (cards, lists, forms) that self-adapt to surrounding space.

## 10. Common Mistakes

❌ Applying container-type to wrong ancestors  
❌ Over-nesting containers unnecessarily

## 11. Edge Cases

1. **Naming containers explicitly**
   ```css
   .sidebar { container-name: sidebar-area; }
   @container sidebar-area (min-width: 200px) { ... }
   ```

2. **Size scope options**
   ```css
   container-type: size; /* width AND height */
   container-type: inline-size; /* width only (default) */
   ```

## 12. Performance Considerations

Efficient — handled natively by CSS engine, no JavaScript required.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Container Queries vs Media Queries?
2. Required CSS property to enable container queries?
3. Browser support status?

## 15. Follow-up Questions

- "How to polyfill container queries?"

## 16. Production Best Practices

1. Name containers meaningfully
2. Scope large containers narrowly
3. Combine with logical properties for direction-agnostic layouts
4. Graceful degradation for unsupported browsers

## 17. Summary

Container queries empower component-level responsiveness — future of modular CSS architecture.

## 18. Revision Notes

- Need `container-type` on ancestor
- `@container (feature)` applies conditional styles
- Independent per component
- Modern replacement for some MQ use-cases

## 19. Practice Questions

1. Make component adapt to sidebar width.
2. Create card with container-driven layout.
3. Migrate legacy MQ to CQ.

## 20. References

- [MDN: Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@container)
- [CSS Containment Spec](https://www.w3.org/TR/css-contain-3/#container-queries)

### Next File
**012 - BEM.md**
