# TypeScript Compiler API

## 1. Definition

**TypeScript Compiler API** exposes programmatic access to TypeScript's compilation pipeline — enabling AST manipulation, linting, and code transformation.

## 2. Why do we need it?

Build tools, linters, IDE extensions, automated refactoring scripts.

## 3. Internal Working

Compiler stages:
1. **Parsing**: Source text → AST
2. **Binding**: Establish symbol relationships
3. **Type checking**: Verify type correctness
4. **Transformation**: AST modifications
5. **Emitting**: AST → output files

## 4. Step-by-Step Execution

AST exploration:
```typescript
import * as ts from 'typescript';

const sourceCode = `
class Greeter {
  greet(name: string): string {
    return "Hello, " + name;
  }
}
`;

const sourceFile = ts.createSourceFile(
  'example.ts',
  sourceCode,
  ts.ScriptTarget.Latest
);

// Traverse AST
function visit(node: ts.Node, depth: number = 0) {
  console.log('  '.repeat(depth) + ts.SyntaxKind[node.kind]);
  ts.forEachChild(node, child => visit(child, depth + 1));
}

visit(sourceFile);
```

## 5. Syntax

```typescript
// Program creation and type checking
const program = ts.createProgram(['file.ts'], {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS
});

const checker = program.getTypeChecker();

// Find all class declarations
const sourceFile = program.getSourceFile('file.ts');
ts.forEachChild(sourceFile, (node) => {
  if (ts.isClassDeclaration(node)) {
    console.log('Class:', node.name?.text);
  }
});
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Count functions in file
function countFunctions(fileName: string): number {
  const program = ts.createProgram([fileName], {});
  const sourceFile = program.getSourceFile(fileName);
  
  let count = 0;
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isFunctionDeclaration(node)) {
      count++;
    }
  });
  
  return count;
}
```

### Advanced
```typescript
// Custom lint rule: enforce naming conventions
class NamingRule implements ts.TransformationContext {
  // Transform AST: rename non-compliant identifiers
}

// Type-aware code transformation
const program = ts.createProgram(files, compilerOptions);
const checker = program.getTypeChecker();

checker.getSymbolAtLocation(node); // Get semantic info
checker.getTypeAtLocation(node);   // Access type information
```

## 7. Tooling Uses

- **ts-morph**: Simplified AST manipulation library
- **ESLint TypeScript rules**
- **Codemods**: Bulk code transformations
- **IDE extensions**: Type-aware refactoring

## 8. Interview Questions

1. Compiler pipeline stages?
2. AST traversal strategies?
3. Practical compiler API uses?

## 9. Summary

Compiler API empowers metaprogramming and advanced toolchain development.

## 10. References

- [TypeScript Compiler API Docs](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)

---
