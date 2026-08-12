# CSS Transforms

## 1. Definition

**CSS Transforms** apply geometric transformations to elements.

## 2. Why do we need it?

Visual effects without affecting document flow.

## 3. Internal Working

Transform functions:
- 2D: translate(), scale(), rotate(), skew()
- 3D: translate3d(), scale3d(), rotateX/Y/Z(), perspective()

## 4. Syntax

```css
/* 2D transforms */
.element {
  transform: translateX(100px) scale(1.2) rotate(45deg);
}

/* 3D transforms */
.element {
  transform: translate3d(100px, 0, 0) rotateY(45deg);
  perspective: 1000px; /* For 3D context */
}

/* Multiple transforms */
.element {
  transform: translate(-50%, -50%) rotate(45deg);
  transform-origin: center;
}
```

## 5. Examples

```css
/* Center element */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 3D flip card */
.card {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}
.card:hover {
  transform: rotateY(180deg);
}
```

## 6. Interview Questions

1. Transform vs transition?
2. 3D acceleration benefits?

## 7. Summary

Transforms enable performant geometric modifications via GPU acceleration.

## 8. References

- [CSS Transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

---
