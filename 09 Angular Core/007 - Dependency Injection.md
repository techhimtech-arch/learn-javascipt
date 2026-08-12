# Dependency Injection

## 1. Definition

**Dependency Injection (DI)** is Angular's built-in mechanism for providing and injecting services/configurations — enabling loose coupling and testability.

## 2. Why do we need it?

Decouple service creation from usage — centralize instantiation, enable mocking/testing, promote reusability.

## 3. Internal Working

1. Providers register tokens mapping to implementations
2. Injectors resolve dependencies recursively
3. Services instantiated lazily on first request
4. Hierarchical injection allows override per component

## 4. Step-by-Step Execution

Example:
```typescript
@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(msg: string) { console.log(msg); }
}

@Component({
  selector: 'my-component',
  template: `<p>Hello</p>`
})
export class MyComponent {
  constructor(private logger: LoggerService) {
    this.logger.log('Component created');
  }
}
```

Steps:
1. Define `@Injectable()` with provider scope
2. Inject via constructor parameter
3. Angular resolves LoggerService from root injector
4. Instance shared across app (singleton due to providedIn:'root')

## 5. Syntax

```typescript
// Service
@Injectable()
export class MyService {
  constructor(private http: HttpClient) {}
}

// Provider registration
@NgModule({
  providers: [MyService]
})
export class AppModule {}

// Injection
export class SomeComponent {
  constructor(private myService: MyService) {}
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
@Injectable({ providedIn: 'root' })
export class TitleService {
  setTitle(title: string) { document.title = title; }
}
```

### Medium
```typescript
@Injectable()
export class DataService {
  private baseUrl = 'https://api.example.com';
  
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private config: ApiConfig
  ) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.config.endpoint}/users`);
  }
}
```

### Advanced
```typescript
// Hierarchical injectors example
@Injectable()
export class CounterService {
  private count = 0;
  increment() { this.count++; }
  getCount() { return this.count; }
}

@Component({
  selector: 'parent',
  providers: [CounterService], // Local instance
  template: `<child></child>`
})
export class ParentComponent {
  constructor(counter: CounterService) { }
}

@Component({
  selector: 'counter-display',
  template: `<span>{{ counter.getCount() }}</span>`
})
export class CounterDisplayComponent {
  constructor(public counter: CounterService) {}
}
```

## 7. Visual Diagram (ASCII)

```
DI Container Hierarchy

Root Injector
├─ UserService (singleton)
├─ ConfigService (singleton)
├─ Feature Module Injector
│   └─ LoggerService (local instance)
└─ Child Component Injector
    └─ Can override inherited services
```

## 8. Real-world Example

HTTP interceptor service with configuration injection.

## 9. Angular Use Case

Service orchestration, configuration injection, testing mocks.

## 10. Common Mistakes

❌ Using `providedIn: 'root'` unnecessarily
❌ Circular dependencies between services
❌ Forgetting providedIn annotation

## 11. Edge Cases

1. **Hierarchical providers**
   ```typescript
   @Component({
     providers: [{ provide: API_URL, useValue: '/local-api' }]
   })
   ```

2. **Injection tokens**
   ```typescript
   export const API_URL = new InjectionToken<string>('apiUrl');
   ```

## 12. Performance Considerations

Singleton-scoped services minimize overhead.

## 13. Time & Space Complexity

O(1) instantiation cost (lazy); constant memory footprint.

## 14. Interview Questions

1. How does DI resolve dependencies?
2. Injector hierarchy explanation?
3. When to use Injection Tokens?

## 15. Follow-up Questions

- "How do you break circular dependencies?"

## 16. Production Best Practices

1. Prefer `providedIn: 'root'` for global services
2. Use feature-level providers for scoped services
3. Inject configurations with tokens
4. Provide interfaces via abstract classes

## 17. Summary

Angular DI promotes loose coupling while maintaining centralized control over instantiation lifecycles.

## 18. Revision Notes

- @Injectable decorator marks service
- providedIn controls visibility/scoping
- Hierarchical injectors support overriding
- Injection tokens allow primitive injection

## 19. Practice Questions

1. Refactor tightly-coupled components to use DI.
2. Create configurable service with InjectionToken.
3. Demonstrate hierarchical injection behavior.

## 20. References

- [Angular: Dependency Injection](https://angular.io/guide/dependency-injection)
- [Angular: DI Guide](https://angular.io/guide/dependency-injection-in-action)

### Next File
**008 - Lifecycle Hooks.md**
