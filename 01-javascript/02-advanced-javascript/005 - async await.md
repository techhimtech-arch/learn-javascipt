# async await

## 1. Definition

**`async/await`** is syntactic sugar built on top of promises to write **asynchronous code that looks synchronous**.

An `async` function always returns a promise.  
An `await` expression pauses execution until a promise settles.

## 2. Why do we need it?

Reduces complexity of managing promise chains.

Avoids:
- `.then()` nesting
- Callback hell
- Difficult error handling patterns

## 3. Internal Working

Under the hood:

1. `async` wraps returned value in `Promise.resolve(value)`.
2. `await` suspends the async function until the operand settles.
3. If operand is non-promise → auto-wrapped in `Promise.resolve`.

## 4. Step-by-Step Execution

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}
```

Steps:
1. Function starts synchronous up to first `await`
2. First `await` suspends execution
3. `fetch(...)` resolves asynchronously
4. Execution resumes inside resolved `.then()`
5. Second `await` again suspends
6. JSON resolved, continue until `return`
7. Returns resolved value as promise

## 5. Syntax

```javascript
async function name(params) {
  const result = await somePromise;
  return result;
}
```

Top-level await supported in ES modules.

## 6. Examples (Easy → Advanced)

### Easy
```javascript
async function sayHello() {
  return "Hello!";
}
sayHello().then(console.log); // Hello!
```

### Medium
```javascript
async function getData() {
  const res = await fetch('/api/data');
  if (!res.ok) throw new Error("Network response failed");
  return res.json();
}
```

### Advanced
```javascript
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
  }
}

const api = new ApiService('https://api.example.com');
const user = await api.get<User>('/user/1');
```

## 7. Visual Diagram (ASCII)

```
Async/Await Execution Flow:

async function example() {
  console.log('Start');
  await someAsyncOperation();
  console.log('End');
}

Timeline:
┌──────────────┐
│ Log: Start   │
├──────────────┤
│ Await...     │ ← Paused here
├──────────────┤
│ Operation done│
├──────────────┤
│ Log: End     │
└──────────────┘
```

## 8. Real-world Example

Angular HTTP Service:

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await this.http.get<User>('/api/me').toPromise();
      return user;
    } catch (error) {
      console.error('Failed to fetch user', error);
      return null;
    }
  }
}
```

## 9. Angular Use Case

Modern Angular favors Observables (`HttpClient`) over Promises for reactive streams, but both coexist depending on context.

## 10. Common Mistakes

❌ Forgetting to add `await`  
❌ Using async functions in `forEach`  
❌ Not wrapping try/catch properly  

## 11. Edge Cases

1. **Top-level await in ESM**
   ```javascript
   const data = await fetch('/api/data').then(r => r.json());
   ```

2. **Mixing with promise chains**
   ```javascript
   Promise.resolve().then(async () => {
     await something();
   });
   ```

3. **Non-promise await**
   ```javascript
   const val = await 42; // val === 42
   ```

4. **Sequential vs Parallel**
   ```javascript
   // Sequential (slow)
   for (const url of urls) {
     await fetch(url);
   }

   // Parallel (fast)
   await Promise.all(urls.map(url => fetch(url)));
   ```

## 12. Performance Considerations

- Avoid unnecessary `await` on non-asynchronous operations
- Chain independent operations using `Promise.all`
- Prefer observable-based approaches in Angular apps for better composability

## 13. Time & Space Complexity

Same as underlying promises — depends on wrapped async operation.

## 14. Interview Questions

1. What does `async` guarantee about return type?
2. How do you make asynchronous loop efficient?
3. When should you avoid `await`?
4. Difference between `await` and `.then()`?

## 15. Follow-up Questions

- "What happens if you forget to await a Promise?"
- "Is async/await blocking?"

## 16. Production Best Practices

1. Wrap async operations with error boundaries
2. Use `for…of` loops carefully in async context
3. Prefer observables in Angular for stream composition
4. Handle rejections gracefully with try/catch

## 17. Summary

- Cleaner alternative to promise chains
- Easier to read and maintain
- Requires careful handling of sequential vs. parallel execution

## 18. Revision Notes

- Always return something or explicit Promise.wrap()
- await suspends coroutine until settled
- Try-catch handles most async errors cleanly
- Combine with Promise utilities for optimal performance

## 19. Practice Questions

1. Refactor nested `.then()` into async/await.
2. Parallelize 3 API calls with `Promise.all`.
3. Add timeout/cancel to async function.

## 20. References

- [MDN: async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: await operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

### Next File
**006 - Event Loop.md**
