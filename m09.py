# -*- coding: utf-8 -*-
# Module 9 - Angular Core data (22 topics)

H = {
  "defn": "1. Definition",
  "why":   "2. Why do we need it?",
  "work":  "3. Internal Working",
  "steps": "4. Step-by-Step Execution",
  "syntax":"5. Syntax",
  "ex":    "6. Examples (Easy \u2192 Advanced)",
  "dia":   "7. Visual Diagram (ASCII)",
  "real":  "8. Real-world Example",
  "angular":"9. Angular Use Case",
  "mistakes":"10. Common Mistakes",
  "edge":  "11. Edge Cases",
  "perf":  "12. Performance Considerations",
  "cx":    "13. Time & Space Complexity",
  "iq":    "14. Interview Questions",
  "follow":"15. Follow-up Questions",
  "bp":    "16. Production Best Practices",
  "sum":   "17. Summary",
  "recap": "Quick Recap",
  "rev":   "18. Revision Notes",
  "pq":    "19. Practice Questions",
  "ref":   "20. References",
}

def T(title, **kw):
    d = {}
    for k, v in kw.items():
        if k not in H:
            raise KeyError(k)
        d[H[k]] = v
    return (title, d)

topics = [
T("Angular Architecture & CLI",
  defn="Angular is a platform+framework for building SPAs. It ships a compiler, runtime, HTTP client, router and the Angular CLI (`@angular/cli`), which scaffolds, builds, tests and deploys projects while enforcing a standard folder layout and `angular.json` config.",
  why="- Declarative templates cut manual DOM work\n- AoT compiles catch bugs before runtime\n- Built-in DI + RxJS make code testable & reactive\n- The CLI standardizes scaffolding so teams move fast\n- Standalone components (v14+) cut NgModule boilerplate",
  work="1. `ng new` creates `angular.json`, `tsconfig.json`, the root `AppModule`\n2. `tsc`+`ngc` type-check `.ts` and compile `@Component`/`@NgModule` into runtime metadata\n3. A bundler (esbuild/webpack) joins modules + assets into `dist/`\n4. `platformBrowser` loads `main.ts` -> bootstraps `AppModule` -> mounts the root component\n5. Zone.js patches async APIs so change detection auto-runs on events",
  steps="```bash\nng new shop-app --strict --routing\nng generate component shared/ui/card --standalone --skip-tests\nng build --configuration production\n```\nServe:\n```bash\nng serve --port 4200 --open\n```",
  syntax="```json\n{ \"projects\": { \"shop-app\": { \"architect\": { \"build\": { \"options\": {\n  \"outputPath\": \"dist/shop-app\", \"main\": \"src/main.ts\",\n  \"styles\": [\"src/styles.css\"],\n  \"budgets\": [{ \"type\": \"initial\", \"maximumWarning\": \"500kb\" }]\n}}}}}}}\n```",
  ex="### Easy\n```bash\nng generate service data\n```\n### Medium\n```bash\nng add @angular/material\n```\n### Advanced\n```bash\nng generate workspace --name=platform --strict\n```",
  dia="```\nCLI -> TSC/ngc -> Bundler(esbuild) -> dist/ -> Browser -> Zone.js -> CD -> Renderer2\n```",
  real="An e-commerce repo gates PRs: if `ng build` exceeds the 500 KB initial budget, CI fails before merge.",
  angular="Every Angular project starts with the CLI; `angular.json` drives builders, budgets, file replacements and global scripts.",
  mistakes="❌ Editing files under `dist/`\n✔ Treat `dist/` as immutable\n❌ `ng serve` for production\n✔ Always use `--configuration production`\n❌ Committing `node_modules`/`.angular/`\n✔ Keep in `.gitignore`",
  edge="1. Schema collections can live in a separate npm package\n2. `--skip-git` avoids an unwanted repo\n3. `--no-standalone` reverts to classic NgModule scaffolding",
  perf="- Enable `aot` + `buildOptimizer`\n- Use production config\n- Pin deps and run `ng update`",
  cx="Build-time only. ~O(n) in source lines with esbuild; legacy webpack ~O(n log n).",
  iq="1. What builders does `angular.json` configure?\n2. How do you enforce a performance budget in CI?\n3. `ng generate` vs `ng add`?\n4. Workspace vs project?",
  follow="- \"How do you share ESLint config across a monorepo?\"",
  bp="1. Pin CLI version + run `ng update` regularly\n2. Define budgets so PRs fail on bloat\n3. Enable strict mode + lint rules\n4. Use `ng add` over manual installs",
  sum="The Angular CLI is the standardised entry point—scaffolding, type-checking, bundling, testing and deployment with a team-consistent project shape.",
  recap="- CLI = `ng new/generate/serve/build/test/deploy`\n- `angular.json` configures builders, budgets, styles/scripts\n- `ng generate` produces NgModules, components, services, pipes\n- `ng serve` = dev HMR; `ng build` = optimised prod output\n- Workspaces group projects; Nx adds caching + affected graphs",
  rev="- `ng new`, `ng generate`, `ng serve`, `ng build`, `ng test`, `ng deploy`\n- `angular.json` > projects > architect > builder > options\n- Environment files via `fileReplacements`\n- Strict mode + lint rules enforce quality\n- Workspaces share config; Nx adds caching",
  pq="1. Generate a lazy feature module with routing using the CLI.\n2. Add a budget that fails if a bundle exceeds 200 KB.\n3. Configure a root global style sheet + preloads script.\n4. Set up a pre-commit hook that lints + tests changed files.",
  ref="- [Angular CLI](https://angular.io/cli)\n- [angular.json reference](https://angular.io/json-schemas/angular-json)",
),

T("Components & Templates",
  defn="A **Component** pairs a TypeScript class (logic), a **Template** (HTML view) and optional **Styles** into a reusable unit. It is declared in an `NgModule` (or is standalone) and matched in a parent template by its **selector**. The class is the view-model; the template binds presentational state to it.",
  why="- Reusable, self-contained UI blocks\n- Selectors let components compose like custom HTML\n- Each has its own change-detection boundary\n- Templates support binding + structural directives",
  work="At bootstrap Angular renders the tree by matching each selector:\n1. DI container instantiates the class\n2. `LView` (component instance data) created\n3. Template stamped into DOM via `Renderer2`\n4. Inputs bound + change detection runs\n5. On destroy listeners + subscriptions tear down\nStandalone components skip `declarations` and use `imports`.",
  steps="```bash\nng g c greeting --standalone\n```\n1. Parent renders `<app-greeting [name]=\"user.name\">\n2. Selector `app-greeting` -> instantiate class\n3. Template `Hello {{ name }}` compiles\n4. Input flows in \u2192 text node updated\n5. Destroyed when `*ngIf` flips",
  syntax="```typescript\n@Component({\n  selector: 'app-greeting',\n  standalone: true,\n  imports: [CommonModule],\n  template: `<p>Hello, {{ name }}!</p>`,\n  styles: [`p { font-weight: bold; }`],\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  encapsulation: ViewEncapsulation.Emulated,\n})\nexport class GreetingComponent {\n  @Input({ required: true }) name!: string;\n  @Output() greeted = new EventEmitter<string>();\n}\n```",
  ex="### Easy\n```typescript\n@Component({\n  selector: 'counter',\n  template: `<button (click)=\"dec()\">-</button> <span>{{count}}</span> <button (click)=\"inc()\">+</button>`\n})\nexport class CounterComponent { count = 0; inc() { this.count++; } dec() { this.count--; } }\n```\n### Medium\n```typescript\n@Component({ encapsulation: ViewEncapsulation.None }) export class FullbleedComponent {}\n```\n### Advanced\n```typescript\n@Component({ template: `<ng-template #host></ng-template>` })\nexport class AdHostComponent {\n  @ViewChild('host', { read: ViewContainerRef }) host!: ViewContainerRef;\n}\n```",
  dia="```\nGreetingComponent (class)\n  name: string --> <p>{{ name }}> --> DOM via Renderer2\n  count: number --> <span>{{ count }}> --> text node\n```",
  real="A dashboard metric-card fetches data from a service, exposes `@Input() config`, and uses OnPush so it re-checks only when `config` changes reference.",
  angular="Everything visible is a component: cards, tables, modals, form fields. The app mounts one root component and nests children inside.",
  mistakes="❌ Uppercase selectors get lower-cased\n✔ Use kebab-case selectors\n❌ Mutating an `@Input` in the child\n✔ Emit via `@Output`\n❌ Default CD strategy on large trees\n✔ Use `OnPush`",
  edge="1. Standalone components \u2013 `imports` replaces `declarations`\n2. Inheritance \u2013 subclass inherits inputs only if re-annotated/exposed\n3. Selector collisions \u2013 attribute selectors clash with CSS; prefix consistently\n4. `<ng-content select=\"[header]\">` projects named slots",
  perf="- Use `OnPush` across the app\n- Keep expressions pure + side-effect free\n- Avoid `({{ method() }})` (runs every CD cycle)\n- Lazy-load feature modules to cut initial bundle",
  cx="Instantiation O(n) in template size. CD per component O(m) where m = bound expressions. OnPush lowers re-checks to reference-identity changes.",
  iq="1. Three parts of a component?\n2. How does the selector work?\n3. How does CD update the DOM?\n4. Component vs directive?\n5. Standalone component?\n6. ViewEncapsulation effect?",
  follow="- \"When is `ngAfterViewInit` vs `ngOnInit`?\"\n- \"How do you dynamically create a component?\"",
  bp="1. Set `OnPush` as default\n2. Prefer standalone components\n3. Keep components dumb \u2014 move logic into services\n4. Prefix selectors (`app-`)\n5. Treat @Input as readonly where mutation is not expected",
  sum="A component couples a TypeScript view-model, a template, and styles behind a CSS selector; Angular instantiates it through DI, stamps the template via the Renderer, and re-checks it through change detection.",
  recap="- Component = class + template + styles, matched by a CSS selector\n- Data flows in via @Input, out via @Output\n- OnPush = reference-based CD (off by default)\n- Standalone components replace NgModules (v14+)\n- Templates bind with {{ }} and (event) / [property] syntax",
  rev="- Selectors: element `app-x`, attribute `[app-x]`\n- `@Input({ required: true })`\n- `@ViewChild` = host view; `@ContentChild` = projected content\n- Renderer2 abstracts the DOM for SSR\n- CDStrategy: Default vs OnPush",
  pq="1. Create a counter component with OnPush.\n2. Convert it to emit counts via @Output.\n3. Build a standalone component that projects a header slot.\n4. Explain why method calls in templates hurt performance.",
  ref="- [Components & Templates](https://angular.io/guide/component-overview)\n- [Change Detection](https://angular.io/guide/change-detection)",
),
]

DATA = [("09 Angular Core", topics)]
