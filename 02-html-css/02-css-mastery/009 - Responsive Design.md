# Responsive Design

## 1. Definition

**Responsive Web Design (RWD)** adapts layout/presentation to various screen sizes/viewports using fluid grids, flexible media, and media queries.

## 2. Why do we need it?

Single codebase serving mobile/tablet/desktop users effectively — critical since majority traffic is mobile.

## 3. Internal Working

Combines:
1. Flexible grid layouts (percentages, `fr`, flexbox)
2. Scalable media (images/video max-width:100%)
3. Media query breakpoints adjusting structure
4. Viewport meta tag controlling zoom/scale

## 4. Step-by-Step Execution

Example:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  @media (max-width: 600px) {
    .container { grid-template-columns: 1fr; }
  }
</style>
```

Steps:
1. Viewport sets scaling baseline
2. Grid adjusts columns based on available width
3. At under 600px → single column
4. All content reflows responsively

## 5. Syntax

```css
/* Container queries */
@container (min-width: 600px) { ... }

/* Media queries */
@media screen and (max-width: 768px) { ... }
@media (orientation: landscape) { ... }

/* Flexible units */
width: clamp(300px, 50%, 800px);
font-size: 1rem + 1vw;

/* Aspect ratio */
.aspect-box { aspect-ratio: 16/9; }
```

## 6. Examples (Easy → Advanced)

### Easy
```css
img {
  max-width: 100%;
  height: auto;
}
```

### Medium
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
```

### Advanced
```css
.hero {
  padding: clamp(2rem, 5vw, 6rem);
  font-size: clamp(1.5rem, 4vw, 3rem);
}

@media (max-width: 768px) {
  .hero { padding: 1rem; font-size: 1.2rem; }
}
```

## 7. Visual Diagram (ASCII)

```
Responsive Breakpoint Strategy

Large Screen (1200px+) → 4 Columns
Medium (768–1200px)   → 2 Columns
Small (<768px)        → 1 Column

┌─────────────┐┌─────────────┐┌─────────────┐┌─────────────┐ Large
│ Card        ││ Card        ││ Card        ││ Card        │
└─────────────┘└─────────────┘└─────────────┘└─────────────┘

┌─────────────┐┌─────────────┐┌─────────────┐┌─────────────┐ Medium
│ Card        ││ Card        ││ Card        ││ Card        │
└─────────────┘└─────────────┘└─────────────┘└─────────────┘

┌─────────────┐┌─────────────┐┌─────────────┐┌─────────────┐ Small
│ Card        ││ Card        ││ Card        ││ Card        │
└─────────────┘└─────────────┘└─────────────┘└─────────────┘
```

## 8. Real-world Example

Angular Flex Layout + breakpoints:
```html
<div fxLayout="row" fxLayoutAlign="space-between center"
     [fxLayoutAlign]="{ xs: 'column', sm: 'row' }">
  <mat-card fxFlex="1 1 auto">...</mat-card>
</div>
```

## 9. Angular Use Case

Adaptive layouts using Flex Layout, CDK breakpoints, container queries.

## 10. Common Mistakes

❌ Ignoring mobile-first strategy  
❌ Fixed-width elements breaking layout

## 11. Edge Cases

1. **Large text rendering issues**
   ```css
   html { font-size: 100%; } /* Prevent zooming */
   ```

2. **Pixel density differences**
3. **Foldable device considerations**

## 12. Performance Considerations

Avoid heavy repaints/reflows during resize events — debounce handlers.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Mobile-first approach benefits?
2. Common breakpoints list?
3. How container queries improve upon media queries?

## 15. Follow-up Questions

- "Explain fluid typography technique?"

## 16. Production Best Practices

1. Start with smallest layout first
2. Use relative units (`rem`, `%`) liberally
3. Test across multiple devices/orientations
4. Prioritize critical content visibility

## 17. Summary

Responsive design delivers consistent experience regardless of device constraints.

## 18. Revision Notes

- Viewport meta essential
- Fluid grids + media queries core pillars
- Mobile-first preferred workflow
- Container queries emerging alternative

## 19. Practice Questions

1. Convert fixed layout to responsive.
2. Implement mobile navigation pattern.
3. Create adaptive image gallery.

## 20. References

- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [CSS Tricks Guide](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/)

### Next File
**010 - Media Queries.md**
