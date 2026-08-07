# Decorators

## 1. Definition

**Decorators** are special declarations that can be attached to classes, methods, accessors, properties, or parameters — modifying their behavior at design time.

## 2. Why do we need it?

Enable metaprogramming — inject cross-cutting concerns like logging, validation, dependency injection, or metadata attachment.

## 3. Internal Working

At class definition:
1. Decorator runs once per target element
2. May replace or augment original definition
3. Metadata optionally added via reflection

## 4. Step-by-Step Execution

Example:
```typescript
function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return original.apply(this, args);
  };
}

class Example {
  @logMethod
  greet(name: string) {
    return `Hi, ${name}`;
  }
}
```

Steps:
1. Class parsed
2. Method decorated with `@logMethod`
3. Original method wrapped
4. Console logs added transparently

## 5. Syntax

```typescript
@decoratorName
class MyClass {}

function decoratorName(target, key?, descriptor?) {
  // modify or wrap target/key/descriptor
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
}

@sealed
class ImmutableConfig {}
```

### Medium
```typescript
function debounce(ms: number) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      clearTimeout((this as any).__timer);
      (this as any).__timer = setTimeout(() => original.apply(this, args), ms);
    };
  };
}
```

### Advanced
```typescript
function Injectable() {
  return function (constructor: any) {
    Reflect.defineMetadata("injectable", true, constructor.prototype);
  };
}
```

## 7. Visual Diagram (ASCII)

```
Decorator Application Flow

┌──────────────┐
│ Original     │
│ Class        │
└─────┬────────┘
      │ Apply @decorator
      ▼
┌──────────────┐
│ Wrapped      │
│ Class        │
└──────────────┘
```

## 8. Real-world Example

Angular service definition:
```typescript
@Injectable({
  providedIn: 'root'
})
export class MyService {}
```

## 9. Angular Use Case

Dependency injection (`@Injectable`), component directives (`@Directive`, `@Component`), route guards via metadata.

## 10. Common Mistakes

❌ Applying decorators incorrectly (order matters)  
❌ Modifying frozen objects  

## 11. Edge Cases

1. **Parameter decorators cannot modify constructor**
2. **Multiple decorators compose left-to-right**
3. **Metadata reflection requires `emitDecoratorMetadata:true`**

## 12. Performance Considerations

Decorators evaluated at class-definition time — one-time cost.

## 13. Time & Space Complexity

One-time runtime cost proportional to decorator complexity.

## 14. Interview Questions

1. Types of decorators?
2. Order of execution with multiple?
3. How does Angular DI leverage them?

## 15. Follow-up Questions

- "Can decorators modify return type?"

## 16. Production Best Practices

1. Document expected usage clearly
2. Validate arguments passed to decorator
3. Preserve original prototype chain where needed

## 17. Summary

Compile-time hooks enhancing/extending class/method behavior declaratively.

## 18. Revision Notes

- Class/method/accessor/property/parameter variants
- Stack order important
- Metadata opt-in
- Angular relies heavily

## 19. Practice Questions

1. Create logging decorator.
2. Implement throttling decorator.
3. Attach DI metadata via Reflect.

## 20. References

- [TypeScript: Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- Angular Documentation

### Next File
**012 - Modules.md**
