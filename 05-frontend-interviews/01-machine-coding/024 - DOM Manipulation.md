# DOM Manipulation

## 1. Definition

**DOM Manipulation** involves programmatically modifying HTML documents — adding/removing elements, changing attributes/styles, handling events.

## 2. Why do we need it?

Dynamic web pages require runtime content updates based on user interaction.

## 3. Internal Working

Browser parsing:
1. HTML → DOM tree
2. CSS → CSSOM tree
3. DOM + CSSOM = Render tree
4. Layout calculation
5. Paint rasterization
6. Composite layers

Manipulation affects these steps selectively.

## 4. Step-by-Step Execution

Element creation:
```javascript
const div = document.createElement('div');
div.textContent = 'Hello DOM';
document.body.appendChild(div);
```

Steps:
1. Create element via factory method
2. Set desired properties/attributes
3. Attach to document tree
4. Browser schedules reflow/paint

## 5. Syntax

```javascript
// Selecting
document.getElementById('id');
document.querySelector('.class');

// Modifying content
element.textContent = 'text';
element.innerHTML = '<span>HTML</span>';

// Attributes
element.setAttribute('key', 'value');
element.getAttribute('key');

// Styles
element.style.color = 'red';

// Classes
element.classList.add('active');
element.classList.toggle('visible');

// Appending/removing
parent.appendChild(child);
parent.removeChild(child);
element.remove();
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// Toggle element visibility
const toggle = (el) => el.classList.toggle('hidden');
```

### Medium
```javascript
// Dynamic list rendering
function renderList(items, container) {
  container.innerHTML = items.map(item => 
    `<li data-id="${item.id}">${item.name}</li>`
  ).join('');
}
```

### Advanced
```javascript
// Efficient DOM batch update
function batchUpdate(updates) {
  // Single reflow trigger
  requestAnimationFrame(() => {
    const fragment = document.createDocumentFragment();
    
    updates.forEach(({ tag, text }) => {
      const element = document.createElement(tag);
      element.textContent = text;
      fragment.appendChild(element);
    });
    
    document.body.appendChild(fragment);
  });
}
```

## 7. Visual Diagram (ASCII)

```
DOM Manipulation Pipeline

JavaScript ──► DOM Methods ──► Document Tree
                              │
                    ┌─────────┴─────────┐
                    │ Reflow Calculation │
                    │ (layout recomputed)│
                    └─────────┬─────────┘
                              │
                              ▼
                           Render Layers
                              │
                              ▼
                           Browser Screen
```

## 8. Real-world Example

Todo list dynamically adding/removing items.

## 9. Angular Use Case

Custom directives requiring direct DOM access, third-party library integrations.

## 10. Common Mistakes

❌ Causing forced synchronous layout
❌ Inserting untrusted content

## 11. Edge Cases

1. **Event delegation**
2. **Virtual DOM reconciliation**

## 12. Performance Considerations

Batch reads/writes to minimize reflow thrashing.

## 13. Time & Space Complexity

O(nodes modified) per operation.

## 14. Interview Questions

1. Reflow vs repaint difference?
2. Optimize DOM operations?
3. Safe HTML insertion?

## 15. Follow-up Questions

- "Implement virtual scrolling without library?"

## 16. Production Best Practices

1. Batch DOM operations
2. Use CSS transforms for animations
3. Sanitize HTML content before insertion
4. Prefer declarative over imperative approaches

## 17. Summary

DOM manipulation powers dynamic frontend experiences — optimize for performance and safety.

## 18. Revision Notes

- createElement vs innerHTML tradeoffs
- Batch reads/writes separately
- Use requestAnimationFrame for visual updates
- Prefer CSS transitions for animations

## 19. Practice Questions

1. Implement efficient todo list.
2. Batch multiple DOM updates.
3. Prevent XSS in dynamic content.

## 20. References

- [MDN DOM Guide](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

---

## FINAL REPOSITORY SUMMARY
