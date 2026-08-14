# Unit Testing

## 1. Definition

**Unit Testing** verifies individual functions/components/modules work correctly in isolation — using frameworks like Jest/Karma to assert behavior.

## 2. Why do we need it?

Catch regressions quickly, document expected behavior, enable safe refactoring, improve design through testability.

## 3. Internal Working

Testing framework runs:
1. Setup test environment
2. Execute test function(s)
3. Assert outcomes using matchers
4. Report pass/fail status
5. Coverage tools measure exercised lines/branches

## 4. Step-by-Step Execution

Basic test structure:
```typescript
describe('userService', () => {
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

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should retrieve all users', () => {
    const testUsers = [{ id: 1, name: 'Alice' }];
    
    service.getAll().subscribe(users => {
      expect(users).toEqual(testUsers);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(testUsers);
  });
});
```

## 5. Syntax

```typescript
// Jasmine/Jest setup
describe('ComponentName', () => {
  beforeEach(() => { /* setup */ });
  afterEach(() => { /* cleanup */ });

  it('should do something', () => {
    expect(actual).toEqual(expected);
  });

  // Spies
  spyOn(object, 'method').and.returnValue(value);
});
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Pure function test
function add(a: number, b: number): number {
  return a + b;
}

describe('add', () => {
  it('should return sum of two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });
});
```

### Medium
```typescript
// Component test
@Component({
  selector: 'counter',
  template: `<span>{{ count }}</span><button (click)="inc()">+</button>`
})
class CounterComponent {
  count = 0;
  inc() { this.count++; }
}

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterComponent]
    });
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
  });

  it('increments count on button click', () => {
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    
    expect(fixture.nativeElement.textContent).toContain('1');
  });
});
```

### Advanced
```typescript
// Service with HTTP mock and spy
describe('UserService', () => {
  let service: UserService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('handles token expiration gracefully', () => {
    authServiceSpy.getToken.and.returnValue('expired-token');

    service.getProfile().subscribe({
      next: () => fail('Expected error'),
      error: (err) => {
        expect(err.status).toBe(401);
        expect(authServiceSpy.clearToken).toHaveBeenCalled();
      }
    });

    const req = httpMock.expectOne('/api/profile');
    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
  });
});
```

## 7. Visual Diagram (ASCII)

```
Test Pyramid

        E2E Tests (Few)
       /              \
      / Unit Tests     \ Integration
     / (Most)          \ Tests

Each layer: fast → slow, stable → flaky, cheap → expensive
```

## 8. Real-world Example

Testing authentication flow with mocked token refresh mechanism.

## 9. Angular Use Case

Component/input/output testing, service HTTP interactions, directive behavior.

## 10. Common Mistakes

❌ Testing implementation details over behavior
❌ Over-mocking dependencies

## 11. Edge Cases

1. **Timing/async in tests**
   ```typescript
   fakeAsync(() => {
     tick(1000);
   });
   ```

2. **Zone.js interference**
3. **Mock vs real service tradeoffs**

## 12. Performance Considerations

Keep unit test suite fast (<5s local feedback).

## 13. Time & Space Complexity

Varies by test complexity — aim for isolated, fast assertions.

## 14. Interview Questions

1. Test pyramid principles?
2. Mocking strategies?
3. Spies vs mocks vs stubs?

## 15. Follow-up Questions

- "How many mocks per test?"

## 16. Production Best Practices

1. Focus on behavior, not implementation
2. One assertion concept per test
3. Mock external services aggressively
4. Keep tests fast and deterministic

## 17. Summary

Effective unit tests accelerate development while ensuring correctness.

## 18. Revision Notes

- Arrange-Act-Assert structure
- beforeEach/afterEach lifecycle
- Spies for dependency isolation
- Mock backend for HTTP services

## 19. Practice Questions

1. Write unit test for utility function.
2. Test component with input bindings.
3. Mock service dependencies in component tests.

## 20. References

- [Angular Testing](https://angular.io/guide/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

### Next File
**002 - Integration Testing.md**
