# Machine Coding: Debounce

## 1. Definition

**Debounce** delays function execution until after a specified quiet period with no new calls.

## 2. Why do we need it?

Prevent excessive operations triggered by fast-changing input (search boxes, window resizing, button spamming).

## 3. Internal Working

On each call:
1. Cancel previous timeout
2. Set new timeout with delay
3. Execute callback once stable duration passes

## 4. Step-by-Step Execution

Implementation:
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

## 5. Syntax

```javascript
const debouncedFn = debounce(() => {
  searchAPI(query);
}, 300);

input.addEventListener('input', debouncedFn);
```

## 6. Examples (Easy → Advanced)

### Easy
Basic debounce wrapper
### Medium
Search input handler with loading indicator
### Advanced
React hook with cancel/resume capabilities

## 7. Visual Diagram (ASCII)

```
Debounce Timing

Calls: |__call__|____call____|______call______
Timer:    ────────[reset]───────[reset]───────▶ Execute
Delay: |<------delay------>|<------delay------>|
```

## 8. Real-world Example

Angular service search with cancellation:
```typescript
this.searchControl.valueChanges
  .pipe(debounceTime(300), switchMap(term => this.search(term)))
  .subscribe(results => this.display(results));
```

## 9. Angular Use Case

Reactive forms filtering, resize handlers, typing-based APIs.

## 10. Common Mistakes

❌ Not preserving `this` context  
❌ Missing leading/trailing options  

## 11. Edge Cases

1. Immediate invocation (`{leading: true}`)
2. Max wait guarantee
3. Async cancellation

## 12. Performance Considerations

Avoid unnecessary reflows — debounce layout reads/writes.

## 13. Time & Space Complexity

O(1) setup/memory overhead per call.

## 14. Interview Questions

1. Implement debounce utility
2. Use cases comparison (throttle vs debounce)
3. Leading/trailing edge behavior

## 15. Follow-up Questions

- "How to maintain promise chain?"

## 16. Production Best Practices

1. Combine with distinctUntilChanged
2. Cancel on component destroy
3. Provide immediate feedback UX

## 17. Summary

Debounce optimizes responsiveness/performance tradeoff in rapid-update scenarios.

## 18. Revision Notes

- Timer resets on every call
- Executes after stability
- Preserves last call args
- Essential for API search UX

## 19. Practice Questions

1. Build generic debounce utility.
2. Apply to form field validation.
3. Add cancel/resume feature.

## 20. References

- [MDN: Debounce](https://developer.mozilla.org/en-US/docs/Archive/Functions_and_objects/Functions/Be_Awesome_Politely_Using_Debouncing_When_Increasing_Competition)

### Next File
**002 - Throttle.md**
