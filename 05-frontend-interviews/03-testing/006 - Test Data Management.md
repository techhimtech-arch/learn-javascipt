# Test Data Management

## 1. Definition

**Test Data Management** creates, maintains, and cleans test fixtures — ensuring consistent, reliable test scenarios across unit/integration/E2E tests.

## 2. Why do we need it?

Reproducible tests require controlled data — avoiding flaky assertions dependent on external state.

## 3. Internal Working

Strategies:
1. **Factories**: Functions generating valid entities
2. **Fixtures**: Predefined sample data sets
3. **Builders**: Fluent APIs constructing test objects
4. **Fakes**: Lightweight substitutes for real services

## 4. Step-by-Step Execution

Factory pattern:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function createUser(overrides: Partial<User> = {}): User {
  return {
    id: Math.random(),
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    ...overrides
  };
}

// Usage in tests
const admin = createUser({ role: 'admin' });
const users = Array.from({ length: 10 }, () => createUser());
```

## 5. Syntax

```typescript
// Builder pattern
class UserBuilder {
  private data: Partial<User> = {};
  
  withId(id: number): this {
    this.data.id = id;
    return this;
  }
  
  withName(name: string): this {
    this.data.name = name;
    return this;
  }
  
  build(): User {
    return { ...createUser(), ...this.data };
  }
}

// Usage
const user = new UserBuilder()
  .withName('Alice')
  .build();
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple fixture
const MOCK_USERS = [
  { id: 1, name: 'Alice', email: 'alice@test.com' },
  { id: 2, name: 'Bob', email: 'bob@test.com' }
];

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: { getUsers: () => of(MOCK_USERS) } }
      ]
    });
  });
});
```

### Medium
```typescript
// Factory with relationships
interface Address {
  street: string;
  city: string;
  userId: number;
}

function createAddress(userId: number, overrides: Partial<Address> = {}): Address {
  return {
    street: '123 Main St',
    city: 'Springfield',
    userId,
    ...overrides
  };
}

interface User {
  id: number;
  name: string;
  addresses: Address[];
}

function createUserWithAddresses(count: number = 2): User {
  const user: User = createUser();
  user.addresses = Array.from({ length: count }, (_, i) => 
    createAddress(user.id, { city: `City${i}` })
  );
  return user;
}
```

### Advanced
```typescript
// Dynamic test data generator
class TestDataGenerator {
  private seed: number = 12345;
  
  nextId(): number {
    return ++this.seed;
  }
  
  randomName(): string {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    const idx = Math.floor(Math.random() * names.length);
    return `${names[idx]} ${this.nextId()}`;
  }
  
  generateUsers(count: number): User[] {
    return Array.from({ length: count }, () => ({
      id: this.nextId(),
      name: this.randomName(),
      email: `user${this.nextId()}@example.com`,
      role: Math.random() > 0.9 ? 'admin' : 'user'
    }));
  }
}

// Database-seeded tests
describe('User Feature', () => {
  let testData: TestDataGenerator;
  
  beforeEach(() => {
    testData = new TestDataGenerator();
    const users = testData.generateUsers(50);
    
    TestBed.configureTestingModule({
      data: { users } // Seed test data
    });
  });
});
```

## 7. Visual Diagram (ASCII)

```
Test Data Flow

┌────────────────┐
│ Data Factory   │ ◄─── Generates entities
└────────┬─────────┘
         ▼
┌─────────────────┐
│ Test Fixtures   │ ◄─── Predefined scenarios
└────────┬─────────┘
         ▼
┌─────────────────┐
│ Mocks/Stubs     │ ◄─── Controlled dependencies
└────────┬─────────┘
         ▼
┌─────────────────┐
│ Actual Tests    │
└─────────────────┘
```

## 8. Real-world Example

Seeding complex nested mock data for integration tests.

## 9. Angular Use Case

Component testing with realistic data, service mocking, form validation scenarios.

## 10. Common Mistakes

❌ Hardcoding IDs in test data
❌ Sharing mutable state between tests

## 11. Edge Cases

1. **Deterministic random data**
   ```typescript
   // Seed-based generators for reproducible tests
   ```

2. **Large dataset generation**

## 12. Performance Considerations

Generate only needed data — avoid bloating test suites.

## 13. Time & Space Complexity

Generation time proportional to data complexity.

## 14. Interview Questions

1. Factory vs fixture patterns?
2. Handle test data isolation?
3. Generate realistic mock data?

## 15. Follow-up Questions

- "Seed database-based test data?"

## 16. Production Best Practices

1. Centralize test data definitions
2. Version test data with code
3. Reset state between tests
4. Avoid external dependencies in test data
5. Document data assumptions in tests

## 17. Summary

Structured test data management ensures reliability and clarity.

## 18. Revision Notes

- Factories generate valid entities
- Builders offer fluent customization
- Fixtures provide predefined scenarios
- Isolation prevents test interference

## 19. Practice Questions

1. Implement user factory function.
2. Create builder for complex domain object.
3. Generate deterministic test datasets.

## 20. References

- [Testing Library: Setup](https://testing-library.com/docs/)

### Next File
**007 - Mocking Strategies.md**
