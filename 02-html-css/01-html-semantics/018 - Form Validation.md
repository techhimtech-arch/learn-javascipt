# HTML Forms Validation

## 1. Definition

**HTML5 Form Validation** provides built-in validation constraints — checking user input before submission.

## 2. Why do we need it?

Prevent invalid data submission, guide users, reduce server load.

## 3. Internal Working

HTML attributes:
- `required`: Must provide value
- `type`: email/url/number/tel patterns
- `pattern`: Regex constraint
- `min/max`: Numeric range
- `minlength/maxlength`: String length
- `step`: Numerical granularity

JavaScript methods:
- `checkValidity()`: Returns validity object
- `reportValidity()`: Shows error messages
- `setCustomValidity()`: Custom validation message

## 4. Step-by-Step Execution

```html
<form>
  <input 
    type="email" 
    required 
    placeholder="you@example.com"
    title="Please enter a valid email">
    
  <input 
    type="password"
    minlength="8"
    required
    placeholder="8+ characters">
    
  <button type="submit">Submit</button>
</form>
```

## 5. Syntax

```html
<!-- Validation example -->
<input 
  type="number"
  name="age"
  min="18"
  max="99"
  step="1"
  required
  placeholder="Age (18-99)">

<!-- Pattern matching -->
<input 
  type="text"
  pattern="[A-Z]{2}[0-9]{6}"
  title="Format: 2 letters, 6 digits">

<!-- Custom validity -->
<script>
  function validatePassword() {
    const input = document.getElementById('password');
    if (input.value.length < 8) {
      input.setCustomValidity('Password must be 8+ characters');
    } else {
      input.setCustomValidity('');
    }
  }
</script>
```

## 6. Examples

### Easy
```html
<form id="signup">
  <input type="email" required placeholder="your@email.com">
  <input type="tel" pattern="[0-9]{10}" required>
  <button type="submit">Sign Up</button>
</form>
```

### Advanced
```javascript
// Async server-side validation
const usernameInput = document.getElementById('username');
usernameInput.addEventListener('blur', async () => {
  const response = await fetch(`/api/check-username?q=${usernameInput.value}`);
  if (response.status === 409) {
    usernameInput.setCustomValidity('Username taken');
  } else {
    usernameInput.setCustomValidity('');
  }
});
```

## 7. CSS Selectors

```css
/* Valid/invalid states */
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:required { /* styles for required fields */ }

/* Focus/momentum states */
input:focus:valid { box-shadow: 0 0 5px green; }
```

## 8. Interview Questions

1. HTML5 validation constraint types?
2. Custom validation messages?
3. Pattern attribute edge cases?

## 9. Summary

HTML5 validation enhances UX and reduces server-side burden.

## 10. References

- [MDN: Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

---
