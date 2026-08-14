# SSR with Angular Universal

## 1. Definition

**Angular Universal** brings server-side rendering (SSR) to Angular — rendering initial pages on server before sending to browser.

## 2. Why do we need it?

Improve first-contentful paint, enable SEO crawling, enhance perceived performance.

## 3. Internal Working

1. Server renders HTML snapshot on first request
2. Sends minimal CSS/JS to bootstrap client
3. Client takes over after hydration
4. Subsequent navigations handled by router

## 4. Step-by-Step Execution

Setup:
```bash
ng add @nguniversal/express-engine
```

Flow:
1. Request arrives at server
2. Angular renders component to HTML string
3. Injects into HTML template
4. Sends response to browser
5. Browser downloads JS bundle
6. Client hydrates (assumes DOM matches)

## 5. Syntax

```typescript
// server.ts
app.get('*all', async (req, res) => {
  const { AppServerModule } = await import('./src/main.server');
  const app = express();
  app.engine('html', renderModule);
});

// Component checks for browser-only
constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  if (isPlatformBrowser(platformId)) {
    // Client-only code (localStorage, window, etc.)
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Guard browser-only APIs
@Component({
  template: `<p>{{ greeting }}</p>`
})
export class WelcomeComponent implements OnInit {
  greeting = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.greeting = `Welcome ${localStorage.getItem('name') || 'Guest'}`;
    } else {
      this.greeting = 'Welcome Guest';
    }
  }
}
```

### Medium
```typescript
// Meta tags for SEO/social sharing
@Component({
  template: `<article>{{ article.title }}</article>`
})
export class ArticleComponent implements OnInit {
  @Input() article!: Article;
  
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle(this.article.title);
    this.meta.updateTag({ name: 'description', content: this.article.excerpt });
  }
}
```

### Advanced
```typescript
// Transfer state to avoid duplicate requests
@Component({
  template: `<ul><li *ngFor="let item of items">{{ item.name }}</li></ul>`
})
export class ProductListComponent implements OnInit {
  items: Product[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    private http: HttpClient
  ) {
    const KEY = makeStateKey<Product[]>('products');
    
    if (isPlatformServer(this.platformId)) {
      this.http.get<Product[]>('/api/products').subscribe(data => {
        this.transferState.set(KEY, data);
        this.items = data;
      });
    } else {
      this.items = this.transferState.get(KEY, []);
      this.transferState.remove(KEY);
    }
  }
}
```

## 7. Visual Diagram (ASCII)

```
Universal SSR Flow

Request ──► Server
              │
              ▼
        Pre-render HTML
              │
              ▼
        Send HTML + JS chunks ──► Browser
              │                    │
              ▼                    ▼
        Bootstrap              Hydration
```

## 8. Real-world Example

News site pre-rendering articles for SEO crawlers.

## 9. Angular Use Case

Public-facing websites requiring fast initial load and SEO.

## 10. Common Mistakes

❌ Accessing browser APIs during SSR
❌ Not transferring server-fetched data

## 11. Edge Cases

1. **Third-party scripts expecting window/document**
2. **Cookie/session handling**
3. **Caching strategies**

## 12. Performance Considerations

Critical rendering path optimization pays dividends.

## 13. Time & Space Complexity

Server cost per request proportional to render complexity.

## 14. Interview Questions

1. Benefits of SSR?
2. Hydration process?
3. Platform checks necessity?

## 15. Follow-up Questions

- "How to handle browser-only libraries?"

## 16. Production Best Practices

1. Guard browser APIs with isPlatformBrowser
2. Transfer pre-fetched data via TransferState
3. Pre-render static routes
4. Cache rendered responses
5. Monitor server resource usage

## 17. Summary

Angular Universal bridges client/server experiences — enabling fast loads and better discoverability.

## 18. Revision Notes

- PLATFORM_ID checks required for DOM access
- TransferState avoids redundant fetches
- Hydration assumes isomorphic consistency
- Pre-rendering suits static content

## 19. Practice Questions

1. Set up basic Universal setup.
2. Guard third-party charting library.
3. Transfer API response to client.

## 20. References

- [Angular Universal Guide](https://angular.io/guide/universal)

### Next File
**006 - Service Workers.md**
