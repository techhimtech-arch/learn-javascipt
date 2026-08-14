# Web Accessibility

## 1. Definition

**Web Accessibility (a11y)** ensures digital content usable by people with disabilities — including visual, auditory, motor, cognitive impairments.

## 2. Why do we need it?

Legal compliance, broader reach, inclusive design, improved UX for all users.

## 3. Internal Working

Core principles (POUR):
- **Perceivable**: Information presented in ways users can perceive
- **Operable**: Interface navigable via multiple input methods
- **Understandable**: Content readable and predictable
- **Robust**: Compatible across technologies

Assistive technologies rely on:
1. Semantic HTML structure
2. ARIA roles/states/properties
3. Proper focus management
4. Keyboard navigation support

## 4. Step-by-Step Execution

Accessibility workflow:
1. Use native semantic HTML elements
2. Add ARIA attributes where needed
3. Ensure keyboard operability
4. Provide text alternatives
5. Validate with automated tools
6. Manual testing with screen readers

## 5. Syntax

```html
<!-- Semantic structure -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- ARIA for custom controls -->
<button 
  [attr.aria-expanded]="isOpen"
  [attr.aria-controls]="dropdownId">
  Menu
</button>

<!-- Form accessibility -->
<label for="email">Email:</label>
<input type="email" id="email" aria-describedby="email-help">
<span id="email-help">Enter valid email address</span>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Accessible image -->
<img src="logo.png" alt="Company Logo">

<!-- Semantic headings -->
<h1>Main Title</h1>
<h2>Section Heading</h2>

<!-- Skip link for keyboard users -->
<a href="#main-content" class="skip-link">Skip to content</a>
```

### Medium
```html
<!-- Accessible form -->
<form>
  <fieldset>
    <legend>Shipping Address</legend>
    
    <label for="street">Street Address:</label>
    <input type="text" id="street" required>
    
    <label for="city">City:</label>
    <input type="text" id="city" required>
    
    <div role="radiogroup" aria-labelledby="payment-label">
      <span id="payment-label">Payment Method:</span>
      <input type="radio" id="credit" name="payment" value="credit">
      <label for="credit">Credit Card</label>
      
      <input type="radio" id="paypal" name="payment" value="paypal">
      <label for="paypal">PayPal</label>
    </div>
  </fieldset>
  
  <button type="submit">Submit</button>
</form>
```

### Advanced
```typescript
// Focus management for modal dialogs
@Component({
  template: `
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
      (keydown.esc)="close()">
      
      <h2 id="modal-title">Confirmation</h2>
      <p>Are you sure?</p>
      
      <button (click)="confirm()" cdkFocusInitial>Yes</button>
      <button (click)="close()">Cancel</button>
    </div>
  `
})
export class ModalComponent implements AfterViewInit {
  @ViewChild(CdkFocusTrapStarter) focusTrap!: CdkFocusTrapStarter;

  ngAfterViewInit(): void {
    // Trap focus within modal
    this.focusTrap.focusTrap.focusInitial();
  }

  close(): void {
    // Return focus to triggering element
    this.focusTrap.focusTrap.focusPreviousElement();
  }
}
```

## 7. Visual Diagram (ASCII)

```
Accessibility Layers

┌─────────────────────────────────────┐
│ Semantic HTML Structure             │
├─────────────────────────────────────┤
│ ARIA Labels & Roles                 │
├─────────────────────────────────────┤
│ Keyboard Navigation                 │
├─────────────────────────────────────┤
│ Focus Management                    │
├─────────────────────────────────────┤
│ Screen Reader Support               │
└─────────────────────────────────────┘
```

## 8. Real-world Example

E-commerce site with accessible product filters and checkout.

## 9. Angular Use Case

Form accessibility, custom control keyboard navigation, ARIA attributes.

## 10. Common Mistakes

❌ Missing alt text on images
❌ Improper heading hierarchy
❌ No keyboard focus indicators

## 11. Edge Cases

1. **Dynamic content announcements**
   ```html
   <div aria-live="polite">Updated content</div>
   ```

2. **Complex widget ARIA patterns**

## 12. Performance Considerations

Accessibility rarely impacts performance.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. ARIA vs native semantics?
2. Keyboard accessibility requirements?
3. Screen reader testing?

## 15. Follow-up Questions

- "Handle modal focus trapping?"

## 16. Production Best Practices

1. Use semantic HTML first
2. Test with keyboard only
3. Validate with automated tools
4. Manual screen reader testing
5. Maintain proper color contrast

## 17. Summary

Accessibility benefits everyone — inclusive design is better design.

## 18. Revision Notes

- Semantic HTML is foundation
- ARIA supplements, doesn't replace HTML
- Keyboard navigation mandatory
- Alt text for images
- Color contrast minimum 4.5:1

## 19. Practice Questions

1. Audit simple page for accessibility.
2. Implement keyboard navigation.
3. Add proper ARIA attributes to custom control.

## 20. References

- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [ARIA Authoring Practices](https://w3c.github.io/aria-practices/)

---
