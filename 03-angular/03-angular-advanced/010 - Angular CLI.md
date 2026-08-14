# Angular CLI

## 1. Definition

**Angular CLI** is the official command-line interface for scaffolding, building, testing, and deploying Angular applications.

## 2. Why do we need it?

Standardize workflows, enforce best practices, accelerate development with generators and optimization tools.

## 3. Internal Working

CLI commands:
1. `ng new` - Generate new project
2. `ng generate` - Add files/components/modules
3. `ng serve` - Start development server
4. `ng build` - Compile for production
5. `ng test` - Run unit tests
6. `ng lint` - Enforce code style

## 4. Step-by-Step Execution

Project creation:
```bash
ng new my-app --routing --style=scss
cd my-app
ng serve --port 4200
```

Adding features:
```bash
ng g component hero-list
ng g service hero-data
ng g module shared --route shared
```

Production build:
```bash
ng build --configuration production --stats-json
```

## 5. Syntax

```bash
# Common commands
ng new project-name
ng serve
ng build
ng test
ng lint
ng deploy

# Schematics generation
ng generate component name
ng generate directive name
ng generate service name
ng generate module name
ng generate pipe name
```

## 6. Examples (Easy → Advanced)

### Easy
```bash
# Generate new project
ng new my-first-app --routing --strict

# Serve locally
ng serve
```

### Medium
```bash
# Generate feature module with routing
ng g m feature --route feature --module app.module.ts

# Component with inline template
ng g c shared/header --inline-style=true --inline-template=true

# Skip tests during generation
ng g c lazy-component --skip-tests
```

### Advanced
```bash
# Workspace generation with custom path mappings
ng config cli.defaultCollection @nativescript/schematics

# Build with environment file
ng build --configuration staging

# Deploy directly
ng add @angular/pwa
ng build --prod --output-path dist/my-app
ngh --dir dist/my-app
```

## 7. Visual Diagram (ASCII)

```
CLI Workflow

┌─────────────────────┐
│ Project Scaffolding │ (ng new)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Development Server  │ (ng serve)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Unit Testing        │ (ng test)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Production Build    │ (ng build --prod)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Deployment          │ (ng deploy)
└─────────────────────┘
```

## 8. Real-world Example

Enterprise monorepo with multiple Angular apps managed via CLI.

## 9. Angular Use Case

Project initialization, component scaffolding, build optimization.

## 10. Common Mistakes

❌ Not using strict mode during project creation
❌ Skipping linting/testing in dev cycles

## 11. Edge Cases

1. **Custom schematics**
2. **Workspace-level configurations**
3. **Multi-app projects**

## 12. Performance Considerations

Incremental builds, differential loading enabled by default.

## 13. Time & Space Complexity

Build time scales with project size — optimized via caching.

## 14. Interview Questions

1. CLI workspace structure?
2. Environment variable handling?
3. Custom schematics?

## 15. Follow-up Questions

- "Configure multi-environment builds?"

## 16. Production Best Practices

1. Always use environment files properly
2. Enable strict mode
3. Configure budgets in angular.json
4. Use CI-specific build configurations
5. Regularly update dependencies

## 17. Summary

CLI accelerates Angular development while enforcing industry-standard practices.

## 18. Revision Notes

- Schematics generate boilerplate code
- Environment files manage config per deployment
- Strict mode catches potential runtime errors
- Budgets enforce size limits during builds

## 19. Practice Questions

1. Generate and configure multi-environment builds.
2. Create custom schematic for component pattern.
3. Add performance budgets to angular.json.

## 20. References

- [Angular CLI Reference](https://angular.io/cli)

### Next File
**011 - Animation System.md**
