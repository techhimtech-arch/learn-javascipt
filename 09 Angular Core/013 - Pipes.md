# Pipes

## 1. Definition

Angular **Pipes** are pure functions transforming displayed values within templates — accepting input and returning transformed output.

## 2. Why do we need it?

Encapsulate formatting/presentation logic cleanly — reusable across templates without duplicating code.

## 3. Internal Working

Pure vs Impure:
- **Pure**: Runs only when input reference changes
- **Impure**: Runs every change detection cycle

Registered globally through `pipes:` array or locally in component.

## 4. Step-by-Step Execution

Built-in example:
```typescript
@Pipe({ name: 'date' })
export class DatePipe {
  transform(value: Date, format: string): string {
    // Format date logic
    return formattedDate;
  }
}
```

Usage:
```html
<span>{{ user.createdAt | date:'short' }}</span>
```

Steps:
1. Template parses interpolation
2. Detects pipe usage
3. Compiles pipe invocation
4. Change detection evaluates when inputs change (pure mode)
5. Returns transformed string for insertion

## 5. Syntax

```html
{{ value | pipeName }}
{{ value | pipeName:arg1:arg2 }}
```

```typescript
@Pipe({ name: 'custom' })
export class CustomPipe implements PipeTransform {
  transform(input: string, param?: string): string {
    return transformed;
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
@Pipe({ name: 'titleCase' })
export class TitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, txt =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
}
```

### Medium
```typescript
@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string = 'name'): any[] {
    if (!searchText) return items;
    return items.filter(item => item[field].toLowerCase().includes(searchText.toLowerCase()));
  }
}
```

### Advanced
```typescript
// Stateful pipe with memoization
@Pipe({
  name: 'groupBy',
  pure: false // Re-run every CD cycle since depends on internal state
})
export class GroupByPipe implements PipeTransform {
  transform(items: any[], field: string): any[] {
    return items.reduce((groups, item) => {
      const key = item[field];
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  }
}

// Async pipe for observables
@Pipe({
  name: 'asyncAwait',
  pure: false
})
export class AsyncAwaitPipe implements PipeTransform {
  transform(value: Promise<any>): any {
    // Handle async resolution in pipe
  }
}
```

## 7. Visual Diagram (ASCII)

```
Pipe Data Flow

Template Expression
{{ rawValue | myPipe:arg }}
        │
        ▼
Pipe Transformer Function
(myTransformer(rawValue, arg))
        │
        ▼
Transformed Output
Rendered in DOM
```

## 8. Real-world Example

Currency formatting with locale-aware display.

## 9. Angular Use Case

Internationalized date/time/number formatting, custom display formatting.

## 10. Common Mistakes

❌ Using impure pipes for expensive operations every cycle
❌ Mutating inputs in pipes

## 11. Edge Cases

1. **Pure pipe caching behavior**
   ```typescript
   // Pure pipes skip re-evaluation unless inputs change
   ```

2. **Async pipe memory management**
```typescript
// Async pipe auto-unsubscribes
{{ stream$ | async }}
```

3. **Chaining pipes**
```html
{{ date | date:'short' | uppercase }}
```

## 12. Performance Considerations

Pure pipes prevent unnecessary recalculations — use impure sparingly.

## 13. Time & Space Complexity

Per transform call — typically O(1) to O(n) depending on operation.

## 14. Interview Questions

1. Pure vs impure pipes difference?
2. Async pipe mechanism?
3. When to implement custom pipes?

## 15. Follow-up Questions

- "Optimize expensive pipe transformation?"

## 16. Production Best Practices

1. Default to pure pipes
2. Memoize expensive results
3. Handle null/undefined inputs gracefully
4. Keep transformations stateless

## 17. Summary

Pipes provide declarative transformation layer enhancing template expressiveness.

## 18. Revision Notes

- Transform receives input + args
- Pure by default (memoization)
- Async pipe manages subscriptions
- Chainable through composition

## 19. Practice Questions

1. Build currency formatting pipe.
2. Implement searchable dropdown pipe.
3. Create memoized data processor pipe.

## 20. References

- [Angular: Pipes](https://angular.io/guide/pipes)
- [Angular: Pure vs Impure](https://angular.io/guide/pipes#defining-pipes)

### Module 9 (Angular Core) - Continuing important files ✅
