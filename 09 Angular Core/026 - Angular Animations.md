# Angular Animations API

## 1. Definition

**Angular Animation API** provides DSL for declarative UI transitions using states, transitions, and styling functions.

## 2. Why do we need it?

Smooth state changes improve UX — built on Web Animations API with optimized performance.

## 3. Internal Working

Animation triggers:
1. Define trigger with states/transitions
2. Bind trigger to element with @syntax
3. Angular generates Web Animations API calls
4. Browser optimizes to composite-only operations

## 4. Syntax

```typescript
import { trigger, state, style, transition, animate, query, animateChild } from '@angular/animations';

@Component({
  animations: [
    trigger('myAnimation', [
      state('void', style({ opacity: 0 })),
      state('shown', style({ opacity: 1 })),
      transition('void => shown', [
        style({ opacity: 0 }),
        animate(300)
      ])
    ])
  ]
})
export class MyComponent {
  current = 'shown';
}
```

## 5. Examples

### Easy
```typescript
trigger('fadeIn', [
  from('void', style({ opacity: 0 })),
  to('void', style({ opacity: 1 }))
])
```

### Advanced
```typescript
// Animation callbacks
trigger('slide', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate(300)
  ])
]).(@animation.start)

// Query and animate children
trigger('listAnimation', [
  transition('* => *', [
    query('li', [
      animateChild(),
      style({ height: '0' })
    ])
  ])
])
```

## 6. Interview Questions

1. State-based animations?
2. Animation callbacks?
3. Performance considerations?

## 7. Summary

Angular animations bridge reactive state and visual experiences.

## 8. References

- [Angular Animations](https://angular.io/guide/animations)

---
