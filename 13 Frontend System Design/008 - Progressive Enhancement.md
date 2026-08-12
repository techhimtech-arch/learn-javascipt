# Progressive Enhancement

## 1. Definition

**Progressive Enhancement** ensures core functionality works in minimal environments — enhancing experience for capable browsers/devices.

## 2. Why do we need it?

Guarantee accessibility, resilience, and graceful degradation across devices/browsers.

## 3. Internal Working

Layers:
1. **Content/structure**: Semantic HTML works everywhere
2. **Presentation**: CSS enhances appearance
3. **Behavior**: JavaScript adds interactivity

Enhancement flow:
1. Base HTML accessible without JS/CSS
2. Styles enhance layout/typography
3. Scripts progressively add dynamic features
4. Non-critical features fail gracefully

## 4. Step-by-Step Execution

HTML-first approach:
```html
<!-- Basic working form -->
<form action="/submit" method="POST">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Submit</button>
</form>

<!-- Enhanced with JavaScript -->
<script>
  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    // AJAX submission
  });
</script>
```

## 5. Syntax

```html
<!-- Native elements first -->
<button type="button" aria-expanded="false">Toggle</button>

<!-- Enhance with JS -->
<script>
  const btn = document.querySelector('button');
  btn.addEventListener('click', () => {
    // Show/hide content
    btn.setAttribute('aria-expanded', 'true');
  });
</script>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Basic image with fallback -->
<img src="photo.jpg" alt="Description">
```

### Medium
```html
<!-- Form with validation fallback -->
<form method="post" action="/process">
  <input type="email" name="email" required>
  <button type="submit">Submit</button>
</form>
<!-- JS enhances with real-time validation -->
```

### Advanced
```typescript
// Feature detection before enhancement
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
} else {
  // Fallback behavior
}

// CSS feature queries
@supports (display: grid) {
  .container { display: grid; }
}
```

## 7. Visual Diagram (ASCII)

```
Progressive Enhancement Layers

┌─────────────────────────────────────┐
│ Layer 3: JavaScript Behavior        │
├─────────────────────────────────────┤
│ Layer 2: CSS Presentation           │
├─────────────────────────────────────┤
│ Layer 1: HTML Content & Structure   │
└─────────────────────────────────────┘
All content accessible at Layer 1
```

## 8. Real-world Example

News site readable without JS, enhanced with interactive comments.

## 9. Angular Use Case

Server-side rendered pages with client-side enhancements.

## 10. Common Mistakes

❌ Requiring JavaScript for core functionality
❌ Not providing fallback experiences

## 11. Edge Cases

1. **Offline capability**
   ```typescript
   // Cache-first with network fallback
   ```

2. **Low-bandwidth scenarios**

## 12. Performance Considerations

Core content loads faster without JavaScript dependencies.

## 13. Time & Space Complexity

Minimal overhead — graceful feature addition.

## 14. Interview Questions

1. Progressive vs graceful degradation?
2. Feature detection techniques?
3. Critical rendering path optimization?

## 15. Follow-up Questions

- "Handle JS-disabled environments?"

## 16. Production Best Practices

1. Ensure core UX works without JavaScript
2. Use semantic HTML elements
3. Implement proper ARIA attributes
4. Test with CSS/JS disabled
5. Monitor accessibility scores

## 17. Summary

Progressive enhancement builds resilient experiences that work everywhere.

## 18. Revision Notes

- Content → Presentation → Behavior layers
- Feature detection over user agent sniffing
- Semantic HTML as foundation
- Graceful degradation fallbacks

## 19. Practice Questions

1. Build form with no-JS fallback.
2. Enhance list with JavaScript sorting.
3. Add accessibility to interactive widget.

## 20. References

- [Progressive Enhancement Principles](https://www.filamentgroup.com/labs/be-precise-about-pe/)

### Module 13 (System Design) - Continuing...
