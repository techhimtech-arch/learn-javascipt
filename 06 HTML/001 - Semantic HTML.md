# Semantic HTML

## 1. Definition

**Semantic HTML** uses elements that convey meaning about content — such as `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.

## 2. Why do we need it?

- Improves accessibility
- Helps SEO
- Enhances readability
- Supports better structure for developers/tools

## 3. Internal Working

Browsers map semantic tags to appropriate ARIA roles implicitly:
- `<header>` → banner
- `<nav>` → navigation
- `<main>` → main content
- `<section>` → region with heading
- `<article>` → article
- `<aside>` → complementary content

HTML parsers convert markup into DOM with these associations.

## 4. Step-by-Step Execution

Example:
```html
<body>
  <header>...</header>
  <main>
    <article>
      <h1>Blog Post</h1>
      <p>Content...</p>
    </article>
  </main>
  <footer>...</footer>
</body>
```

Steps:
1. Parser reads `<header>` → creates element
2. Recognizes implicit ARIA role
3. Builds DOM accordingly
4. Screen readers interpret semantics correctly

## 5. Syntax

```html
<header>...</header>
<nav>...</nav>
<main>...</main>
<section>...</section>
<article>...</article>
<aside>...</aside>
<footer>...</footer>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<h1>Welcome!</h1>
<p>This is a paragraph.</p>
```

### Medium
```html
<section>
  <h2>Products</h2>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</section>
```

### Advanced
```html
<article>
  <header>
    <h1>Understanding HTML Semantics</h1>
    <time datetime="2025-01-01T09:00Z">January 1, 2025</time>
  </header>
  <p>Detailed article content...</p>
  <footer>
    <p>Author: John Doe</p>
  </footer>
</article>
```

## 7. Visual Diagram (ASCII)

```
Semantic Structure Hierarchy

<body>
├─ header
├─ main
│  ├─ article
│  │  ├─ header
│  │  └─ footer
│  └─ section
└─ footer
```

## 8. Real-world Example

Angular component template:
```typescript
@Component({
  selector: 'blog-post',
  template: `
    <article>
      <header>
        <h2>{{ title }}</h2>
        <time [attr.datetime]="publishedAt">{{ publishedAt | date }}</time>
      </header>
      <p>{{ excerpt }}</p>
      <footer>
        <span>Author: {{ author }}</span>
      </footer>
    </article>
  `
})
export class BlogPostComponent {
  @Input() title!: string;
  @Input() excerpt!: string;
  @Input() author!: string;
  @Input() publishedAt!: Date;
}
```

## 9. Angular Use Case

Used extensively in component templates for accessible layouts.

## 10. Common Mistakes

❌ Overusing generic divs instead of semantic equivalents  
❌ Misusing heading levels  
❌ Nesting multiple `<main>` elements per page  

## 11. Edge Cases

1. **Implicit ARIA roles vary by browser**
2. **Sectioning algorithm quirks**
3. **Backward compatibility issues with older HTML4**

## 12. Performance Considerations

Semantic tags carry minimal overhead — improve parsing efficiency slightly due to contextual hints.

## 13. Time & Space Complexity

N/A – markup parsing is linear in document size.

## 14. Interview Questions

1. Benefits of semantic HTML?
2. Difference between `<section>` and `<div>`?
3. How screen readers benefit?

## 15. Follow-up Questions

- "Impact on SEO?"
- "ARIA vs semantic HTML?"

## 16. Production Best Practices

1. Use correct heading hierarchy
2. Wrap repetitive navigation blocks in `<nav>`
3. Group related content with `<section>`
4. Mark independent entries with `<article>`

## 17. Summary

Semantic markup improves accessibility, SEO, and maintainability — fundamental practice in modern frontend development.

## 18. Revision Notes

- Header/nav/main/section/article/aside/footer
- Implicit ARIA mappings
- Single main per document
- Structured headings

## 19. Practice Questions

1. Convert generic divs to semantic equivalents.
2. Improve blog post markup with proper sections.
3. Audit existing page for missing semantics.

## 20. References

- [MDN: HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [W3C Semantic Web Guidelines](https://www.w3.org/TR/html5/sections.html)

### Next File
**002 - Accessibility.md**
