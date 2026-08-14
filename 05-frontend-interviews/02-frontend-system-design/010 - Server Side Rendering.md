# Server-Side Rendering

## 1. Definition

**Server-Side Rendering (SSR)** generates full page HTML on server — sending rendered markup to browser instead of empty shell requiring client hydration.

## 2. Why do we need it?

Faster perceived load, SEO friendliness, better performance on slow devices.

## 3. Internal Working

Render flow:
1. Server receives request
2. Angular app bootstraps
3. Components render to HTML strings
4. HTML sent with state hydration payload
5. Client downloads JS bundle
6. Hydration attaches event listeners

## 4. Step-by-Step Execution

Angular Universal example:
```typescript
// server.ts
import 'zone.js/node';
import { renderModule } from '@angular/platform-node';
import { AppServerModule } from './app/app.module.server';

export function app(req: Request, res: Response) {
  const indexHtml = 'index.html';
  const bootstrappedDoc = renderModule(AppServerModule, {
    document: indexHtml,
    url: req.path
  });
  
  res.send(webView);
}
```

## 5. Syntax

```typescript
// App server module
@NgModule({
  imports: [BrowserModule, ServerTransferStateModule],
})
export class AppServerModule {}

// Client-side transfer state
export class ServerTransferState {
  transferState = inject(TransferState);
  
  setKey(key: string, value: any) {
    this.transferState.set(makeStateKey(key), value);
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Basic platform check
constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

isBrowser() {
  return isPlatformBrowser(this.platformId);
}

isServer() {
  return isPlatformServer(this.platformId);
}
```

### Medium
```typescript
// Conditional rendering
@Component({
  template: `
    <div *ngIf="isBrowser(); else serverTemplate">
      <canvas #canvas></canvas> <!-- Only render in browser -->
    </div>
    <ng-template #serverTemplate>
      <div class="loading">Loading...</div>
    </ng-template>
  `
})
export class ChartComponent {
  isBrowser = isPlatformBrowser(this.platformId);
}
```

### Advanced
```typescript
// TransferState for sharing data
@Component({
  template: ''
})
export class DataResolverComponent {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const KEY = makeStateKey<any>('initial-data');
    
    if (isPlatformServer(this.platformId)) {
      // Fetch data on server, store in state
      this.http.get('/api/data').subscribe(data => {
        this.transferState.set(KEY, data);
      });
    } else {
      // Read transferred data on client
      const data = this.transferState.get(KEY, null);
      if (data) {
        // Use server-fetched data
      }
      this.transferState.remove(KEY);
    }
  }
}
```

## 7. Visual Diagram (ASCII)

```
Universal Rendering Flow

Request ──► Server-Side App Bootstrap
                          │
                  Render Components → HTML String
                          │
                        Response HTML ──► Browser
                                          │
                                   Client App Download
                                          │
                                   Hydration/Attach Events
                                          │
                                   Fully Interactive App
```

## 8. Real-world Example

News site with pre-rendered articles for SEO and fast loading.

## 9. Angular Use Case

Improving initial render performance, SEO-critical pages.

## 10. Common Mistakes

❌ Accessing browser-only APIs during SSR
❌ Not transferring preloaded data

## 11. Edge Cases

1. **Browser-specific libraries**
2. **Window/document references**

## 12. Performance Considerations

Trade-off: server compute vs faster client experience.

## 13. Time & Space Complexity

Server renders add CPU cost per request.

## 14. Interview Questions

1. Benefits of SSR?
2. Hydration challenges?
3. When not to use SSR?

## 15. Follow-up Questions

- "Handle browser-only libraries?"

## 16. Production Best Practices

1. Guard platform-specific code
2. Transfer state efficiently
3. Cache rendered pages/CDN
4. Monitor server render times
5. Implement fallback for errors

## 17. Summary

SSR provides faster loads and SEO benefits at server cost tradeoff.

## 18. Revision Notes

- PLATFORM_ID checks essential
- TransferState shares server data
- Hydration attaches client behavior
- CDN caching amplifies benefits

## 19. Practice Questions

1. Set up basic Universal app.
2. Transfer API data to client.
3. Implement platform-aware component.

## 20. References

- [Angular Universal](https://angular.io/guide/universal)

---
