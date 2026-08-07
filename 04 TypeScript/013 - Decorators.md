# Decorators in TypeScript

## 1. Definition

**Decorators** are special declarations that can be attached to classes, methods, accessors, properties, or parameters — allowing modification of behavior at design time.

They provide a way to **annotate and modify classes** and their members through meta-programming.

## 2. Why do we need it?

Enable cross-cutting concerns like:
- Logging
- Validation
- Access control
- Metadata registration
- Dependency injection hooks

## 3. Internal Working

Decorators run once during class definition phase:
1. Class parsed
2. Decorator factory invoked (if applicable)
3. Decorator modifies target object directly

They operate on the prototype/class definition — affecting all instances unless overridden.

## 4. Step-by-Step Execution

Example:
```typescript
function logged(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`${methodName} called with:`, args);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @logged
  add(a: number, b: number) {
    return a + b;
  }
}
```

Execution Steps:
1. Class `Calculator` fully defined
2. `@logged` decorator runs on `add` method
3. Original method wrapped
4. Every call to `add` logs inputs/outputs

## 5. Syntax

```typescript
// Class decorator
@decoratorName
class MyClass {}

// Method decorator
class MyClass {
  @decoratorName
  myMethod() {}
}

// Property decorator
class MyClass {
  @decoratorName
  myProperty!: string;
}

// Parameter decorator
class MyClass {
  myMethod(@decorator param: string) {}
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class ImmutableConfig {}
```

### Medium
```typescript
function debounce(delay: number) {
  return function (_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      clearTimeout((this as any).__timer);
      (this as any).__timer = setTimeout(() => original.apply(this, args), delay);
    };
  };
}

class SearchComponent {
  @debounce(300)
  search(term: string) {
    this.performSearch(term);
  }
}
```

### Advanced
```typescript
function route(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('route', path, target, key);
  };
}

class PageController {
  @route('/users')
  listUsers() {}

  @route('/products')
  listProducts() {}
}
```

## 7. Visual Diagram (ASCII)

```
Decorator Application Flow

┌──────────────────┐
│ Original Class   │
└─────────┬────────┘
          │
          ▼ Apply @decoratorName
┌─────────▼────────┐
│ Decorated Class  │ (Modified prototype/method)
└──────────────────┘
```

## 8. Real-world Example

Angular Component:
```typescript
@Component({
  selector: 'user-card',
  template: '<p>{{ user.name }}</p>'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() select = new EventEmitter<User>();
}
```

## 9. Angular Use Case

Used extensively:
- `@Component`, `@Input`, `@Output`, `@Injectable`, `@Directive`, `@Pipe`
- Enables compile-time optimizations

## 10. Common Mistakes

❌ Applying decorators incorrectly  
❌ Not preserving original method logic  
❌ Decorator order matters  

## 11. Edge Cases

1. **Decorator factories return actual decorator**
   ```typescript
   function log(prefix: string) {
     return function (target: any, key: string) {
       console.log(`${prefix} ${key}`);
     };
   }
   ```

2. **Parameter decorators cannot modify constructor logic directly**

3. **Multiple decorators evaluated bottom-up**
   ```typescript
   @dec1
   @dec2
   method() {} // dec2 runs before dec1
   ```

## 12. Performance Considerations

Decorators add slight startup overhead — negligible in production builds due to tree-shaking.

## 13. Time & Space Complexity

One-time execution cost — O(1) per decorated item.

## 14. Interview Questions

1. Types of decorators in TypeScript?
2. Decorator execution order?
3. Real-world applications in Angular?

## 15. Follow-up Questions

- "Can you make metadata visible at runtime?"
- "How do you reverse a decorator?"

## 16. Production Best Practices

1. Limit side-effects in decorators
2. Keep decorators pure when possible
3. Document behavior clearly
4. Combine with TypeScript metadata reflection (`emitDecoratorMetadata`)

## 17. Summary

Decorators extend TypeScript classes/methods with reusable logic — foundational to Angular’s declarative architecture.

## 18. Revision Notes

- 5 types: class/method/accessor/property/parameter
- Evaluated once at definition time
- Modify prototypes or metadata
- Angular heavily depends on them

## 19. Practice Questions

1. Create logging decorator.
2. Build retry-on-failure method decorator.
3. Register route paths using metadata.

## 20. References

- [TypeScript: Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- Angular Documentation

### Next File
**014 - Modules.md**
