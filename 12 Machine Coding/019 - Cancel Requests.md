# Cancel Previous API Requests

## 1. Definition

**Cancel Previous API Requests** aborts pending network calls triggered by newer duplicate actions — avoiding race conditions and unnecessary work.

## 2. Why do we need it?

Prevent outdated responses overriding newer state — common in search/autosave/typeahead scenarios.

## 3. Internal Working

Mechanisms:
- RxJS: `switchMap` cancels previous inner observable
- Fetch API: `AbortController.abort()` terminates request
- XMLHttpRequest: `.abort()` method

## 4. Step-by-Step Execution

RxJS version:
```typescript
this.searchTerms = new Subject<string>();
this.results$ = this.searchTerms.pipe(
  debounceTime(300),
  switchMap(term => this.api.search(term))
);

// On input:
this.searchTerms.next(userInput); // Previous request cancelled
```

Fetch/AbortController version:
```typescript
private abortController = new AbortController();

async search(term: string) {
  this.abortController.abort(); // Cancel previous request
  this.abortController = new AbortController();
  
  try {
    const res = await fetch(`/api?q=${term}`, {
      signal: this.abortController.signal
    });
    return await res.json();
  } catch(err) {
    if (err.name === 'AbortError') return null;
    throw err;
  }
}
```

Steps:
1. Input received
2. Abort previous controller
3. Create new controller/request
4. Send new request
5. Handle aborted vs real errors

## 5. Syntax

```javascript
// RxJS
source$.pipe(switchMap(id => fetchData(id)))

// Fetch API
const controller = new AbortController();
fetch(url, { signal: controller.signal });
// Later:
controller.abort();
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const abortCtrl = new AbortController();
const signal = abortCtrl.signal;

fetch('/api/data', { signal });

// To cancel:
abortCtrl.abort(); // Triggers AbortError
```

### Medium
```typescript
// Angular service with switchMap
@Injectable()
export class SearchService {
  private searchTerm$ = new Subject<string>();

  results$ = this.searchTerm$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(term => term ? this.http.get(`/search?q=${term}`) : of([]))
  );

  search(term: string) {
    this.searchTerm$.next(term);
  }
}
```

### Advanced
```typescript
// Combining RxJS cancellation with fetch
search$(term$: Observable<string>): Observable<any[]> {
  return term$.pipe(
    debounceTime(300),
    switchMap(term => {
      const controller = new AbortController();
      return from(
        fetch(`/api/search?q=${term}`, { signal: controller.signal })
      ).pipe(
        timeout(5000),
        map(res => res.json()),
        takeUntil(timer(0).pipe(switchMapTo(this.destroyed$))), // Cleanup on destroy
        catchError(err => {
          if (err.name === 'AbortError') return of([]);
          return throwError(() => err);
        })
      );
    })
  );
}
```

## 7. Visual Diagram (ASCII)

```
Request Cancellation (switchMap)

User Types: |s|se|sea|sear|
Triggers:   R1 R2  R3   R4 (requests)
            │  │   │    │
            └─►X  │    │ R1 cancelled
               └──►X   │ R2 cancelled
                  └──► │ R3 cancelled
                     ┌─► Only R4 completes successfully
```

## 8. Real-world Example

Google-style instant search preventing stale suggestions from appearing.

## 9. Angular Use Case

Reactive search fields, autosave mechanisms, polling intervals.

## 10. Common Mistakes

❌ Not cleaning up subscriptions properly  
❌ Misusing Promise.race for cancellation

## 11. Edge Cases

1. **Multiple simultaneous cancellations**
   ```typescript
   // Manage multiple abort controllers carefully
   ```

2. **Browser compatibility**
   ```javascript
   // Polyfill AbortController for older browsers
   ```

3. **Race between network resolution and abort**

## 12. Performance Considerations

switchMap naturally avoids overlapping requests — efficient for user-triggered fetches.

## 13. Time & Space Complexity

O(1) per active request; memory freed after cancellation.

## 14. Interview Questions

1. Implement request cancellation
2. switchMap vs mergeMap for requests?
3. Handle partial completion?

## 15. Follow-up Questions

- "What's difference between takeUntil and switchMap for cancellation?"

## 16. Production Best Practices

1. Centralize HTTP cancellation logic
2. Use interceptors for consistent abort behavior
3. Provide UX feedback on request cancellation
4. Clean up controllers on navigation/unmount

## 17. Summary

Cancellation mechanisms prevent race conditions and unnecessary network traffic.

## 18. Revision Notes

- switchMap for RxJS observables
- AbortController for native fetch
- Cancel previous on new trigger
- Handle AbortErrors gracefully

## 19. Practice Questions

1. Build reactive search with cancellation.
2. Implement debounced autosave with abort.
3. Cancel polling requests on tab blur.

## 20. References

- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [RxJS: switchMap](https://rxjs.dev/api/operators/switchMap)

### Next File
**020 - Rendering Optimization.md**
