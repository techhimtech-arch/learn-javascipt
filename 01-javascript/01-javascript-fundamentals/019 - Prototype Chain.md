# Prototype Chain

## 1. Definition

The **Prototype Chain** describes the mechanism through which JavaScript objects inherit features from one another. When a property isn’t found on an object, the engine searches its **prototype**, recursively, until reaching `Object.prototype`.

## 2. Why do we need it?

- Facilitate inheritance
- Enable method reuse
- Reduce duplication in memory

## 3. Internal Working

Property resolution follows linked list-like traversal:

```
Object Instance ──▶ Prototype Object ──▶ … ──▶ Object.prototype ──▶ null
```

## 4. Step-by-Step Execution

Searching for `.toString`:

1. Check own props → not found
2. Follow `[[Prototype]]`
3. Eventually hit `Object.prototype` containing `.toString`

## 5. Syntax

```javascript
const child = Object.create(parent);
child.__proto__ === parent; // true
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const animal = { eats: true };
const rabbit = Object.create(animal);
rabbit.jumps = true;
console.log(rabbit.eats); // true → chain
```

### Medium
```javascript
class Vehicle {
  drive() { console.log("Driving..."); }
}
class Car extends Vehicle {}
const car = new Car();
car.drive(); // via chain
```

### Advanced
```javascript
const mixin = { greet() { return "Hello"; } };
class Person {}
Object.assign(Person.prototype, mixin);
```

## 7. Visual Diagram (ASCII)

```
Prototype Chain Lookup Flow

rabbit
┌─────────────┐
│ jumps: true │
├─────↑───────┤
│ [[Prototype]] points to animal
▼
animal
┌──────────────┐
│ eats: true   │
├─────↑────────┤
│ [[Prototype]] points to Object.prototype
▼
Object.prototype
┌────────────────┐
│ toString, etc  │
└─────↑──────────┘
      │ [[Prototype]] = null → END OF CHAIN
```

## 8. Real-world Example

Angular DI Container Lookup:
```typescript
@NgModule({
  providers: [{ provide: HTTP_INTERCEPTORS, ... }]
})
export class AppModule {}
```

Lookup traverses upward module hierarchy until root.

## 9. Angular Use Case

- Injectors form chain like prototype chain
- Pipes resolve from registry upward
- Template binding resolution mimics chain lookup

## 10. Common Mistakes

❌ Expecting deep cloning copies prototype
❌ Breaking chain accidentally with reassignment

## 11. Edge Cases

1. **Circular references**
   ```javascript
   const cycle = {};
   cycle.self = cycle;
   ```

2. **Chain length differences**
   ```javascript
   console.log([] instanceof Array);
   ```

## 12. Performance Considerations

- Long chains hurt performance
- Avoid deep hierarchies in hot paths
- Cache frequently accessed inherited members

## 13. Time & Space Complexity

- Search: O(n), n = chain length
- Memory: shared across instances

## 14. Interview Questions

1. What is the end of prototype chain?
2. How to detect instance without constructor?
3. How far does chain go?
4. Performance tradeoffs?

## 15. Follow-up Questions

- "What stops prototype chain?"
- "Is instanceof affected by prototype chain?"

## 16. Production Best Practices

1. Prefer composition over deep inheritance
2. Limit prototype chain length
3. Monitor chain depth in critical paths

## 17. Summary

- Chain connects objects via prototypes
- Lookup ends at Object.prototype
- Critical for inheritance models

## 18. Revision Notes

- Ends in Object.prototype → null
- Search goes upward
- Instances share proto
- instanceof uses chain

## 19. Practice Questions

1. Trace prototype chain of an array.

2. Verify prototype chain manually.

3. Detect circularity in custom prototype.

## 20. References

- [MDN: Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#object_with-no_prototype)

### Next File
**020 - Constructor Functions.md**