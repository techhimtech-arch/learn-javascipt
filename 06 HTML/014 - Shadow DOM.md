# Shadow DOM

## 1. Definition

**Shadow DOM** is a scoped DOM tree attached to an element — encapsulating styles and markup from parent document.

## 2. Why do we need it?

Isolate component internals, avoid style conflicts, reuse components safely.

## 3. Internal Working

Three components:
1. **Shadow Host**: Regular DOM element hosting shadow tree
2. **Shadow Tree**: Hidden DOM structure inside shadow root
3. **Shadow Root**: Root of shadow tree (document fragment)
4. **Slots**: Insertion points for light DOM content

## 4. Step-by-Step Execution

```javascript
// Create shadow DOM
const host = document.querySelector('#my-component');
const shadowRoot = host.attachShadow({ mode: 'open' });
```

## 5. Syntax

```javascript
const shadow = host.attachShadow({ mode: 'open' });

// Open vs closed modes
host.attachShadow({ mode: 'open' }); // Accessible via JS
host.attachShadow({ mode: 'closed' }); // No JS access

// Slots for content projection
const template = document.createElement('template');
template.innerHTML = `
  <style>:host { display: block; }</style>
  <slot name="header"></slot>
  <slot></slot>
`;
shadow.appendChild(template.content.cloneNode(true));
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// Simple shadow DOM
const div = document.createElement('div');
const shadow = div.attachShadow({ mode: 'open' });
shadow.innerHTML = `<p>Scoped content</p>`;
document.body.appendChild(div);
```

### Medium
```javascript
// Styled component with slots
const shadow = el.attachShadow({ mode: 'open' });
shadow.innerHTML = `
  <style>
    :host { display: block; padding: 1rem; }
    ::slotted(*) { color: blue; }
    .header { font-weight: bold; }
  </style>
  <div class="header"><slot name="header"></slot></div>
  <slot></slot>
`;
```

### Advanced
```javascript
// Custom element with shadow DOM
class CustomCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    
    shadow.innerHTML = `
      <style>
        :host { display: block; border: 1px solid #ccc; }
        :host([variant="primary"]) { border-color: blue; }
        .content { padding: 1rem; }
      </style>
      <div class="content"><slot></slot></div>
    `;
  }

  static get observedAttributes() {
    return ['variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Handle dynamic changes
  }
}

customElements.define('custom-card', CustomCard);
```

## 7. Visual Diagram (ASCII)

```
Shadow DOM Isolation

Light DOM
┌───────────────────────────────┐
│ <my-element>                  │
│   <h2>Slot Content</h2>       │ ← Projected into <slot>
│ </my-element>                 │
└─────────────┬─────────────────┘
              │ attachShadow()
              ▼
Shadow DOM (Encapsulated)
┌───────────────────────────────┐
│ Shadow Root                   │
│  ├─ <style> Internal styles   │ ← No leakage outside
│  ├─ <div>Private markup</div> │ ← No external CSS
│  └─ <slot>Receives light DOM │
└───────────────────────────────┘
Scoped Styles Only
```

## 8. Real-world Example

Custom web components library, design system components.

## 9. Angular Use Case

ViewEncapsulation.NativeLocal, custom element integration.

## 10. Common Mistakes

❌ Not understanding slot fallback content
❌ CSS selectors not crossing boundary

## 11. Edge Cases

1. **CSS selector scope**
   ```css
   /* Doesn't reach shadow DOM */
   body p { color: red; }
   
   /* Internal only */
   :host p { color: blue; }
   ```

## 12. Performance Considerations

Isolation adds rendering layer — minimize complexity.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Shadow DOM vs Light DOM?
2. Style encapsulation mechanism?
3. Slot fallback implementation?

## 15. Follow-up Questions

- "Communicate between shadow/light?"

## 16. Production Best Practices

1. Use open mode for testability
2. Document component APIs
3. Provide CSS custom properties for theming
4. Test with screen readers
5. Ensure keyboard accessibility

## 17. Summary

Shadow DOM enables true component encapsulation and reusability.

## 18. Revision Notes

- Host → Shadow Tree → Slots
- Styles don't leak out
- CSS doesn't leak in
- Slots enable content projection
- Open mode allows external access

## 19. Practice Questions

1. Create styled tooltip component.
2. Implement themeable card component.
3. Test cross-boundary communication.

## 20. References

- [MDN: Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

---
