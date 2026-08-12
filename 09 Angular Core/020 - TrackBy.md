# TrackBy Function

## 1. Definition

**trackBy** is an Angular directive parameter that uniquely identifies items in `*ngFor` — preventing unnecessary DOM reconciliation.

## 2. Why do we need it?

Default `*ngFor` matches by object reference — causing full re-render when order changes instead of moving items.

## 3. Internal Working

With trackBy:
1. Angular calls trackBy function per item
2. Receives index and item
3. Returns unique identifier
4. Tracks items by identity instead of reference
5. Preserves existing DOM where possible

## 4. Step-by-Step Execution

```html
<!-- Without trackBy - inefficient -->
<div *ngFor="let item of items">
  {{ item.name }}
</div>

<!-- With trackBy - efficient -->
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>
```

```typescript
trackById(index: number, item: any): string {
  return item.id; // Stable identifier
}
```

## 5. Syntax

```html
<div *ngFor="let item of items; trackBy: trackById">
  {{ item }}
</div>

<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item }}
</div>
```

```typescript
trackById(index: number, item: Item): number | string {
  return item.id;
}

trackByFn(index: number, item: any): any {
  return item.id || index;
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple numeric ID tracking
@Component({
  template: `
    <ul>
      <li *ngFor="let user of users; trackBy: trackById">
        {{ user.name }}
      </li>
    </ul>
  `
})
export class UserListComponent {
  users: User[] = [];
  
  trackById(index: number, user: User): number {
    return user.id;
  }
}
```

### Medium
```typescript
// Composite track key
@Component({
  template: `
    <div *ngFor="let todo of todos; trackBy: trackByComposite">
      {{ todo.text }}
    </div>
  `
})
export class TodoListComponent {
  todos: Todo[] = [];

  trackByComposite(index: number, todo: Todo): string {
    return `${todo.id}-${todo.completed}`; // Updates when status changes
  }
}
```

### Advanced
```typescript
// Generic trackBy factory
export function trackByIdentity<T extends { id: any }>(
  index: number,
  item: T
): string {
  return String(item.id);
}

export function trackByDeepProperty<T>(
  prop: keyof T
): (index: number, item: T) => string {
  return (index: number, item: T): string => String(item[prop]);
}

// Usage in templates
@Component({
  template: `
    <div *ngFor="let item of items; trackBy: trackByDeepProperty('slug')">
      {{ item.title }}
    </div>
  `
})
export class GenericListComponent {
  readonly trackByDeepProperty = trackByDeepProperty;
  items: any[] = [];
}
```

## 7. Visual Diagram (ASCII)

```
trackBy Performance Impact

Without trackBy:
[List] → [Re-sort] → [Destroy All] → [Recreate All] → [Rebind Events]

With trackBy:
[List] → [Re-sort] → [Move Items] → [Keep References] → [Fast Update]
```

## 8. Real-world Example

Chat message list efficiently moving existing messages instead of recreating.

## 9. Angular Use Case

All lists with dynamic data, sorting/filtering scenarios, virtualized lists.

## 10. Common Mistakes

❌ Returning non-unique/inconsistent identifiers
❌ Missing trackBy for lists with mutations

## 11. Edge Cases

1. **New items added**
   ```typescript
   return item.id || `temp-${index}`; // Handle temporary items
   ```

2. **Items without stable IDs**

## 12. Performance Considerations

Essential for lists with frequent updates or large item counts.

## 13. Time & Space Complexity

O(n) per comparison — but prevents O(n) DOM operations.

## 14. Interview Questions

1. Why use trackBy with *ngFor?
2. Implementation details?
3. When is trackBy ineffective?

## 15. Follow-up Questions

- "TrackBy with complex objects?"

## 16. Production Best Practices

1. Always use trackBy on lists with mutable data
2. Use stable, unique identifiers
3. Consider composite keys for complex identity
4. Test with dynamic data scenarios

## 17. Summary

trackBy dramatically improves list update performance by leveraging item identity.

## 18. Revision Notes

- Prevents unnecessary DOM operations
- Uses stable identifier for tracking
- Works with OnPush for maximum benefit
- Essential for large dynamic lists

## 19. Practice Questions

1. Add trackBy to existing list.
2. Optimize list with composite key.
3. Handle temp items without IDs.

## 20. References

- [Angular: trackBy](https://angular.io/api/core/TrackByFunction)

---
