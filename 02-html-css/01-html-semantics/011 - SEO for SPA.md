# SEO for Frontend Apps

## 1. Definition

**SEO for Frontend Apps** optimizes JavaScript-rendered applications for search engine discoverability and indexing.

## 2. Why do we need it?

Single-page applications often hide content behind JS execution — harming search rankings.

## 3. Internal Working

Search crawler limitations:
1. Crawlers historically didn't execute JS
2. Even modern crawlers time out/failure rates
3. Content rendered via JS may not be indexed

Solutions:
- Static site generation (SSG)
- Server-side rendering (SSR)
- Pre-rendering static routes
- Dynamic rendering for bots

## 4. Step-by-Step Execution

Meta tags setup:
```typescript
@Component({
  template: ''
})
export class ArticleComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('My Article Title');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Brief article summary for search results' 
    });
    // Open Graph tags for social sharing
    this.meta.updateTag({ property: 'og:title', content: 'My Article Title' });
  }
}
```

## 5. Syntax

```typescript
// Meta service usage
this.title.setTitle('Page Title');
this.meta.addTag({ name: 'description', content: 'Page description' });

// Canonical URLs
this.meta.addTag({ property: 'og:url', content: 'https://example.com/canonical-url' });
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Basic meta tags -->
<head>
  <title>My Page Title</title>
  <meta name="description" content="Brief description">
  <meta name="keywords" content="keyword1, keyword2">
  <link rel="canonical" href="https://example.com/page">
</head>
```

### Medium
```typescript
// Dynamic meta tags component
@Component({
  template: ''
})
export class SeoComponent implements OnInit, OnDestroy {
  private originalTitle: string;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.originalTitle = this.titleService.getTitle();
  }

  ngOnInit(): void {
    this.updateMeta();
    // Restore on destroy
  }

  private updateMeta(): void {
    const article = this.route.snapshot.data['article'];
    
    this.titleService.setTitle(`${article.title} | My Blog`);
    this.metaService.updateTag({
      name: 'description',
      content: article.excerpt
    });
    
    // JSON-LD structured data
    this.metaService.addTag({
      property: 'og:image',
      content: article.imageUrl
    });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(this.originalTitle);
  }
}
```

### Advanced
```typescript
// Sitemap generation + structured data
// sitemaps.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/blog/post-1</loc>
    <lastmod>2023-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>

// JSON-LD structured data
@Component({
  template: ''
})
export class JsonLdComponent {
  constructor(private renderer: Renderer2) {}

  addStructuredData(schema: any): void {
    const script = this.renderer.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(schema);
    this.renderer.appendChild(document.head, script);
  }
}
```

## 7. Visual Diagram (ASCII)

```
SPA SEO Challenges & Solutions

┌───────────────────────────────┐
│ Traditional Website           │
│ HTML returned with content    │
│ ──► Crawlers see content       │
└───────────────────────────────┘

┌───────────────────────────────┐
│ SPA (No SEO)                  │
│ HTML shell + JS               │
│ ──► Crawlers see empty        │
└───────────────────────────────┘

┌───────────────────────────────┐
│ SPA + SSG/SSR                 │
│ Pre-rendered HTML             │
│ ──► Crawlers see content       │
└───────────────────────────────┘
```

## 8. Real-world Example

E-commerce product pages with rich meta tags and structured data.

## 9. Angular Use Case

Blog platforms, marketing sites, content-heavy applications.

## 10. Common Mistakes

❌ Missing meta tags for dynamic content
❌ No server-side rendering setup

## 11. Edge Cases

1. **Dynamic route meta generation**
2. **Social media preview rendering**

## 12. Performance Considerations

SSR improves both SEO and performance simultaneously.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. SPA SEO challenges?
2. SSG vs SSR tradeoffs?
3. Structured data importance?

## 15. Follow-up Questions

- "Implement dynamic sitemap?"

## 16. Production Best Practices

1. Use SSR/SSG for content pages
2. Generate dynamic meta tags
3. Submit sitemap.xml to search engines
4. Add structured data (JSON-LD)
5. Test with Google Rich Results Test

## 17. Summary

SEO-aware frontend architecture bridges SPA UX with search discoverability.

## 18. Revision Notes

- Meta tags control search/social appearance
- Canonical URLs prevent duplicate content
- SSR/SSG improves crawlable content
- Structured data enhances search listings
- Sitemap guides crawling

## 19. Practice Questions

1. Add meta tags to dynamic routes.
2. Implement SSR for content pages.
3. Generate sitemap from routes.

## 20. References

- [Google: SEO for SPAs](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Schema.org](https://schema.org/)

---
