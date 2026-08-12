# Event Binding

## 1. Definition

**Event Binding** (`(event)="handler()"`) listens to DOM events (click, input, submit) or component emissions — triggering component methods.

## 2. Why do we need it?

Wire UI interactions to application behavior without manual DOM listeners.

## 3. Internal Working

Angular compiles `(event)` into addEventListener calls:
1. Register listener on host element
2. On trigger → invoke component handler
3. Pass event object optionally

## 4. Step-by-Step Execution

Example:
```html
<button (click)="save()">Save</button>
<input (keyup.enter)="submit()" placeholder="Press Enter">
```

Steps:
1. Compile: attach click listener to button
2. User clicks → browser dispatches event
3. Angular invokes `save()` method
4. Method executes in component context

## 5. Syntax

```html
<!-- Basic event -->
<button (click)="doSomething()">Click me</button>

<!-- With event object -->
<input (input)="onInput($event)">

<!-- Key event modifiers -->
<input (keydown.enter)="onEnter($event)">
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<button (click)="increment()">Count: {{ count }}</button>
```

### Medium
```html
<form (ngSubmit)="handleSubmit()">
  <input [(ngModel)]="email" placeholder="Email">
  <button type="submit" [disabled]="!isValid">Submit</button>
</form>
```

### Advanced
```typescript
@HostListener('document:keydown', ['$event'])
handleKeyboard(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    this.closeModal();
  }
}

// Custom event from child component
<app-notification 
  (messageSent)="handleNewMessage($event)">
</app-notification>
```

## 7. Visual Diagram (ASCII)

```
Event Flow

DOM Event Triggered
        ↓
Angular Event Listener
        ↓
Evaluates Expression
        ↓
Invokes Component Method
        ↓
Updates Application State
```

## 8. Real-world Example

Form submission with validation.

## 9. Angular Use Case

Forms, user interaction handling, custom event consumption.

## 10. Common Mistakes

❌ Forgetting parentheses vs brackets  
❌ Heavy logic in event handlers

## 11. Edge Cases

1. **Event bubbling**
   ```html
   <div (click)="parent()">
     <button (click)="child(); $event.stopPropagation()">
       Click me
     </button>
   </div>
   ```

2. **Two-way binding combination**
   ```html
   <input [(ngModel)]="value" (change)="onValueChange($event)">
   ```

## 12. Performance Considerations

Debounce rapid events (resize, scroll) before handling.

## 13. Time & Space Complexity

Minimal overhead per listener.

## 14. Interview Questions

1. Event phases (capture vs bubble)?
2. Stop propagation techniques?
3. Host listener decorator?

## 15. Follow-up Questions

- "How to optimize frequent events?"

## 16. Production Best Practices

1. Extract complex logic outside template
2. Use host listeners judiciously
3. Clean up subscriptions started in handlers

## 17. Summary

Event binding connects user actions to application logic cleanly.

## 18. Revision Notes

- (event)="handler"
- $event passes DOM event
- Modifiers (.enter) refine triggers
- Host listeners for global events

## 19. Practice Questions

1. Build clickable dropdown menu.
2. Capture and validate form input.
3. Handle keyboard shortcuts globally.

## 20. References

- [Angular: Event Binding](https://angular.io/guide/event-binding)

### Next File
**007 - Two Way Data Binding.md**
