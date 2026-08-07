# HTML Forms

## 1. Definition

HTML **forms** collect user input for submission to servers or processing client-side.

Built using `<form>`, `<input>`, `<label>`, `<select>`, `<textarea>`, etc.

## 2. Why do we need it?

Enable interaction: login, registration, feedback, data entry, file uploads.

## 3. Internal Working

Form elements maintain state independently:
- Inputs hold current values
- Labels associate via `for`/`id`
- Submission triggers HTTP request (GET/POST)

Browsers validate basic constraints automatically.

## 4. Step-by-Step Execution

Example:
```html
<form action="/submit" method="post">
  <label>Name: <input name="username"></label>
  <button type="submit">Send</button>
</form>
```

Steps:
1. User fills input
2. Click submit
3. Browser validates required fields
4. Sends POST request to `/submit`

## 5. Syntax

```html
<form action="..." method="get|post">
  <label>...</label>
  <input type="text|email|password|number|date|file|..." name="..." required>
  <select>...</select>
  <textarea></textarea>
  <button>Submit</button>
</form>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<form>
  <input type="text" name="query" placeholder="Search...">
  <input type="submit" value="Go">
</form>
```

### Medium
```html
<form>
  <email><label>Email:* <input type="email" name="email" required></label></email>
  <label>Password:* <input type="password" name="password" minlength="8"></label>
  <button>Login</button>
</form>
```

### Advanced
```html
<form enctype="multipart/form-data">
  <label>Avatar: <input type="file" accept="image/*" capture="user"></label>
  <input type="range" min="1" max="10" step="0.5">
  <input type="color" value="#ff0000">
</form>
```

## 7. Visual Diagram (ASCII)

```
Form Submission Flow

User Interaction
    ↓
Validation (built-in/custom)
    ↓
Serialize Form Data
    ↓
HTTP Request (GET/POST)
    ↓
Server Response
    ↓
Render Feedback/UI
```

## 8. Real-world Example

Angular reactive form:
```typescript
this.form = this.fb.group({
  username: ['', Validators.email],
  password: ['', Validators.minLength(8)]
});
```

## 9. Angular Use Case

Reactive Forms API extends native validation with powerful composition.

## 10. Common Mistakes

❌ Neglecting accessibility (missing labels)
❌ No client-side validation backup
❌ Incorrect submission handling

## 11. Edge Cases

1. **Custom validations require manual enforcement**
2. **Multiple submit handlers possible**
3. **File uploads via multipart/form-data**

## 12. Performance Considerations

Use `autocomplete` hints to speed filling.

## 13. Time & Space Complexity

O(n) where n = number of form controls during validation.

## 14. Interview Questions

1. Types of input validation?
2. Difference between GET/POST?
3. Handle multipart uploads?

## 15. Follow-up Questions

- "How do you handle async validations?"

## 16. Production Best Practices

1. Associate labels with every control
2. Validate on both client/server
3. Provide helpful error messages
4. Use appropriate input types

## 17. Summary

Forms are primary gateway for user input — ensure robustness, accessibility, and clarity.

## 18. Revision Notes

- Required fields marked
- Type-specific inputs improve UX
- Labels enhance accessibility
- Validation improves data integrity

## 19. Practice Questions

1. Create multi-step form wizard.
2. Validate email/password strength.
3. Auto-save draft on blur.

## 20. References

- [MDN: Forms](https://developer.mozilla.org/en-US/docs/Learn/Forms)

### Next File
**006 - Input Types.md**
