# Prototype

## 1. Definition

Every JavaScript object has an internal **`[[Prototype]]`** property — a reference to another object. The linked object is known as the **prototype**.

Functions also have an associated **prototype object** (accessible via `.prototype` property).

## 2. Why do we need it?

- Share methods efficiently among instances
- Implement inheritance
- Extend built-in types safely

## 3. Internal Working

When accessing a property:

1. Engine checks **own properties**
2. If not found → follow `[[Prototype]]` link upward
3. Until reaching root (`Object.prototype` → `null`)

## 4. Step-by-Step Execution

```javascript
const obj = {};
obj.toString(); // Found via Object.prototype
```

1. `toString` not in `obj`
2. Follow `[[Prototype]]` → `Object.prototype`
3. Found → execute

## 5. Syntax

```javascript
obj.__proto__       // Get/set prototype (deprecated)
Object.getPrototypeOf(obj)
Object.setPrototypeOf(obj, proto)
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log(`Hi, I'm ${this.name}`);
};
const bob = new Person("Bob");
bob.greet(); // Hello, Bob
```

### Medium
```javascript
Array.prototype.customFilter = function(predicate) {
  const result = [];
  for(let i=0;i<this.length;i++) {
    if(predicate(this[i])) result.push(this[i]);
  }
  return result;
};
```

### Advanced
```javascript
class Animal {}
console.log(Animal === Animal.prototype.constructor); // true
```

## 7. Visual Diagram (ASCII)

```
Instance Hierarchy

instance → [[Prototype]] → prototypeObj → Object.prototype → null
```

## 8. Real-world Example

Angular Base Classes:
```typescript
export abstract class BaseComponent {
  abstract title: string;
}
export class MyComponent extends BaseComponent {
  title = "Dashboard";
}
```

## 9. Angular Use Case

- Directives extend base directive behaviors via prototype
- Pipes inherit base transform capabilities
- DI system relies on prototype chain for token resolution

## 10. Common Mistakes

❌ Mutating `Array.prototype` directly
❌ Confusing `.prototype` with `[[Prototype]]`

## 11. Edge Cases

1. **Modifying native prototypes (monkey patching)**
2. **Cross-realm objects**
3. **Prototype pollution vulnerabilities**

## 12. Performance Considerations

- Adding properties to prototypes is safe and fast
- Dynamic prototype changes break optimizations

## 13. Time & Space Complexity

- Property lookup: O(d) where d = chain depth
- Memory: O(shared methods)

## 14. Interview Questions

1. What is prototype chain?
2. How does `new` relate?
3. What is `.__proto__` vs `.prototype`?
4. How does inheritance work?

## 115. Follow-up Questions

- "Can modifying built-in prototypes harm performance?"

## 16. Production Best Practices

1. Don’t pollute global prototypes
2. Prefer composition over deep inheritance
3. Document custom prototype extensions clearly

## 17. Summary

- Prototypes link objects
- Methods live on prototype, not instances
- Enables efficient inheritance

## 18. Revision Notes

- obj.__proto__ → link upward
- Function.prototype → base for all functions
- new keyword sets up prototype linkage
- Own vs inherited property distinction

## 19. Practice Questions

1. Implement basic inheritance via prototype manually.

2. Find whether method comes from prototype or self.

3. Safely extend Array with custom filter.

## 20. References

- [MDN: Prototype](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Prototype_inheritance)

### Next File
**019 - Prototype Chain.md**