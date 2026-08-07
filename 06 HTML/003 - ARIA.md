# ARIA

## 1. Definition

**Accessible Rich Internet Applications (ARIA)** is a set of HTML attributes that enhance accessibility by defining states, properties, and roles not available in native HTML.

## 2. Why do we need it?

To bridge gaps where semantic HTML falls short — especially for rich interactive widgets like tabs, accordions, sliders.

## 3. Internal Working

ARIA attributes translate into accessibility tree nodes interpreted by screen readers:
- `role` defines element purpose
- `aria-*` exposes dynamic states/relationships

Doesn't change visual appearance but affects assistive tech.

## 4. Step-by-Step Execution

Example:
```html
<div role="slider" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
```

Steps:
1. Parser encounters role/slider ARIA
2. Maps to accessibility role
3. Exposes value range via properties
4. Screen reader announces appropriately

## 5. Syntax

```html
role="button|navigation|dialog|..."
aria-label="..."
aria-describedby="..."
aria-hidden="true|false"
aria-expanded="true|false"
aria-live="polite|assertive|off"
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<button aria-label="Close" onclick="...">×</button>
```

### Medium
```html
<h2 aria-controls="accordion-body" aria-expanded="false">Section Title</h2>
<div id="accordion-body" hidden>...</div>
```

### Advanced
```html
<ul role="tablist">
  <li role="tab" aria-selected="true" aria-controls="panel1">Tab A</li>
  <li role="tabpanel" id="panel1" role="region">Content A</li>
</ul>
```

## 7. Visual Diagram (ASCII)

```
ARIA Integration Layer

DOM Node
    │
    ▼
ARIA Attributes (role, aria-*)
    │
    ▼
Accessibility Tree Node
    │
    ▼
Screen Reader interprets
```

## 8. Real-world Example

Angular Material components rely heavily on ARIA patterns for keyboard navigation and screen reader support.

## 9. Angular Use Case

Used in CDK Overlay, Menu, Dialog, Tab components.

## 10. Common Mistakes

❌ Overriding native semantics unintentionally
❌ Incomplete ARIA relationship setup
❌ Ignoring keyboard interaction

## 11. Edge Cases

1. **Roles don't add functionality**
   ```html
   <div role="button">Not clickable without JS</div>
   ```

2. **Misuse of aria-hidden**
3. **Incorrect live region usage**

## 12. Performance Considerations

Minimal overhead — but excessive ARIA degrades usability.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Common ARIA roles?
2. When to avoid ARIA?
3. How aria-live works?

## 15. Follow-up Questions

- "Explain ARIA design patterns."
- "How does screen reader handle roles?"

## 16. Production Best Practices

1. Use native HTML whenever possible
2. Follow WAI-ARIA Authoring Practices Guide (APG)
3. Test with NVDA/JAWS/VoiceOver
4. Keep ARIA updated with UI state changes

## 17. Summary

ARIA extends semantic reach — powerful when used properly, harmful when misused.

## 18. Revision Notes

- Enhances accessibility tree
- Role + state/props required
- Prefer HTML over ARIA
- Test with AT tools

## 19. Practice Questions

1. Convert div-based dropdown to accessible menu.
2. Implement tooltip with ARIA.
3. Build tab interface with full ARIA support.

## 20. References

- [MDN: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [W3C ARIA Specification](https://www.w3.org/TR/wai-aria/)

### Next File
**004 - SEO Basics.md**
