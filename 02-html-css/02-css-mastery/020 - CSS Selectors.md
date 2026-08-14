# CSS Selectors

## 1. Definition

**CSS Selectors** target HTML elements for styling based on attributes, hierarchy, state, and content.

## 2. Why do we need it?

Precisely select elements without adding excessive classes/IDs.

## 3. Internal Working

Selector categories:
- **Simple**: Element, class, ID
- **Compound**: Multiple simple selectors (div.class)
- **Combinator**: Descendant/child/sibling combinators
- **Pseudo-classes**: State-based (:hover, :nth-child)
- **Pseudo-elements**: Content additions (::before, ::after)
- **Attribute selectors**: Match attributes [attr=value]

## 4. Step-by-Step Execution

Complex selector:
```css
/* Target specific nested element */
nav ul li:nth-child(odd).active > a[href^="https"]:hover::after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  background: red;
}
```

## 5. Syntax

```css
/* Universal */
*

/* Element/type */
p

/* Class */
.my-class

/* ID */
#unique-id

/* Attribute */
[attr]
[attr="value"]
[attr^="prefix"]
[attr$="suffix"]
[attr*="substring"]
[attr~="word"]
[attr|="hyphen"]

/* Pseudo-classes */
:hover
:focus
:nth-child(n)
:nth-of-type(n)
:not(selector)
:is(selector)
:where(selector)

/* Pseudo-elements */
::before
::after
::first-line
::first-letter
::selection

/* Combinators */
/* descendant (space) */
.parent child

/* child (>) */
.parent > child

/* adjacent sibling (+) */
.prev + next

/* general sibling (~) */
.prev ~ siblings
```

## 6. Examples (Easy → Advanced)

### Easy
```css
/* Target all paragraphs */
p { color: blue; }

/* Target specific class */
.highlight { background: yellow; }

/* Target first paragraph */
p:first-child { font-weight: bold; }
```

### Medium
```css
/* Attribute selectors */
input[type="email"] { border: 1px solid blue; }
a[href$=".pdf"] { background-image: url(icon-pdf.svg); }
img[alt=""] { border: 2px solid red; } /* Missing alt text */

/* Nth child patterns */
tr:nth-child(even) { background: #f0f0f0; } /* Zebra striping */
li:nth-child(3n+1) { color: red; } /* Every 3rd item from 1st */
```

### Advanced
```css
/* Complex state-based styling */
.card:focus-within {
  box-shadow: 0 0 0 2px blue;
}

/* Logical pseudo-class with :is */
:is(h1, h2, h3):not(:last-child) {
  margin-bottom: 1rem;
}

/* Pseudo-element with variable content */
.quote::before {
  content: open-quote;
  font-size: 2rem;
  color: gray;
}

.quote::after {
  content: close-quote;
}

/* Sibling combinator for layout */
.sidebar + .main-content {
  margin-left: 250px;
}
```

## 7. Visual Diagram (ASCII)

```
Selector Specificity Hierarchy (Right to Left evaluation)

┌─────────────────────────────────────┐
│ :nth-child(n) Pseudo-classes       │ 000010
├─────────────────────────────────────┤
│ .class Class selectors              │ 000001 each
├─────────────────────────────────────┤
│ #id ID selectors                   │ 000100 each
├─────────────────────────────────────┤
│ <tag> Element selectors            │ 000001 each
└─────────────────────────────────────┘
Style attribute adds most weight

Inline style: 1000000
ID:           001000
Class/Attr/Pseudo-class: 000100
Element/Pseudo-element: 000010
```

## 8. Real-world Example

Styling form validation states with :valid/:invalid/:focus-within.

## 9. Angular Use Case

Component styling, form validation states, dynamic styles.

## 10. Common Mistakes

❌ Overly complex selectors harming performance
❌ Specificity conflicts requiring !important

## 11. Edge Cases

1. **:nth-child formulas**: 2n+1 (odd), 3n (every third)
2. **:has() parent selector**: Limited browser support

## 12. Performance Considerations

Right-to-left evaluation — simpler rightmost selectors first.

## 13. Time & Space Complexity

O(selectors × matching_cost) per style recalculation.

## 14. Interview Questions

1. Specificity calculation method?
2. Performance-friendly selectors?
3. Complex pseudo-class examples?

## 15. Follow-up Questions

- "Implement pure CSS tooltip?"

## 16. Production Best Practices

1. Start selectors with most specific rightmost element
2. Avoid !important
3. Use meaningful class names
4. Prefer classes over deep nesting
5. Test across browser compatibility

## 17. Summary

CSS selectors offer powerful targeting capabilities — specificity and performance matter.

## 18. Revision Notes

- Inline styles override everything
- ID > Class > Element specificity
- :nth-child counts among siblings, :nth-of-type among type
- :not/:is/:where accept selector lists
- Pseudo-elements (::) vs pseudo-classes (:)

## 19. Practice Questions

1. Target every other list item.
2. Select form inputs missing required attributes.
3. Style parent on child focus.

## 20. References

- [MDN CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

---
