# Signals

## 1. Definition

**Signals** are a reactive primitive in Angular 16+ representing mutable values that notify dependents when changed — enabling fine-grained reactivity.

## 2. Why do we need it?

Fine-grained reactivity model superior to Zone.js-based change detection — better performance and predictability.

## 3. Internal Working

Signal stores value:
1. `.set()`/.update() mutates internal state
2. Tracks dependencies automatically
3. Recomputes computed signals when inputs change
4. Effects re-run when consumed signals change

## 4. Step-by-Step Execution

```typescript
const count = signal(0);         // Create signal
const doubled = computed(() => count() * 2); // Computed derives from signal
effect(() => console.log(`Count: ${count()}`)); // Side-effect runs on dependency change

count.set(5);                    // Updates count, recomputes doubled
console.log(doubled());          // 10
```

## 5. Syntax

```typescript
// Create
const mySignal = signal(initialValue);

// Read
const value = mySignal(); // Call like function

// Write
mySignal.set(newValue);
mySignal.update(fn => fn(prev)); // Transform function

// Computed
const derived = computed(() => mySignal() * 2);

// Effect
effect(() => console.log(`Changed: ${mySignal()}`));
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
@Component({
  template: `<button (click)="increment()">Count: {{ count() }}</button>`
})
export class CounterComponent {
  count = signal(0);
  
  increment() {
    this.count.set(this.count() + 1);
  }
}
```

### Medium
```typescript
@Component({
  template: `
    <input [(ngModel)]="firstName()" (input)="updateName()" />
    <p>Full name: {{ fullName() }}</p>
  `
})
export class NameComponent {
  firstName = signal('');
  lastName = signal('');
  
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  
  updateName() {
    this.firstName.set((document.querySelector('input') as any).value);
  }
}
```

### Advanced
```typescript
@Component({
  template: `{{ total() }}`
})
export class CalculatorComponent {
  price = signal(10);
  quantity = signal(1);
  taxRate = signal(0.08);
  
  // Automatic derivation
  subtotal = computed(() => this.price() * this.quantity());
  tax = computed(() => this.subtotal() * this.taxRate());
  total = computed(() => this.subtotal() + this.tax());

  constructor() {
    // Side effects
    effect(() => {
      localStorage.setItem('cart', JSON.stringify({
        subtotal: this.subtotal(),
        tax: this.tax(),
        total: this.total()
      }));
    });
  }
}
```

## 7. Visual Diagram (ASCII)

```
Signal Reactivity Graph

Signal A ──► Computed B (A * 2)
              │
              ▼
           Effect C (Logs B)
              │
              ▼
 When A changes:
 A → recompute B → rerun C
```

## 8. Real-world Example

Reactive shopping cart with computed totals/taxes.

## 9. Angular Use Case

Fine-grained reactivity, replacing RxJS in some cases, performance-critical updates.

## 10. Common Mistakes

❌ Using signals like observables (no .subscribe)
❌ Mixing signal updates with zone.js patterns inconsistently

## 11. Edge Cases

1. **Signal batching**
```typescript
// Multiple updates batched into single recompute
```

2. **Circular dependencies**
3. **Async boundaries**

## 12. Performance Considerations

Finer granularity than zone.js — fewer unnecessary checks.

## 13. Time & Space Complexity

O(active dependents) per signal update.

## 14. Interview Questions

1. Signals vs RxJS vs zone.js?
2. Computed caching behavior?
3. Effect cleanup?

## 15. Follow-up Questions

- "Migrate zone.js component to signals?"

## 16. Production Best Practices

1. Prefer computed for derived values
2. Use effects sparingly
3. Combine with async pipe and RxJS interop
4. Profile for re-render hotspots

## 17. Summary

Signals introduce granular reactivity model improving performance and control.

## 18. Revision Notes

- signal(initialValue) creates writable
- () reads value
- computed derives reactively
- effect for side effects
- Auto-dependency tracking

## 19. Practice Questions

1. Build counter with computed double value.
2. Create reactive form field validator.
3. Sync localStorage with signal.

## 20. References

- [Angular Signals](https://angular.io/guide/signals)
- [Angular: Reactivity Model](https://blog.angular.io/introducing-angular-signals-977b8a5f1275)

### Module 9 (Angular Core) Complete with 17 files! ✅
