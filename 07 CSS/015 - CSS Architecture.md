# CSS Architecture

## 1. Definition

CSS Architecture patterns organize stylesheets for scalability — preventing spaghetti CSS and maintaining consistency at scale.

## 2. Why do we need it?

Large applications suffer from unmaintainable CSS without structure.

## 3. Internal Working

Popular methodologies:
- **BEM** (Block-Element-Modifier): Component-based naming
- **SMACSS** (Scalable and Modular): Categorize rules
- **OOCSS** (Object-Oriented): Separate structure/style/skin
- **ITCSS** (Inverted Triangle): Layer-based organization

## 4. Step-by-Step Execution

BEM naming:
```css
/* Block */
.card {}

/* Element */
.card__title {}
.card__body {}

/* Modifier */
.card--featured {}
.card__title--large {}
```

## 5. Syntax

```scss
// SCSS with BEM
.card {
  padding: 1rem;
  border: 1px solid #ccc;

  &__title {
    font-weight: bold;
    margin-bottom: 0.5rem;

    &--large {
      font-size: 1.5rem;
    }
  }

  &__body {
    font-size: 0.9rem;
  }

  &--featured {
    border-color: gold;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```css
/* BEM block */
.button {
  display: inline-block;
  padding: 0.5rem 1rem;
}

.button__icon {
  margin-right: 0.5rem;
}

.button--primary {
  background: blue;
  color: white;
}
```

### Medium
```css
/* SCSS mixin for responsive components */
@mixin card-style($bg: white, $border: #ddd) {
  background: $bg;
  border: 1px solid $border;
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card {
  @include card-style;
  
  &__header {
    font-weight: bold;
    margin-bottom: 1rem;
  }
}
```

### Advanced
```scss
// ITCSS structure
@import "settings/variables";
@import "tools/mixins";
@import "generic/reset";
@import "elements/base";
@import "objects/card";
@import "utilities/helpers";
```

## 7. Visual Diagram (ASCII)

```
BEM Structure

┌─────────────────────────────────────┐
│ BLOCK (Standalone entity)           │
│ .card                               │
├─────────────────────────────────────┤
├─ ELEMENT (Child of BLOCK)           │
│ .card__title                        │
│ .card__body                         │
├─────────────────────────────────────┤
└─ MODIFIER (Variant/State)           │
   .card--featured                    │
   .card__title--large                │
   .is-loading                        │
└─────────────────────────────────────┘
```

## 8. Real-world Example

Enterprise design system implementing BEM with SCSS inheritance.

## 9. Angular Use Case

Component styling encapsulation, theming, responsive layouts.

## 10. Common Mistakes

❌ Deep nesting beyond 3 levels
❌ Overqualifying selectors

## 11. Edge Cases

1. **Global vs component styles isolation**
2. **CSS custom property scoping**

## 12. Performance Considerations

Efficient selectors reduce style recalculation cost.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. CSS architecture patterns comparison?
2. Selector specificity management?
3. Prevent CSS conflicts?

## 15. Follow-up Questions

- "Manage CSS in large Angular apps?"

## 16. Production Best Practices

1. Adopt consistent naming methodology
2. Limit CSS specificity
3. Use meaningful class names
4. Split large CSS files
5. Lint CSS with stylelint

## 17. Summary

CSS architecture principles prevent maintainable nightmares at scale.

## 18. Revision Notes

- BEM: Block__element--modifier
- Specificity increases left-to-right
- Shallow nesting (<3 levels)
- Meaningful class names over clever ones
- Separate concerns (layout vs component)

## 19. Practice Questions

1. Refactor CSS with BEM naming.
2. Implement responsive components.
3. Configure stylelint rules.

## 20. References

- [BEM Methodology](https://en.bem.github.io/methodology/)
- [CSS Architecture](https://css-tricks.com/bem-101/)

---
