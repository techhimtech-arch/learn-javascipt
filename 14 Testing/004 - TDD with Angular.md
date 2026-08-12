# TDD with Angular

## 1. Definition

**Test-Driven Development (TDD)** follows RED-GREEN-REFACTOR cycle — writing failing tests first, then implementation, then refactoring.

## 2. Why do we need it?

Drive design decisions, ensure test coverage, minimize debugging time.

## 3. Internal Working

Cycle:
1. **RED**: Write test that fails
2. **GREEN**: Write minimal code to pass
3. **REFACTOR**: Improve code structure without changing behavior

## 4. Step-by-Step Execution

Example: Counter component
```typescript
// RED - Failing test
it('should increment counter', () => {
  const fixture = TestBed.createComponent(CounterComponent);
  component.increment();
  expect(component.count).toBe(1);
});

// GREEN - Implementation
export class CounterComponent {
  count = 0;
  increment() { this.count++; }
}

// REFACTOR - Extract logic
export class CounterService {
  increment(count: number): number {
    return count + 1;
  }
}
```

## 5. Syntax

```typescript
// Angular testing setup
describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should increment value', () => {
    expect(service.increment(5)).toBe(6);
  });
});
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// CounterService spec
describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('increments count', () => {
    expect(service.increment(5)).toBe(6);
  });
});
```

### Medium
```typescript
// Form validation TDD
describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormComponent]
    });
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
  });

  it('creates valid form with empty fields', () => {
    expect(component.form.controls['email'].valid).toBeFalsy();
    expect(component.form.controls['password'].valid).toBeFalsy();
  });

  it('validates email format', () => {
    const email = component.form.controls['email'];
    email.setValue('invalid-email');
    expect(email.valid).toBeFalsy();
    
    email.setValue('valid@email.com');
    expect(email.valid).toBeTruthy();
  });
});
```

### Advanced
```typescript
// Component interaction TDD
describe('SearchWidgetComponent', () => {
  let fixture: ComponentFixture<SearchWidgetComponent>;
  let component: SearchWidgetComponent;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['search']);
    
    TestBed.configureTestingModule({
      declarations: [SearchWidgetComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });
    
    fixture = TestBed.createComponent(SearchWidgetComponent);
    component = fixture.componentInstance;
  });

  it('calls API with correct query on input', fakeAsync(() => {
    apiServiceSpy.search.and.returnValue(of([{ id: 1, name: 'Test' }]));
    
    component.onSearchInput('test');
    tick(300); // debounce time
    
    expect(apiServiceSpy.search).toHaveBeenCalledWith('test');
  }));

  it('updates results when API returns data', () => {
    const testData = [{ id: 1, name: 'Test' }];
    apiServiceSpy.search.and.returnValue(of(testData));
    
    component.onSearchInput('test');
    
    expect(component.results).toEqual(testData);
  });
});
```

## 7. Visual Diagram (ASCII)

```
TDD Cycle

┌─────────┐    ┌─────────┐    ┌─────────┐
│ Write   │    │ Write   │    │ Improve │
│ Failing │────▶ Min.    │────▶ Code    │
│ Test    │    │ Code    │    │ Quality │
└─────────┘    └─────────┘    └─────────┘
     ▲                                │
     └────────────────────────────────┘
```

## 8. Real-world Example

Building search component with progressively added features.

## 9. Angular Use Case

Component-driven development with full test coverage.

## 10. Common Mistakes

❌ Writing tests after implementation
❌ Testing trivial implementations

## 11. Edge Cases

1. **Async timing in tests**
   ```typescript
   fakeAsync(() => { tick(100); });
   ```

2. **Mocking complex dependencies**

## 12. Performance Considerations

Fast feedback loop prevents wasted implementation time.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. RED-GREEN-REFACTOR phases?
2. Benefits of TDD?
3. Testing challenges in Angular?

## 15. Follow-up Questions

- "Handle async in TDD?"

## 16. Production Best Practices

1. Write descriptive test names
2. Keep tests independent
3. Test behavior not implementation
4. Maintain test suite reliability

## 17. Summary

TDD produces higher-quality code with built-in verification.

## 18. Revision Notes

- Red-Green-Refactor cycle
- Write failing test first
- Minimal implementation
- Refactor with safety net

## 19. Practice Questions

1. Build counter with TDD.
2. Test form validation rules.
3. Mock HTTP interactions in tests.

## 20. References

- [Angular Testing Guide](https://angular.io/guide/testing)

### Module 14 (Testing) - Continuing...
