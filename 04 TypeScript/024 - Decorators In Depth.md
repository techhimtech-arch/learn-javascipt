# TypeScript Decorators In Depth

## 1. Definition

**TypeScript Decorators** are special declarations that can be attached to classes, methods, properties, or parameters—enabling metaprogramming and aspect-oriented programming.

## 2. Why do we need it?

Add cross-cutting functionality declaratively (logging, validation, mocking, dependency injection).

## 3. Internal Working

Execution order (bottom-up):
1. **Parameter decorators** evaluated first
2. **Property and method decorators** evaluated next  
3. **Class decorators** evaluated last
4. Decorators applied during class definition phase

Each decorator receives metadata context and can return replacement value.

## 4. Step-by-Step Execution

Simple timing decorator:
```typescript
// Define decorator factory
function timed() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const end = performance.now();
      console.log(`${propertyKey} took ${end - start}ms`);
      return result;
    };
    
    return descriptor;
  };
}

class TaskProcessor {
  @timed()
  processTask(input: string): boolean {
    // Heavy synchronous work
    let sum = 0;
    for(let i = 0; i < 1000000; i++) sum += i;
    return input.length > 0;
  }
}
```

## 5. Syntax

```typescript
// Class decorator
function sealed(target: Function) {
  Object.seal(target);
  Object.seal(target.prototype);
}

// Property decorator
function format(target: any, key: string) {
  console.log(`Property ${key} defined`);
}

// Method decorator
function enumerable(isEnumerable: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Object.defineProperty(target, propertyKey, {
      enumerable: isEnumerable,
      value: descriptor.value,
      writable: true,
      configurable: true
    });
  };
}

// Parameter decorator
function injectable(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log('Param decorator called');
}

@sealed
class Example {
  @format
  prop: string = 'value';
  
  @enumerable(false)
  method(): void {}
  
  constructor(@injectable something?: string) {}
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Logger decorator
function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`${propertyKey} called with:`, args);
    return original.apply(this, args);
  };
  
  return descriptor;
}
```

### Advanced
```typescript
// Dependency injection decorator
const INJECTABLE_KEY = 'injectable:metadata';

function Injectable(config?: { scope?: string }) {
  return function (target: Function) {
    Reflect.defineMetadata(INJECTABLE_KEY, config || {}, target);
  };
}

@Injectable({ scope: 'singleton' })
class DatabaseService {}
```

## 7. Metadata API

```typescript
// Reflect metadata storage
function LogType(target: any, key: string) {
  const type = Reflect.getMetadata('design:type', target, key);
  console.log(`${key} has type: ${type.name}`);
}
```

## 8. Interview Questions

1. Decorator evaluation order and parameters?
2. Use case for each decorator type?
3. Reflect metadata usage?

## 9. Summary

Decorators provide compile-time hooks into class/member lifecycle enabling powerful metaprogramming patterns.

## 10. References

- [TypeScript Decorators Handbook](https://www.typescriptlang.org/docs/handbook/decorators.html)

---
