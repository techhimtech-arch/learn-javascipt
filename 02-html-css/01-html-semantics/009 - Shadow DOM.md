# Shadow DOM

## 1. Definition

**Shadow DOM** encapsulates DOM trees and styles — creating isolated scopes within the main document.

Part of Web Components suite alongside Custom Elements and HTML Templates.

## 2. Why do we need it?

Encapsulation:
- Isolate component styles/markup
- Prevent naming conflicts
- Hide internal implementation details

## 3. Internal Working

Creates boundary between host page and component:
1. Shadow root attached to host element
2. Styles inside don't leak out
3. Selectors from host cannot reach inside
4. Events propagate through shadow boundary

## 4. Step-by-Step Execution

Example:
```javascript
const host = document.createElement('div');
const shadow = host.attachShadow({ mode: 'open' });
shadow.innerHTML = `<style>:host { display:block }</style><p>Encapsulated</p>`;
document.body.appendChild(host);
```

Steps:
1. Create host element
2. Attach shadow root
3. Inject isolated content
4. Render as part of document but isolated

## 5. Syntax

```javascript
element.attachShadow({ mode: 'open' | 'closed' });
```

In HTML:
```html
<my-element>
  #shadow-root
    <p>Inside shadow</p>
</my-element>
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const el = document.querySelector('user-card');
const shadow = el.attachShadow({ mode: 'open' });
shadow.innerHTML = `<style>p{color:red}</style><p>Name: ${el.name}</p>`;
```

### Medium
```css
/* Outside */
p { color: blue; }

/* Inside shadow */
<style>
  p { color: red; }
</style>
```

### Advanced
```typescript
@Component({
  selector: 'custom-input',
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <input type="text" placeholder="Username">
    <style>
      input { border: 1px solid gray; padding: 4px; }
    </style>
  `
})
export class CustomInputComponent {}
```

## 7. Visual Diagram (ASCII)

```
Shadow DOM Encapsulation

Host Element
┌─────────────────────┐
│ Regular DOM Content │ ← Outside styles do NOT affect
└─────────────────────┘
│ #shadow-root (closed/open scope)
│ ┌──────────────────┐
│ │ Encapsulated     │ ← Inside styles do NOT leak
│ │ content/styles   │
│ └──────────────────┘
└─────────────────────┘

Boundary prevents cross-contamination
```

## 8. Real-world Example

Angular native custom elements or using `ViewEncapsulation.ShadowDom`.

## 9. Angular Use Case

Component-level CSS scoping, Web Component creation via Angular Elements.

## 10. Common Mistakes

❌ Trying to access shadow from outside (when closed)
❌ Assuming global styles penetrate shadow boundary

## 11. Edge Cases

1. **`:host` selector targeting host element**
2. **Slot distribution mechanism**
3. **Event retargeting behavior**

## 12. Performance Considerations

Shadow boundaries isolate styles, reducing reflows in large apps.

## 13. Time & Space Complexity

Minimal overhead per shadow root.

## 14. Interview Questions

1. Benefits of Shadow DOM?
2. Difference between open/closed mode?
3. Style isolation techniques?

## 15. Follow-up Questions

- "How does Angular emulate Shadow DOM?"
- "What are slots in Shadow DOM?"

## 16. Production Best Practices

1. Prefer open mode for testability
2. Use `:host` and `::slotted()` for styling
3. Combine with custom elements for reusable widgets

## 17. Summary

Enables true component encapsulation — prevents style collision and namespace pollution.

## 18. Revision Notes

- Attached to element
- Open/closed modes differ
- Isolated CSS scope
- Part of Web Components trio

## 19. Practice Questions

1. Create isolated card component.
2. Style shadow content externally.
3. Communicate between host and shadow.

## 20. References

- [MDN: Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

### Module 6 Complete (9 files)
