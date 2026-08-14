# Ivy Renderer

## 1. Definition

**Ivy** is Angular's next-generation compilation and rendering engine (introduced in v9) — replacing View Engine with improved compilation, smaller bundles, and enhanced debugging.

## 2. Why do we need it?

Deliver better build times, smaller bundles, improved type safety, and enhanced developer experience.

## 3. Internal Working

Key improvements:
- **Tree-shakable**: Unused code eliminated automatically
- **Faster compilation**: Incremental compilation support
- **Smaller outputs**: Reduced polyfills needed
- **Stronger typing**: Compile-time template type checking
- **Improved debugging**: Easier to trace runtime errors

## 4. Step-by-Step Execution

Compilation pipeline:
1. Each component compiles to self-contained definition
2. Uses `ɵcmp`, `ɵdir`, `ɵinj` internal metadata fields
3. No separate metadata.json files
4. Direct DOM manipulation optimized

## 5. Syntax

```typescript
// With Ivy, no special syntax required — backward compatible
@Component({
  selector: 'app-hero',
  template: `<h2>Hi {{hero.name}}</h2>`
})
export class HeroComponent {}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Ivy automatically enabled in Angular 9+
// No migration needed for basic usage
```

### Medium
```typescript
// Improved debugging with __ngContext__
@Component({
  template: `<p>{{ value }}</p>`
})
export class DebuggableComponent {
  value = 'Hello Ivy!';
  
  ngDoCheck(): void {
    // Ivy makes change detection easier to debug
    console.log('Checking component');
  }
}
```

### Advanced
```typescript
// Using Ivy's local compilation for partial libraries
@NgModule({
  // Only compile this module with Ivy
  // Allows mixing View Engine/Ivy in monorepo
})
export class LibraryModule {}
```

## 7. Visual Diagram (ASCII)

```
Angular Rendering Engines

View Engine                Ivy
┌─────────────────┐      ┌─────────────────────┐
│ Separate        │      │ Self-contained      │
│ metadata.json   │      │ component defs      │
│ files           │      │ (no .metadata.json) │
└─────────────────┘      └─────────────────────┘
        │                        │
  Slower build speed       Faster builds
  Larger bundles         Tree-shakeable
  Weak typing            Strong typing
```

## 8. Real-world Example

Migration to Ivy for 40% faster build times in enterprise Angular app.

## 9. Angular Use Case

All modern Angular apps — Ivy is default since v9.

## 10. Common Mistakes

❌ Not migrating legacy View Engine libraries properly

## 11. Edge Cases

1. **Library compatibility**
   ```typescript
   // Mixing View Engine libraries with Ivy apps
   ```

2. **Custom rendering strategies**

## 12. Performance Considerations

Significant improvement in build times and bundle sizes.

## 13. Time & Space Complexity

Compilation more efficient; runtime equally performant.

## 14. Interview Questions

1. Key differences from View Engine?
2. Tree-shaking improvements?
3. Debugging enhancements?

## 15. Follow-up Questions

- "What breaking changes came with Ivy?"

## 16. Production Best Practices

1. Upgrade to latest Angular version
2. Remove View Engine-specific configurations
3. Enable strict template checking
4. Profile before/after migration

## 17. Summary

Ivy modernizes Angular's compiler/rendering with faster builds and smaller bundles.

## 18. Revision Notes

- Enabled by default in Angular 9+
- No metadata.json requirement
- Tree-shakable providers
- Stronger type checking
- Faster incremental builds

## 19. Practice Questions

1. Compare bundle sizes pre/post Ivy.
2. Identify Ivy-only features.
3. Fix common migration warnings.

## 20. References

- [Angular Ivy Guide](https://angular.io/guide/ivy)
- [Angular: Ivy Compatibility](https://angular.io/guide/ivy#ivy-compatibility

### Next File
**013 - Server Side Rendering.md**
