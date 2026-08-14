# Dependency Injection

## 1. Definition

**Dependency Injection (DI)** passes dependencies to classes/functions rather than constructing internally — enabling loose coupling and testability.

## 2. Why do we need it?

Reduce coupling, improve testability, centralize service management.

## 3. Internal Working

Three main forms:
1. **Constructor Injection**: Dependencies passed via constructor
2. **Setter Injection**: Set via property assignment
3. **Interface Injection**: Via dedicated interface
4. **Method Injection**: Factory function returning dependency

## 4. Step-by-Step Execution

```typescript
// Service definition
@Injectable()
class ApiService {
  getData() {}
}

// Consumer with constructor injection
@Component({
  // metadata
})
class DataManagerComponent {
  constructor(private api: ApiService) {} // DI container resolves ApiService
}

// Registration
@NgModule({
  providers: [ApiService] // Register in DI container
})
```

## 5. Syntax

```typescript
// Service
@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers(): Observable<User[]> {}
}

// Component consumer
@Component({...})
export class UserListComponent {
  users$: Observable<User[]>;

  constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Basic DI
@Injectable()
class LoggerService {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

@Component({
  template: '<button (click)="doSomething()">Click me</button>'
})
class ButtonComponent {
  constructor(private logger: LoggerService) {}

  doSomething(): void {
    this.logger.log('Button clicked');
  }
}
```

### Medium
```typescript
// Optional dependency injection
@Injectable()
class ConfigService {
  getConfig(): string {
    return 'default-config';
  }
}

@Injectable()
class FeatureService {
  constructor(@Optional() private config?: ConfigService) {}

  run(): void {
    const cfg = this.config?.getConfig() || 'fallback-config';
    console.log('Running with:', cfg);
  }
}
```

### Advanced
```typescript
// Custom factory provider with injection token
export const API_CONFIG = new InjectionToken<{
  baseUrl: string;
  timeout: number;
}>(
  'API_CONFIG', {
    factory: () => {
      const baseUrl = process.env['API_URL'] || 'http://localhost:3000';
      return { baseUrl, timeout: 5000 };
    }
  }
);

@Injectable()
export class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor(@Inject(API_CONFIG) config: any) {
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout;
  }
}

@NgModule({
  providers: [{
    provide: API_CONFIG,
    useFactory: () => ({
      baseUrl: 'https://api.example.com',
      timeout: 10000
    })
  }]
})
export class AppModule {}
```

## 7. Visual Diagram (ASCII)

```
Dependency Injection Flow

┌─────────────────────────────────────┐
│ Consumer Component                  │
│ Constructor expects ApiService      │
└─────────┬───────────────────────────┘
          │ Requests dependency
          ▼
┌─────────────────────────────────────┐
│ DI Container                        │
│ Resolves provider chain             │
│ Instantiates dependencies         │
└─────────┬───────────────────────────┘
          │ Injects resolved instance
          ▼
┌─────────────────────────────────────┐
│ ApiService Instance                 │
│ Shared/recreated based on scope     │
└─────────────────────────────────────┘
```

## 8. Real-world Example

Configurable HTTP client with environment-specific endpoints.

## 9. Angular Use Case

Service orchestration, testable components, configuration injection.

## 10. Common Mistakes

❌ Circular dependencies between services
❌ Over-injecting unused dependencies
❌ Providing services in wrong scope

## 11. Edge Cases

1. **ForwardRef for forward references**
   ```typescript
   constructor(@SkipSelf() @Optional() parent: ControlContainer) {}
   ```

## 12. Performance Considerations

DI resolution adds slight startup overhead.

## 13. Time & Space Complexity

O(dependency_chain_depth) per resolution.

## 14. Interview Questions

1. DI pattern benefits?
2. Provider scopes/types?
3. Circular dependency resolution?

## 15. Follow-up Questions

- "Implement custom provider?"

## 16. Production Best Practices

1. Prefer providedIn: 'root'
2. Use InjectionToken for non-class dependencies
3. Keep service hierarchies shallow
4. Avoid circular dependencies
5. Use @Optional() for optional deps

## 17. Summary

Dependency injection decouples components from their dependencies, boosting modularity and testability.

## 18. Revision Notes

- Constructor injection most common
- Providers register services in DI container
- providedIn controls scope (root/module/component)
- InjectionToken for non-class values
- @Optional() prevents errors on missing deps

## 19. Practice Questions

1. Refactor service with DI.
2. Implement optional dependency injection.
3. Configure factory provider with InjectionToken.

## 20. References

- [Angular: Dependency Injection](https://angular.io/guide/dependency-injection)

---
