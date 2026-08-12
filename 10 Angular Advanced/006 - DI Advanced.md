# Dependency Injection Advanced Topics

## 1. Definition

Advanced Angular DI patterns — hierarchical injectors, view providers, tree-shakable providers, dynamic service injection with TestBed overrides.

## 2. Why do we need it?

Complex applications need contextual service instances, lazy-loaded isolated dependencies, and flexible provider overrides.

## 3. Internal Working

Hierarchical resolution:
1. Component-level injector checked first
2. Template-level providers consulted next
3. NgModule injector searched
4. Root injector final fallback

## 4. Step-by-Step Execution

View Providers isolation:
```typescript
@Component({
  selector: 'parent-comp',
  viewProviders: [
    { provide: HeroService, useClass: MockHeroService } // Isolated to this component's view
  ],
  template: `<child-comp></child-comp>`
})
export class ParentComponent {}

// Child gets MockHeroService, siblings unaffected
```

## 5. Syntax

```typescript
@NgModule({
  providers: [{ provide: ApiService, useClass: ProdService }],
  // vs
  viewProviders: [{ provide: ApiService, useClass: TestService }]
})
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Override at component level
@Component({
  providers: [{ provide: LoggerService, useValue: console.log }]
})
```

### Medium
```typescript
// Tree-shakable providers
@Injectable({ providedIn: 'root' })
export class FeatureService {
  // Only bundled if injected somewhere
}

// Test override
await TestBed.configureTestingModule({
  providers: [{
    provide: FeatureService,
    useClass: MockFeatureService
  }]
}).compileComponents();
```

### Advanced
```typescript
// Dynamic provider resolution with factory
export function createApiUrlFactory(environment: Environment) {
  return environment.production 
    ? 'https://prod.api.com' 
    : 'http://localhost:3000';
}

@NgModule({
  providers: [
    {
      provide: API_URL_TOKEN,
      useFactory: createApiUrlFactory,
      deps: [Environment]
    }
  ]
})
export class AppModule {}
```

## 7. Visual Diagram (ASCII)

```
Injector Hierarchy

Root Injector ──► NgModule Injector ──► Component Injector ──► ViewChild Injector
                                      │
                              viewProviders isolated here
```

## 8. Real-world Example

Lazy-loaded admin section using mock services during development.

## 9. Angular Use Case

Environment-specific configurations, testing overrides, feature-specific services.

## 10. Common Mistakes

❌ Using viewProviders unnecessarily
❌ Circular dependency issues with deep provider trees

## 11. Edge Cases

1. **Token collision prevention**
   ```typescript
   const TOKEN = new InjectionToken('unique-id');
   ```

2. **Provider precedence resolution**

## 12. Performance Considerations

Tree-shakable providers eliminate unused service code from bundles.

## 13. Time & Space Complexity

Resolution follows O(depth) path.

## 14. Interview Questions

1. Provider vs viewProvider difference?
2. Tree-shakable provider benefits?
3. DI resolution algorithm?

## 15. Follow-up Questions

- "Debug missing provider errors?"

## 16. Production Best Practices

1. Prefer providedIn: 'root' over module providers
2. Use injection tokens for primitives
3. Document provider contracts clearly
4. Use useExisting for aliases

## 17. Summary

Advanced DI patterns enable sophisticated service orchestration.

## 18. Revision Notes

- viewProviders scope to component subtree
- Tree-shakable = no unused code shipped
- Hierarchical resolution order
- Injection tokens for non-class values

## 19. Practice Questions

1. Override service for testing.
2. Create environment-aware factory provider.
3. Implement hierarchical service isolation.

## 20. References

- [Angular: Hierarchical Injectors](https://angular.io/guide/hierarchical-dependency-injection)

### Next File
**007 - Structural Directives.md**
