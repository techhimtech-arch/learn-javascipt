# AbortController

## 1. Definition

**AbortController** is a built-in JavaScript API used to **signal cancellation** of async operations such as `fetch` requests or timers.

## 2. Why do we need it?

In apps, especially SPAs like Angular projects:
- Users navigate away before request completes
- Duplicate/debounced searches should cancel previous calls
- Prevents memory leaks / race conditions

## 3. Internal Working

1. Create `AbortController`
2. Pass its `.signal` to cancellable operation
3. Call `.abort()` when needed
4. Listener detects signal → stops operation

## 4. Step-by-Step Execution

Example:
```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch('/api/data', { signal })
  .then(res => res.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Request was cancelled');
    } else {
      console.error(err);
    }
  });

// Later...
controller.abort();
```

Steps:
1. Controller created with signal
2. Signal passed to fetch
3. Controller.abort() called
4. Fetch listens internally → throws AbortError
5. Catch branch identifies cancellation → handles gracefully

## 5. Syntax

```javascript
const controller = new AbortController();
const { signal } = controller;

someCancellableOp(signal);
controller.abort();
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const ac = new AbortController();
fetch('/url', { signal: ac.signal });
ac.abort(); // Stops fetch
```

### Medium
```javascript
function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal })
    .finally(() => clearTimeout(id));
}
```

### Advanced
```typescript
@Component({
  selector: 'search-box',
  template: `<input (input)="onInput($event)" />`
})
export class SearchBoxComponent {
  private abortCtrl?: AbortController;

  onInput(event: Event): void {
    const term = (event.target as HTMLInputElement).value;

    // Cancel previous request
    this.abortCtrl?.abort();

    // Start new one
    this.abortCtrl = new AbortController();

    this.search(term, this.abortCtrl.signal);
  }

  private search(term: string, signal: AbortSignal): void {
    fetch(`/api/search?q=${term}`, { signal })
      .then(res => res.json())
      .then(results => this.results = results)
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Search failed', err);
        }
      });
  }
}
```

## 7. Visual Diagram (ASCII)

```
Abort Mechanism Flow

┌────────────────────┐
│ AbortController    │
│ .signal             │
└──────┬─────────────┘
       │ Passed to fetch
       ▼
┌────────────────────┐
│ Cancellable Op     │
│ (e.g., fetch())    │
└──────┬─────────────┘
       │ Listens to
       ▼
┌────────────────────┐
│ AbortSignal        │
│ Listens for .abort()│
└────────────────────┘
       │
       ▼ (on .abort())
Throws AbortError ➜ Catch block
```

## 8. Real-world Example

Cancel autocomplete requests in Angular reactive forms:

```typescript
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  switchMap(term => {
    this.currentAbortController?.abort();
    this.currentAbortController = new AbortController();
    return this.http.get(`/api/search?q=${term}`, {
      signal: this.currentAbortController.signal
    });
  })
).subscribe(...);
```

## 9. Angular Use Case

Integrate directly with `HttpClient`:
```typescript
@ViewChild('searchBox')
searchInput!: ElementRef;

ngAfterViewInit() {
  fromEvent(this.searchInput.nativeElement, 'input').pipe(
    debounceTime(300),
    switchMap(term => {
      const ctrl = new AbortController();
      return this.http.get('/api/search', { params: { q: term }, signal: ctrl.signal });
    })
  ).subscribe();
}
```

## 10. Common Mistakes

❌ Not handling `AbortError` specifically
❌ Forgetting to clean up controllers
❌ Sharing same controller between unrelated requests

## 11. Edge Cases

1. **Calling `.abort()` twice** — second call ignored, no error thrown
2. **Passing invalid signal type** — causes TypeError
3. **Aborting before attaching listener** — handled gracefully
4. **Signal reuse** — each request ideally needs its own controller

## 12. Performance Considerations

Minimal overhead; recommended for all long-running fetches.

## 13. Time & Space Complexity

O(1) operations.

## 14. Interview Questions

1. What is purpose of AbortController?
2. How does fetch listen for abort?
3. What kind of error gets thrown?
4. Best practices for cleanup?

## 15. Follow-up Questions

- "Can you abort multiple operations?"
- "How does Angular manage HTTP cancellations?"

## 16. Production Best Practices

1. Always wrap `fetch` with abort support
2. Tie abort lifecycle to component/view lifecycle
3. Clean up timers and controllers together
4. Handle AbortErrors separately from real errors

## 17. Summary

Essential for preventing unnecessary network activity and avoiding race conditions.

## 18. Revision Notes

- Signal passed into async op
- `.abort()` triggers AbortError
- Must clean up after use
- Especially useful in SPAs

## 19. Practice Questions

1. Cancel previous search query in autocomplete.
2. Implement timeout wrapper using controller.
3. Gracefully handle aborted requests.

## 20. References

- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

### Next File
**012 - Generators.md**
