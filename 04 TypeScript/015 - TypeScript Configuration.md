# TypeScript Configuration

## 1. Definition

**`tsconfig.json`** is the configuration file defining compiler options, file exclusions/inclusions, and project structure for TypeScript projects.

## 2. Why do we need it?

Configure compilation targets, module systems, strictness levels, path aliases, and output locations.

## 3. Internal Working

Compiler reads `tsconfig.json` at root:
1. Validates compiler options
2. Applies settings to all matched files
3. Enables incremental builds via `.tsbuildinfo`

## 4. Step-by-Step Execution

Example:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"]
}
```

Steps:
1. Load `tsconfig.json`
2. Resolve include/exclude glob patterns
3. Compile files using specified settings
4. Output transpiled JS to `outDir`

## 5. Syntax

JSON schema-based — no special TS syntax.

Common fields:
```json
{
  "compilerOptions": {
    "target", "module", "strict", "outDir",
    "declaration", "sourceMap", "lib",
    "esModuleInterop", "skipLibCheck",
    "forceConsistentCasingInFileNames"
  },
  "include": [...],
  "exclude": [...]
}
```

## 6. Examples (Easy → Advanced)

### Easy
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020"
  }
}
```

### Medium
```json
{
  "extends": "./config/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@shared/*": ["src/shared/*"] }
  }
}
```

### Advanced
```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "incremental": true
  }
}
```

## 7. Visual Diagram (ASCII)

```
TypeScript Compilation Pipeline

tsconfig.json
    ↓
Compiler Options Resolver
    ↓
Source File Loader
    ↓
Type Checker
    ↓
Transpiler → JS + Declaration Files
```

## 8. Real-world Example

Angular CLI uses `tsconfig.app.json` extending base config with app-specific overrides.

## 9. Angular Use Case

Controls strictness, path mappings, lib targets across Angular workspace.

## 10. Common Mistakes

❌ Incorrect include/exclude paths  
❌ Missing strict flags  

## 11. Edge Cases

1. **Extends inheritance**
2. **Project references**
3. **Override cascading**

## 12. Performance Considerations

Enable incremental builds for faster recompilation.

## 13. Time & Space Complexity

Varies — depends on number/type of analyzed files.

## 14. Interview Questions

1. Key TypeScript compiler options?
2. Enable strict mode?
3. Path aliases benefits?

## 15. Follow-up Questions

- "How does Angular optimize TS compilation?"

## 16. Production Best Practices

1. Enforce strict mode
2. Use extended configs for consistency
3. Enable source maps for debugging
4. Leverage project references for monorepos

## 17. Summary

Essential for tuning TypeScript behavior in real projects.

## 18. Revision Notes

- Centralized compiler config
- Strictness toggles
- Path resolution customization
- Supports inheritance

## 19. Practice Questions

1. Configure basic strict TS setup.
2. Add path alias.
3. Enable declaration generation.

## 20. References

- [TypeScript: tsconfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

### Next File
**016 - Declaration Files.md**
