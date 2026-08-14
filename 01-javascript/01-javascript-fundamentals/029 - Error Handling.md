# JavaScript Error Handling

## 1. Definition

**JavaScript Error Handling** catches and manages runtime exceptions using try/catch blocks and error objects.

## 2. Why do we need it?

Gracefully recover from failures, debug issues, provide user feedback.

## 3. Internal Working

Error objects:
- Error: Base error type
- TypeError: Invalid type operation
- ReferenceError: Invalid reference
- SyntaxError: Malformed code
- RangeError: Invalid length/value

Global handlers:
- window.onerror
- window.addEventListener('error')
- unhandledrejection

## 4. Syntax

```javascript
// Try/catch/finally
try {
  riskyOperation();
} catch (error) {
  console.error('Caught:', error.message);
} finally {
  cleanup(); // Always runs
}

// Custom error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Promise error handling
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.log('Network error');
    }
    throw error; // Re-throw
  }
}
```

## 5. Interview Questions

1. Error object properties?
2. Handle unhandled promise rejections?
3. Custom error creation?

## 6. Summary

Structured error handling builds resilient applications.

## 7. References

- [MDN: Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

---
