# Routing

## 1. Definition

**Angular Router** manages client-side navigation within SPAs — mapping URLs to components, supporting lazy loading, guards, and resolvers.

## 2. Why do we need it?

Enable deep linking, maintain browser history, lazy-load modules conditionally.

## 3. Internal Working

Router service maintains browser history stack:
1. Match URL to route configuration
2. Activate/deactivate components
3. Lazy-load modules as needed
4. Apply guards/resolvers before navigation

## 4. Step-by-Step Execution

Route definition:
```typescript
const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'admin', loadChildren: () => import('./admin.module') },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

Navigation flow:
1. URL changes (link click, browser back/forward)
2. Router matches active route
3. Checks `canActivate` guard
4. Runs resolver if present
5. Loads module if lazy
6. Instantiates component
7. Activates view

## 5. Syntax

```html
<!-- Declarative -->
<a routerLink="/users" routerLinkActive="active">Users</a>
<router-outlet></router-outlet>
```

```typescript
// Programmatic
import { Router } from '@angular/router';
constructor(private router: Router) {}

navigateTo(path: string[]) {
  this.router.navigate(path);
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' } // Wildcard route
];
```

### Medium
```typescript
const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./product-list.component'),
    children: [
      { path: ':id', loadComponent: () => import('./product-detail.component') }
    ]
  }
];
```

### Advanced
```typescript
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.auth.isAuthenticated().pipe(
      map(authenticated => {
        if (authenticated) return true;
        return this.router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url }
        });
      })
    );
  }

  canLoad(route: Route, state: UrlSegment): Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}

// Route resolver
@Injectable()
export class UserDataResolver implements Resolve<User> {
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.paramMap.get('id')!;
    return this.api.getUser(id).pipe(
      catchError(() => of(null)) // Graceful fallback
    );
  }
}
```

## 7. Visual Diagram (ASCII)

```
Routing Pipeline

URL Match ──► Guard Check ──► Resolver ──► Lazy Load ──► Component Activation
     │           │             │            │               │
   Redirect    AuthCheck    Preload Data  Chunk Download  Render View
```

## 8. Real-world Example

Admin dashboard with auth-guarded routes and lazy-loaded feature modules.

## 9. Angular Use Case

Application navigation structure, route protection, deep linking, preload strategies.

## 10. Common Mistakes

❌ Circular route dependencies  
❌ Not handling wildcard routes  
❌ Forgetting base href tag

## 11. Edge Cases

1. **Componentless routes**
   ```typescript
   { path: 'tab', children: [
     { path: 'one', component: OneComponent },
     { path: 'two', component: TwoComponent }
   ]}
   ```

2. **Data preloading strategies**
3. **Custom route reuse strategies**

## 12. Performance Considerations

Lazy loading reduces initial bundle size; preloading strategies balance speed/memory.

## 13. Time & Space Complexity

Varies — lazy loading adds network round-trip delay but reduces startup time.

## 14. Interview Questions

1. Types of guards?
2. When to use resolvers vs services?
3. Lazy loading implementation?
4. Preload strategies available?

## 15. Follow-up Questions

- "How to implement route animations?"

## 16. Production Best Practices

1. Use proper route ordering (more specific first)
2. Implement wildcard routes for 404 handling
3. Apply guards consistently
4. Leverage resolvers for critical data
5. Monitor bundle sizes per route

## 17. Summary

Router orchestrates SPA navigation — flexible yet powerful when used correctly.

## 18. Revision Notes

- Declarative + programmatic navigation
- Guards: CanActivate/CanDeactivate/CanLoad/CanMatch
- Resolvers for pre-fetching data
- Lazy loading cuts initial chunk size

## 19. Practice Questions

1. Build auth-guarded nested routing structure.
2. Implement breadcrumb generation from routes.
3. Add route-based code splitting.

## 20. References

- [Angular: Routing Guide](https://angular.io/guide/router)
- [Angular: Lazy Loading](https://angular.io/guide/lazy-loading-ngmodules)

### Next File
**010 - Forms.md**
