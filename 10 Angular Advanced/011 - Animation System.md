# Animation System

## 1. Definition

**Angular Animations** bring life to UI through CSS-like transitions, keyframe animations, and state-based transformations.

## 2. Why do we need it?

Provide visual feedback, guide user attention, enhance perceived performance.

## 3. Internal Working

Animation triggers map state transitions to styles:
1. Define `@Component.animations` array
2. Use `trigger()` declarations
3. State/style definitions
4. Transition animations (CSS timing functions)

## 4. Step-by-Step Execution

Basic animation:
```typescript
@Component({
  animations: [
    trigger('openClose', [
      state('open', style({ height: '200px' })),
      state('closed', style({ height: '50px' })),
      transition('open <=> closed', animate(300))
    ])
  ]
})
export class MyComponent {
  isOpen = false;
}
```

Template:
```html
<div [@openClose]="isOpen ? 'open' : 'closed'"></div>
```

## 5. Syntax

```typescript
import { animate, style, transition, trigger } from '@angular/animations';

animations: [
  trigger('myAnimation', [
    state('void', style({ opacity: 0 })),
    state('visible', style({ opacity: 1 })),
    transition('void => visible', [
      style({ opacity: 0 }),
      animate(300)
    ])
  ])
]
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
trigger('fadeIn', [
  from('void', style({ opacity: 0 })),
  to('visible', style({ opacity: 1 }))
])
```

### Medium
```typescript
trigger('slideInOut', [
  state('in', style({ transform: 'translateX(0)' })),
  state('out', style({ transform: 'translateX(-100%)' })),
  transition('in => out', animate('300ms ease-in')),
  transition('out => in', animate('300ms ease-out'))
])
```

### Advanced
```typescript
trigger('listAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true }),
    query(':leave', [
      animate('200ms ease-in', style({ opacity: 0 }))
    ], { optional: true })
  ])
])
```

## 7. Visual Diagram (ASCII)

```
Animation State Transitions

Trigger Name ──► States ──► Transitions ──► Styles/Timings
                  │            │            │
                "open"       "open=>closed"   height:200px
                "closed"     "closed=>open"   height:50px
```

## 8. Real-world Example

Collapsible accordion with smooth expand/collapse.

## 9. Angular Use Case

UI feedback during async operations, page transitions, interactive components.

## 10. Common Mistakes

❌ Animating layout-triggering properties
❌ Long-running animations blocking UI

## 11. Edge Cases

1. **Dynamic duration values**
2. **Animation callbacks**
   ```typescript
   (@animation.done)
   ```

3. **Group/parallel animations**

## 12. Performance Considerations

Prefer transform/opacity animations over layout properties.

## 13. Time & Space Complexity

Animation duration determines cost.

## 14. Interview Questions

1. Animation types supported?
2. Performance-friendly properties?
3. State transitions management?

## 15. Follow-up Questions

- "Animate dynamic content height?"

## 16. Production Best Practices

1. Use transform/opacity for animations
2. Respect prefers-reduced-motion
3. Keep durations short (<300ms)
4. Debounce rapid state changes

## 17. Summary

Animations enhance UX when used judiciously and performantly.

## 18. Revision Notes

- Triggers define named animations
- States bind visual configurations
- Transitions animate between states
- Prefer compositor-friendly properties

## 19. Practice Questions

1. Implement fade-in/fade-out animation.
2. Build animated dropdown with height transition.
3. Add staggered list animations.

## 20. References

- [Angular Animations](https://angular.io/guide/animations)

### Next File
**012 - Custom Decorators.md**
