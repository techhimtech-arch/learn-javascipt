# Inheritance

## 1. Definition

**Inheritance** is a mechanism allowing one object/class to acquire properties and behaviors (methods) from another — promoting code reuse and hierarchical relationships.

## 2. Why do we need it?

- Share common functionality
- Reduce duplication
- Support polymorphism
- Model real-world hierarchies

## 3. Internal Working

JavaScript inherits behavior through the **prototype chain**, either explicitly set with `Object.create()` or implicitly via class syntax.

## 4. Step-by-Step Execution

Example:
```javascript
class Vehicle {
  move() { console.log("Moving"); }
}
class Car extends Vehicle {
  horn() { console.log("Beep!"); }
}

const myCar = new Car();
myCar.move(); // Inherited via prototype chain
myCar.horn(); // Own method
```

Steps:
1. `Car.prototype.__proto__ = Vehicle.prototype`
2. `myCar.move()` → look on Car → not found → check parent → found

## 5. Syntax

```javascript
// ES6 Class
class SubClass extends SuperClass { ... }

// Pre-ES6
SubClass.prototype = Object.create(SuperClass.prototype);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
class Animal {}
class Dog extends Animal {}
const dog = new Dog();
dog instanceof Animal; // true
```

### Medium
```javascript
class Shape {
  constructor(area) { this.area = area; }
  describe() { return `Area: ${this.area}`; }
}
class Square extends Shape {
  constructor(side) {
    super(side * side); // Calls parent constructor
  }
}
```

### Advanced
```javascript
const Flyable = Base => class extends Base {
  fly() { console.log("Flying!"); }
};

class Bird {}
class FlyingBird extends Flyable(Bird) {}
```

## 7. Visual Diagram (ASCII)

```
Inheritance Hierarchy

Animal (base)
├── Dog (child)
│   ├── Puppy
│   └── Wolf
└── Cat

Each child inherits from parent via [[Prototype]]
```

## 8. Real-world Example

Angular Component Hierarchy:
```typescript
@Component({
  selector: 'base-widget',
  template: '<ng-content></ng-content>'
})
export class BaseWidgetComponent {}

@Component({
  selector: 'weather-widget',
  template: '...',
})
export class WeatherWidgetComponent extends BaseWidgetComponent {}
```

## 9. Angular Use Case

- Directives extending base directive classes
- Services inheriting shared utility logic
- Pipes following base formatter interface
- Component inheritance in testing scenarios

## 10. Common Mistakes

❌ Forgetting `super()` in constructor
❌ Overriding without calling parent

## 11. Edge Cases

1. **Multiple inheritance workaround via mixins**
2. **Polymorphic method dispatch**
3. **Prototype chain breaks**

## 12. Performance Considerations

- Deep inheritance chains harm performance
- Prefer composition for flexibility

## 13. Time & Space Complexity

- Method resolution: O(d)
- Memory: methods shared via prototypes

## 14. Interview Questions

1. How is inheritance achieved in JS?
2. Difference between classical and prototypal?
3. What is `super()`?
4. Can JS do multiple inheritance?
5. How to safely override?

## 15. Follow-up Questions

- "How do Angular directives inherit?"
- "What problems arise from deep inheritance?"

## 16. Production Best Practices

1. Favor composition over inheritance
2. Keep hierarchies shallow
3. Override intentionally

## 17. Summary

- Reuse patterns across types
- Built on prototype chains
- ES6 provides clean syntax

## 18. Revision Notes

- Super keyword → parent constructor/methods
- Prototype chain enables inheritance
- Mixins simulate multi-inheritance
- Composition > inheritance

## 19. Practice Questions

1. Build basic inheritance manually.

2. Implement mixin pattern.

3. Create polymorphic hierarchy.

## 20. References

- [MDN: Inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes#subclassing_with_extends)

### Next File
**023 - Shallow Copy.md**