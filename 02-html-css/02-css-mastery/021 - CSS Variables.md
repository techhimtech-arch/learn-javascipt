# CSS Variables

## 1. Definition

**CSS Custom Properties (Variables)** are user-defined properties holding reusable values — dynamically updated via JavaScript or CSS cascade.

## 2. Why do we need it?

Centralize values, enable theming, avoid repetition, create maintainable styles.

## 3. Internal Working

Cascade behavior:
1. Defined on elements (root scope recommended)
2. Inherited by descendants
3. Resolved at computed value time
4. Updated live (no full repaint)
5. Accessible via var() function

## 4. Step-by-Step Execution

```css
:root {
  --primary-color: #007bff;
  --spacing-unit: 1rem;
}

.component {
  color: var(--primary-color);
  margin: var(--spacing-unit);
}

/* JavaScript update */
document.documentElement.style.setProperty('--primary-color', 'green');
```

## 5. Syntax

```css
/* Declaration */
.element {
  --custom-property: value;
}

/* Usage */
.element {
  property: var(--custom-property);
  property: var(--custom-property, fallback-value);
}

/* Fallback chaining */
color: var(--primary-color, var(--secondary-color, blue));
```

## 6. Examples (Easy → Advanced)

### Easy
```css
/* Basic variable usage */
:root {
  --main-bg: #ffffff;
  --main-text: #333333;
}

body {
  background-color: var(--main-bg);
  color: var(--main-text);
}
```

### Medium
```css
/* Theme switching */
:root[data-theme="light"] {
  --bg: #ffffff;
  --text: #000000;
}

:root[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: #ffffff;
}

.component {
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s;
}
```

### Advanced
```css
/* Responsive variables + calc */
:root {
  --base-font-size: 16px;
  --line-height: 1.5;
  --spacing: calc(var(--base-font-size) * var(--line-height));
  --card-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  :root {
    --base-font-size: 14px;
  }
}

/* Conditional values based on attributes */
.button {
  --button-bg: var(--primary-color);
  background: var(--button-bg);
}

.button--secondary {
  --button-bg: var(--secondary-color);
}
```

## 7. Visual Diagram (ASCII)

```
CSS Variable Cascade

┌─────────────────────┐
│ :root (Global Defaults) │
│ --primary-color: blue   │
└─────────┬───────────────┘
          │ Inherits
          ▼
┌─────────────────────┐
│ .component          │
│ --primary-color: red│
└─────────┬───────────┘
          │ Overrides global
          ▼
┌─────────────────────┐
│ Nested element      │
│ Uses inherited/red  │
└─────────────────────┘
```

## 8. Real-world Example

Themeable design system with dynamic color palettes.

## 9. Angular Use Case

Component theming, dynamic styling, CSS-in-JS integration.

## 10. Common Mistakes

❌ Invalid fallback values
❌ Circular references between variables

## 11. Edge Cases

1. **Conditional variables**: var() inside var()
   ```css
   --computed-size: var(--base-size, 10px);
   ```

## 12. Performance Considerations

Live property updates trigger re-layout/paint.

## 13. Interview Questions

1. Variable cascade behavior?
2. JavaScript integration?
3. Fallback strategies?

## 14. Summary

CSS variables enable dynamic, centralized theming without preprocessors.

## 15. References

- [MDN: CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---
