# TypeScript Decorators

## 1. Definition

**TypeScript Decorators** are metadata functions modifying classes/methods/properties/parameters — enabling declarative meta-programming.

## 2. Why do we need it?

Annotate behavior, inject dependencies, create frameworks declaratively.

## 3. Internal Working

Decorator evaluation:
1. Parameter decorators (bottom-up)
2. Property/METHOD decorators (top-down)
3. CLASS decorators (bottom-up on stack)
4. Applied during definition phase

## 4. Syntax

```typescript
// Class decorator
function LogClass(target: Function) {
  console.log('Class created:', target.name);
}

// Property decorator
function logProperty(target: any, key: string) {
  // Can't easily modify after initialization
}

// Method decorator
function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(key, 'called with', args);
    return original.apply(this, args);
  };
}

// Parameter decorator
function logParam(target: any, key: string, index: number) {
  console.log('Param at index', index, 'in', key);
}

@LogClass
class MyService {
  @logMethod
  doWork(@logParam input: string): number {
    return this.calculate(input);
  }
}
```

## 5. Examples

### Easy
```typescript
// Simple timing decorator
function time(method: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const start = performance.now();
      const result = original.apply(this, args);
      const end = performance.now();
      console.log(`${method}: ${end - start}ms`);
      return result;
    };
    return descriptor;
  };
}

class Processor {
  @time('sort')
  sortItems(items: number[]) {
    return items.sort((a, b) => a - b);
  }
}
```

### Advanced
```typescript
// Dependency injection decorator
function Injectable(config?: { scope?: string }) {
  return function (target: Function) {
    // Store metadata for custom DI container
    Reflect.defineMetadata('injectable', config || {}, target);
  };
}

@Injectable({ scope: 'request' })
class DatabaseService {}
```

## 6. Interview Questions

1. Decorator evaluation order?
2. Modify method behavior?
3. Metadata API usage?

## 7. Summary

Decorators provide declarative extension points for TypeScript programs.

## 8. References

- [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

---
