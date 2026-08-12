# Dependency Injection Advanced Patterns

## 1. Definition

**Advanced DI** patterns handle dynamic injection, hierarchical overrides, and service composition.

## 2. Why do we need it?

Complex apps require flexible service composition beyond static providers.

## 3. Internal Working

Patterns:
- **Injection tokens**: Non-class dependencies
- **Factory providers**: Dynamic service creation
- **Hierarchical injectors**: Parent-child service resolution
- **Optional injection**: @Optional() handling
- **SkipSelf injection**: Control resolution scope

## 4. Step-by-Step Execution

```typescript
// Injection token for configuration
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// Factory provider
export function createApiConfig() {
  return {
    endpoint: environment.apiEndpoint,
    timeout: 10000
  };
}

@NgModule({
  providers: [
    { provide: APP_CONFIG, useFactory: createApiConfig }
  ]
})

// Hierarchical injection
@Component({
  providers: [
    { provide: LoggerService, useClass: DebugLoggerService }
  ]
})
export class DebugComponent {
  constructor(private logger: LoggerService) {} // Gets DebugLoggerService
}
```

## 5. Syntax

```typescript
// Inject optional dependencies
constructor(
  @Optional() private parent: ControlContainer,
  @SkipSelf() private injector: Injector
) {}

// Use existing service
{ provide: ApiService, useExisting: MockApiService }
```

## 6. Examples

### Advanced
```typescript
// Contextual service factory
export function createHttpService(config: AppConfig, errorHandler: ErrorHandler) {
  return new HttpService(config.endpoint, errorHandler);
}

@NgModule({
  providers: [
    {
      provide: HttpService,
      useFactory: createHttpService,
      deps: [APP_CONFIG, ErrorHandler]
    }
  ]
})

// Self-provisioning services
@Injectable()
export class ApiService {
  static providedIn = 'root';

  @Optional()
  @SkipSelf()
  parentApiService?: ApiService; // Get parent instance
}
```

## 7. Interview Questions

1. @SkipSelf behavior?
2. Injector hierarchy resolution?
3. When to use factory providers?

## 8. Summary

Advanced DI patterns provide flexibility for complex service wiring scenarios.

## 9. References

- [Angular DI Advanced](https://angular.io/guide/dependency-injection#hierarchical-injectors)

---

## FINAL GENERATION BATCH:
