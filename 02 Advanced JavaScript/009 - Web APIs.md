# Web APIs

## 1. Definition

**Web APIs** are capabilities provided by the **browser/host environment** that extend what JavaScript can do — such as manipulating documents (`DOM`), making HTTP requests (`fetch`), setting timers (`setTimeout`), and more.

They complement core JS by offering system-level integrations.

## 2. Why do we need it?

JavaScript language spec alone cannot access:
- DOM
- Network
- Filesystem
- Hardware sensors
- Timers

These must be supplied externally via browser APIs.

## 3. Internal Working

Browser implements standard APIs defined in:
- DOM specification
- Fetch standard
- HTML Living Standard
- WHATWG/W3C specs

JavaScript accesses these globally — e.g., `document`, `fetch`, `localStorage`.

## 4. Step-by-Step Execution

Browser exposes:
1. Global methods (`setTimeout`, etc.)
2. Constructors (`XMLHttpRequest`, `WebSocket`)
3. Interfaces (`Document`, `Element`)
4. Objects (`window`, `navigator`)

When called, JavaScript engine delegates execution to native implementations.

## 5. Syntax

Various forms per API:

```javascript
// Timer
const id = setTimeout(() => {}, ms);

// DOM manipulation
document.querySelector('div').style.color = 'red';

// Network request
fetch('/api/data')
  .then(res => res.json());
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
document.title = "Updated Title";
```

### Medium
```javascript
const element = document.createElement('p');
element.textContent = "Generated paragraph";
document.body.appendChild(element);
```

### Advanced
```javascript
// WebSocket real-time communication
const socket = new WebSocket('ws://localhost:8080');
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateUI(data);
};
```

## 7. Visual Diagram (ASCII)

```
Browser Environment Layers

┌──────────────────────┐
│ User Interface       │
│ (HTML/CSS Rendered)  │
└────────┬─────────────┘
         │
┌────────▼─────────────┐
│ DOM Tree             │
├──────────────────────┤
│ JavaScript Engine    │
│ (Parser, Interpreter)│
└────────┬─────────────┘
         │
┌────────▼─────────────┐
│ Web APIs             │
├──────────────────────┤
│ Timers               │
│ DOM Manipulation     │
│ XMLHttpRequest       │
│ Fetch                │
│ Storage              │
└──────────────────────┘
```

## 8. Real-world Example

Angular HttpClient wraps `fetch` (or `XMLHttpRequest`) under the hood.

## 9. Angular Use Case

- `HttpClient` uses Web APIs
- `LocalStorage` used for persistence
- `setTimeout` used for delays/mocking

## 10. Common Mistakes

❌ Calling Web APIs too frequently (e.g., excessive DOM reads)
❌ Forgetting browser-specific prefixes/features

## 11. Edge Cases

1. **Non-browser JS environments lack these APIs**
   ```javascript
   typeof window === 'undefined' ? // Running outside browser
   ```

2. **API availability varies**
   ```javascript
   if ('serviceWorker' in navigator) { ... }
   ```

3. **Deprecated APIs**
   ```javascript
   document.all // Legacy, avoid use
   ```

## 12. Performance Considerations

- Minimize DOM interactions (batch reads/writes)
- Use efficient selectors
- Debounce/throttle frequent triggers
- Cache DOM node references

## 13. Time & Space Complexity

Varies widely depending on specific API usage.

## 14. Interview Questions

1. List some popular Web APIs.
2. Difference between Web API and JavaScript built-ins.
3. How does the browser provide `fetch()`?
4. Are Web APIs cross-browser compatible?

## 15. Follow-up Questions

- "How does Angular abstract Web APIs?"
- "Explain Shadow DOM."

## 16. Production Best Practices

1. Check feature support before calling APIs
2. Wrap native APIs in services/controllers for testability
3. Gracefully degrade unsupported features

## 17. Summary

Web APIs bridge the gap between JavaScript and environment-specific functionality.

## 18. Revision Notes

- Supplied by browser/runtime
- Not part of JS language
- Include DOM, timers, storage, networking
- Essential for interactive apps

## 19. Practice Questions

1. Create DOM element dynamically.
2. Implement basic AJAX call using fetch.
3. Detect mobile device via navigator API.

## 20. References

- [MDN: Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- W3C/WHATWG Specifications

### Next File
**010 - Fetch API.md**