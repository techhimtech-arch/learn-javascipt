# API Design Principles

## 1. Definition

**Frontend API Design** establishes conventions for structuring frontend-backend communication — ensuring maintainable, predictable integrations.

## 2. Why do we need it?

Consistent interfaces reduce cognitive load, minimize bugs, accelerate onboarding.

## 3. Internal Working

Core principles:
1. **RESTful endpoints** follow resource-oriented design
2. **Response envelopes** standardize success/error formats
3. **Status code mapping** aligns with HTTP semantics
4. **Caching headers** enable client-side optimization

## 4. Step-by-Step Execution

Endpoint convention:
```
GET    /api/users              → List users
POST   /api/users              → Create user
GET    /api/users/{id}         → Get single user
PUT    /api/users/{id}         → Update user
DELETE /api/users/{id}         → Delete user
PATCH  /api/users/{id}/status  → Partial update
```

## 5. Syntax

```typescript
// Consistent response wrapper
interface ApiResponse<T> {
  data: T | null;
  error?: string;
  meta?: Record<string, any>;
}

// Standard HTTP methods
this.http.get<T>('/api/users');
this.http.post<T>('/api/users', body);
this.http.put<T>(`/api/users/${id}`, data);
this.http.delete(`/api/users/${id}`);
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Paginated endpoints
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

this.http.get<PaginatedResponse<User>>('/api/users', {
  params: new HttpParams()
    .set('page', '1')
    .set('limit', '20')
});
```

### Medium
```typescript
// Query parameter builder
class ApiQueryBuilder {
  private params: HttpParams = new HttpParams();

  paginate(page: number, limit: number): this {
    this.params = this.params.set('page', page).set('limit', limit);
    return this;
  }

  filter(field: string, value: string): this {
    this.params = this.params.set(`filter[${field}]`, value);
    return this;
  }

  sort(field: string, direction: 'asc' | 'desc' = 'asc'): this {
    this.params = this.params.set('sort', `${direction}:${field}`);
    return this;
  }

  build(): HttpParams {
    return this.params;
  }
}

// Usage
const params = new ApiQueryBuilder()
  .paginate(1, 50)
  .filter('status', 'active')
  .sort('createdAt', 'desc')
  .build();
```

### Advanced
```typescript
// GraphQL client with fragments
const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    name
    email
    role
  }
`;

class UserService {
  private readonly GET_USERS = gql`
    query GetUsers($limit: Int, $offset: Int) {
      users(limit: $limit, offset: $offset) {
        ...UserFields
        createdAt
      }
    }
    ${USER_FRAGMENT}
  `;

  getUsers(limit = 50, offset = 0): Observable<User[]> {
    return this.apollo.watchQuery<any>({
      query: this.GET_USERS,
      variables: { limit, offset }
    }).valueChanges.pipe(
      map(result => result.data?.users || [])
    );
  }
}
```

## 7. Visual Diagram (ASCII)

```
API Request Flow

Frontend → API Client (HttpClient/Axios) → Interceptor → Backend API
                 │                           │
         Auth Headers                      Logging
         Base URL                          Error Handling
         Retry Logic                       Metrics Collection
```

## 8. Real-world Example

E-commerce product catalog API with pagination and filtering.

## 9. Angular Use Case

HttpClient interceptors, typed responses, request/response pipelines.

## 10. Common Mistakes

❌ Inconsistent endpoint naming
❌ Missing request/response typing

## 11. Edge Cases

1. **Batch requests**
2. **Versioned endpoints**
3. **WebSocket integration**

## 12. Performance Considerations

Proper caching and pagination reduce payload sizes.

## 13. Time & Space Complexity

Network-bound — varies by payload/bandwidth.

## 14. Interview Questions

1. REST vs GraphQL tradeoffs?
2. Handle pagination consistently?
3. Error response standardization?

## 15. Follow-up Questions

- "Implement retry backoff strategy?"

## 16. Production Best Practices

1. Standardize response shapes
2. Version APIs explicitly
3. Use typed HTTP clients
4. Enable request cancellation
5. Monitor API performance metrics
6. Document with OpenAPI/Swagger

## 17. Summary

Well-designed APIs streamline frontend-backend collaboration.

## 18. Revision Notes

- Resource-oriented endpoints
- Consistent response envelope
- Proper HTTP status codes
- Caching/Pagination support
- Error format standardization

## 19. Practice Questions

1. Design REST API for blog posts.
2. Implement query parameter builder.
3. Add typed error handling interceptor.

## 20. References

- [REST API Tutorial](https://restfulapi.net/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)

### Next File
**008 - Progressive Enhancement.md**
