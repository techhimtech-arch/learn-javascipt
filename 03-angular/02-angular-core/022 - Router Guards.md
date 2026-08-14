# Router Guards

## 1. Definition

**Router Guards** protect routes from unauthorized/inappropriate navigation — enforcing access control declaratively.

## 2. Why do we need it?

Prevent unauthorized access, ensure data loaded, preserve navigation flow.

## 3. Internal Working

Guard types:
- **CanActivate**: Pre-route authorization
- **CanDeactivate**: Confirm unsaveed changes
- **CanLoad**: Prevent lazy module loading
- **Resolve**: Fetch pre-route data
- **CanMatch**: Pattern-based route matching

## 4. Step-by-Step Execution

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.auth.isAuthenticated()) return true;
    return this.router.createUrlTree(['/login']);
  }
}

// Route config
const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
];
```

## 5. Syntax

```typescript
@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<FormComponent> {
  canDeactivate(
    component: FormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree {
    if (component.hasUnsavedChanges()) {
      return confirm('Discard changes?');
    }
    return true;
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple auth guard
@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
```

### Advanced
```typescript
// Data resolver
@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Product> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.params['id'];
    return this.productService.getProduct(id).pipe(
      catchError(() => of({} as Product)) // Fallback
    );
  }
}
```

## 7. Interview Questions

1. Guard types and usage?
2. Handle async guard resolution?
3. Prevent lazy loading unauthorized routes?

## 8. Summary

Router guards protect navigation flow while enhancing UX.

## 9. References

- [Angular Router Guards](https://angular.io/guide/router#guards)

---
