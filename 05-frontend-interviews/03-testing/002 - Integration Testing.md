# Integration Testing

## 1. Definition

**Integration Testing** validates how multiple units/modules interact — catching interface mismatches, data flow errors, and wiring issues.

## 2. Why do we need it?

Detect bugs crossing component boundaries that unit tests miss — especially critical in Angular's dependency-injected ecosystem.

## 3. Internal Working

Tests combinations:
1. Module wiring (providers, imports)
2. Component-child interactions
3. Service integrations with HTTP
4. Full dependency injection graphs

## 4. Step-by-Step Execution

Component+dependencies test:
```typescript
describe('AppComponent with Children', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, HttpClientModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers: [ApiService]
    });
  });

  it('renders child components', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    
    expect(fixture.nativeElement.querySelector('app-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-footer')).toBeTruthy();
  });
});
```

## 5. Syntax

```typescript
// Shallow rendering vs full rendering
TestBed.configureTestingModule({
  declarations: [HostComponent] // Shallow: children mocked automatically
});

// Full rendering
TestBed.configureTestingModule({
  declarations: [HostComponent, ChildComponent]
});
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Testing component with child template
@Component({
  template: `<child-component></child-component>`
})
class HostComponent {}

describe('Host <-> Child', () => {
  it('passes input correctly', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    
    const child = fixture.debugElement.query(By.css('child-component'));
    expect(child.componentInstance.someInput).toBeDefined();
  });
});
```

### Medium
```typescript
// Testing HTTP service integration
describe('UserService API Integration', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('fetches user list and updates store', () => {
    const testUsers = [{ id: 1, name: 'Alice' }];
    
    service.loadUsers().subscribe(() => {
      expect(service.users.length).toBe(1);
    });

    const req = httpMock.expectOne('/api/users');
    req.flush(testUsers);
  });
});
```

### Advanced
```typescript
// End-to-end component integration with async streams
describe('SearchWidget with API', () => {
  let fixture: ComponentFixture<SearchWidgetComponent>;
  let api: SearchService;
  let store: MockStore;

  beforeEach(() => {
    store = MockStore.getInstance();
    api = jasmine.createSpyObj('SearchService', ['search']);
    
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SearchWidgetComponent],
      providers: [
        { provide: SearchService, useValue: api },
        { provide: Store, useValue: store }
      ]
    });

    fixture = TestBed.createComponent(SearchWidgetComponent);
    component = fixture.componentInstance;
  });

  it('debounces search input and calls API', fakeAsync(() => {
    const results = [{ title: 'Result' }];
    (api.search as jasmine.Spy).and.returnValue(of(results));

    component.searchControl.setValue('query');
    
    tick(300); // debounce delay
    
    expect(api.search).toHaveBeenCalledWith('query');
    expect(component.results).toEqual(results);
  }));
});
```

## 7. Visual Diagram (ASCII)

```
Integration Test Scope

Unit Test Scope    Integration Test Scope     E2E Test Scope
     │                    │                        │
Single Function   Multiple Services + HTTP    Full Application
No Dependencies   Real DI Container           Browser Rendering
Fast              Slower                       Slowest
```

## 8. Real-world Example

Authentication flow involving login form → auth service → token storage → navigation.

## 9. Angular Use Case

Module-level testing, HTTP integration, component/service combos.

## 10. Common Mistakes

❌ Mixing real and mocked dependencies inconsistently
❌ Not resetting mocks between tests

## 11. Edge Cases

1. **Real HTTP vs HttpTestingController**
2. **Async pipe timing**
3. **Dependency injection resolution order**

## 12. Performance Considerations

Slower than pure unit tests — focus on key integration points.

## 13. Time & Space Complexity

O(interactions) — depends on integrated surface area.

## 14. Interview Questions

1. Integration vs unit testing?
2. When to use shallow rendering?
3. Testing async behaviors?

## 15. Follow-up Questions

- "Mock external services?"

## 16. Production Best Practices

1. Isolate external dependencies
2. Use HttpTestingController for stable HTTP tests
3. Reset mocks in beforeEach
4. Cover main integration paths

## 17. Summary

Integration tests catch wiring bugs that unit tests miss.

## 18. Revision Notes

- Combine real components with mocked externals
- Leverage TestBed fully configured
- Handle async via fakeAsync/tick
- Verify real interactions occur

## 19. Practice Questions

1. Test component rendering children.
2. Integrate service with HTTP mock.
3. Test form submission with validation.

## 20. References

- [Angular Testing Guide](https://angular.io/guide/testing)
- [Jest Integration Tests](https://jestjs.io/docs/tutorial-async)

### Module 14 (Testing) - Continuing...
