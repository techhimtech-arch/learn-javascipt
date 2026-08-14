# Build Optimization

## 1. Definition

**Build Optimization** enhances compilation speed and output efficiency — reducing bundle sizes and improving build times through caching, parallelization, and smart bundling.

## 2. Why do we need it?

Faster builds improve developer velocity; smaller bundles improve user experience.

## 3. Internal Working

Key optimizations:
1. **Incremental compilation**: Only rebuild changed files
2. **Persistent caching**: Store compiled artifacts between builds
3. **Parallelization**: Split work across threads
4. **Dead code elimination**: Remove unused exports
5. **Tree shaking**: Eliminate unreachable code

## 4. Step-by-Step Execution

Angular build cache setup:
```json
{
  "cli": {
    "cache": {
      "environment": "local",
      "base": "node_modules/.cache/angular-webpack"
    }
  }
}
```

## 5. Syntax

```bash
# Parallel builds
ng build --parallel 4

# Cache optimization
ng build --build-optimizer

# Stats output
ng build --stats-json --verbose
```

## 6. Examples

### Easy
```json
// angular.json - enable caching
{
  "build": {
    "options": {
      "optimization": true,
      "buildOptimizer": true,
      "vendorChunk": true
    }
  }
}
```

### Medium
```json
// Webpack caching config
{
  "cache": {
    "type": "filesystem",
    "buildDependencies": {
      "config": ["webpack.config.js"]
    }
  }
}
```

### Advanced
```typescript
// Custom webpack optimization
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuse: true
        },
        default: {
          minChunks: 2,
          priority: 2,
          enforceSizeThreshold: 50000
        }
      }
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true // Remove console statements
          }
        }
      })
    ]
  }
};
```

## 7. Visual Diagram (ASCII)

```
Build Optimization Pipeline

Source Files ──► Compiler ──► Bundler ──► Optimizer ──► Output
                        │        │        │
                  Incremental  Cache    Tree
                    Compilation        Shaking

┌─────────────────────────────────────┐
│ Build Speed Improvements            │
├─────────────────────────────────────┤
│ Persistent caching                  │
│ Parallel compilation                │
│ Dead code elimination               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Output Size Reduction               │
├─────────────────────────────────────┤
│ Tree shaking                        │
│ Minification                        │
│ Code splitting                      │
└─────────────────────────────────────┘
```

## 8. Real-world Example

Enterprise monorepo with incremental build caching reducing CI time from 15min → 3min.

## 9. Angular Use Case

CI/CD build pipelines, monorepo management, dependency optimization.

## 10. Common Mistakes

❌ Not enabling persistent caching
❌ Disabling build optimizer

## 11. Edge Cases

1. **Cache invalidation in CI**

## 12. Performance Considerations

Caching is biggest win — avoid recompiling identical inputs.

## 13. Time & Space Complexity

Build times reduced proportionally to cache hit rate.

## 14. Interview Questions

1. Angular build cache benefits?
2. Tree shaking limitations?
3. Code splitting strategies?

## 15. Follow-up Questions

- "Debug slow Angular builds?"

## 16. Production Best Practices

1. Enable filesystem caching
2. Use parallel builds
3. Configure split points thoughtfully
4. Monitor build times in CI
5. Strip debug code in production

## 17. Summary

Build optimizations compound over development cycles — invest early.

## 18. Revision Notes

- Caching speeds up repeated builds
- Tree shaking removes unused code
- Code splitting enables lazy loading
- Parallel compilation uses CPU cores

## 19. Practice Questions

1. Enable persistent build caching.
2. Configure optimal code splitting.
3. Profile build performance bottlenecks.

## 20. References

- [Angular CLI: Caching](https://angular.io/cli/build#the-long-term-cache)
- [Terser Options](https://github.com/terser/terser)

---
