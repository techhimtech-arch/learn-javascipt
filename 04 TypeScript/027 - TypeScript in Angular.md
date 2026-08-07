# TypeScript in Angular

## 1. Definition

Angular applications are written entirely in TypeScript — leveraging its strong typing system for safer component, service, and framework APIs.

## 2. Why do we need it?

Strong typing catches bugs at compile-time rather than runtime — critical in large enterprise-scale applications.

## 3. Internal Working

Angular’s tooling integrates closely with TypeScript:
- AOT (Ahead-of-Time) compilation validates templates against component types
- Language services offer rich autocomplete inside templates
- DI relies on decorators + metadata introspection via `emitDecoratorMetadata`

## 4. Step-by-Step Execution

Example:
```typescript
@Component({
  selector: 'user-card',
  template: '<p>{{ user.name }}</p>'
})
export class UserCardComponent {
  @Input() user!: User;
}
```

Steps:
1. TypeScript parses `.ts` source
2. Decorator metadata registered
3. Angular compiler (`ngc`) validates template bindings
4. Output compiled to clean JavaScript

## 5. Syntax

```typescript
@Component({
  selector: 'my-component',
  templateUrl: './component.component.html'
})
export class MyComponent {
  @Input() data: DataType;
  @Output() selected = new EventEmitter<number>();
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  template: `<li>{{ todo.task }}</li>`
})
export class TodoItemComponent {
  @Input() todo!: Todo;
}
```

### Medium
```typescript
@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {
  private readonly _todos$ = new BehaviorSubject<Todo[]>([]);
  readonly todos$: Observable<Todo[]> = this._todos$.asObservable();

  add(todo: Omit<Todo, 'id'>): void {
    const next = [...this._todos$.getValue(), { ...todo, id: uuid() }];
    this._todos$.next(next);
  }
}
```

### Advanced
```typescript
type StrictComponent<TInputs = {}, TOutputs = {}> = Component & {
  inputs: TInputs;
  outputs: TOutputs;
};

function defineComponent<TInputs, TOutputs>(
  config: ComponentConfig<TInputs, TOutputs>
): StrictComponent<TInputs, TOutputs> {
  return Component(config);
}
```

## 7. Visual Diagram (ASCII)

```
Angular Compilation Pipeline

┌────────────┐
│ .ts Source │
│ w/Decorators│
└─────┬──────┘
      ▼
┌────────────┐
│ TS Compiler│
│ + Metadata │
└─────┬──────┘
      ▼
┌────────────┐
│ Angular    │
│ Template   │
│ Validation │
└─────┬──────┘
      ▼
┌────────────┐
│ Optimized  │
│ Runtime JS │
└────────────┘
```

## 8. Real-world Example

Typed router configuration:
```typescript
const routes: Routes = [
  { path: 'products', component: ProductsListComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];
```

## 9. Angular Use Case

All Angular artifacts—components, services, modules, pipes—benefit from rigorous typing.

## 10. Common Mistakes

❌ Ignoring strict null checks  
❌ Misusing `any` to bypass typing

## 11. Edge Cases

1. **Input/output typing**
   ```typescript
   @Input() data!: Required<DataModel>;
   ```

2. **Generic component wrappers**
   ```typescript
   export class ListComponent<T> {
     @Input() items!: T[];
   }
   ```

3. **Content projection with slots**
   ```typescript
   type SlotDef<T> = { [K in keyof T]: T[K] };
   ```

## 12. Performance Considerations

TypeScript checking adds build time overhead — optimize via project references or incremental builds.

## 13. Time & Space Complexity

Compile-time only – no runtime cost.

## 14. Interview Questions

1. Benefits of TypeScript in Angular?
2. Template type checking capabilities?
3. Strict mode implications?

## 15. Follow-up Questions

- "How does Angular validate @Input types?"
- "What is emitDecoratorMetadata?"

## 16. Production Best Practices

1. Enable `strict` mode in `tsconfig.json`
2. Use interfaces for contract definitions
3. Leverage discriminated unions for state machines
4. Avoid `any`; use `unknown` with narrowing

## 17. Summary

TypeScript + Angular pairing delivers developer productivity and application stability at scale.

## 18. Revision Notes

- All Angular code is TypeScript
- Template-type validation via language service
- Decorators carry metadata for DI/routing
- Strict null checks prevent crashes

## 19. Practice Questions

1. Create strongly-typed component input.
2. Implement generic service wrapper.
3. Validate route param against interface.

## 20. References

- [Angular Style Guide (TypeScript)](https://angular.io/guide/styleguide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

📘 **Module 4 Complete!** (20 files generated including examples above)  
Starting **Module 5 - Browser Internals** next...

### Next File
**001 - Rendering Pipeline.md** (in `05 Browser Internals`)
