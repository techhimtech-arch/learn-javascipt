# Bundle Optimization

## 1. Definition

**Bundle Optimization** reduces frontend assets size through splitting, compression, dead-code elimination — improving load time and bandwidth usage.

## 2. Why do we need it?

Slow initial loads = poor UX, higher bounce rates — especially critical on mobile networks.

## 3. Internal Working

Techniques:
1. **Code Splitting**: Break bundles into smaller chunks
2. **Tree Shaking**: Remove unused code statically
3. **Minification**: Shorten identifiers/variable names
4. **Compression**: Gzip/Brotli encode final output
5. **Caching**: Long-term versioning strategies

## 4. Step-by-Step Execution

Angular CLI config:
```json
{
  "build": {
    "options": {
      "optimization": {
        "scripts": true,
        "styles": { "minify": true },
        "fonts": true
      },
      "buildOptimizer": true,
      "vendorChunk": true,
      "extractLicenses": true
    }
  }
}
```

Process flow:
1. Entry point imports analyzed
2. Dependency graph constructed
3. Unused exports marked for removal
4. Chunks generated and named
5. Files hashed for cache invalidation
6. Compressed output written

## 5. Syntax

```bash
# CLI flags
ng build --configuration production --stats-json

# Analyze bundles
npx webpack-bundle-analyzer dist/stats.json
```

```typescript
// Lazy-loaded route triggers separate chunk
const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () => import('./feature/feature.component')
  }
];
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Lazy load feature module
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

### Medium
```typescript
// Preload strategy for non-critical modules
@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}

@NgModule({
  imports: [{
    path: 'reports',
    loadChildren: () => import('./reports/reports.module'),
    data: { preload: true }
  }]
})
```

### Advanced
```typescript
// Webpack Bundle Analyzer integration
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ]
};
```

## 7. Visual Diagram (ASCII)

```
Bundle Optimization Pipeline

Source Code
    │
    ▼
Dependency Graph
    │
    ▼
Tree Shaking (remove unused)
    │
    ▼
Code Splitting (chunk creation)
    │
    ▼
Minification (shorten names)
    │
    ▼
Compression (gzip/brotli)
    │
    ▼
Versioned Assets (content-hash)
```

## 8. Real-world Example

E-commerce site splitting product catalog, cart, and checkout into separate bundles.

## 9. Angular Use Case

Reducing first-paint time, improving Lighthouse scores, mobile performance.

## 10. Common Mistakes

❌ Including unnecessary polyfills globally
❌ Disabling lazy loading

## 11. Edge Cases

1. **Circular dependencies causing chunk bloat**
2. **Large vendor libraries (moment.js alternatives)**
3. **Async boundary timing**

## 12. Performance Considerations

Balance chunk count vs cacheability — smaller chunks improve parallelization.

## 13. Time & Space Complexity

Build time grows with analysis depth; runtime savings significant.

## 14. Interview Questions

1. Types of code splitting strategies?
2. Tree-shaking limitations?
3. Content hashing for caching?

## 15. Follow-up Questions

- "Measure bundle impact on performance?"

## 16. Production Best Practices

1. Use webpack-bundle-analyzer regularly
2. Split vendor vs app code
3. Enable compression (gzip/brotli)
4. Set long cache headers (1yr) with content hashes

## 17. Summary

Proper bundling strategy dramatically impacts perceived app performance.

## 18. Revision Notes

- Code splitting reduces main bundle size
- Tree shaking removes dead exports
- Minification shrinks identifiers
- Compression shrinks bytes on wire
- Content hashes bust stale caches

## 19. Practice Questions

1. Analyze and reduce large bundle size.
2. Implement selective preloading strategy.
3. Configure long-term caching headers.

## 20. References

- [Webpack Optimization](https://webpack.js.org/guides/tree-shaking/)
- [Angular Production Build](https://angular.io/guide/build#production-environment-build)

---

## Module 13 (System Design) - Continuing...
