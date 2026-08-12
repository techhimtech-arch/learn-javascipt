# Input Types

## 1. Definition

**HTML5 Input Types** extend standard form inputs with semantic validation and device-specific controls.

## 2. Why do we need it?

Enhance UX with appropriate keyboards/interfaces, built-in validation reduces manual checks.

## 3. Internal Working

Browser maps input type to:
1. Virtual keyboard layout (mobile)
2. Native validation constraints
3. Specialized UI widgets (date pickers, color wells)

## 4. Step-by-Step Execution

```html
<form>
  <input type="email" placeholder="you@example.com">
  <input type="number" min="0" max="100">
  <input type="date">
  <input type="range" min="0" max="10">
  <button type="submit">Submit</button>
</form>
```

## 5. Syntax

```html
<input type="text"
       type="password"
       type="email"
       type="url"
       type="tel"
       type="number"
       type="range"
       type="date/datetime-local/time"
       type="checkbox/radio"
       type="color"
       type="file"
       type="hidden">
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<input type="email" required placeholder="Enter email">
<input type="tel" pattern="[0-9]{10}" placeholder="10-digit number">
```

### Medium
```html
<!-- Form with custom validation -->
<form>
  <input type="url" 
         pattern="https://.+" 
         placeholder="https://example.com"
         title="Must include https://">
  <small>Enter valid URL starting with https://</small>
</form>
```

### Advanced
```html
<!-- Custom styled range slider -->
<style>
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: blueviolet;
    cursor: pointer;
  }
</style>

<input type="range" min="0" max="100" step="5" class="slider">
```

## 7. Visual Diagram (ASCII)

```
Input Type Resolution

Input Type ──► Device Context ──► Appropriate UI
     │             │                    │
    email    Mobile Browser      Email keyboard
           Desktop Browser       Validation tooltip
     │            
   number       
                 Native validation min/max
```

## 8. Real-world Example

E-commerce checkout form with optimized mobile keyboards.

## 9. Angular Use Case

Reactive forms with proper input types for mobile UX.

## 10. Common Mistakes

❌ Not specifying step for currency inputs
❌ Relying only on client-side validation

## 11. Edge Cases

1. **Inconsistent browser support**
   ```html
   <!-- Fallback for unsupported types -->
   <input type="date" onfocus="this.type='date'">
   ```

## 12. Performance Considerations

Native controls avoid custom JS widgets.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Input type validation?
2. Mobile keyboard optimization?
3. Cross-browser compatibility?

## 15. Follow-up Questions

- "Implement custom input validation?"

## 16. Production Best Practices

1. Always pair with proper labels
2. Combine client/server validation
3. Test across mobile browsers
4. Provide pattern fallbacks
5. Use appropriate types for keyboards

## 17. Summary

HTML5 input types provide semantic forms with native validation and device optimization.

## 18. Revision Notes

- Email validates format automatically
- Number respects min/max/step constraints
- Date shows native picker on supporting browsers
- Always provide fallback for older browsers

## 19. Practice Questions

1. Build responsive checkout form.
2. Implement custom range slider.
3. Test form validation messages.

## 20. References

- [MDN Input Types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

---
