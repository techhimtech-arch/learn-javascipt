# CSS Backgrounds and Gradients

## 1. Definition

**CSS Backgrounds** control element backgrounds including colors, images, positions, and gradients.

## 2. Why do we need it?

Visual styling beyond solid colors — gradients, patterns, layering.

## 3. Internal Working

Background properties:
- `background-color`
- `background-image`
- `background-position`
- `background-size`
- `background-repeat`
- `background-origin`
- `background-clip`
- `background-attachment`

## 4. Syntax

```css
/* Basic background */
.element {
  background-color: #f0f0f0;
  background-image: url('image.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

/* Gradient backgrounds */
.gradient-box {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  background: radial-gradient(circle, #ff6b6b, #4ecdc4);
}

/* Layered backgrounds */
.multi-layer {
  background-image: 
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('image.jpg');
  background-blend-mode: multiply;
}
```

## 5. Examples

```css
/* Gradient button */
.gradient-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
}

/* Responsive background */
.hero {
  background-image: url('hero.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
```

## 6. Interview Questions

1. Gradient syntax variations?
2. Background clipping?

## 7. Summary

CSS backgrounds enable rich visual presentations with flexible layering.

## 8. References

- [MDN Backgrounds](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_colors)

---
