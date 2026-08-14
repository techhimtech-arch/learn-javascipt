# Angular Module System

## 1. Definition

**Angular Modules (NgModule)** organize application code into cohesive functional blocks — grouping components, services, and routing.

## 2. Why do we need it?

Encapsulate related functionality, manage dependency injection scopes, enable lazy loading.

## 3. Internal Working

NgModule compilation:
1. Angular compiles templates
2. Resolves component dependencies
3. Builds injector hierarchy
4. Sets up routing for feature modules

Types:
- **Root**: App module
- **Feature**: Lazy-loaded sections
- **Core**: Singleton services
- **Shared**: Reusable UI components

## 4. Step-by-Step Execution

Feature module:
```typescript
@NgModule({
  declarations: [FeatureComponent, FeatureService],
  imports: [CommonModule, RouterModule],
  exports: [FeatureComponent] // Public API
})
export class FeatureModule {}
```

## 5. Syntax

```typescript
@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [],
  schemas: []
})
export class MyModule {}
```

## 6. Examples

### Easy
```typescript
// Shared module
@NgModule({
  declarations: [CommonButtonComponent, LoadingSpinnerComponent],
  exports: [CommonButtonComponent, LoadingSpinnerComponent],
  imports: [CommonModule]
})
export class SharedModule {}
```

## 7. Interview Questions

1. NgModule vs standalone components?
2. Feature module benefits?
3. Shared vs Core module pattern?

## 8. Summary

Modules bundle related functionality with controlled public APIs.

## 9. References

- [Angular Modules](https://angular.io/guide/modules)

---
