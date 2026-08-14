# Standalone Components

## 1. Definition

**Standalone Components** are Angular components, directives, and pipes that import their own dependencies directly — without needing NgModule declarations.

## 2. Why do we need it?

Eliminate boilerplate NgModule ceremony, simplify dependency graph, enable easier migration/testing.

## 3. Internal Working

1. Component imports required modules/pipes/components directly via `imports` array
2. No NgModule wrapper needed
3. Router can import standalone components directly
4. Tree-shakable since explicit imports

## 4. Step-by-Step Execution

Definition:
```typescript
@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `<input [(ngModel)]="hero.name">`,
  styles: []
})
export class HeroListComponent {}
```

Usage in route:
```typescript
const routes: Routes = [
  { path: 'heroes', component: HeroListComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
```

## 5. Syntax

```typescript
@Component({
  standalone: true,
  imports: [OtherComponent, SomeModule],
  template: `...`,
})
export class MyStandaloneComponent {}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple standalone component
@Component({
  standalone: true,
  selector: 'app-banner',
  template: `<div class="banner">Welcome!</div>`
})
export class BannerComponent {}
```

### Medium
```typescript
// Standalone with dependencies
@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CustomPipe
  ],
  template: `
    <form (ngSubmit)="save()">
      <input [(ngModel)]="user.name" required>
      <button type="submit" [disabled]="!form.valid">Save</button>
    </form>
  `
})
export class UserProfileComponent {}
```

### Advanced
```typescript
// Fully standalone app with routing
@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <nav><a routerLink="/home">Home</a></nav>
    <router-outlet></router-outlet>
  `,
  imports: [
    RouterModule.forRoot([
      { path: 'home', loadComponent: () => import('./home.component') },
      { path: 'users', loadComponent: () => import('./user-list.component') }
    ])
  ]
})
export class RootComponent {}
```

## 7. Visual Diagram (ASCII)

```
Traditional vs Standalone

Traditional:
Component ──► NgModule ──► App Module ──► Bootstrap

Standalone:
Component (imports dependencies) ──► Bootstrap Directly
```

## 8. Real-world Example

Migrating legacy NgModule app incrementally to standalone.

## 9. Angular Use Case

New project setups, micro frontends, component libraries, incremental migrations.

## 10. Common Mistakes

❌ Forgetting to remove from NgModule declarations
❌ Mixing standalone and NgModule incorrectly

## 11. Edge Cases

1. **Interoperability with NgModules**
2. **Provider scoping changes**
3. **Schema requirements**

## 12. Performance Considerations

Smaller bundles since only used components imported.

## 13. Time & Space Complexity

Same as regular components.

## 14. Interview Questions

1. Benefits of standalone components?
2. Migration strategy?
3. Interaction with NgModules?

## 15. Follow-up Questions

- "Backward compatibility considerations?"

## 16. Production Best Practices

1. Adopt for new modules
2. Migrate incrementally
3. Combine with standalone APIs (provideX)
4. Remove NgModules when fully migrated

## 17. Summary

Standalone components simplify architecture and reduce boilerplate significantly.

## 18. Revision Notes

- Set standalone: true
- Import instead of declare
- Router supports direct component imports
- Gradual migration path available

## 19. Practice Questions

1. Convert simple component to standalone.
2. Set up routes with standalone components.
3. Migrate small module partially.

## 20. References

- [Angular: Standalone Components](https://angular.io/guide/standalone-components)

### Next File
**017 - Signals.md**
