# Components & Templates

## 1. Definition
A **Component** pairs a TypeScript class (logic), a **Template** (HTML view) and optional **Styles** into a reusable unit. It is declared in an `NgModule` (or is standalone) and matched in a parent template by its **selector**. The class is the view-model; the template binds presentational state to it.

## 2. Why do we need it?
- Reusable, self-contained UI blocks
- Selectors let components compose like custom HTML
- Each has its own change-detection boundary
- Templates support binding + structural directives

## 3. Internal Working
At bootstrap Angular renders the tree by matching each selector:
1. DI container instantiates the class
2. `LView` (component instance data) created
3. Template stamped into DOM via `Renderer2`
4. Inputs bound + change detection runs
5. On destroy listeners + subscriptions tear down
Standalone components skip `declarations` and use `imports`.

## 4. Step-by-Step Execution
```bash
ng g c greeting --standalone
```
1. Parent renders `<app-greeting [name]="user.name">
2. Selector `app-greeting` -> instantiate class
3. Template `Hello {{ name }}` compiles
4. Input flows in → text node updated
5. Destroyed when `*ngIf` flips

## 5. Syntax
```typescript
@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Hello, {{ name }}!</p>`,
  styles: [`p { font-weight: bold; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class GreetingComponent {
  @Input({ required: true }) name!: string;
  @Output() greeted = new EventEmitter<string>();
}
```

## 6. Examples (Easy → Advanced)
### Easy
```typescript
@Component({
  selector: 'counter',
  template: `<button (click)="dec()">-</button> <span>{{count}}</span> <button (click)="inc()">+</button>`
})
export class CounterComponent { count = 0; inc() { this.count++; } dec() { this.count--; } }
```
### Medium
```typescript
@Component({ encapsulation: ViewEncapsulation.None }) export class FullbleedComponent {}
```
### Advanced
```typescript
@Component({ template: `<ng-template #host></ng-template>` })
export class AdHostComponent {
  @ViewChild('host', { read: ViewContainerRef }) host!: ViewContainerRef;
}
```

## 7. Visual Diagram (ASCII)
```
GreetingComponent (class)
  name: string --> <p>{{ name }}> --> DOM via Renderer2
  count: number --> <span>{{ count }}> --> text node
```

## 8. Real-world Example
A dashboard metric-card fetches data from a service, exposes `@Input() config`, and uses OnPush so it re-checks only when `config` changes reference.

## 9. Angular Use Case
Everything visible is a component: cards, tables, modals, form fields. The app mounts one root component and nests children inside.

## 10. Common Mistakes
❌ Uppercase selectors get lower-cased
✔ Use kebab-case selectors
❌ Mutating an `@Input` in the child
✔ Emit via `@Output`
❌ Default CD strategy on large trees
✔ Use `OnPush`

## 11. Edge Cases
1. Standalone components – `imports` replaces `declarations`
2. Inheritance – subclass inherits inputs only if re-annotated/exposed
3. Selector collisions – attribute selectors clash with CSS; prefix consistently
4. `<ng-content select="[header]">` projects named slots

## 12. Performance Considerations
- Use `OnPush` across the app
- Keep expressions pure + side-effect free
- Avoid `({{ method() }})` (runs every CD cycle)
- Lazy-load feature modules to cut initial bundle

## 13. Time & Space Complexity
Instantiation O(n) in template size. CD per component O(m) where m = bound expressions. OnPush lowers re-checks to reference-identity changes.

## 14. Interview Questions
1. Three parts of a component?
2. How does the selector work?
3. How does CD update the DOM?
4. Component vs directive?
5. Standalone component?
6. ViewEncapsulation effect?

## 15. Follow-up Questions
- "When is `ngAfterViewInit` vs `ngOnInit`?"
- "How do you dynamically create a component?"

## 16. Production Best Practices
1. Set `OnPush` as default
2. Prefer standalone components
3. Keep components dumb — move logic into services
4. Prefix selectors (`app-`)
5. Treat @Input as readonly where mutation is not expected

## 17. Summary
A component couples a TypeScript view-model, a template, and styles behind a CSS selector; Angular instantiates it through DI, stamps the template via the Renderer, and re-checks it through change detection.

## Quick Recap
- Component = class + template + styles, matched by a CSS selector
- Data flows in via @Input, out via @Output
- OnPush = reference-based CD (off by default)
- Standalone components replace NgModules (v14+)
- Templates bind with {{ }} and (event) / [property] syntax

## 18. Revision Notes
- Selectors: element `app-x`, attribute `[app-x]`
- `@Input({ required: true })`
- `@ViewChild` = host view; `@ContentChild` = projected content
- Renderer2 abstracts the DOM for SSR
- CDStrategy: Default vs OnPush

## 19. Practice Questions
1. Create a counter component with OnPush.
2. Convert it to emit counts via @Output.
3. Build a standalone component that projects a header slot.
4. Explain why method calls in templates hurt performance.

## 20. References
- [Components & Templates](https://angular.io/guide/component-overview)
- [Change Detection](https://angular.io/guide/change-detection)

### Next File
**10 Angular Advanced/001 - Reactive Forms.md**


---

📝 **Module complete!** (2 files generated)  
Starting the next topic next...