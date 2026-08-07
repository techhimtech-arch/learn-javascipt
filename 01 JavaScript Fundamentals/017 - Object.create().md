# Object.create()

## 1. Definition

`Object.create()` is a static method that creates a **new object** using an existing object as the **prototype** of the newly created object.

Syntax:
```javascript
Object.create(proto[, propertiesObject])
```

## 2. Why do we need it?

- Fine-grained control over prototyping
- Avoids side effects of `new` keyword
- Enables prototypal inheritance without classes
- Creates objects with custom prototypes directly

## 3. Internal Working

Creates a blank object whose `[[Prototype]]` is set to the passed object — establishing prototype chain link.

## 4. Step-by-Step Execution

```javascript
const animal = { eats: true };
const rabbit = Object.create(animal);
rabbit.jumps = true;
```

Steps:
1. `rabbit` created with `__proto__ = animal`
2. `jumps` assigned → owned by rabbit
3. `rabbit.eats` looked up → falls to `animal.eats`

## 5. Syntax

```javascript
const child = Object.create(parent);
child.parentProperty; // Available through prototype chain
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const base = { greet() { console.log("Hello"); } };
const derived = Object.create(base);
derived.greet(); // Hello
```

### Medium
```javascript
const personPrototype = {
  init(name) {
    this.name = name;
    return this;
  },
  sayHi() { console.log(`Hi, I'm ${this.name}`); }
};

const alice = Object.create(personPrototype).init("Alice");
alice.sayHi();
```

### Advanced
```javascript
const EventEmitter = {
  on(event, fn) {
    (this.events[event] = this.events[event] || []).push(fn);
  },
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
};

const ee = Object.create(EventEmitter).init();
```

## 7. Visual Diagram (ASCII)

```
Prototype Chain Establishment

rabbit
┌─────────────┐
│ jumps: true │
└─────┬───────┘
      │ [[Prototype]]
      ▼
animal
┌──────────────┐
│ eats: true   │
└─────┬────────┘
      │ [[Prototype]]
      ▼
   null
```

## 8. Real-world Example

Angular Service Extension:
```typescript
const baseServiceMixin = {
  log(message: string) {
    console.warn("[LOG]", message);
  }
};

export class AnalyticsService {
  constructor() {
    Object.setPrototypeOf(this, baseServiceMixin); // Similar concept
  }
}
```

## 9. Angular Use Case

- Angular DI sometimes uses `Object.create()` to build injectors
- Prototype-based inheritance used in directives/pipes when extending base functionality
- Testing mocks/stubs benefit from `Object.create`

## 10. Common Mistakes

❌ Passing `null` without initializing any props
❌ Expecting constructor behavior from plain objects

## 11. Edge Cases

1. **Empty prototypeless object**
   ```javascript
   const obj = Object.create(null);
   ```

2. **Multiple levels of inheritance**
   ```javascript
   const grandchild = Object.create(child);
   ```

3. **Adding properties later**
   ```javascript
   Object.defineProperty(obj, "key", { value: val });
   ```

## 12. Performance Considerations

- Setting prototype dynamically hurts optimization
- Prefer literal objects unless you specifically need custom prototype links

## 13. Time & Space Complexity

- Creation: O(1)
- Lookup: O(d), d = prototype chain depth

## 14. Interview Questions

1. How is `Object.create()` different from `{}`?
2. What happens if you pass `null`?
3. How to make two objects share same prototype methods?
4. What’s the relation between `Object.create` and `new`?

## 15. Follow-up Questions

- "Do modern engines optimize `Object.create` heavily?"
- "How does Angular use prototype inheritance internally?"

## 16. Production Best Practices

1. Use sparingly for simple inheritance
2. Prefer class syntax for readability
3. Ensure compatibility with transpilation targets

## 17. Summary

- Creates object with specified prototype
- Foundation of prototypal inheritance pattern
- More flexible than class but less readable

## 18. Revision Notes

- Object.create(proto) → sets proto as prototype
- No constructor call involved
- Null-safe prototype chains possible

## 19. Practice Questions

1. Create prototype chain manually.

2. Implement basic inheritance system.

3. Mimic ES6 class behavior with Object.create.

## 20. References

- [MDN: Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- ["ObjectPlaybook"]

### Next File
**018 - Prototype.md**