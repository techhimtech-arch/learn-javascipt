# Bundle Size Impact on Performance

## 1. Definition

**Bundle Size Impact on Performance** analyzes how JavaScript/CSS payload size affects loading speed, execution time, and Core Web Vitals.

## 2. Why do we need it?

Large bundles delay First Contentful Paint (FCP) and Time to Interactive (TTI).

## 3. Internal Working

Critical path:
1. Parse HTML document
2. Resolve `<script>` tags → block rendering
3. Download JS/CSS bundles
4. Parse/compile JavaScript
5. Execute bundle code
6. Initial render possible

## 4. Step-by-Step Execution

Bundle cost calculation:
```
1MB JS ≈ 1 second Parse+Compile time
↓
Mobile ≈ 2-3x slower vs Desktop
↓
TTI degradation proportional to CPU time
```

Tools:
```bash
# Analyze bundle composition
npx webpack-bundle-analyzer dist/stats.json

# Check compression savings
ls -la dist/*.gz
```

## 5. Syntax

```json
// angular.json optimization
{
  "build": {
    "options": {
      "optimization": true,
      "buildOptimizer": true,
      "sourceMap": false,
      "extractLicenses": true
    }
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```json
// webpack-bundle-analyzer config
{
  "stats": {
    "type": "module"
  }
}
```

### Medium
```typescript
// Lazy loading route
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

### Advanced
```typescript
// Custom chunk splitting with webpack
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: '[name].[contenthash].js'
        },
        common: {
          minChunks: 2,
          filename: 'common.[contenthash].js'
        }
      }
    }
  }
};
```

## 7. Visual Diagram (ASCII)

```
Bundle Size → Performance Impact

┌─────────────┐
│ Bundle Size │
└──────┬──────┘
       ▼
┌─────────────┐
│ Download    │ (Bandwidth dependent)
└──────┬──────┘
       ▼
┌─────────────┐
│ Parse/Compile │ (CPU intensive)
└──────┬──────┘
       ▼
┌─────────────┐
│ Execution   │ (Blocks main thread)
└──────┬──────┘
       ▼
┌─────────────┐
│ Paint/Interactive │
└─────────────┘
```

## 8. Real-world Example

Reducing 1MB → 200KB improves TTI by 2-3s on 3G.

## 9. Angular Use Case

Optimizing bundle splits, reducing vendor payloads.

## 10. Common Mistakes

❌ Not analyzing bundle composition
❌ Including unused dependencies

## 11. Edge Cases

1. **Tree shaking edge cases**
2. **Polyfill duplication**

## 12. Performance Considerations

Each byte matters — especially on slower networks.

## 13. Time & Space Complexity

Linear relationship between KB and load time.

## 14. Interview Questions

1. Measure bundle impact?
2. Tools for analysis?
3. Reduce vendor bundle size?

## 15. Follow-up Questions

- "Code splitting strategies?"

## 16. Production Best Practices

1. Monitor bundle sizes in CI
2. Set size budgets for PRs
3. Regular bundle audits
4. Remove unused imports

## 17. Summary

Bundle size directly correlates with real-world performance metrics.

## 18. Revision Notes

- 1MB JS ≈ 1s CPU time
- Mobile CPUs significantly slower
- Parse time dominates on slow devices
- Lazy loading splits critical path

## 19. Practice Questions

1. Analyze application bundle composition.
2. Identify largest contributors to bundle.
3. Implement code splitting strategy.

## 20. References

- [Web.dev: Bundle Size](https://web.dev/vitals/#core-web-vitals)
- [Webpack Bundle Analysis](https://www.npmjs.com/package/webpack-bundle-analyzer)

---

## Module 11 (Angular Performance) Complete! ✅ (2 files)
