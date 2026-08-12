# Semantic HTML

## 1. Definition

**Semantic HTML** uses elements that convey meaning about content structure — improving accessibility, SEO, and code clarity.

## 2. Why do we need it?

Screen readers rely on semantic structure; search engines index meaning.

## 3. Internal Working

Semantic elements define document outline:
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- HTML5 outline algorithm (now deprecated but still relevant)
- Implicit ARIA roles for assistive tech

## 4. Step-by-Step Execution

```html
<!-- Bad -->
<div class="header">
  <div class="nav">...</div>
  <div class="content">...</div>
  <div class="footer">...</div>
</div>

<!-- Good -->
<header>
  <nav>...</nav>
  <main>
    <article>...</article>
  </main>
  <footer>...</footer>
</header>
```

## 5. Syntax

```html
<header>Site header</header>
<nav>Navigation</nav>
<main>Main content</main>
<article>Blog post</article>
<section>Content group</section>
<aside>Complementary content</aside>
<footer>Footer</footer>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Basic page structure -->
<header>
  <h1>Website Title</h1>
</header>
<main>
  <article>
    <h2>Article Title</h2>
    <p>Content...</p>
  </article>
</main>
<footer>
  Copyright 2023
</footer>
```

### Medium
```html
<!-- Blog post with semantic sections -->
<main>
  <article>
    <header>
      <h1>Blog Post Title</h1>
      <p>Published on <time datetime="2023-01-15">Jan 15, 2023</time></p>
    </header>
    
    <section>
      <h2>Introduction</h2>
      <p>Opening paragraph</p>
    </section>
    
    <section>
      <h2>Main Content</h2>
      <figure>
        <img src="chart.png" alt="Sales chart showing growth">
        <figcaption>Sales data visualization</figcaption>
      </figure>
    </section>
    
    <footer>
      <p>Tagged: <a href="/tags/web">Web</a></p>
    </footer>
  </article>
  
  <aside aria-labelledby="comments-heading">
    <h2 id="comments-heading">Comments</h2>
  </aside>
</main>
```

### Advanced
```html
<!-- Complete semantic dashboard -->
<body>
  <header>
    <h1>Dashboard</h1>
    <nav aria-label="breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ol>
    </nav>
  </header>

  <main>
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading">Statistics</h2>
      <article>
        <h3>Revenue</h3>
        <p>$123,456</p>
      </article>
    </section>

    <section>
      <table>
        <caption>Recent Orders</caption>
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12345</th>
            <td><span aria-label="Status: processing">Processing</span></td>
            <td><time datetime="2023-06-15">June 15, 2023</time></td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <aside>
    <section aria-label="Quick actions">
      <button>Quick Action</button>
    </section>
  </aside>

  <footer>
    <p>&copy; 2023 Company Name</p>
  </footer>
</body>
```

## 7. Visual Diagram (ASCII)

```
Semantic HTML Document Outline

<header>
│ Title, site header
│
<nav>
│ Table of contents
│
<main>
│├── <article>
││   ├── <header> Article metadata
││   ├── <section> Article sections
││   └── <footer> Article footer
││
│├── <section>
││   ├── <article> Nested articles
││   └── ...
│
<aside>
│ Complementary/supplementary content
│
<footer>
  Site footer, copyright
```

## 8. Real-world Example

Accessible blog with proper heading hierarchy and landmark regions.

## 9. Angular Use Case

Component templates, accessibility compliance, SEO-optimized content.

## 10. Common Mistakes

❌ Skipping heading levels (h1 → h3)
❌ Using divs where semantics exist

## 11. Edge Cases

1. **Implicit ARIA roles**
   ```html
   <button>Has implicit "button" role
   ```

2. **Heading hierarchy maintenance**

## 12. Performance Considerations

Semantic HTML has zero cost — adds accessibility value.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Semantic vs non-semantic elements?
2. Document outline importance?
3. ARIA vs native semantics?

## 15. Follow-up Questions

- "Audit page semantics?"

## 16. Production Best Practices

1. Start with proper document structure
2. Maintain heading hierarchy
3. Use landmark elements appropriately
4. Validate with accessibility tools
5. Test headings in screen readers

## 17. Summary

Semantic HTML builds accessible, SEO-friendly documents with clear structure.

## 18. Revision Notes

- header/nav/main/aside/footer define regions
- article/section/group related content
- Use proper heading levels (no skipping)
- Implicit ARIA roles enhance accessibility
- table requires caption/thead/tbody/tfoot/scope

## 19. Practice Questions

1. Convert div soup to semantic structure.
2. Verify heading hierarchy.
3. Add ARIA labels where needed.

## 20. References

- [MDN: HTML Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

---

## Module 6 Complete! Now completing remaining modules...
