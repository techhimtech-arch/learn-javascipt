# Change Detection

## 1. Definition

**Change Detection** in Angular tracks component state changes and synchronizes view accordingly — ensuring UI reflects latest data.

## 2. Why do we need it?

Maintain consistency between model and view automatically without manual DOM manipulation.

## 3. Internal Working

Two strategies:
- **Default (CheckAlways)**: Traverses entire component tree on each tick
- **OnPush**: Only runs when @Input references change, events fire inside, or observables emit

Zone.js patches browser APIs triggering CD cycles.

## 4. Step-by-Step Execution

Default detection:
1. User event fires → Zone captures
2. Triggers change detection run
3. Angular traverses all components top-down
4. Updates DOM where bindings changed

OnPush optimization:
1. Skips subtree unless marked dirty
2. Marked dirty via input ref change or inside-component event
3. Async pipe automatically marks for check on emission

## 5. Syntax

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
class MyComponent {
  @Input() data!: DataModel;
  
  constructor(private cd: ChangeDetectorRef) {}
  
  updateManually() {
    this.cd.markForCheck(); // Schedule CD run
  }
  
  detachCompletely() {
    this.cd.detach(); // Stop automatic CD
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Enable OnPush
@Component({
  selector: 'item-list',
  template: `<li *ngFor="let item of items">{{ item }}</li>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent {
  @Input() items!: string[];
}
```

### Medium
```typescript
// Manual change detection control
@Component({
  template: `<div>{{ expensiveValue }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensiveComponent implements OnInit {
  expensiveValue = 'initial';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    setInterval(() => {
      this.expensiveValue = `Updated at ${Date.now()}`;
      this.cd.markForCheck(); // Trigger CD
    }, 1000);
  }
}
```

### Advanced
```typescript
// With Detach pattern for manual control
@Component({
  template: `<ul><li *ngFor="let item of visibleItems">{{ item }}</li></ul>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedListComponent {
  @Input() allItems: any[] = [];
  visibleItems: any[] = [];

  constructor(private cd: ChangeDetectorRef) {
    this.cd.detach(); // Fully manual control
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allItems) {
      this.updateVisible();
      this.cd.detectChanges(); // Render once
    }
  }

  private updateVisible(): void {
    this.visibleItems = this.allItems.slice(0, this.pageSize);
  }
}
```

## 7. Visual Diagram (ASCII)

```
Change Detection Strategies

Default (CheckAlways):
Root ──► Child A ──► Grandchild A1
     ──► Child B ──► Grandchild B1
     ──► Child C ──► Grandchild C1
All checked every tick!

OnPush:
Root ──► Child A (OnPush)
     ──► Child B (Default) ──► Checked always
     ──► Child C (OnPush) ──► Only if input ref changes
```

## 8. Real-world Example

Optimizing large tree-table performance with OnPush + trackBy.

## 9. Angular Use Case

Performance tuning, infinite scroll lists, real-time data displays.

## 10. Common Mistakes

❌ Mutating @Input objects instead of replacing references
❌ Forgetting to mark components for check after async events

## 11. Edge Cases

1. **Mutable inputs breaking OnPush**
   ```typescript
   // Wrong
   this.items.push(newItem); // No change detected
   
   // Correct
   this.items = [...this.items, newItem];
   ```

2. **Third-party library mutations**
3. **Manual detection timing**

## 12. Performance Considerations

OnPush reduces checks significantly but requires immutable patterns.

## 13. Time & Space Complexity

Default: O(n) components per tick
OnPush: O(changed) components

## 14. Interview Questions

1. Change detection strategies difference?
2. OnPush pitfalls and solutions?
3. Manual detection control methods?

## 15. Follow-up Questions

- "How does trackBy help performance?"

## 16. Production Best Practices

1. Enable OnPush everywhere possible
2. Use immutable data patterns
3. Combine with async pipe
4. Profile CD cycles regularly

## 17. Summary

Strategic change detection strategy choices dramatically impact app responsiveness.

## 18. Revision Notes

- Zone.js triggers CD cycles
- OnPush only runs on reference changes/inputs/async emissions
- markForCheck schedules future checks
- detach disables entirely (manual control)

## 19. Practice Questions

1. Convert component to OnPush strategy.
2. Fix mutable input causing missed updates.
3. Optimize list with trackBy + OnPush.

## 20. References

- [Angular: Change Detection](https://angular.io/guide/change-detection)
- [Angular: OnPush](https://indepth.dev/angular-onpush-change-detection/)

### Next File
**012 - Pipes.md**
