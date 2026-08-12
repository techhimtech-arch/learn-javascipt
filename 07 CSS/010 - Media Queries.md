# Media Queries

## 1. Definition

**Media Queries** (MQ) apply CSS conditionally based on device characteristics like viewport size, resolution, orientation, or capabilities.

## 2. Why do we need it?

Deliver tailored styling per device without duplicating markup or relying on server-side sniffing.

## 3. Internal Working

During stylesheet parsing:
1. Evaluate boolean expression against current context
2. If true — include enclosed declarations
3. Recalculate on relevant changes (resize, orientation)

## 4. Step-by-Step Execution

Example:
```css
@media (max-width: 768px) {
  .sidebar { display: none; }
}
```

Steps:
1. Parse `@media` block
2. Evaluate condition: viewport width ≤ 768px?
3. If yes → apply `.sidebar { display: none }`
4. On viewport resize → re-evaluate automatically

## 5. Syntax

```css
@media [media-type] and (condition: value) {
  /* CSS rules */
}

/* Examples */
@media screen and (max-width: 600px) { ... }
@media print { ... }
@media (min-resolution: 2dppx) { ... }
@media (orientation: portrait) { ... }
```

Logical operators supported:
- `and`: combine features
- `not`: negate entire query
- `only`: deprecated legacy fallback
- `,`: comma-separated OR conditions

## 6. Examples (Easy → Advanced)

### Easy
```css
@media (max-width: 600px) {
  body { font-size: 14px; }
}
```

### Medium
```css
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .grid { grid-template-columns: 1fr 1fr; }
}

@media screen and (orientation: landscape) {
  .player { aspect-ratio: 16/9; }
}
```

### Advanced
```css
/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  .logo { background-image: url(logo@2x.png); }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}
```

## 7. Visual Diagram (ASCII)

```
Media Query Evaluation Tree

┌──────────────────────┐
│ Device Characteristics │
│ Width, Orientation, etc│
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ Parse Query Boolean │
│ (e.g., width <= 768px) │
└──────────┬───────────┘
           ▼              Yes
┌──────────────────────┐
│ Apply Enclosed Styles │
└──────────────────────┘
           ▲              No
           ▼
┌──────────────────────┐
│ Skip These Styles   │
└──────────────────────┘
```

## 8. Real-world Example

Angular component with adaptive layout:
```typescript
@Component({
  template: `
    <div [ngClass]="breakpoint()">
      <ng-content></ng-content>
    </div>
  `
})
export class AdaptiveComponent {
  breakpoint(): string {
    return window.innerWidth < 768 ? 'mobile' : 'desktop';
  }
}
```

## 9. Angular Use Case

Flex Layout directives use breakpoints internally (`fxLayoutAlign.xs/sm/...`)

## 10. Common Mistakes

❌ Overlapping conflicting queries  
❌ Not ordering breakpoints logically  
❌ Using device-width instead of viewport width

## 11. Edge Cases

1. **Feature query nesting**
   ```css
   @supports (display: grid) {
     @media (min-width: 800px) {
       .grid { display: grid; }
     }
   }
   ```

2. **Chained conditions**
   ```css
   @media (min-width: 600px) and (orientation: landscape) { ... }
   ```

## 12. Performance Considerations

Minimize nested queries and redundant evaluations — group efficiently.

## 13. Time & Space Complexity

Re-evaluated on viewport change — O(log n) approximate.

## 14. Interview Questions

1. Standard breakpoints list?
2. Difference between device-width and width?
3. Accessibility-related media features?

## 15. Follow-up Questions

- "How do container queries improve media queries?"

## 16. Production Best Practices

1. Define consistent breakpoints globally
2. Group media queries near components
3. Leverage `prefers-color-scheme` for dark mode
4. Include `prefers-reduced-motion`

## 17. Summary

Media queries power responsive behavior — fine-grained control over presentation per environment.

## 18. Revision Notes

- Types: all/screen/print/speech
- Features: width/height/orientation/resolution
- Logical operators: and/not/comma
- Prefer viewport-relative units

## 19. Practice Questions

1. Create dark/light mode toggle.
2. Adapt layout on rotation.
3. Target high-DPI screens specifically.

## 20. References

- [MDN: Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries)
- [CSS Media Features](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_features)

### Next File
**011 - Container Queries.md**
