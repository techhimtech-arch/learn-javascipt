# CSS Transitions In Depth

## 1. Definition

**CSS Transitions** animate property changes between two states over specified duration.

## 2. Why do we need it?

Smooth visual feedback enhances user experience over abrupt changes.

## 3. Internal Working

Transition properties:
- `transition-property`: Which properties to transition
- `transition-duration`: Time for completion
- `transition-timing-function`: Easing curve
- `transition-delay`: Start delay

## 4. Syntax

```css
.element {
  transition: all 0.3s ease-in-out;
  /* Or specify individually */
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0.1s;
}
```

## 5. Examples

```css
/* Basic hover effect */
.button {
  background: blue;
  transition: background 0.2s ease;
}
.button:hover {
  background: darkblue;
}

/* Transform transition */
.card {
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(.25,.8,.25,1);
}
.card:hover {
  transform: translateY(-5px);
}
```

## 6. Interview Questions

1. Which properties perform best in transitions?
2. cubic-bezier timing control?
3. Transition end detection?

## 7. Summary

Transitions animate between defined states smoothly via CSS.

---
