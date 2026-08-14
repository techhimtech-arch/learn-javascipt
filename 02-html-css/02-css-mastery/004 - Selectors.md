# Selectors

## 1. Definition

CSS **selectors** identify which HTML elements to style — from simple tag/class selectors to complex pseudo-selectors and combinators.

## 2. Why do we need it?

Target specific elements without adding extra classes or IDs — improves maintainability and reduces markup bloat.

## 3. Internal Working

Browser matches selectors left-to-right against DOM nodes — most specific matches win (specificity rules apply).

Matching performance optimized by browser engines like Blink/EdgeHTML.

## 4. Step-by-Step Execution

Example:
```css
/* Tag selector */
p { color: red; }

/* Class selector */
.highlight { background: yellow; }

/* ID selector */
#header { font-size: 2rem; }

/* Attribute selector */
input[type="email"] { border: 1px solid blue; }

/* Pseudo-class */
a:hover { text-decoration: underline; }

/* Pseudo-element */
p::first-line { font-weight: bold; }
```

Steps:
1. Parse entire stylesheet
2. Group rules by selector specificity
3. During render, match elements from right-to-left
4. Apply highest specificity matching rule

## 5. Syntax

```css
/* Basic selectors */
element {}     /* tag */
.class {}      /* class */
#id {}         /* id */
[attr] {}      /* attribute */

/* Combinators */
A B {}         /* descendant */
A > B {}       /* direct child */
A + B {}       /* adjacent sibling */
A ~ B {}       /* general sibling */

/* Pseudo-classes */
:hover, :focus, :active, :visited
:nth-child(n), :first-child, :last-child

/* Pseudo-elements */
::before, ::after, ::selection, ::placeholder
```

## 6. Examples (Easy → Advanced)

### Easy
```css
.error { color: red; }
```

### Medium
```css
/* Style every other row differently */
tr:nth-child(even) { background: #eee; }

/* First paragraph larger */
p:first-child { font-size: 1.2em; }
```

### Advanced
```css
/* Complex attribute matching */
input[type="text"]:not(.disabled):focus + label[for="email"]::after {
  content: '(required)';
  color: orange;
}
```

## 7. Visual Diagram (ASCII)

```
Selector Specificity Calculation

Inline style  : 1000 (highest priority)
ID (#)        : 100
Class (.)     : 10
Tag (<>)       : 1
Universal (*) : 0

Example:
div#main.content p:hover → 100 + 10 + 1 + 10 = 121
```

## 8. Real-world Example

Angular component styling with encapsulation:
```scss
:host ::ng-deep .child-class {
  color: blue;
}
```

## 9. Angular Use Case

Targeting elements within components, deep selectors with `::ng-deep`.

## 10. Common Mistakes

❌ Overly complex selectors reducing performance  
❌ Not understanding specificity hierarchy

## 11. Edge Cases

1. **`:not()` doesn't increase specificity**
   ```css
   :not(#main) { /* Same specificity as #main */ }
   ```

2. **Chaining increases specificity**
   ```css
   .a.b.c {} /* Specificity = 30 */
   ```

## 12. Performance Considerations

Rightmost selector determines match speed — keep it simple.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Explain CSS specificity calculation.
2. Difference between :nth-child and :nth-of-type?
3. Performance tips for selectors?

## 15. Follow-up Questions

- "How to override high-specificity rules?"

## 16. Production Best Practices

1. Prefer classes over IDs/tags for maintainability
2. Avoid overly specific selectors
3. Use naming conventions (BEM)
4. Keep selector chains shallow

## 17. Summary

Selectors unlock targeted styling — mastering them improves both precision and performance.

## 18. Revision Notes

- Specificity order: Inline > ID > Class > Tag
- Rightmost selector impacts performance
- Pseudo-classes vs pseudo-elements (` `::)
- Combinators define relationship patterns

## 19. Practice Questions

1. Increase specificity without !important.
2. Target first/last list items.
3. Style adjacent sibling based on input state.

## 20. References

- [MDN: Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

### Next File
**005 - Specificity.md**
