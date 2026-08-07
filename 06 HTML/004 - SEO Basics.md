# SEO Basics

## 1. Definition

**Search Engine Optimization (SEO)** involves techniques to improve visibility of websites in organic search engine results.

## 2. Why do we need it?

Drives organic traffic, improves credibility, boosts business metrics.

## 3. Internal Working

Search engines crawl/index content using bots, analyze relevance via ranking algorithms, and surface pages based on queries.

Key factors:
- Content quality
- Keyword relevance
- Technical soundness
- Backlinks

## 4. Step-by-Step Execution

Process:
1. Crawling – discovering URLs via links/sitemaps
2. Indexing – parsing content, extracting text/media
3. Ranking – applying algorithms to sort results
4. Serving – delivering relevant snippets

## 5. Syntax

Meta tags:
```html
<title>Page Title</title>
<meta name="description" content="Brief summary">
<link rel="canonical" href="https://example.com/page">
```

Structured data:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post Title"
}
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<title>How to Learn Angular</title>
<meta name="description" content="Step-by-step guide...">
```

### Medium
```html
<h1>The Ultimate Angular Tutorial</h1>
<p>Learn Angular with hands-on examples...</p>
```

### Advanced
```typescript
// Dynamic SEO tags in Angular
@Component({
  selector: 'product-detail',
  template: `
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <!-- More markup -->
  `,
  providers: [{
    provide: Title,
    useValue: 'Product Details | MyApp'
  }]
})
export class ProductDetailComponent {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Client-side SEO updates
      this.title.setTitle(`Buy ${this.product.name}`);
      this.meta.updateTag({ name: 'description', content: this.product.summary });
    }
  }
}
```

## 7. Visual Diagram (ASCII)

```
SEO Influence Factors

Content Quality
    ↓
Keyword Match
    ↓
Technical Performance
    ↓
Backlink Authority
    ↓
Search Engine Results Page (SERP)
```

## 8. Real-world Example

Angular Universal pre-renders pages for SEO-friendly server output.

## 9. Angular Use Case

Meta service for dynamic tag updates, prerendering for static content.

## 10. Common Mistakes

❌ Keyword stuffing
❌ Duplicate content
❌ Slow load times

## 11. Edge Cases

1. **SPA crawlability**
2. **Mobile-first indexing**
3. **Internationalization (`hreflang`)**

## 12. Performance Considerations

Optimize load speed — Core Web Vitals now factor into rankings.

## 13. Time & Space Complexity

N/A – affects external indexing systems.

## 14. Interview Questions

1. Important SEO elements?
2. Client vs server-side rendering for SEO?
3. Schema markup usage?

## 15. Follow-up Questions

- "How does Angular support SSR?"
- "Explain canonical URLs."

## 16. Production Best Practices

1. Write descriptive titles/descriptions
2. Use heading hierarchies correctly
3. Include structured data where appropriate
4. Monitor Lighthouse scores

## 17. Summary

SEO shapes discoverability — combine strong content with technical excellence.

## 18. Revision Notes

- Title/description critical
- Headings structured well
- Schema helps rich results
- Page speed influences ranking

## 19. Practice Questions

1. Improve sample page SEO metadata.
2. Add structured data to blog post.
3. Audit site speed impact on SEO.

## 20. References

- [Google Search Central](https://developers.google.com/search)
- [MDN: SEO](https://developer.mozilla.org/en-US/docs/Glossary/SEO)

### Next File
**005 - Forms.md**
