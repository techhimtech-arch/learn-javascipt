# CSS Animations

## 1. Definition

**CSS Animations** create gradual style transitions using keyframes — enabling complex visual effects declaratively.

## 2. Why do we need it?

Smooth transitions, attention guidance, feedback indicators, interactive enhancements.

## 3. Internal Working

Key components:
- `@keyframes`: Define animation states
- `animation-name`: Link to keyframe
- `animation-duration`: Total duration
- `animation-timing-function`: Easing curve
- `animation-delay`: Start delay
- `animation-iteration-count`: Repeat count
- `animation-direction`: Normal/reverse/alternate
- `animation-fill-mode`: Apply styles before/after

## 4. Step-by-Step Execution

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animated-element {
  animation: slideIn 0.5s ease-in-out 0.2s 1 both;
  /* shorthand: animation: name duration timing-function delay iteration-count direction fill-mode */
}
```

## 5. Syntax

```css
/* Define animation */
@keyframes myAnimation {
  0% { opacity: 0; transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

/* Apply animation */
.element {
  animation-name: myAnimation;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
  animation-delay: 100ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  
  /* Shorthand */
  animation: myAnimation 500ms ease-in-out 100ms infinite alternate forwards;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
/* Simple fade-in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

### Medium
```css
/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
}

.button:hover .pulse-icon {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### Advanced
```css
/* Staggered animation */
@keyframes staggerFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.item {
  opacity: 0;
  transform: translateY(20px);
  animation: staggerFade 0.5s forwards;
}

/* Apply with delays using nth-child */
.item:nth-child(1) { animation-delay: 0.1s; }
.item:nth-child(2) { animation-delay: 0.2s; }
.item:nth-child(3) { animation-delay: 0.3s; }

/* Animation with transform matrices */
@keyframes skewSlide {
  0% {
    transform: translateX(-100%) skewX(-30deg);
  }
  100% {
    transform: translateX(100vw) skewX(-30deg);
  }
}
```

## 7. Visual Diagram (ASCII)

```
Animation Frame Progression

Time →
┌─────────────────────────────────────┐
│ @keyframes myAnim                   │
├─────────────────────────────────────┤
│ 0%    → initial styles              │
│ 25%   → quarter styles              │
│ 50%   → halfway styles              │
│ 75%   → three-quarter styles        │
│ 100%  → final styles                │
├─────────────────────────────────────┤
│ Timing function controls pacing    │
└─────────────────────────────────────┘
```

## 8. Real-world Example

Loading spinner, button hover effects, page transitions.

## 9. Angular Use Case

Component enter/leave animations, route transitions, feedback indicators.

## 10. Common Mistakes

❌ Animating expensive properties (width/height)
❌ Not using transform/opacity optimizations

## 11. Edge Cases

1. **Dynamic animation duration**
   ```css
   animation-duration: calc(var(--speed) * 1s);
   ```

2. **Animation composition layering**

## 12. Performance Considerations

transform/opacity trigger composites only — fastest animations.

## 13. Time & Space Complexity

O(frames) GPU-accelerated rendering.

## 14. Interview Questions

1. Keyframe animation syntax?
2. Performance-critical animation properties?
3. Stagger animation implementation?

## 15. Follow-up Questions

- "Optimize long-running animations?"

## 16. Production Best Practices

1. Use transform/opacity for animations
2. Set will-change for animation targets
3. Debounce rapid animations
4. Provide reduced motion respect
5. Use requestAnimationFrame for JS-linked animations

## 17. Summary

CSS animations provide performant declarative visual transitions.

## 18. Revision Notes

- Keyframes define state progression
- Shorthand combines all properties
- fill-mode controls persistence
- Timing functions affect pacing
- Transform/animations trigger GPU compositing

## 19. Practice Questions

1. Create loading spinner animation.
2. Build staggered list reveal.
3. Implement button state transitions.

## 20. References

- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/)

---
