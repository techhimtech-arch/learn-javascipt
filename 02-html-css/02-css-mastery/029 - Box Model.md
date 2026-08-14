# CSS Box Model

## 1. Definition

**CSS Box Model** describes rectangular boxes generated for elements — including content, padding, border, margins.

## 2. Why do we need it?

Understanding sizing prevents layout surprises and sizing bugs.

## 3. Internal Working

Box components:
1. **Content area**: Actual content width/height
2. **Padding**: Inner spacing around content
3. **Border**: Boundary around padding
4. **Margin**: Outer spacing between boxes

box-sizing values:
- content-box (default): Width/height = content size
- border-box: Width/height = content + padding + border

## 4. Syntax

```css
/* Standard sizing */
.element {
  width: 200px;
  padding: 10px;
  border: 5px solid #000;
  margin: 15px;
}

/* Border-box sizing (recommended) */
* {
  box-sizing: border-box;
  /* width includes padding/border */
}
```

## 5. Examples

### Easy
```css
/* Reset default box-sizing */
*, *::before, *::after {
  box-sizing: border-box;
}
```

### Advanced
```css
/* Component sizing */
.card {
  width: 300px;
  padding: 1.5rem;
  border: 1px solid #ddd;
  box-sizing: border-box; /* Total width stays 300px */
  margin: 1rem;
}
```

## 6. Interview Questions

1. Box-sizing: border-box benefits?
2. Margin collapse phenomenon?
3. Width calculation differences?

## 7. Summary

Understanding the CSS Box Model prevents common layout issues.

## 8. References

- [CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model)

---
