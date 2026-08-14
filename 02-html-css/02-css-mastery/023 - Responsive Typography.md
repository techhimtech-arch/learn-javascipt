# Responsive Typography

## 1. Definition

**Responsive Typography** scales text fluidly across viewport sizes — maintaining readability without fixed breakpoints.

## 2. Why do we need it?

User zoom, high-DPI screens, various viewports require flexible text rendering.

## 3. Internal Working

Techniques:
- **Fluid scaling**: clamp(), calc(), vw units
- **Media queries**: Breakpoint-based adjustments
- **Relative units**: em/rem/percentages for inheritance
- **Container queries**: Size-relative typography

## 4. Step-by-Step Execution

Fluid scaling with clamp():
```css
h1 {
  /* min 1.5rem, preferred 4vw, max 3rem */
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

Relative units:
```css
/* Root-relative sizing */
html { font-size: 100%; } /* 16px */
body { font-size: 1rem; } /* = 16px */

small { font-size: 0.875rem; } /* ~14px */
```

## 5. Syntax

```css
/* Viewport units for scaling */
.hero-title {
  font-size: 5vw; /* 5% of viewport width */
}

/* CSS functions */
body {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
}

/* Media queries for breakpoints */
@media (max-width: 768px) {
  h1 { font-size: 2rem; }
}
@media (min-width: 769px) {
  h1 { font-size: 3rem; }
}
```

## 6. Examples

### Easy
```css
/* Basic responsive */
h1 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}
```

### Medium
```css
/* Fluid type system */
html { font-size: 100%; } /* 1rem = 16px */

h1 { font-size: calc(1.5rem + 1.5vw); }
h2 { font-size: calc(1.3rem + 1vw); }
p { font-size: 1rem; line-height: 1.6; }
```

### Advanced
```css
/* Container query typography */
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    font-size: 1.2rem;
  }
}

/* Modular scale */
:root {
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.563rem;
  --step-3: 1.953rem;
}
```

## 7. Visual Diagram (ASCII)

```
Responsive Typography Approach

┌─────────────────────────────────────┐
│ Fixed Sizes        │ Media Queries   │
├────────────────────┼─────────────────┤
│ 16px               │ @media          │
│ 18px               │ @media          │
│ 20px               │ @media          │
├────────────────────┼─────────────────┤
│ Fluid Sizes        │ clamp()         │
├────────────────────┼─────────────────┤
│ Scales smoothly    │ vw units        │
│ across viewports   │ calc()          │
└─────────────────────────────────────┘
```

## 8. Real-world Example

News website with fluid headings and readable body text.

## 9. Angular Use Case

Responsive component styling, design system tokens.

## 10. Common Mistakes

❌ Using px units exclusively
❌ Not accounting for user zoom preferences

## 11. Edge Cases

1. **Minimum/maximum font sizes**
2. **High contrast mode compatibility**

## 12. Best Practices

1. Base on relative units (rem)
2. Use clamp() for fluid ranges
3. Maintain readable line lengths (45-75 chars)
4. Test at extreme zoom levels

## 13. Interview Questions

1. clamp() vs media queries?
2. Implement modular scale?
3. Accessible font sizing?

## 14. Summary

Responsive typography improves readability across all viewing contexts.

## 15. References

- [CSS Typography Guide](https://css-tricks.com/snippets/css/snippets-css-typography/)
- [Fluid Type](https://css-tricks.com/snippets/css/fluid-typography/)

---
