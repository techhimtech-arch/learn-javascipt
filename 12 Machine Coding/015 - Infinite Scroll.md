# Infinite Scroll

## 1. Definition

**Infinite Scroll** loads additional content as user approaches bottom of container — eliminating pagination boundaries.

## 2. Why do we need it?

Provide seamless browsing experience without full-page reloads or pagination clicks.

## 3. Internal Working

Monitor scroll position:
1. Detect near-bottom
2. Trigger data fetch
3. Append more items
4. Update loading state

Must handle loading states and end-of-data detection.

## 4. Step-by-Step Execution

Vanilla JS approach:
```javascript
let page = 1;
let loading = false;
const container = document.getElementById('list');

container.addEventListener('scroll', () => {
  if (!loading && isNearBottom(container)) {
    loading = true;
    fetch(`/api/items?page=${page++}`)
      .then(r => r.json())
      .then(data => {
        renderItems(data.items);
        loading = data.items.length === 0; // No more items
      });
  }
});
```

Steps:
1. Track current page and loading state
2. Check scroll position on scroll event
3. If near bottom and not loading → request next page
4. Append received items
5. Mark complete if insufficient items returned

## 5. Syntax

```javascript
// Angular CDK Virtual Scroll alternative (simplified)
@Directive({ selector: '[appInfiniteScroll]' })
export class InfiniteScrollDirective {
  @Input() appInfiniteScrollThreshold = 100;
  @Output() appInfiniteScroll = new EventEmitter<void>();

  @HostListener('window:scroll')
  checkScroll() {
    const threshold = document.documentElement.scrollHeight - window.innerHeight - this.appInfiniteScrollThreshold;
    if (window.scrollY > threshold && !this.loading) {
      this.appInfiniteScroll.emit();
    }
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<div id="feed"></div>
<script>
  let page = 1;
  function loadMore() {
    fetch(`/posts?page=${page++}`)
      .then(r => r.json())
      .then(posts => {
        document.getElementById('feed').insertAdjacentHTML(
          'beforeend',
          posts.map(p => `<div>${p.title}</div>`).join('')
        );
      });
  }
  // Initial load
  loadMore();
  // Attach scroll listener
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      loadMore();
    }
  });
</script>
```

### Medium
```typescript
// Angular with RxJS
this.infiniteScroll$ = this.scroll$.pipe(
  throttleTime(200),
  switchMap(() => this.api.loadNextPage()),
  scan((acc, batch) => [...acc, ...batch], [])
);

this.infiniteScroll$.subscribe(items => this.items = items);
```

### Advanced
```typescript
@Component({
  template: `
    <cdk-virtual-scroll-ytp [items]="loadedItems" class="feed">
      <ng-container *cdkVirtualFor="let item of virtualFeed">
        <app-post [post]="item"></app-post>
      </ng-container>
      <div class="loading" *cdkVirtualForLet="let _">Loading...</div>
    </cdk-virtual-scroll-ytp>
  `
})
export class FeedComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  loadedItems: Post[] = [];
  private currentPage = 0;

  virtualFeed = new DataSource<Post>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.virtualFeed.connect = () => {
      return interval(0).pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.loadPage())
      );
    };
  }

  private loadPage(): Observable<Post[]> {
    if (this.endReached) return of([]);
    return this.api.getPosts(++this.currentPage).pipe(
      tap(res => {
        this.loadedItems = [...this.loadedItems, ...res.posts];
        this.endReached = res.posts.length < 20;
      }),
      map(res => res.posts)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## 7. Visual Diagram (ASCII)

```
Scroll Position Monitoring

Window Height: |---------------------[Viewport]---------------------|
Scroll Height: |-----------------------------------------------------|

Trigger Threshold:
|---------------------| Scroll Y Position |---------------------|
                                   ▲
                             Threshold Point
                                   ▼
                   [Load More Content When Approached]
```

## 8. Real-world Example

Twitter/Facebook feed loading posts incrementally.

## 9. Angular Use Case

Material list with virtual scroll, CDK portal-based feed, pagination-free UX patterns.

## 10. Common Mistakes

❌ No loading state handling  
❌ Double-triggering requests  
❌ Not detecting end-of-data

## 11. Edge Cases

1. **Network errors during fetch**
   ```typescript
   catchError(err => {
     this.errorMessage = 'Failed to load more posts';
     return of([]);
   })
   ```

2. **Empty result pages**
3. **Intersection Observer variants**

## 12. Performance Considerations

Consider virtual scrolling (CDK) for large lists rather than traditional infinite scroll.

## 13. Time & Space Complexity

Scroll listener constant time; memory grows with loaded items unless managed.

## 14. Interview Questions

1. Approaches to detect scroll position?
2. Prevent duplicate requests?
3. Difference from pagination?

## 15. Follow-up Questions

- "How does virtual scroll differ?"

## 16. Production Best Practices

1. Debounce/throttle scroll checks
2. Implement proper end-of-data flags
3. Add retry/error recovery UI
4. Prefer Intersection Observer API for reliability

## 17. Summary

Infinite scroll enhances UX but requires careful state management and error handling.

## 18. Revision Notes

- Scroll detection mechanism
- Loading/end states required
- Cancellation of stale requests
- Virtual scroll preferred for large datasets

## 19. Practice Questions

1. Build basic infinite loader.
2. Handle loading and end states.
3. Integrate with virtual scroll.

## 20. References

- [Angular CDK Virtual Scroll](https://material.angular.io/cdk/scrolling/overview)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

### Next File
**016 - Sorting Filtering.md**
