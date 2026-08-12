# Web Components

## 1. Definition

**Web Components** is a suite of APIs enabling reusable, framework-agnostic custom HTML elements using native browser capabilities.

## 2. Why do we need it?

Create encapsulated, reusable components that work anywhere — without framework lock-in.

## 3. Internal Working

Four core APIs:
1. **Custom Elements**: Define new HTML tags
2. **Shadow DOM**: Encapsulate styling/markup
3. **HTML Templates**: Define markup fragments
4. **HTML Imports**: (Deprecated) Module imports

## 4. Step-by-Step Execution

```javascript
// Define custom element
class MyWidget extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<h1>Hello Web Components!</h1>';
  }
}

// Register
customElements.define('my-widget', MyWidget);
```

## 5. Syntax

```javascript
// Custom Element class
class MyComponent extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'data'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `<h1>${this.title}</h1>`;
  }
}

customElements.define('my-component', MyComponent);
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Use custom element -->
<my-widget></my-widget>
```

### Medium
```javascript
// Custom element with properties
class StarRating extends HTMLElement {
  static get properties() {
    return { max: { type: Number }, value: { type: Number } };
  }

  constructor() {
    super();
    this.max = 5;
    this.value = 0;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let stars = '';
    for (let i = 1; i <= this.max; i++) {
      stars += i <= this.value ? '★' : '☆';
    }
    this.innerHTML = `<span>${stars}</span>`;
  }
}
customElements.define('star-rating', StarRating);
```

### Advanced
```javascript
// Complex component with reactive properties
class DataTable extends HTMLElement {
  static get properties() {
    return {
      columns: { type: Array },
      rows: { type: Array },
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.columns = [];
    this.rows = [];
    this.loading = false;
  }

  connectedCallback() {
    this.addEventListener('sort', this.handleSort.bind(this));
    this.render();
  }

  handleSort(event) {
    const { column, direction } = event.detail;
    this.rows.sort((a, b) => {
      const cmp = a[column].localeCompare(b[column]);
      return direction === 'asc' ? cmp : -cmp;
    });
    this.render();
  }

  render() {
    const template = document.getElementById('datatable-template');
    const clone = template.content.cloneNode(true);
    
    // Populate headers
    const headerRow = clone.querySelector('thead tr');
    this.columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col;
      th.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('sort', {
          detail: { column: col, direction: 'asc' }
        }));
      });
      headerRow.appendChild(th);
    });
    
    // Populate rows
    const tbody = clone.querySelector('tbody');
    this.rows.forEach(row => {
      const tr = document.createElement('tr');
      this.columns.forEach(col => {
        const td = document.createElement('td');
        td.textContent = row[col];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define('data-table', DataTable);
```

## 7. Visual Diagram (ASCII)

```
Web Components Ecosystem

┌───────────────────────────────┐
│ Custom Elements API            │
│ - Define new HTML tags         │
│ - Lifecycle callbacks          │
└─────────────┬─────────────────┘
              │
┌───────────────────────────────┐
│ Shadow DOM                     │
│ - Style encapsulation          │
│ - DOM isolation                │
└─────────────┬─────────────────┘
              │
┌───────────────────────────────┐
│ HTML Templates                 │
│ - Reusable markup              │
│ - Declarative structure        │
└─────────────┬─────────────────┘
              │
              ▼
    ┌─────────────────────┐
    │ Framework Usage     │
    │ (Angular/React/etc) │
    └─────────────────────┘
```

## 8. Real-world Example

Design system component library distributed across teams using different frameworks.

## 9. Angular Use Case

Custom element wrappers, progressive enhancement with fallback components.

## 10. Common Mistakes

❌ Not handling attribute vs property syncing
❌ Blocking main thread in callbacks

## 11. Edge Cases

1. **Server-side rendering**
2. **Lazy-defined elements**
   ```javascript
   // Defer definition until needed
   if ('customElements' in window) {
     customElements.define('my-el', MyEl);
   }
   ```

## 12. Performance Considerations

Native performance — no runtime framework overhead.

## 13. Time & Space Complexity

Minimal framework cost.

## 14. Interview Questions

1. Four APIs forming Web Components?
2. Custom element lifecycle callbacks?
3. Shadow DOM style isolation?

## 15. Follow-up Questions

- "Integrate Web Components with Angular?"

## 16. Production Best Practices

1. Define clear public API surface
2. Use TypeScript for type safety
3. Follow semantic naming conventions
4. Test across browsers
5. Document component usage/examples

## 17. Summary

Web Components unlock truly portable, encapsulated UI components built on web standards.

## 18. Revision Notes

- Custom Elements: HTML custom element definitions
- Shadow DOM: Style/DOM encapsulation
- Templates: Inert markup declarations
- Lifecycle: connectedCallback, disconnectedCallback, etc.

## 19. Practice Questions

1. Build counter custom element.
2. Add property reflection.
3. Implement slot-based content projection.

## 20. References

- [Web.dev: Web Components](https://web.dev/custom-elements-v1/)

---
