# Custom Decorators

## 1. Definition

**Custom Decorators** are metadata functions modifying classes, methods, properties, or parameters — enabling aspect-oriented programming extensions.

## 2. Why do we need it?

Add cross-cutting concerns declaratively (logging, validation, access control, memoization).

## 3. Internal Working

Decorator factory returns function modifying target:
1. Factory called at definition time
2. Receives target/type metadata
3. Returns modified constructor/class
4. Angular applies metadata during compilation

## 4. Step-by-Step Execution

Class decorator example:
```typescript
function LogClass(target: Function) {
  const original = target;
  
  function construct(constructor: Function, args: any[]) {
    return new (constructor as any)(...args);
  }

  const newConstructor: any = function (...args: any[]) {
    console.log('Instantiating class:', original.name);
    return construct(original, args);
  };

  newConstructor.prototype = original.prototype;
  
  return newConstructor;
}
```

Usage:
```typescript
@LogClass()
export class MyComponent {
  constructor() { }
}
```

## 5. Syntax

```typescript
// Class decorator
function MyDecorator(target: Type<any>) { }

// Method decorator
function MyMethodDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) { }

// Property decorator
function MyPropertyDecorator(target: any, propertyKey: string) { }

// Parameter decorator
function MyParamDecorator(
  target: any,
  propertyKey: string,
  parameterIndex: number
) { }
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple method logger
function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`${propertyKey} called with:`, args);
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

class Calculator {
  @logMethod
  add(a: number, b: number): number {
    return a + b;
  }
}
```

### Medium
```typescript
// Input validation decorator
function validateInput(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (value: any) {
    if (value === null || value === undefined) {
      throw new Error('Input cannot be null or undefined');
    }
    return originalMethod.call(this, value);
  };
  
  return descriptor;
}

class Form {
  private _value: string = '';
  
  @validateInput
  set value(val: string) {
    this._value = val;
  }
}
```

### Advanced
```typescript
// Memoization decorator with TTL
function memoize(ttlMs: number = 60000) {
  const cache = new Map<any, { result: any, timestamp: number }>();
  
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cache.get(key);
      const now = Date.now();
      
      if (cached && (now - cached.timestamp < ttlMs)) {
        return cached.result; // Return cached result
      }
      
      const result = originalMethod.apply(this, args);
      cache.set(key, { result, timestamp: now });
      
      // Cleanup expired entries
      setTimeout(() => cache.delete(key), ttlMs);
      
      return result;
    };
    
    return descriptor;
  };
}

class ExpensiveService {
  @memoize(30000)
  calculateData(input: string): any {
    // Expensive computation
    return complexCalculation(input);
  }
}
```

## 7. Visual Diagram (ASCII)

```
Decorator Application

Source Code
┌─────────────────────┐
│ @logMethod          │
│ method() { ... }    │
└─────────┬───────────┘
          ▼
Decorator Function
Modifies Method/Descriptor
          ▼
┌─────────────────────┐
│ Wrapped Method      │
│ - logs call         │
│ - calls original    │
└─────────────────────┘
```

## 8. Real-world Example

Performance monitoring decorator measuring method execution time.

## 9. Angular Use Case

Access control guards, performance tracking, auto-subscription handling.

## 10. Common Mistakes

❌ Modifying prototypes incorrectly
❌ Not returning new descriptor

## 11. Edge Cases

1. **Metadata reflection**
   ```typescript
   Reflect.metadata('design:type', String)
   ```

2. **Decorator ordering**

## 12. Performance Considerations

Decorator logic executes at definition time — keep minimal.

## 13. Time & Space Complexity

Runtime overhead depends on wrapped logic.

## 14. Interview Questions

1. Decorator execution order?
2. Metadata API usage?
3. Practical use cases?

## 15. Follow-up Questions

- "Implement auto-unsubscribe decorator?"

## 16. Production Best Practices

1. Document decorator behaviors clearly
2. Keep side effects minimal
3. Validate inputs appropriately
4. Test decorators thoroughly

## 17. Summary

Custom decorators provide powerful metaprogramming capabilities with clean declarative syntax.

## 18. Revision Notes

- 4 decorator types (class, method, property, parameter)
- Apply at definition time
- Can modify behavior entirely
- Return modified targets/descriptors

## 19. Practice Questions

1. Create logging decorator.
2. Build memoization decorator.
3. Implement input validation decorator.

## 20. References

- [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Next File
**013 - NgRx State Management.md**
