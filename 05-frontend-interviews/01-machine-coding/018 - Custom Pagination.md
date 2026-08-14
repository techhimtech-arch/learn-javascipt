# Custom Pagination

## 1. Definition

**Custom Pagination** breaks large datasets into discrete pages with navigation controls — letting users browse manageable subsets.

## 2. Why do we need it?

Improve performance by limiting DOM rendering, enhance UX clarity for large datasets.

## 3. Internal Working

1. Maintain current page index and page size
2. Slice data accordingly
3. Render controls (prev/next/numbers)
4. Notify parent of page changes

Client-side for small sets; server-side for big data.

## 4. Step-by-Step Execution

Simple implementation:
```javascript
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 10;

const paginatedData = items.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);

function goToPage(page: number) {
  setCurrentPage(Math.max(1, Math.min(totalPages, page)));
}
```

Steps:
1. Compute start/end indices from page
2. Slice original array
3. Render subset with controls
4. Update page variable on navigation

## 5. Syntax

```typescript
interface PaginationControls {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

@Component({
  template: `
    <div class="paginated-list">
      <div *ngFor="let item of pagedItems">...</div>
      <nav>
        <button (click)="prevPage()" [disabled]="currentPage === 1">Prev</button>
        <span *ngFor="let page of pages">{{page}}</span>
        <button (click)="nextPage()" [disabled]="isLastPage">Next</button>
      </nav>
    </div>
  `
})
export class PaginatedListComponent implements OnInit {
  items: any[] = [];
  pagedItems: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.items.length / this.pageSize);
    this.updatePage();
  }

  updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedItems = this.items.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function paginate(array, pageSize, pageNumber) {
  return array.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );
}
```

### Medium
```typescript
// Angular service with server-side pagination
@Injectable()
export class PaginatedDataService {
  private cache = new Map<string, CachedResponse>();

  getPage(page: number, size: number): Observable<ApiResponse> {
    const cached = this.cache.get(`${page}-${size}`);
    if (cached && !this.isStale(cached.timestamp)) {
      return of(cached.data);
    }

    return this.http.get<ApiResponse>(`/api/data?_page=${page}&_limit=${size}`)
      .pipe(tap(response => {
        this.cache.set(`${page}-${size}`, { data: response, timestamp: Date.now() });
      }));
  }
}
```

### Advanced
```typescript
// Reactive pagination with Angular
@Component({
  selector: 'app-paginated-table',
  template: `
    <table>
      <tr *ngFor="let row of rows$ | async">...</tr>
    </table>
    <app-pagination-controls
      [total]="totalItems"
      [pageSize]="pageSize"
      [(page)]="currentPage">
    </app-pagination-controls>
  `
})
export class PaginatedTableComponent {
  @Input() pageSize = 20;
  totalItems = 0;
  currentPage = 1;

  rows$ = combineLatest([
    this.currentPage$,
    this.pageSize$
  ]).pipe(
    switchMap(([page, size]) => 
      this.dataService.getPage(page, size).pipe(
        tap(res => this.totalItems = res.total)
      )
    )
  );
}
```

## 7. Visual Diagram (ASCII)

```
Pagination Controls Layout

[ Prev ] [1] [2] [3] ... [Last] [ Next ]

Current Page: 2 (highlighted)
Items shown: 11-20 of 100
```

## 8. Real-world Example

E-commerce product listing with page numbers and next/previous controls.

## 9. Angular Use Case

Material paginator integration, custom page controls, infinite scroll hybrid.

## 10. Common Mistakes

❌ Client-side pagination for huge datasets  
❌ Not showing total/page info  

## 11. Edge Cases

1. **Empty result pages**
2. **Dynamic page sizes**
3. **URL synchronization**
   ```typescript
   updateUrl(page: number): void {
     this.router.navigate([], { queryParams: { page: page.toString() } });
   }
   ```

## 12. Performance Considerations

Server-side pagination essential for large datasets (>10k items).

## 13. Time & Space Complexity

Client-side slicing: O(k) where k=pageSize
Total memory O(n) unless virtualized

## 14. Interview Questions

1. Client vs server pagination tradeoffs?
2. Handle empty middle pages?
3. Sync with browser history?

## 15. Follow-up Questions

- "How to combine with virtual scroll?"

## 16. Production Best Practices

1. Show current range info clearly
2. Disable invalid nav buttons
3. Cache recently viewed pages
4. Support keyboard navigation
5. Persist page preference for user

## 17. Summary

Pagination balances performance vs usability — key choice: client vs server.

## 18. Revision Notes

- Slice-based rendering
- Track page state carefully
- Server preferred for large data
- UX matters: labels, disabled states

## 19. Practice Questions

1. Build numbered pagination UI.
2. Implement server-side pagination logic.
3. Add first/last page shortcuts.

## 20. References

- [Material Paginator](https://material.angular.io/components/paginator/overview)

### Next File
**019 - Cancel Requests.md**
