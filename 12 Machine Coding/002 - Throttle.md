# Throttle

## 1. Definition

**Throttle** ensures a function executes at most once within a fixed time window — regardless of how many times called.

## 2. Why do we need it?

Rate-limit expensive operations (scroll handlers, API polling) while guaranteeing periodic updates.

## 3. Internal Working

Tracks last execution timestamp:
1. If enough time elapsed → invoke function + update last timestamp
2. Else → schedule deferred execution
3. Ensures minimum interval between calls

## 4. Step-by-Step Execution

Implementation:
```javascript
function throttle(func, limit) {
  let lastCall = 0;
  let timeoutId;

  return function(...args) {
    const now = Date.now();
    const remaining = limit - (now - lastCall);

    if (remaining <= 0) {
      clearTimeout(timeoutId);
      lastCall = now;
      func.apply(this, args);
    } else {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func.apply(this, args);
      }, remaining);
    }
  };
}
```

## 5. Syntax

```javascript
const throttledHandler = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', throttledHandler);
```

## 6. Examples (Easy → Advanced)

### Easy
Scroll handler throttling
### Medium
Resize observer with throttling
### Advanced
Progress bar animation with guaranteed frame rate

## 7. Visual Diagram (ASCII)

```
Throttle Rate Limiting

Input Calls: |click|click|click|click|click|
Execution:   |fire   ---wait---|fire   ---wait---|
              ↓              ↑  ↓              ↑
Window Size: [---- limit ----]
```

## 8. Real-world Example

Angular scroll directive:
```typescript
@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Output() scrolled = new EventEmitter<void>();
  
  @HostListener('scroll', [' $event'])
  onScroll() {
    throttle(() => this.scrolled.emit(), 100);
  }
}
```

## 9. Angular Use Case

Scroll/resize event handling, polling intervals, animation stepping.

## 10. Common Mistakes

❌ Forgetting to bind context  
❌ Not handling edge timing correctly  

## 11. Edge Cases

1. Leading vs trailing execution
2. Canceling pending executions
3. Combining with debounce

## 12. Performance Considerations

Prefer throttling over unthrottled high-frequency events.

## 13. Time & Space Complexity

O(1) overhead per invocation.

## 14. Interview Questions

1. Difference from debounce?
2. Implement throttle utility
3. When to prefer throttle over debounce?

## 15. Follow-up Questions

- "How to implement both?"

## 16. Production Best Practices

1. Align with browser refresh rates (16ms for 60fps)
2. Combine with requestAnimationFrame where suitable
3. Cancel on destroy

## 17. Summary

Throttle guarantees consistent execution cadence under heavy load.

## 18. Revision Notes

- Fixed interval constraint
- Preserves execution rhythm
- Not same as debounce
- Common in UI performance tuning

## 19. Practice Questions

1. Throttle scroll handler to 100ms.
2. Limit button clicks to once per second.
3. Implement requestAnimationFrame-based throttle.

## 20. References

- [MDN: Throttling](https://developer.mozilla.org/en-US/docs/Web/Events/Timeout_throttling_explained)

### Next File
**003 - Flatten Array.md**
