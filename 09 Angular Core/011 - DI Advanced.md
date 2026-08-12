# Dependency Injection Advanced

## 1. Definition

Advanced Angular DI features including hierarchy, tokens, factories, providers, and multi-providers — enabling flexible service configuration.

## 2. Why do we need it?

Complex apps need contextual services, lazy-loaded isolated instances, and plugin-style extensible providers.

## 3. Internal Working

Injector tree:
1. Root injector created at app startup
2. Each NgModule/component can have own child injector
3. Resolution walks up hierarchy until match found
4. `@Inject(TOKEN)` specifies exact provider key

## 4. Step-by-Step Execution

Example:
```typescript
// Token
export const API_URL = new InjectionToken<string>('api_url');

// Provider
@NgModule({
  providers: [
    { provide: API_URL, useValue: 'https://prod-api.com' }
  ]
})
export class AppModule {}

// Override in component
@Component({
  selector: 'feature',
  providers: [
    { provide: API_URL, useValue: 'https://feature-api.com' }
  ]
})
export class FeatureComponent {
  constructor(@Inject(API_URL) private apiUrl: string) { }
}
```

## 5. Syntax

```typescript
// Factory provider
{ provide: Logger, useFactory: createLogger, deps: [ENV] }

// Multi provider
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

// Opaque token
{ provide: TOKEN_NAME, useValue: 'token_value' }
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Use existing service elsewhere
@NgModule({
  providers: [{ provide: ApiService, useExisting: ProductionApi }]
})
```

### Medium
```typescript
// Multi-provider pattern
export abstract class Plugin {
  abstract name: string;
  abstract apply(): void;
}

@NgModule({
  providers: [
    { provide: Plugin, useClass: AnalyticsPlugin, multi: true },
    { provide: Plugin, useClass: LoggerPlugin, multi: true }
  ]
})
export class AppModule {
  constructor(plugins: Plugin[]) {
    plugins.forEach(p => p.apply());
  }
}
```

### Advanced
```typescript
// Factory with conditional logic
@Injectable()
export class ConditionalLoggerService {
  log(level: string, msg: string): void {
    if (this.isDevMode()) {
      console.log(`[${level}] ${msg}`);
    }
  }

  private isDevMode(): boolean {
    return !environment.production;
  }
}

@NgModule({
  providers: [
    {
      provide: LoggerService,
      useFactory: (env: Environment) => 
        env.production 
          ? new ProductionLoggerService() 
          : new ConditionalLoggerService(),
      deps: [ENVIRONMENT]
    }
  ]
})
```

## 7. Visual Diagram (ASCII)

```
DI Provider Types Matrix

┌──────────────┬────────────────┬─────────────┐
│ Provider     │ Syntax         │ Use Case    │
├──────────────┼────────────────┼─────────────┤
│ useClass     │ { useClass: X }│ Concrete    │
│ useExisting  │ { useExisting }│ Alias       │
│ useFactory   │ { useFactory } │ Dynamic     │
│ useValue     │ { useValue: Y }│ Static Value│
│ Multi        │ { multi: true }│ Plugin List │
└──────────────┴────────────────┴─────────────┘
```

## 8. Real-world Example

Environment-specific API URLs injected conditionally.

## 9. Angular Use Case

Configuration injection, environment-aware services, plugin architectures.

## 10. Common Mistakes

❌ Circular provider dependencies
❌ Overriding providers unintentionally

## 11. Edge Cases

1. **Hierarchical scoping**
2. **Provider resolution order**
3. **Token collisions**

## 12. Performance Considerations

Minimal overhead — resolved once per injector lifecycle.

## 13. Time & Space Complexity

O(d) lookup where d = injector depth.

## 14. Interview Questions

1. Provider resolution algorithm?
2. Multi-provider aggregation?
3. Token-based injection purpose?

## 15. Follow-up Questions

- "Implement service locator pattern?"

## 16. Production Best Practices

1. Tokenize external config values
2. Use factory providers carefully
3. Document provider contracts
4. Validate injection tokens at startup

## 17. Summary

Advanced DI features enable sophisticated application architectures and extensibility.

## 18. Revision Notes

- Provider types: useClass, useExisting, useFactory, useValue
- Multi-providers collect arrays
- Hierarchy allows scoped overrides
- InjectionTokens for non-class dependencies

## 19. Practice Questions

1. Set up environment-based API URL injection.
2. Create plugin system with multi-providers.
3. Implement conditional logging service.

## 20. References

- [Angular DI Guide](https://angular.io/guide/dependency-injection)
- [Angular Providers](https://angular.io/guide/providers)

### Next File
**011 - Change Detection.md**
