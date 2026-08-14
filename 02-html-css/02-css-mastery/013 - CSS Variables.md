# CSS Variables

## 1. Definition

**CSS Custom Properties** (CSS variables) store reusable values accessible throughout the stylesheet — referenced via `var(--variable-name)`.

## 2. Why do we need it?

Avoid repetition, enable runtime theme switching, reduce payload through centralization.

## 3. Internal Working

1. Declared with `--` prefix (`--main-color`)
2. Scoped to element where declared (inherits downward)
3. Accessed using `var(--main-color)`
4. Resolved at computed-value time during rendering

## 4. Step-by-Step Execution

Example:
```css
:root {
  --primary-color: blue;
  --transition-speed: 0.3s;
}

.button {
  background: var(--primary-color);
  transition: all var(--transition-speed) ease;
}
```

Steps:
1. `:root` declares variables globally
2. `.button` references them via `var()`
3. Changes cascade dynamically at runtime
4. Updates cascade instantly without recompiling

## 5. Syntax

```css
/* Declare */
--variable-name: value;

/* Access */
property: var(--variable-name, fallback);

/* Root/global scope */
:root { --theme-color: red; }

/* Local/component scope */
.card { --card-padding: 1rem; }
```

## 6. Examples (Easy → Advanced)

### Easy
```css
:root {
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
}

p { margin-bottom: var(--spacing-md); }
```

### Medium
```css
.theme-light {
  --bg-color: white;
  --text-color: black;
}

.theme-dark {
  --bg-color: black;
  --text-color: white;
}

body {
  background: var(--bg-color);
  color: var(--text-color);
}
```

### Advanced
```typescript
// Angular theme switching
@Component({...})
export class ThemeService {
  private currentTheme = new BehaviorSubject<'light' | 'dark'>('light');

  toggleTheme(): void {
    const next = this.currentTheme.value === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('theme-dark', next === 'dark');
    this.currentTheme.next(next);
  }
}
```

## 7. Visual Diagram (ASCII)

```
CSS Variable Inheritance

┌──────────────┐
│ :root        │ ← Global scope
│ --main-color │
└─────┬────────┘
      ▼
┌─────▼────────┐
│ .header      │ ← Inherits --main-color
└─────┬────────┘
      ▼
┌─────▼────────┐
│ .button      │ ← Also inherits same variable
└──────────────┘
```

## 8. Real-world Example

Angular Material theming with CSS variables:
```scss
:root {
  --mat-primary: #1976d2;
  --mat-accent: #ff4081;
}
```

## 9. Angular Use Case

Dynamic theming, design token systems, component configuration.

## 10. Common Mistakes

❌ Typo in variable names (silent failure)  
❌ Not providing fallbacks for dynamic values

## 11. Edge Cases

1. **Undefined variables**
   ```css
   /* Falls back to initial value of property */
   color: var(--undefined-var, blue); /* blue */
   ```

2. **Runtime calculation**
   ```css
   .box { width: calc(var(--base-width) * 2); }
   ```

3. **JavaScript manipulation**
   ```javascript
   document.documentElement.style.setProperty('--font-size', '18px');
   ```

## 12. Performance Considerations

Few variables don’t impact performance — but thousands might cause style recalculations.

## 13. Time & Space Complexity

Resolved once per element/style recalculation phase.

## 14. Interview Questions

1. How do CSS variables differ from preprocessor vars?
2. Scoping rules?
3. Dynamic updates via JS?

## 15. Follow-up Questions

- "What happens if variable isn't defined?"

## 16. Production Best Practices

1. Define global tokens in `:root`
2. Name semantically (`--color-text-primary`)
3. Provide sensible fallbacks
4. Leverage inheritance carefully

## 17. Summary

CSS variables empower flexible, dynamic styling — replacing static preprocessor values with live capabilities.

## 18. Revision Notes

- `--` prefix indicates custom property
- Inherited downward unless scoped otherwise
- `var()` resolves values lazily
- Runtime-changeable via JS

## 19. Practice Questions

1. Create theme-switching toggle.
2. Replace hardcoded colors with variables.
3. Animate using variable-driven transitions.

## 20. References

- [MDN: CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Custom Properties Spec](https://www.w3.org/TR/css-variables/)

### Module 7 Complete (13 files)
