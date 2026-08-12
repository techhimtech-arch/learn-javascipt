# Testing Best Practices

## 1. Definition

**Angular Testing Best Practices** ensure reliable, maintainable tests covering unit, integration, and end-to-end scenarios effectively.

## 2. Why do we need it?

High-quality test suites protect against regressions while remaining maintainable long-term.

## 3. Internal Working

Testing layers:
1. **Unit tests**: Fast, isolated component/service checks
2. **Integration tests**: Verify module/service wiring
3. **E2E tests**: Simulate real user journeys

Effective testing balances coverage with maintainability.

## 4. Step-by-Step Execution

Test setup checklist:
1. Configure TestBed properly
2. Mock external dependencies
3. Isolate component under test
4. Assert only observable behavior
5. Clean up resources

## 5. Syntax

```typescript
// ComponentFixture setup
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [MyTestComponent],
    imports: [ReactiveFormsModule],
    providers: [{ provide: MyService, useValue: mockService }]
  }).compileComponents();
});

// Create fixture
const fixture = TestBed.createComponent(MyTestComponent);
const component = fixture.componentInstance;

// Trigger change detection
fixture.detectChanges();

// Query DOM
const el = fixture.debugElement.query(By.css('.my-element'));
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple component test
it('displays title correctly', () => {
  fixture.detectChanges();
  const h1 = fixture.nativeElement.querySelector('h1');
  expect(h1.textContent).toBe('Expected Title');
});
```

### Medium
```typescript
// Async operation test
it('loads data on init', fakeAsync(() => {
  const testData = [{ id: 1, name: 'Test' }];
  spyOn(dataService, 'getItems').and.returnValue(of(testData));
  
  component.ngOnInit();
  tick(); // Resolve observables
  
  expect(component.items).toEqual(testData);
}));
```

### Advanced
```typescript
// Testing observables with marble tests
import { cold, hot } from 'jasmine-marbles';

describe('DataService', () => {
  it('returns cached data', () => {
    const expected = cold('a-100ms-b', { a: [1], b: [2] });
    expect(service.getItems()).toBeObservable(expected);
  });
});
```

## 7. Visual Diagram (ASCII)

```
Test Reliability Factors

┌─────────────────────────────────────┐
│ Test Pyramid                        │
├─────────────────────────────────────┤
│ Unit (Fast, Many) ──► Integration   │
│                         (Medium)    │
│                                    E2E
│                                  (Slow, Few)
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Reliability Pillars                 │
├─────────────────────────────────────┤
│ Deterministic                       │
│ Independent                         │
│ Repeatable                          │
│ Fast                                │
│ Comprehensive                      │
└─────────────────────────────────────┘
```

## 8. Real-world Example

Comprehensive test suite for authentication flow.

## 9. Angular Use Case

Component testing, service mocking, form validation, HTTP interactions.

## 10. Common Mistakes

❌ Testing implementation rather than behavior
❌ Creating overly complex test setups
❌ Not cleaning up mocks/timers

## 11. Edge Cases

1. **Async timing in tests**
   ```typescript
   // Use fakeAsync/tick for deterministic timing
   ```

2. **Component lifecycle in tests**

## 12. Performance Considerations

Fast test feedback encourages frequent runs.

## 13. Time & Space Complexity

Varies widely by test scope.

## 14. Interview Questions

1. Testing strategies comparison?
2. Mocking vs stubbing philosophy?
3. Test pyramid importance?

## 15. Follow-up Questions

- "Test complex async flows?"

## 16. Production Best Practices

1. Prioritize meaningful tests over coverage metrics
2. Mock external dependencies consistently
3. Use descriptive test names
4. Keep test setup DRY
5. Regularly review and prune obsolete tests

## 17. Summary

Effective testing practices ensure correctness while maintaining development velocity.

## 18. Revision Notes

- Arrange-Act-Assert pattern
- Isolate dependencies via mocking
- Prefer observable over behavior testing
- Use async testing utilities appropriately

## 19. Practice Questions

1. Improve existing flaky test.
2. Optimize slow test suite.
3. Apply best practices to component test.

## 20. References

- [Angular Testing Best Practices](https://github.com/testing-angular/testing-angular/blob/main/TESTING-BEST-PRACTICES.md)

---

## FINAL MODULE COMPLETIONS:
