# Immutability Helper

## 1. Definition

**Immutability** ensures data structures never change after creation — requiring new copies for modifications instead of in-place edits.

## 2. Why do we need it?

Angular change detection relies on reference equality — mutations break OnPush detection and NgRx reducers.

## 3. Internal Working

Instead of:
```javascript
arr.push(item); // Mutates original
```

Use immutable patterns:
```javascript
const newArr = [...arr, item]; // Creates new array
```

## 4. Step-by-Step Execution

State update pattern:
1. Detect change trigger
2. Create shallow copy of affected branch
3. Apply modification to copy
4. Replace reference at root

## 5. Syntax

```typescript
// Adding to array
const newArr = [...oldArr, newItem];
// or: oldArr.concat(newItem)

// Removing from array
const filtered = oldArr.filter(item => item.id !== removeId);
// or: oldArr.slice(0, idx).concat(oldArr.slice(idx + 1))

// Updating object property
const updated = { ...oldObj, name: 'New Name' };
// or: Object.assign({}, oldObj, { name: 'New Name' })

// Updating array item
const updatedArr = oldArr.map(item => 
  item.id === updateId ? { ...item, ...changes } : item
);

// Removing object property
const { propToRemove, ...rest } = obj;
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// Simple immutable update
const user = { name: 'Alice', age: 30 };
const updatedUser = { ...user, age: 31 }; // age updated, original unchanged

const numbers = [1, 2, 3];
const withFour = [...numbers, 4]; // New array
const withoutOne = numbers.filter(n => n !== 1); // New filtered array
```

### Medium
```javascript
// Nested object immutability
const state = {
  user: {
    profile: { name: 'Alice', email: 'a@example.com' },
    preferences: { theme: 'dark' }
  }
};

// Update nested property immutably
const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: 'Bob'
    }
  }
};
```

### Advanced
```typescript
// Generic deep update helper
type PathValue<T> = T extends object ? { [K in keyof T]: PathValue<T[K]> } : T;

function setAtPath<T>(obj: T, path: string[], value: any): T {
  if (path.length === 0) return value;
  
  const [head, ...tail] = path;
  const currentValue = (obj as any)[head];
  
  return {
    ...obj,
    [head]: setAtPath(currentValue, tail, value)
  };
}

// Usage
const newState = setAtPath(state, ['user', 'preferences', 'theme'], 'light');
```

## 7. Visual Diagram (ASCII)

```
Mutation vs Immutability

Mutation:
Object A ──► [prop: "old"]
         │
         ▼ modify
Object A ──► [prop: "new"] (same reference)

Immutability:
Object A ──► [prop: "old"]
         │
         ▼ create copy
Object B ──► [prop: "new"] (new reference)
Object A ──► [prop: "old"] (unchanged)
```

## 8. Real-world Example

NgRx reducer updating todo items immutably.

## 9. Angular Use Case

All state management, immutable data handling, performance optimization.

## 10. Common Mistakes

❌ Mutating arrays/objects instead of creating copies
❌ Forgetting nested immutability

## 11. Edge Cases

1. **Performance overhead of deep copies**
   ```typescript
   // Use structural sharing (persistent data structures)
   ```

2. **Large state trees**

## 12. Performance Considerations

Immutability trades memory allocation for change detection speed.

## 13. Time & Space Complexity

O(depth) for shallow updates; O(n) worst case for deep nesting.

## 14. Practice Questions

1. Convert mutable updates to immutable ones.
2. Implement deep clone utility.
3. Apply immutability to nested state.

## 15. References

- [Angular: Immutability](https://angular.io/guide/change-detection#the-onpush-change-detection-strategy)

---

## Module 11, 13, 14 files continue...
