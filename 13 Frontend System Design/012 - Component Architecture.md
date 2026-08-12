# Component Architecture

## 1. Definition

**Component Architecture** structures UI as hierarchical, composable building blocks — defining clear boundaries, data flow, and responsibilities.

## 2. Why do we need it?

Manage complexity, encourage reusability, separate concerns, enable team collaboration.

## 3. Internal Working

Patterns:
1. **Presentational/Dumb**: Display-only, inputs drive content
2. **Container/Smart**: Logic/orchestration, manage state/data fetching
3. **Pure components**: Only re-render on input changes
4. **Feature-sliced**: Modules grouped by business domain

## 4. Step-by-Step Execution

Smart/presentational separation:
```typescript
// Presentational component (dumb)
@Component({
  selector: 'product-display',
  template: `<h3>{{ product.name }}</h3><p>{{ product.price | currency }}</p>`
})
export class ProductDisplayComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
}

// Container component (smart)
@Component({
  selector: 'product-page',
  template: `
    <product-display 
      *ngFor="let product of products$" 
      [product]="product" 
      (addToCart)="onAddToCart($event)">
    </product-display>
  `
})
export class ProductPageComponent {
  products$ = this.productService.getProducts();
  
  constructor(private productService: ProductService) {}
  
  onAddToCart(product: Product) {
    this.cartService.add(product);
  }
}
```

## 5. Syntax

```typescript
// Feature-sliced structure
src/
├── app/
│   ├── core/        # Services, interceptors
│   ├── shared/      # Common components/pipes
│   ├── features/    # Feature modules/directories
│   │   └── products/
│   │       ├── ui/   # Presentational components
│   │       ├── model/ # Types/interfaces
│   │       └── api/  # Data fetching
│   └── app.component.ts
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple split
@Component({
  selector: 'greeting',
  template: `<h1>Hello, {{ name }}!</h1>`
})
export class GreetingComponent {
  @Input() name!: string;
}
```

### Medium
```typescript
// Container/presentational separation
@Component({
  selector: 'user-list-container',
  template: `
    <user-list 
      [users]="vm$ | async" 
      [loading]="loading"
      (refresh)="loadUsers()">
    </user-list>
    
    <loading-spinner *ngIf="loading"></loading-spinner>
  `
})
export class UserListContainerComponent implements OnInit {
  @ViewChild(UserListComponent) userList!: UserListComponent;
  vm$ = new BehaviorSubject<User[]>([]);
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().pipe(
      tap(() => this.loading = false),
      catchError(() => EMPTY)
    ).subscribe(users => this.vm$.next(users));
  }
}
```

### Advanced
```typescript
// Atomic design-inspired structure
src/
├── shared/
│   ├── atoms/     # Buttons, inputs
│   ├── molecules/ # Form fields, cards
│   ├── organisms/ # Complex sections
│   └── templates/ # Page layouts
├── features/
│   ├── auth/
│   │   ├── ui/
│   │   ├── api/
│   │   └── model/
│   └── dashboard/
│       ├── widgets/
│       └── api/
```

## 7. Visual Diagram (ASCII)

```
Component Architecture Layers

┌─────────────────────────────────────┐
│ Smart/Container (Logic)             │
│ - State management                  │
│ - API calls                         │
│ - Event handling                    │
└─────────────┬───────────────────────┘
              │ @Input/@Output
              ▼
┌─────────────────────────────────────┐
│ Dumb/Presentational (Display)       │
│ - Pure rendering                    │
│ - No side effects                   │
│ - Styled components                 │
└─────────────────────────────────────┘
```

## 8. Real-world Example

E-commerce app with shared cart service and feature-specific modules.

## 9. Angular Use Case

Large team collaboration, maintainable codebases, scalable feature delivery.

## 10. Common Mistakes

❌ Tight coupling between components
❌ Mixing logic and presentation

## 11. Edge Cases

1. **Shared state vs local state**
2. **Component composition boundaries**

## 12. Performance Considerations

Clear separation enables better OnPush optimization.

## 13. Time & Space Complexity

Varies by component complexity.

## 14. Interview Questions

1. Presentational vs container pattern?
2. Feature-sliced design benefits?
3. Component interaction strategies?

## 15. Follow-up Questions

- "Handle cross-feature communication?"

## 16. Production Best Practices

1. Enforce smart/dumb separation
2. Use OnPush on presentational components
3. Establish clear module boundaries
4. Document architecture decisions

## 17. Summary

Thoughtful component architecture scales applications sustainably.

## 18. Revision Notes

- Smart: logic, data, behavior
- Dumb: display, inputs, outputs
- Atomic design: atoms → molecules → organisms
- Feature-sliced: group by domain

## 19. Practice Questions

1. Refactor tangled component into smart/dumb.
2. Design folder structure for e-commerce site.
3. Implement atomic component hierarchy.

## 20. References

- [Angular: Component Architecture](https://angular.io/guide/component-overview)
- [Atomic Design Principles](https://atomicdesign.bradshaw.com/)

---
