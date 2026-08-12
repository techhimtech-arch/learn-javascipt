# CSS Responsive Units

## 1. Definition

**CSS Responsive Units** provide flexible sizing relative to viewport, root font, or parent element.

## 2. Why do we need it?

Create designs that adapt to device characteristics automatically.

## 3. Internal Working

Unit categories:
- **Relative to viewport**: vw/vh/vmin/vmax
- **Relative to font size**: em/rem
- **Relative to container**: cq* (new)
- **Relative to root font**: rem/%

## 4. Syntax

```css
.responsive-element {
  /* Viewport units */
  font-size: 3vw;
  height: 100vh;
  width: 50vmin;
  
  /* Font-relative */
  margin: 1em;
  padding: 0.5rem; /* 1rem = root font-size */
  
  /* Percentage */
  width: 80%;
}
```

## 5. Examples

### Easy
```css
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

### Advanced
```css
.component {
  font-size: 1.2rem;
  padding: 1em;          /* Relative to element font */
  margin: 0.5rem;        /* Relative to root font */
  width: 100cqw;        /* Relative to container */
}
```

## 6. Interview Questions

1. rem vs em differences?
2. Viewport unit gotchas?
3. clamp() for fluid sizing?

## 7. Summary

Responsive units enable fluid, adaptive layouts efficiently.

## 8. References

- [MDN CSS Units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)

---
