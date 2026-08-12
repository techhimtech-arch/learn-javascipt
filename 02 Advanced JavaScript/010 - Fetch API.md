# Fetch API

## 1. Definition

The **Fetch API** is a modern interface that allows you to **make HTTP requests** from web browsers. It returns **promises** for handling asynchronous responses.

## 2. Why do we need it?

Legacy options like `XMLHttpRequest` are verbose and callback-heavy.

Fetch provides:
- Simpler, promise-based interface
- Streaming support
- Better error handling
- First-class integration with async/await

## 3. Internal Working

Steps:
1. `fetch()` initiates request
2. Browser dispatches network task
3. Response comes back → promise resolves
4. Body parsed manually via `.json()`, `.text()`, etc.

Note:
- Fetch does NOT reject on HTTP errors like 404/500
- Only rejects on network failures or CORS blocks

## 4. Step-by-Step Execution

Example:
```javascript
fetch('/api/data')
  .then(response => response.ok ? response.json() : Promise.reject('Bad status'))
  .then(data => console.log(data))
  .catch(error => console.warn(error));
```

Steps:
1. Request sent
2. Server responds
3. `.then()` receives `Response` object
4. `.json()` parses body
5. Data logged or error caught

## 5. Syntax

```javascript
fetch(url[, options])
```

Options:
- `method`: GET/POST/etc.
- `headers`: Request headers
- `body`: Payload (string/FormData/etc.)
- `mode`: cors/no-cors/same-origin
- `credentials`: include/same-origin/none

## 6. Examples (Easy → Advanced)

### Easy
```javascript
fetch('/api/hello')
  .then(res => res.text())
  .then(text => console.log(text));
```

### Medium
```javascript
async function postData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

### Advanced
```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch('/slow-api', { signal: controller.signal });
  clearTimeout(timeoutId);
  return res.json();
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Request timed out');
  } else {
    throw err;
  }
}
```

## 7. Visual Diagram (ASCII)

```
Fetch Lifecycle:

User → fetch(url)
       ↓
Browser network layer
       ↓
Response arrives
       ↓
Promise resolves with Response object
       ↓
Call .json()/.text() to consume body
       ↓
Final result usable in .then()
```

## 8. Real-world Example

Angular HttpClient uses `XMLHttpRequest` under the hood — but you could replace it with `fetch`:

```typescript
@Injectable()
export class MyHttpClient {
  get<T>(url: string): Promise<T> {
    return fetch(url).then(r => r.json() as Promise<T>);
  }
}
```

## 9. Angular Use Case

Use wrapper services around native `fetch` for consistent cross-environment requests.

## 10. Common Mistakes

❌ Forgetting to parse response body
❌ Expecting rejection for bad HTTP codes
❌ Not aborting stale requests

## 11. Edge Cases

1. **Empty responses crash `.json()`**
   ```javascript
   res.text() // Instead of .json()
   ```

2. **Redirects ignored unless followed explicitly**
3. **CORS restrictions silently fail**
4. **Streaming responses partially consumed**

## 12. Performance Considerations

- Reuse `fetch` connections where possible
- Set timeouts/abort signals
- Prefer binary/text modes appropriately

## 13. Time & Space Complexity

Network-bound — varies by bandwidth.

## 14. Interview Questions

1. How does `fetch` differ from `XMLHttpRequest`?
2. Handle HTTP error status codes?
3. Cancel ongoing fetch?
4. Parse various response types?

## 15. Follow-up Questions

- "How do you implement retries with backoff?"
- "Explain how abort works."

## 16. Production Best Practices

1. Always check `.ok` property
2. Parse based on content-type
3. Implement cancellation
4. Wrap in service layer

## 17. Summary

Modern replacement for XHR — cleaner, more capable, promise-native.

## 18. Revision Notes

- Resolves even on HTTP failure
- Manual parsing required
- Promise-based
- Integrates well with async/await

## 19. Practice Questions

1. Convert old XHR call to fetch.
2. Implement retry with delay.
3. Cancel fetch on component unmount.

## 20. References

- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Next File
**011 - AbortController.md**
