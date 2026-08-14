# Testing Strategies

## 1. Definition

**Testing Strategies** encompass approaches, philosophies, and methodologies for verifying software correctness — unit, integration, component, end-to-end testing.

## 2. Why do we need it?

Ensure reliability, prevent regressions, document behavior, support confident refactoring.

## 3. Internal Working

Four primary test types:
1. **Unit Tests**: Verify smallest testable units in isolation
2. **Component Tests**: Validate component rendering/interaction
3. **Integration Tests**: Check module/service wiring
4. **End-to-End Tests**: Simulate real user journeys

## 4. Step-by-Step Execution

Test pyramid implementation:
```typescript
// Unit test
it('calculates total price', () => {
  expect(calculateTotal([10, 20, 30])).toBe(60);
});

// Component test
it('renders product list', () => {
  const fixture = TestBed.createComponent(ProductListComponent);
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelectorAll('li').length).toBe(5);
});

// E2E test
it('completes checkout flow', async () => {
  await page.goto('/checkout');
  await page.click('#proceed');
  await expect(page).toHaveURL('/confirmation');
});
```

## 5. Syntax

```typescript
// Jasmine/Jest patterns
describe('Service', () => {
  beforeEach(() => { /* setup */ });
  afterEach(() => { /* teardown */ });

  it('passes scenario', () => {
    expect(actual).toEqual(expected);
  });

  // Spies
  spyOn(service, 'method').and.returnValue(value);

  // Pending/skipped
  xit('skipped test');
  it('pending test'); // Without expectations
});
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Pure function testing
function multiply(a: number, b: number): number {
  return a * b;
}

describe('multiply', () => {
  it('multiplies two positive numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  it('handles zero', () => {
    expect(multiply(0, 5)).toBe(0);
  });
});
```

### Medium
```typescript
// Async testing with done callback or async/await
describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('returns user list', async () => {
    const users = await firstValueFrom(service.getUsers());
    expect(users.length).toBeGreaterThan(0);
  });
});
```

### Advanced
```typescript
// Mock store with NgRx testing utilities
describe('CounterComponent with Store', () => {
  let store: MockStore<TestState>;
  let component: CounterComponent;

  beforeEach(() => {
    store = new MockStore<TestState>();
    
    TestBed.configureTestingModule({
      imports: [CounterComponent],
      providers: [{ provide: Store, useValue: store }]
    });

    component = TestBed.createComponent(CounterComponent).componentInstance;
  });

  it('dispatches increment action on button click', () => {
    spyOn(store, 'dispatch');

    component.increment();

    expect(store.dispatch).toHaveBeenCalledWith({ type: '[Counter] Increment' });
  });
});
```

## 7. Visual Diagram (ASCII)

```
Testing Pyramid

        E2E (10%)
       /        \
      /          \
Integration (20%)  \
                    \
Unit Tests (70%) ───┘
```

## 8. Real-world Example

CI pipeline running full test suite on every pull request.

## 9. Angular Use Case

Full coverage across component, service, directive, and pipe testing.

## 10. Common Mistakes

❌ Testing implementation details
❌ Flaky tests relying on external resources

## 11. Edge Cases

1. **Time-dependent logic**
   ```typescript
   jasmine.clock().install();
   ```

2. **Race conditions in async tests**

## 12. Performance Considerations

Prioritize fast unit tests; keep E2E suite small and focused.

## 13. Time & Space Complexity

Varies broadly by test scope — aim for sub-second unit suite.

## 14. Interview Questions

1. Test pyramid philosophy?
2. Mocking vs stubbing difference?
3. Avoid flaky tests?

## 15. Follow-up Questions

- "When to write E2E vs integration?"

## 16. Production Best Practices

1. Keep unit tests fast and deterministic
2. Mock external dependencies
3. Use proper setup/teardown
4. Monitor test execution times
5. Aim for meaningful coverage thresholds

## 17. Summary

Balanced testing strategy catches bugs early with minimal maintenance overhead.

## 18. Revision Notes

- Pyramid: Unit → Integration → E2E
- Isolate dependencies via mocks/stubs
- Avoid time-based assertions
- Clean up resources between tests

## 19. Practice Questions

1. Write unit tests for utility functions.
2. Test component with mocked services.
3. Configure test environment cleanup.

## 20. References

- [Testing Library](https://testing-library.com/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

### Next File
**003 - Test-Driven Development.md**
