# Lazy Loading

## 1. Definition

**Lazy Loading** defers loading feature modules until requested — reducing initial bundle size and speeding up first render.

## 2. Why do we need it?

Improve perceived performance by shipping only essential code upfront.

## 3. Internal Working

Route configuration determines load boundary:
1. Initial app loads core shell
2. User navigates to feature route
3. Angular dynamically imports module
4. Network fetches JS chunk
5. Module instantiates and renders

## 4. Step-by-Step Execution

Route config:
```typescript
const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
  },
  {
    path: 'reports',
    loadComponent: () => import('./reports/reports.component')
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
```

Process:
1. Angular router parses route
2. Detects `loadComponent/loadChildren` function
3. Calls dynamic import()
4. Browser fetches JS chunk
5. Module initializes component
6. Component renders in outlet

## 5. Syntax

```typescript
// Route-based lazy loading
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];

// Standalone component loading
{
  path: 'dashboard',
  loadComponent: () => import('./dashboard.component')
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Basic lazy module
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  }
];
```

### Medium
```typescript
// Preloading strategy for non-critical modules
import { PreloadAllModules } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ]
})
```

### Advanced
```typescript
// Custom preloading strategy with priority
@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const shouldPreload = route.data && route.data['preload'] === true;
    
    if (shouldPreload) {
      // Low-priority background loading
      setTimeout(() => load(), 0);
      return EMPTY;
    }
    
    return EMPTY;
  }
}

const routes: Routes = [
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
    data: { preload: true } // Preloaded in background
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { preload: false } // Loaded only when navigated to
  }
];
```

## 7. Visual Diagram (ASCII)

```
Bundle Splitting & Lazy Loading

Initial Bundle (App Shell)
├─ core.js
├─ app.js
└─ styles.css

Lazy Chunks (Loaded on Demand)
├─ users-abc123.js  ← When user visits /users
├─ admin-def456.js  ← When admin navigates
└─ reports-ghi789.js ← When visiting /reports
```

## 8. Real-world Example

Enterprise dashboard loading admin/analytics features separately.

## 9. Angular Use Case

Feature modularization, route-based code splitting.

## 10. Common Mistakes

❌ Not splitting large feature bundles
❌ Lazy loading too aggressively

## 11. Edge Cases

1. **Shared dependencies between lazy chunks**
2. **Preloading strategy tuning**

## 12. Performance Considerations

Smaller initial payload improves TTFB dramatically.

## 13. Time & Space Complexity

Trade-off: initial load faster, subsequent navigation slightly slower.

## 14. Interview Questions

1. Route-level vs component-level code splitting?
2. Preloading strategies available?
3. Shared dependency deduplication?

## 15. Follow-up Questions

- "Implement custom preloading?"

## 16. Production Best Practices

1. Analyze bundle composition regularly
2. Group related features together
3. Implement selective preloading
4. Monitor network waterfall

## 17. Summary

Lazy loading balances initial load speed with on-demand functionality availability.

## 18. Revision Notes

- loadComponent/loadChildren for dynamic imports
- PreloadAllModules preloads everything
- Custom preloading for priority control
- Shared modules reduce duplication

## 19. Practice Questions

1. Split existing eager module into lazy chunks.
2. Configure selective preloading.
3. Monitor bundle sizes with analyzer.

## 20. References

- [Angular: Lazy Loading](https://angular.io/guide/lazy-loading-ngmodules)

---

## FINAL COUNT
