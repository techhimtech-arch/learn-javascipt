# CSS Transitions and Animations

## 1. Definition

**CSS Transitions & Animations** create smooth visual state changes — enhancing user experience with polished interactions.

## 2. Why do we need it?

Visual feedback, progressive disclosure, and micro-interactions elevate user perception of quality.

## 3. Internal Working

Transitions:
1. Detect property change
2. Calculate intermediate values
3. Animate over duration with easing

Animations:
1. Match keyframe selector
2. Follow keyframe rules
3. Apply timing function between frames

## 4. Execution

```css
/* Transition: immediate state change */
.button {
  transition: all 0.3s ease; /* Smooth on property change */
}

/* Animation: continuous timeline */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.spinner {
  animation: spin 1s linear infinite; /* Runs continuously */
}
```

## 5. Syntax

```css
/* Transition */
.element {
  transition-property: opacity, transform;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  transition-delay: 100ms;
  /* Shorthand */
  transition: all 0.3s ease-in-out;
}

/* Animation */
@keyframes slideIn {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}
.element {
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  /* Shorthand */
  animation: slideIn 0.5s ease 0s 1 forwards;
}
```

## 6. Examples

### Easy
```css
/* Button hover */
.btn {
  background: #007bff;
  transition: background 0.2s;
}
.btn:hover {
  background: #0056b3;
}
```

### Advanced
```css
/* Staggered animations */
.grid-item {
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}
@for $i from 1 through 10 {
  .grid-item:nth-child(#{$i}) {
    animation-delay: #{$i * 0.1}s;
  }
}
@keyframes fadeIn {
  to { opacity: 1; }
}
```

## 7. Differences Table

| Aspect | Transition | Animation |
|--------|-----------|-----------|
| Trigger | Property change | Runs automatically |
| Control | Limited | Fine-grained |
| Multiple states | Two states only | Multi-step keyframes |

## 8. Interview Questions

1. When choose transition vs animation?
2. Performance considerations?
3. Implement staggered animations?

## 9. Summary

Transitional and keyframe animations provide complementary tools for motion design.

## 10. References

- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/)
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/)

---
