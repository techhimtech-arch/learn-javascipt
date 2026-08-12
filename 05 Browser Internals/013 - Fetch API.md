# Browser APIs - Fetch

## 1. Definition

**Fetch API** provides modern interface for making HTTP requests — replacing XMLHttpRequest with Promise-based syntax.

## 2. Why do we need it?

Simpler request handling, Promise support, streaming responses, cleaner error management.

## 3. Internal Working

Request lifecycle:
1. Create Request object
2. Send via fetch()
3. Receive Response stream
4. Parse body (json/text/blob)

## 4. Syntax

```javascript
// Basic fetch
fetch('/api/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Async/await
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
```

## 5. Examples

### Easy
```javascript
const getData = async () => {
  const response = await fetch('/api/items');
  return await response.json();
};
```

### Advanced
```javascript
// Request with options
const request = new Request('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'test' }),
  credentials: 'include' // Send cookies
});

const response = await fetch(request);
```

## 6. Interview Questions

1. Fetch error handling?
2. Stream processing?
3. Compared to XMLHttpRequest?

## 7. Summary

Fetch provides promise-based HTTP with modern features.

## 8. References

- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---
