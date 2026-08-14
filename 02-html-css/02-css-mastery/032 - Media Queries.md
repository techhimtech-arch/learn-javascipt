# CSS Media Queries

## 1. Definition

**CSS Media Queries** apply styles conditionally based on device characteristics.

## 2. Why do we need it?

Responsive design adapts layouts for screens, devices, orientations.

## 3. Internal Working

Query features:
- Width/height (viewport dimensions)
- Orientation (portrait/landscape)
- Resolution (pixel density)
- Device-width (physical screen)

## 4. Syntax

```css
/* Width-based queries */
@media (max-width: 768px) {
  .container { max-width: 100%; }
}

/* Orientation */
@media (orientation: portrait) {
  .sidebar { display: none; }
}

/* High DPI screens */
@media (-webkit-min-device-pixel-ratio: 2) {
  .logo { background-image: url('logo@2x.png'); }
}

/* Combined queries */
@media (min-width: 768px) and (orientation: landscape) {
  /* Tablet landscape */
}
```

## 5. Examples

### Easy
```css
/* Mobile-first approach */
.container { width: 100%; }

@media (min-width: 768px) {
  .container { max-width: 750px; margin: 0 auto; }
}

@media (min-width: 992px) {
  .container { max-width: 960px; }
}
```

### Advanced
```scss
// SCSS mixins for breakpoints
$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

@mixin respond-to($size) {
  @media (min-width: map-get($breakpoints, $size)) {
    @content;
  }
}

.sidebar {
  display: none;

  @include respond-to(md) {
    display: block;
  }
}
```

## 6. Interview Questions

1. Mobile-first vs desktop-first?
2. Media query ordering?

## 7. Summary

Media queries are foundational for responsive web design.

## 8. References

- [MDN: Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries)

---
