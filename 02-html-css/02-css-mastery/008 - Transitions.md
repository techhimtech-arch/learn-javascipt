# Transitions

## 1. Definition

CSS **Transitions** smoothly interpolate property values between states — triggered automatically on state change (hover, class toggle).

## 2. Why do we need it?

Add subtle micro-interactions enhancing usability without heavy JavaScript animation libraries.

## 3. Internal Working

Browser computes start/end states, splits change into discrete frames over specified duration.

Works only with animatable properties (e.g., transform, opacity) — triggers composite/redraw layers appropriately.

## 4. Step-by-Step Execution

Example:
```css
.button {
  background: blue;
  transition: background-color 0.3s ease;
}

.button:hover {
  background: red;
}
```

Steps:
1. Initial state: blue background
2. Hover triggers end-state red
3. Browser interpolates color steps over 0.3s
4. Easing adjusts pace ('ease' = slow-fast-slow)

## 5. Syntax

```css
selector {
  transition-property: propertyName(s);
  transition-duration: time;
  transition-timing-function: ease|linear|...
  transition-delay: time;
}

/* Shorthand */
transition: property duration timing-function delay;
```

## 6. Examples (Easy → Advanced)

### Easy
```css
.smooth-change {
  transition: opacity 0.2s ease;
}
.smooth-change:hover {
  opacity: 0.5;
}
```

### Medium
```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}
```

### Advanced
```css
.toggle-switch {
  transition: background-color 0.2s ease-in-out,
              transform 0.2s ease-in-out;
}

.toggle-switch.checked {
  background-color: #4CAF50;
  transform: scale(1.1);
}
```

## 7. Visual Diagram (ASCII)

```
Transition Curve Visualization

Easing Functions:
ease     : Slow start → Fast middle → Slow end
linear   : Constant speed
ease-in  : Slow start, accelerating end
ease-out : Fast start, decelerating end
```

## 8. Real-world Example

Angular button hover effect:
```scss
.app-button {
  @include transition(all 0.2s ease);
  &:hover {
    @include transform(scale(1.05));
  }
}
```

## 9. Angular Use Case

Component state animations, interactive feedback, form field focus states.

## 10. Common Mistakes

❌ Transitioning non-supported properties (e.g., display)  
❌ Forgetting to define start state

## 11. Edge Cases

1. **Transitioning all properties**
   ```css
   transition: all 0.3s ease; /* May cause unexpected transitions */
   ```

2. **Staggered transitions**
   ```css
   .item:nth-child(1) { transition-delay: 0.1s; }
   .item:nth-child(2) { transition-delay: 0.2s; }
   ```

## 12. Performance Considerations

Transition transform/opacity for best performance; avoid layout-triggering props.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Which CSS properties trigger repaints?
2. How to optimize transition performance?
3. Difference between transition and animation?

## 15. Follow-up Questions

- "When would you choose JS animation over CSS?"

## 16. Production Best Practices

1. Explicitly list animating properties
2. Keep durations short (< 300ms)
3. Use easing wisely for perceived performance
4. Test on different hardware

## 17. Summary

Transitions offer lightweight interactivity — ideal for simple state-based visual feedback.

## 18. Revision Notes

- Only interpolates discrete states
- Triggered on property change
- Prefer transform/opacity
- Avoid transitioning display/visibility

## 19. Practice Questions

1. Smooth expand/collapse panel.
2. Button press-down effect.
3. Fade-in tooltip on hover.

## 20. References

- [MDN: Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions)

### Next File
**009 - Responsive Design.md**
