# Angular Architecture & CLI

## 1. Definition
Angular is a platform+framework for building SPAs. It ships a compiler, runtime, HTTP client, router and the Angular CLI (`@angular/cli`), which scaffolds, builds, tests and deploys projects while enforcing a standard folder layout and `angular.json` config.

## 2. Why do we need it?
- Declarative templates cut manual DOM work
- AoT compiles catch bugs before runtime
- Built-in DI + RxJS make code testable & reactive
- The CLI standardizes scaffolding so teams move fast
- Standalone components (v14+) cut NgModule boilerplate

## 3. Internal Working
1. `ng new` creates `angular.json`, `tsconfig.json`, the root `AppModule`
2. `tsc`+`ngc` type-check `.ts` and compile `@Component`/`@NgModule` into runtime metadata
3. A bundler (esbuild/webpack) joins modules + assets into `dist/`
4. `platformBrowser` loads `main.ts` -> bootstraps `AppModule` -> mounts the root component
5. Zone.js patches async APIs so change detection auto-runs on events

## 4. Step-by-Step Execution
```bash
ng new shop-app --strict --routing
ng generate component shared/ui/card --standalone --skip-tests
ng build --configuration production
```
Serve:
```bash
ng serve --port 4200 --open
```

## 5. Syntax
```json
{ "projects": { "shop-app": { "architect": { "build": { "options": {
  "outputPath": "dist/shop-app", "main": "src/main.ts",
  "styles": ["src/styles.css"],
  "budgets": [{ "type": "initial", "maximumWarning": "500kb" }]
}}}}}}}
```

## 6. Examples (Easy → Advanced)
### Easy
```bash
ng generate service data
```
### Medium
```bash
ng add @angular/material
```
### Advanced
```bash
ng generate workspace --name=platform --strict
```

## 7. Visual Diagram (ASCII)
```
CLI -> TSC/ngc -> Bundler(esbuild) -> dist/ -> Browser -> Zone.js -> CD -> Renderer2
```

## 8. Real-world Example
An e-commerce repo gates PRs: if `ng build` exceeds the 500 KB initial budget, CI fails before merge.

## 9. Angular Use Case
Every Angular project starts with the CLI; `angular.json` drives builders, budgets, file replacements and global scripts.

## 10. Common Mistakes
❌ Editing files under `dist/`
✔ Treat `dist/` as immutable
❌ `ng serve` for production
✔ Always use `--configuration production`
❌ Committing `node_modules`/`.angular/`
✔ Keep in `.gitignore`

## 11. Edge Cases
1. Schema collections can live in a separate npm package
2. `--skip-git` avoids an unwanted repo
3. `--no-standalone` reverts to classic NgModule scaffolding

## 12. Performance Considerations
- Enable `aot` + `buildOptimizer`
- Use production config
- Pin deps and run `ng update`

## 13. Time & Space Complexity
Build-time only. ~O(n) in source lines with esbuild; legacy webpack ~O(n log n).

## 14. Interview Questions
1. What builders does `angular.json` configure?
2. How do you enforce a performance budget in CI?
3. `ng generate` vs `ng add`?
4. Workspace vs project?

## 15. Follow-up Questions
- "How do you share ESLint config across a monorepo?"

## 16. Production Best Practices
1. Pin CLI version + run `ng update` regularly
2. Define budgets so PRs fail on bloat
3. Enable strict mode + lint rules
4. Use `ng add` over manual installs

## 17. Summary
The Angular CLI is the standardised entry point—scaffolding, type-checking, bundling, testing and deployment with a team-consistent project shape.

## Quick Recap
- CLI = `ng new/generate/serve/build/test/deploy`
- `angular.json` configures builders, budgets, styles/scripts
- `ng generate` produces NgModules, components, services, pipes
- `ng serve` = dev HMR; `ng build` = optimised prod output
- Workspaces group projects; Nx adds caching + affected graphs

## 18. Revision Notes
- `ng new`, `ng generate`, `ng serve`, `ng build`, `ng test`, `ng deploy`
- `angular.json` > projects > architect > builder > options
- Environment files via `fileReplacements`
- Strict mode + lint rules enforce quality
- Workspaces share config; Nx adds caching

## 19. Practice Questions
1. Generate a lazy feature module with routing using the CLI.
2. Add a budget that fails if a bundle exceeds 200 KB.
3. Configure a root global style sheet + preloads script.
4. Set up a pre-commit hook that lints + tests changed files.

## 20. References
- [Angular CLI](https://angular.io/cli)
- [angular.json reference](https://angular.io/json-schemas/angular-json)

### Next File
**002 - Components & Templates.md**
