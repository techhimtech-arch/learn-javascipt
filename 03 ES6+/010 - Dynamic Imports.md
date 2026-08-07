# Dynamic Imports

## 1. Definition

Dynamic imports (`import()`) enable loading modules asynchronously at runtime — returning a Promise resolving to the module namespace object.

## 2. Why do we need it?

Split bundles, lazy-load routes/features, reduce initial load time.

## 3. Internal Working

Triggers webpack/Vite/Node loader asynchronously — caches result after first load.

## 4. Step-by-Step Execution

```javascript
import('/module').then(mod => mod.default());
```

Steps:
1. `import()` returns promise
2. Loader fetches module (async)
3. Resolves when loaded
4. Module exposed via namespace

## 5. Syntax

```javascript
import(moduleSpecifier).then(callback);
```

Also works with `await`:
```javascript
const mod = await import('./module');
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
document.getElementById('btn').addEventListener('click', async () => {
  const mod = await import('./heavy-calculator');
  mod.calculate();
});
```

### Medium
```javascript
const routeMap = {
  dashboard: () => import('./pages/dashboard'),
  profile: () => import('./pages/profile')
};

const loadPage = async (name) => {
  const mod = await routeMap[name]();
  render(mod.default);
};
```

### Advanced
```typescript
const loadLazyModule = async <T = any>(path: string): Promise<T> => {
  const mod = await import(path);
  return mod as T;
};
```

## 7. Visual Diagram (ASCII)

```
Dynamic Import Lifecycle

User Action
    ↓
import('./module') → Promise<Pending>
    ↓
Network Fetch + Parse
    ↓
Promise Resolved with Module Namespace
    ↓
Use exported members
```

## 8. Real-world Example

Angular lazy-loaded routes internally use dynamic imports:
```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module')
}
```

## 9. Angular Use Case

Code splitting, lazy module loading, conditional feature modules.

## 10. Common Mistakes

❌ Static paths where dynamic desired  
❌ Not awaiting import result

## 11. Edge Cases

1. **Caching after first load**
2. **Error handling for failed loads**
   ```javascript
   try {
     const mod = await import('./maybe-broken');
   } catch (e) {
     fallback();
   }
   ```

3. **Multiple concurrent requests de-duplicated**

## 12. Performance Considerations

- Reduces bundle size significantly
- Increases complexity slightly
- Cache aggressively

## 13. Time & Space Complexity

Varies — dominated by network/bundling strategy.

## 14. Interview Questions

1. Lazy-load a module conditionally?
2. Combine with Suspense?
3. Impact on bundle size?

## 15. Follow-up Questions

- "How does webpack handle dynamic imports?"

## 16. Production Best Practices

1. Split by feature boundary
2. Handle error states gracefully
3. Preload strategically based on user intent

## 17. Summary

Powerful feature for efficient, on-demand module loading.

## 18. Revision Notes

- Returns Promise
- Used heavily in SSR/CSR frameworks
- Tree-shakes unused exports
- Supports await directly

## 19. Practice Questions

1. Lazy-load modal component.
2. Build dynamic route loader.
3. Handle error in dynamic import.

## 20. References

- [MDN: Dynamic Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)

### Module 3 Complete!
