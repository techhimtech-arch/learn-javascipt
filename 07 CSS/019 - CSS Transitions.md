# CSS Transitions

## 1. Definition

**CSS Transitions** animate style changes between states — creating smooth property interpolation over time.

## 2. Why do we need it?

Visual continuity, interaction feedback, polished UX without JavaScript.

## 3. Internal Working

Four properties required:
- `transition-property`: Properties to animate
- `transition-duration`: Animation length
- `transition-timing-function`: Easing curve
- `transition-delay`: Wait before starting

Browser interpolates values between states automatically.

## 4. Step-by-Step Execution

```css
.button {
  background-color: blue;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
  background-color: darkblue;
}
```

Steps:
1. Initial state rendered
2. Hover triggers state change
3. Browser interpolates intermediate values
4. Smooth transition plays over duration

## 5. Syntax

```css
/* Individual properties */
.element {
  transition-property: background-color, transform;
  transition-duration: 0.3s, 0.5s;
  transition-timing-function: ease, linear;
  transition-delay: 0s, 0.2s;
}

/* Shorthand */
.element {
  transition: all 0.3s ease 0s;
  transition: transform 0.2s ease-in-out 0.1s;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
/* Fade transition */
.box {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.box.hidden {
  opacity: 0;
}
```

### Medium
```css
/* Button with multiple transitions */
.btn {
  background: #007bff;
  transform: scale(1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: 
    background 0.2s ease,
    transform 0.1s ease,
    box-shadow 0.3s ease;
}

.btn:hover {
  background: #0056b3;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}
```

### Advanced
```css
/* Custom easing with cubic-bezier */
.advanced-transition {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Transition with transform matrix */
.complex-animation {
  transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  transition: transform 0.5s cubic-bezier(.25,.8,.25,1);
}
```

## 7. Visual Diagram (ASCII)

```
Transition Lifecycle

Initial State
┌───────────────────────────────┐
│ background: blue              │
│ transform: scale(1)           │
└────────────┬──────────────────┘
             │ Change triggered
             ▼
Final State
┌───────────────────────────────┐
│ background: darkblue          │
│ transform: scale(1.05)        │
└────────────┬──────────────────┘
             │ Browser interpolates
             ▼
Intermediate Frames (60fps)
├─ Frame 1: 10% transition
├─ Frame 2: 20% transition
├─ ...
└─ Frame N: 100% transition
```

## 8. Real-world Example

Dropdown menu animations, form field focus states, card hover effects.

## 9. Angular Use Case

Component state transitions, route animations, form feedback.

## 10. Common Mistakes

❌ Using transition:all without specifying exact properties
❌ Transitioning non-animatable properties

## 11. Edge Cases

1. **Transition end detection**
   ```javascript
   element.addEventListener('transitionend', handler);
   ```

## 12. Performance Considerations

transform/opacity trigger GPU-accelerated composites only.

## 13. Time & Space Complexity

O(1) interpolation per frame.

## 14. Practice Questions

1. Create smooth dropdown menu.
2. Build card flip on hover.
3. Animate form validation states.

## 15. References

- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/)

---
