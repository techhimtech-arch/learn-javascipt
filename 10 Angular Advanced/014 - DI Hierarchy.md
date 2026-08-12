# Dependency Injection Tree

## 1. Definition

**Dependency Injection Hierarchy** in Angular organizes services across injector levels — enabling contextual, shared, and isolated instances.

## 2. Why do we need it?

Control service lifetimes, enable mocking overrides, share state appropriately across subtrees.

## 3. Internal Working

Resolution flow:
1. Component requests dependency
2. Searches local injector
3. Walks up parent injectors
4. Resolves at nearest matching provider
5. Instantiates service (if needed) or returns existing

## 4. Step-by-Step Execution

Example override:
```typescript
@NgModule({
  providers: [
    { provide: ApiService, useClass: ProductionService }
  ]
})
export class AppModule {}

@Component({
  providers: [
    { provide: ApiService, useClass: MockService } // Override at component level
  ]
})
export class FeatureComponent {}
```

## 5. Syntax

```typescript
@NgModule({
  providers: [] // App-level singletons
})
export class AppModule {}

@Component({
  providers: [], // Component-level isolation
  viewProviders: [] // View-only providers
})
export class MyComponent {}
```

## 6. Examples

### Easy
```typescript
// Service with providedIn root
@Injectable({ providedIn: 'root' })
export class GlobalService {}

// Component-level override
@Component({
  selector: 'feature',
  providers: [{ provide: ApiService, useClass: FeatureApi }]
})
```

### Medium
```typescript
// Hierarchical service injection
@Component({
  selector: 'parent',
  providers: [ConfigService] // Instance owned by parent
})
class ParentComponent {
  constructor(config: ConfigService) {} // Parent gets config instance
}

@Component({
  selector: 'child',
  // No providers - inherits parent instance
})
class ChildComponent {
  constructor(config: ConfigService) {} // Gets parent's config instance
}
```

### Advanced
```typescript
// Dynamic provider with factory
export function getLoggerFactory(env: Environment): LoggerService {
  if (env.production) {
    return new ProdLoggerService();
  }
  return new DevLoggerService();
}

@NgModule({
  providers: [
    {
      provide: LoggerService,
      useFactory: getLoggerFactory,
      deps: [Environment]
    }
  ]
})
export class AppModule {}
```

## 7. Visual Diagram (ASCII)

```
Injector Resolution Path

Request Service
       │
       ▼
Component Injector (local providers)
       │
       ▼
Parent Component Injector
       │
       ▼
Module Injector
       │
       ▼
Root Injector (providersInRoot)
```

## 8. Real-world Example

Admin module overriding auth service with admin-specific implementation.

## 9. Angular Use Case

Environment-specific services, testing mocks, shared utilities.

## 10. Common Mistakes

❌ Registering same service in multiple modules
❌ Unexpected service instances due to provider misplacement

## 11. Edge Cases

1. **Multiple matching providers**
2. **Null injection tokens**

## 12. Performance Considerations

Each injector adds lookup overhead — balance granularity carefully.

## 13. Time & Space Complexity

O(depth) per dependency resolution.

## 14. Interview Questions

1. Injector hierarchy traversal?
2. Provider scope types?
3. When to override at component level?

## 15. Follow-up Questions

- "Debug missing provider errors?"

## 16. Production Best Practices

1. Use providedIn: 'root' for true singletons
2. Document service scopes explicitly
3. Override for testing via TestBed
4. Separate configuration from logic

## 17. Summary

Injector hierarchy gives fine control over service instantiation lifecycles.

## 18. Revision Notes

- Local providers override higher-level ones
- Providers: component-level isolation
- ViewProviders: view-only scope
- providedIn: 'root' avoids duplicate singletons

## 19. Practice Questions

1. Override service for feature module.
2. Create environment-aware logger.
3. Debug hierarchical service behavior.

## 20. References

- [Angular: DI Hierarchy](https://angular.io/guide/hierarchical-dependency-injection)

---
