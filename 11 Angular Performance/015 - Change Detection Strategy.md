# Angular Change Detection Strategy

## 1. Definition

**Angular Change Detection Strategies** control when component views update — optimizing rendering performance through strategy selection.

## 2. Why do we need it?

Fine-grained control over update frequency reduces unnecessary DOM checks.

## 3. Internal Working

Strategies:
- **Default**: Checks every component always
- **OnPush**: Checks only when inputs change, @Input reference changes, or async events

OnPush benefits:
1. Avoids unnecessary checks for pure components
2. Relies on immutable data patterns
3. Triggers change detection explicitly when needed

## 4. Syntax

```typescript
@Component({
  selector: 'my-component',
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
  // OR ChangeDetectionStrategy.Default
})
export class MyComponent {
  // Must use immutable updates to trigger OnPush
}
```

## 5. Examples

### Easy
```typescript
@Component({
  template: `
    <p>{{ message }}</p>
    <button (click)="updateMessage()">Update</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  message = 'Hello World';
  
  updateMessage() {
    // New string reference triggers OnPush
    this.message = `Updated at ${Date.now()}`;
  }
}
```

### Advanced
```typescript
@Component({
  template: `
    <ul>
      <li *ngFor="let user of users$ | async; trackBy: trackById">
        {{ user.name }}
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  users$ = this.userService.getUsers(); // Observable
  
  trackById(index: number, user: User) {
    return user.id;
  }
  
  constructor(private userService: UserService) {}
}
```

## 6. Interview Questions

1. OnPush triggers conditions?
2. Immutable pattern importance?
3. Manual CD triggering?

## 7. Summary

OnPush strategy enables high-performance components when used properly.

## 8. References

- [Angular Change Detection](https://angular.io/guide/component-overview#component-composition-and-change-detection)

---
