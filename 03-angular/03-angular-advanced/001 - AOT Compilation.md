# Ahead-of-Time Compilation (AOT)

## 1. Definition

**AOT (Ahead-of-Time) Compilation** pre-compiles Angular applications in the browser at build time — rather than in the browser via JIT (Just-In-Time).

## 2. Why do we need it?

Reduce runtime overhead, catch template errors early, enable tree-shaking for smaller bundles.

## 3. Internal Working

Build-time steps:
1. Angular compiler analyzes templates
2. Generates TypeScript factory functions
3. Outputs optimized JavaScript/DOM instructions
4. Eliminates compiler from runtime bundle

## 4. Step-by-Step Execution

JIT flow:
```
Browser → Runtime Compiler → Template → DOM Instructions
                                    ↘ Render
```

AOT flow:
```
Build: Template → Compiler → Factories → Bundled JS
Run:                Precompiled Factories → DOM Instructions → Render
```

## 5. Syntax

```bash
# CLI defaults to AOT in production builds
ng build --configuration production

# Explicitly in tsconfig.json
{
  "angularCompilerOptions": {
    "compilationMode": "partial"
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```json
// angular.json optimization settings
{
  "build": {
    "options": {
      "aot": true,
      "optimization": true
    }
  }
}
```

### Medium
```typescript
// Metadata.json removal with strict templates
{
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true,
    "strictTemplates": true,
    "strictSafeNavigationTypes": true
  }
}
```

### Advanced
```typescript
// Custom element schema for non-Angular elements
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow custom tags
  declarations: [AppComponent]
})
export class AppModule {}
```

## 7. Visual Diagram (ASCII)

```
AOT vs JIT Comparison

JIT Build ──┐
            ├── Include compiler runtime (larger bundle)
            └── Templates parsed at runtime (slower)

AOT Build ──┐
            ├── Compiler excluded from runtime (smaller bundle)
            └── Fully compiled templates (faster startup)
            └── Type-checked templates (earlier errors)
```

## 8. Real-world Example

CI/CD pipeline enforcing AOT + strict checks for production deploys.

## 9. Angular Use Case

Production builds, library development with strict type checking.

## 10. Common Mistakes

❌ Relying on JIT-only patterns (e.g., dynamic components without proper setup)

## 11. Edge Cases

1. **Dynamic component compilation**
   ```typescript
   // JIT-style dynamic components incompatible with strict AOT
   ```

2. **Third-party directive selectors**

## 12. Performance Considerations

AOT enables smaller bundles and faster rendering — critical for mobile performance.

## 13. Time & Space Complexity

Build time increases, but runtime performance improves dramatically.

## 14. Interview Questions

1. AOT vs JIT tradeoffs?
2. Template type checking benefits?
3. Production build optimizations?

## 15. Follow-up Questions

- "How to debug AOT compilation errors?"

## 16. Production Best Practices

1. Always use AOT for production
2. Enable strict template type checking
3. Catch binding errors during build
4. Monitor bundle sizes regularly

## 17. Summary

AOT compilation produces faster, smaller apps with earlier error detection.

## 18. Revision Notes

- Templates compiled to factory functions
- Compiler excluded from final bundle
- Strict type checking catches errors at build
- Required for production-grade performance

## 19. Practice Questions

1. Configure strict AOT builds.
2. Fix common AOT template errors.
3. Analyze bundle size differences.

## 20. References

- [Angular: AOT Guide](https://angular.io/guide/aot)

### Next File
**012 - Ivy Renderer.md**
