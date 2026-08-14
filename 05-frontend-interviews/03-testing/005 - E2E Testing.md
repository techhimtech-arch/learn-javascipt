# E2E Testing

## 1. Definition

**End-to-End Testing** validates entire application workflows simulating real user interactions — through browser automation tools.

## 2. Why do we need it?

Verify complete user journeys work end-to-end — catching integration issues unit tests miss.

## 3. Internal Working

Browser automation flow:
1. Launch headless/headed browser
2. Navigate to URL
3. Execute scripted interactions
4. Assert DOM/content states
5. Report pass/fail results

## 4. Step-by-Step Execution

Cypress example:
```javascript
describe('Login Flow', () => {
  it('logs in successfully', () => {
    cy.visit('/login');
    cy.get('[data-testid=email]').type('user@test.com');
    cy.get('[data-testid=password]').type('password123');
    cy.get('[data-testid=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

## 5. Syntax

```typescript
// Cypress
describe('Feature', () => {
  beforeEach(() => cy.visit('/'));
  
  it('works correctly', () => {
    cy.get('.selector').click();
    cy.url().should('eq', '/expected-route');
    cy.get('.assertSelector').should('contain.text', 'Expected Text');
  });
});

// Protractor (legacy)
it('navigates to page', async () => {
  await browser.get('/home');
  expect(await browser.getCurrentUrl()).toBe('/home');
});
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// Basic form submission
describe('Contact Form', () => {
  it('submits contact form', () => {
    cy.visit('/contact');
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#message').type('Hello world');
    cy.get('button[type=submit]').click();
    cy.get('.success-message').should('be.visible');
  });
});
```

### Medium
```javascript
// Session management
describe('Authenticated Session', () => {
  beforeEach(() => {
    cy.login('user@example.com', 'password');
    cy.visit('/profile');
  });

  it('displays user profile', () => {
    cy.get('[data-testid=user-name]').should('contain', 'John Doe');
    cy.get('[data-testid=user-email]').should('contain', 'john@example.com');
  });
});
```

### Advanced
```javascript
// Intercept API calls for controlled testing
describe('Dashboard Data Loading', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/dashboard*', {
      statusCode: 200,
      body: [{ id: 1, title: 'Project Alpha' }]
    }).as('dashboardLoad');
    
    cy.visit('/dashboard');
  });

  it('renders loaded projects', () => {
    cy.wait('@dashboardLoad');
    cy.get('[data-testid=project-card]', { timeout: 10000 })
      .should('have.length', 1)
      .and('contain.text', 'Project Alpha');
  });

  it('handles empty state', () => {
    cy.intercept('GET', '/api/dashboard*', {
      statusCode: 200,
      body: []
    }).as('emptyDashboard');
    
    cy.reload();
    cy.get('[data-testid=empty-state]').should('be.visible');
  });
});
```

## 7. Visual Diagram (ASCII)

```
E2E Test Execution

   Test Runner
      │
      ▼
Browser Automation ──► Real Application
(URL Navigation, Clicks, Inputs)
      │
      ▼
  Assertion Engine
      │
      ▼
  Test Result Report
```

## 8. Real-world Example

Customer journey testing from landing page through checkout completion.

## 9. Angular Use Case

Verifying routing, authentication flows, complex form submissions.

## 10. Common Mistakes

❌ Testing implementation details
❌ Brittle selectors that break on refactoring

## 11. Edge Cases

1. **Timing/flaky tests**
   ```javascript
   // Explicit waits instead of implicit
   cy.wait('@apiCall', { timeout: 10000 });
   ```

2. **Cross-browser inconsistencies**

## 12. Performance Considerations

Parallelize tests; keep suite focused on critical paths.

## 13. Time & Space Complexity

Much slower than unit tests — optimize carefully.

## 14. Interview Questions

1. Tools for Angular E2E testing?
2. Dealing with flaky tests?
3. Page Object pattern?

## 15. Follow-up Questions

- "Mock API vs real backend in E2E?"

## 16. Production Best Practices

1. Use data attributes for selectors
2. Mock non-critical external APIs
3. Parallelize test execution
4. Run smoke tests in CI
5. Monitor test stability/flakiness

## 17. Summary

E2E testing guards against user-facing regressions across entire stack.

## 18. Revision Notes

- Cypress/Playwright dominate modern landscape
- Page Objects decouple tests from selectors
- Network stubbing enables deterministic tests
- Flakiness kills confidence

## 19. Practice Questions

1. Write login flow test.
2. Stub API responses reliably.
3. Handle dynamic IDs in selectors.

## 20. References

- [Cypress Documentation](https://docs.cypress.io/)
- [Playwright Test](https://playwright.dev/)

---

## Module 14 (Testing) Complete! ✅ (4 files)
## Module 13 (System Design) Complete! ✅ (8 files)
