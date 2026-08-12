# CSS Specificity

## 1. Definition

**CSS Specificity** determines which styles apply when multiple selectors match — ranking conflicts based on selector type weights.

## 2. Why do we need it?

Resolve conflicting style declarations without !important hacks.

## 3. Internal Working

Specificity value formula:
- Inline styles: 1000 (always wins)
- ID selectors: 100 each
- Classes, attributes, pseudo-classes: 10 each
- Elements, pseudo-elements: 1 each

Example: `#header .nav li.active span`
Specificity: (1, 2, 2, 1) → 1×100 + 2×10 + 2×1 = 123

## 4. Step-by-Step Execution

Browser resolution:
1. Collect all matching selectors
2. Calculate specificity for each
3. Highest specificity wins
4. Later declarations break ties
5. Inline beats all (except !important)

## 5. Syntax

CSS priority order (lowest to highest):
1. Element/type selectors
2. Class/attribute/pseudo-class selectors
3. ID selectors
4. Inline styles
5. !important (overrides everything)

## 6. Examples

### Easy
```css
/* These have same specificity - later wins */
p { color: blue; }
p { color: red; } /* Red applies */
```

### Medium
```css
/* Class beats element */
.item { color: blue; } /* Wins */
ul li { color: red; }
```

### Advanced
```css
/* Avoiding high specificity */
/* Bad */
.header .nav ul li.item.active a:hover span::after { }

/* Good */
.nav-link--active { }
```

## 7. Best Practices

1. Keep specificity low (start with classes)
2. Avoid !important
3. Use naming conventions to prevent conflicts
4. Namespace components

## 8. Interview Questions

1. Calculate specificity values?
2. Manage !important usage?
3. Prevent specificity wars?

## 9. Summary

Lower specificity styles are easier to override later.

## 10. References

- [MDN Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)

---
