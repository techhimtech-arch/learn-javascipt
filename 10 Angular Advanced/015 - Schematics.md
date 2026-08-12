# Angular CLI Schematics

## 1. Definition

**Schematics** are code generators/plugins for Angular CLI — automating project setup, component creation, and workflow tasks.

## 2. Why do we need it?

Standardize project structure, enforce conventions, eliminate repetitive setup.

## 3. Internal Working

1. CLI invokes schematic factory
2. Schematic reads workspace configuration
3. Applies transformations to file system
4. Updates project metadata files
5. Reports results to terminal

## 4. Step-by-Step Execution

```bash
# Generate new schematic collection
ng generate @schematics/angular:component my-component

# Custom schematic usage
ng generate ./projects/my-schematics:smart-component
```

## 5. Syntax

```typescript
// Schematic factory definition
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function mySchematic(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTiming(
      `✓ Created ${options.name} with default structure`
    );
    
    const path = `/${options.path}/src/app/${options.name}`;
    tree.create(`${path}/${options.name}.component.ts`, `// Component code`);
    tree.create(`${path}/${options.name}.component.html`, `<!-- HTML template -->`);
    
    return tree;
  };
}
```

## 6. Examples

### Easy
```bash
ng generate component user-profile
# Creates:
# src/app/user-profile/user-profile.component.ts
# src/app/user-profile/user-profile.component.html
# src/app/user-profile/user-profile.component.css
```

### Medium
```bash
# Generate module with routing
ng g m admin --route admin --module app.module.ts
# Adds to app-routing and creates feature module
```

### Advanced
```json
// workspace.json schematic defaults
{
  "schematics": {
    "@schematics/angular:component": {
      "skipTests": true,
      "changeDetection": "OnPush",
      "style": "scss"
    }
  }
}
```

## 7. Visual Diagram (ASCII)

```
Schematic Generation Pipeline

User Command ──► CLI Parser ──► Schematic Factory ──► File System Transformations
                                                   │
                                         Templates Applied
                                                   │
                                         New Files Created
                                                   │
                                         Project Metadata Updated
```

## 8. Real-world Example

Enterprise schematic enforcing consistent component patterns.

## 9. Angular Use Case

Project scaffolding, team onboarding, standardizing code style.

## 10. Common Mistakes

❌ Not documenting generated structures
❌ Breaking existing project configuration

## 11. Edge Cases

1. **Custom collection integration**
2. **Template override resolution**

## 12. Performance Considerations

Schematics run once at generation — no runtime cost.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Custom schematic creation?
2. Workspace configuration defaults?
3. Template file handling?

## 15. Follow-up Questions

- "Share schematics across teams?"

## 16. Production Best Practices

1. Version control schematic collections
2. Document all custom templates
3. Test schematic edge cases
4. Provide clear error messages

## 17. Summary

Schematics automate project setup enabling consistent scaffolding at scale.

## 18. Revision Notes

- Rules transform virtual file system
- Context provides logging/hooks
- Options control generation parameters
- Collections group related schematics

## 19. Practice Questions

1. Create component generation schematic.
2. Modify existing schematic defaults.
3. Implement conditional file generation.

## 20. References

- [Angular Schematics Guide](https://angular.io/guide/schematics-for-libraries)

---
