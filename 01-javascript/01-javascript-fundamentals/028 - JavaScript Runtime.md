# JavaScript Runtime

## 1. Definition

The **JavaScript Runtime** is the environment providing additional capabilities beyond core language features — such as DOM manipulation, networking (fetch), timers, file I/O, and the **Event Loop**.

It complements the **JavaScript Engine** by supplying APIs not part of the language itself.

## 2. Why do we need it?

JavaScript was designed to run within host environments — browsers, servers (Node.js), or embedded systems — each needing platform-specific tools for interaction.

## 3. Internal Working

Runtime provides:

- Web APIs (DOM, fetch, XHR, etc.)
- Node.js APIs (fs, http, process, etc.)
- Event Loop / Task Queue / Microtask Queue
- Timer queue (setTimeout, setInterval)
- Worker threads and messaging
- Garbage collector hooks

## 4. Step-by-Step Execution

Example:
```javascript
setTimeout(() => console.log("Timeout done"), 1000);
console.log("Main thread done");
```

Steps:
1. Main thread runs `setTimeout()` → schedules callback via runtime API
2. Logs `"Main thread done"` immediately
3. Waits for timeout expiration
4. Callback queued → executed when stack is empty

## 5. Syntax

Used implicitly — no direct syntax except calling runtime APIs like `setTimeout`, `document`, `window`.

## 6. Examples (Easy → Advanced)

### Easy
```javascript
document.querySelector('h1').textContent = "Updated!";
```

### Medium
```javascript
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Advanced
```javascript
const worker = new Worker('worker.js');
worker.postMessage({ type: "INIT", payload: initialData });
worker.onmessage = e => updateUI(e.data);
```

## 7. Visual Diagram (ASCII)

```
Browser Runtime Architecture

┌──────────────────────────────┐
│ JavaScript Engine            │
├──────────────────────────────┤
│ Parser                       │
│ Compiler                     │
│ Heap                         │
│ Stack                        │
└────────────┬─────────────────┘
             │
┌────────────▼─────────────────┐
│ Browser Runtime / Web APIs   │
├──────────────────────────────┤
│ DOM                          │
│ Timers                       │
│ Fetch                        │
│ Event Loop                   │
│ Console                      │
└──────────────────────────────┘
```

## 8. Real-world Example

Angular HTTP Interaction:
```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users'); // Uses browser fetch API beneath
  }
}
```

## 9. Angular Use Case

Angular relies heavily on runtime-provided APIs:
- `HttpClient` wraps `fetch()` or `XMLHttpRequest`
- Zone.js uses `MutationObserver`, timers, etc.
- Animations rely on browser animation frame APIs

## 10. Common Mistakes

❌ Mixing engine-level logic with runtime-level logic
❌ Relying on runtime-specific behaviors in portable code

## 11. Edge Cases

1. **Non-browser runtimes (Node.js)**
   ```javascript
   const fs = require('fs'); // Node-only API
   ```

2. **Custom runtimes (e.g., Deno/WebContainers)**
3. **Sandbox limitations in iframe/worker**

## 12. Performance Considerations

- Minimize blocking runtime operations
- Use Web Workers for heavy CPU tasks
- Leverage streaming parsers for big responses

## 13. Time & Space Complexity

Varies greatly depending on API usage.

## 14. Interview Questions

1. Difference between JavaScript engine and runtime?
2. Examples of runtime APIs?
3. How does the event loop fit in?
4. Compare Node.js vs browser runtime?
5. Why can't JS access filesystem directly?

## 15. Follow-up Questions

- "How does Angular abstract runtime differences?"
- "Why not bundle everything into engine?"

## 16. Production Best Practices

1. Abstract environment-specific calls behind clean interfaces
2. Gracefully degrade for unsupported APIs
3. Use feature detection rather than assumptions

## 17. Summary

- Engine executes JS
- Runtime provides extra tools
- Together they deliver interactive experiences
- Angular abstracts runtime into clean APIs

## 18. Revision Notes

- Engine ≠ Runtime
- Browser APIs vs Node.js APIs
- Event loop lives here
- Angular wraps runtime concerns

## 19. Practice Questions

1. Compare setTimeout behavior in browser vs Node.

2. Simulate basic fetch wrapper.

3. Detect runtime capabilities safely.

## 20. References

- [MDN: Runtime](https://developer.mozilla.org/en-US/docs/Web/API)
- [Node.js API Docs](https://nodejs.org/api/)

---

🎉 **Module 1 Complete!**  
All 28 files generated for **JavaScript Fundamentals**.  
Next: Module 2 — Advanced JavaScript (Promises, Async/Await, Event Loop, etc.)

Let me know when ready to proceed with Module 2. 📚