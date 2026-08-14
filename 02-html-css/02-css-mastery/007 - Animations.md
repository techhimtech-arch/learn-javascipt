# Animations

## 1. Definition

CSS **Animations** enable complex timed transitions using keyframes — defining intermediate states over duration controlled by easing/timing functions.

## 2. Why do we need it?

Add polish, feedback, motion design to interfaces beyond what transitions offer.

## 3. Internal Working

Browser interpolates values between `@keyframes` defined states:
1. Triggers animation start
2. Calculates timing curve
3. Requests animation frames
4. Renders intermediate frames

Prefer compositor properties (`transform`, `opacity`) for smooth performance.

## 4. Step-by-Step Execution

Example:
```css
@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.box {
  animation: slideIn 0.5s ease-out forwards;
}
```

Steps:
1. Apply `animation` shorthand to `.box`
2. Define keyframes `slideIn`
3. Animate from initial → final over 0.5s
4. Ease-out timing gives natural slowdown
5. `forwards` retains final state

## 5. Syntax

```css
selector {
  animation-name: keyframe-name;
  animation-duration: time;
  animation-timing-function: ease|linear|...
  animation-delay: time;
  animation-iteration-count: infinite|number;
  animation-direction: normal|reverse|alternate;
  animation-fill-mode: none|forwards|backwards|both;
  animation-play-state: running|paused;
}
```

Shorthand:
```css
animation: name duration timing-function delay iteration direction fill play-state;
```

## 6. Examples (Easy → Advanced)

### Easy
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.pulse {
  animation: pulse 2s infinite;
}
```

### Medium
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.bounce {
  animation: bounce 1s ease infinite;
}
```

### Advanced
```css
@keyframes wave {
  0% { background-position-x: 0; }
  100% { background-position-x: 1000px; }
}

.water-wave {
  background: url(wave.png) repeat-x;
  animation: wave 10s linear infinite;
}
```

## 7. Visual Diagram (ASCII)

```
Animation Timeline

Time →
┌────┬────┬────┬────┬────┐
│  0%│ 25%│ 50%│ 75%│100%│
├────┼────┼────┼────┼────┤
│Start → Mid → End
```

## 8. Real-world Example

Angular router animation:
```typescript
trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('300ms ease-out', style({ transform: 'translateX(0)' }))
  ])
])
```

## 9. Angular Use Case

Route transitions, component entry/exit effects, loading indicators.

## 10. Common Mistakes

❌ Using non-performant properties (width/height)  
❌ Triggering layout thrashing during animation loop

## 11. Edge Cases

1. **Pausing/resuming**
   ```css
   .pause { animation-play-state: paused; }
   ```

2. **Fill mode behavior**
   ```css
   .linger { animation-fill-mode: forwards; } /* Keeps final state */
   ```

3. **Infinite looping**
   ```css
   .loop { animation-iteration-count: infinite; }
   ```

## 12. Performance Considerations

Limit simultaneously running animations — prefer transform/opacity.

## 13. Time & Space Complexity

O(k) where k = keyframes count.

## 14. Interview Questions

1. Performant animation properties?
2. Difference between animation and transition?
3. How to pause/resume animations?

## 15. Follow-up Questions

- "Explain requestAnimationFrame relationship?"

## 16. Production Best Practices

1. Use GPU-accelerated transforms
2. Keep durations under 300ms for UX
3. Disable animations on reduced-motion preference
4. Test on low-end devices

## 17. Summary

Animations bring life to interfaces — balancing aesthetics and performance is crucial.

## 18. Revision Notes

- Keyframes define animation stages
- Properties: name, duration, timing, delay, iterations
- Transform/opacity preferred
- Respect prefers-reduced-motion

## 19. Practice Questions

1. Create spin loader.
2. Slide-in sidebar menu.
3. Morphing button effect.

## 20. References

- [MDN: Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations)
- [CSS Tricks: Animation](https://css-tricks.com/almanac/animations/)

### Next File
**008 - Transitions.md**
