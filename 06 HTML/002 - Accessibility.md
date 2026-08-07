# Accessibility

## 1. Definition

**Accessibility (a11y)** refers to designing digital experiences that work for everyone — including people with disabilities such as visual, auditory, motor, or cognitive impairments.

## 2. Why do we need it?

Legal compliance, ethical responsibility, broader audience reach, improved UX.

## 3. Internal Working

Assistive technologies (AT) like screen readers rely on:
- Semantic HTML structure
- ARIA attributes
- Keyboard navigability
- Focus indicators
- Text alternatives

Browsers expose accessible names/states via accessibility APIs (AXAPI/UIA/AT-SPI).

## 4. Step-by-Step Execution

Example:
```html
<button aria-label="Close" onclick="close()">×</button>
```

Steps:
1. Browser parses button + aria-label
2. Exposes accessible node with name="Close"
3. Screen reader announces "Close button"

## 5. Syntax

```html
<!-- Semantic roles -->
<button>...</button>
<label for="input">...</label>

<!-- ARIA attributes -->
aria-expanded="true"
aria-hidden="false"
role="navigation"
tabindex="0"

<!-- Alt text -->
<img src="img.jpg" alt="Description">
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<label>Name:<input type="text"></label>
```

### Medium
```html
<button aria-controls="dropdown-menu" aria-expanded="false">Menu</button>
<ul id="dropdown-menu" role="menu">...</ul>
```

### Advanced
```html
<div tabindex="0" role="button" aria-pressed="false"
     onkeydown="if(event.key==='Enter'||event.key===' ') toggle()">
  Toggle Feature
</div>
```

## 7. Visual Diagram (ASCII)

```
Accessibility Tree Integration

DOM Tree ──► Accessibility Tree ──► AT (Screen Reader)
                ↑
            ARIA Annotations
                ↑
         Keyboard Navigation
```

## 8. Real-world Example

Angular CDK provides a11y utilities:
```typescript
import { LiveAnnouncer } from '@angular/cdk/a11y';

constructor(announcer: LiveAnnouncer) {
  announcer.announce('Item added to cart');
}
```

## 9. Angular Use Case

Built-in directives like `aria-*`, focus management tools (`FocusMonitor`) from CDK.

## 10. Common Mistakes

❌ Missing alt text
❌ Poor color contrast
❌ Non-keyboard operable components

## 11. Edge Cases

1. **ARIA overrides native semantics**
   ```html
   <div role="button">Fake Button</div> <!-- Less accessible than <button> -->
   ```

2. **Dynamic content announcements**
3. **Modal dialogs requiring trap focus**

## 12. Performance Considerations

Overuse of ARIA can degrade performance — prefer native HTML.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. What are ARIA roles?
2. How to make custom component accessible?
3. WCAG compliance basics?

## 15. Follow-up Questions

- "Difference between role=none and hidden?"
- "How to test accessibility?"

## 16. Production Best Practices

1. Start with semantic HTML
2. Add ARIA only when necessary
3. Ensure keyboard operability
4. Test with real assistive tech

## 17. Summary

Accessibility ensures inclusive experiences — everyone deserves equal access.

## 18. Revision Notes

- Prefer semantic over ARIA
- Label everything
- Keyboard navigable
- Test manually

## 19. Practice Questions

1. Audit sample page for a11y gaps.
2. Fix common accessibility issues.
3. Build accessible modal dialog.

## 20. References

- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WAVE Evaluation Tool](https://wave.webaim.org/)

### Next File
**003 - ARIA.md**
