# HTML Input Types

## 1. Definition

HTML5 introduced numerous **input types** beyond plain `text` — improving UX, enabling browser-native validation, and triggering optimized mobile keyboards.

Supported values include:
- `email`, `url`, `tel`
- `number`, `range`, `date`, `time`
- `color`, `file`, `search`, `password`
- `checkbox`, `radio`, `hidden`, `submit`, `button`, `reset`

## 2. Why do we need it?

Better semantic clarity, built-in validation constraints, and tailored user interfaces per platform/device.

## 3. Internal Working

Browsers interpret input types:
1. Validate format automatically
2. Show appropriate virtual keyboard
3. Render specialized widgets (e.g., date picker)
4. Provide hints for autofill/password managers

Fallback gracefully to `text` when unsupported.

## 4. Step-by-Step Execution

Example:
```html
<input type="email" name="email" placeholder="you@example.com">
```

Steps:
1. Browser recognizes `type="email"`
2. Shows email-friendly keyboard on mobile
3. Validates presence of `@` before submit
4. Autofill detects context as email field

## 5. Syntax

```html
<input type="..." name="..." [required] [disabled] [readonly]>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<input type="number" min="1" max="10">
```

### Medium
```html
<input type="range" min="0" max="100" step="10">
```

### Advanced
```html
<input type="date" min="2024-01-01" max="2025-12-31">
<input type="file" accept=".pdf,.docx" multiple>
```

## 7. Visual Diagram (ASCII)

```
Input Type Mapping

┌────────────┐
│ type="email"│ → Mobile keyboard optimized
├────────────┤
│ type="tel"  │ → Numeric pad with symbols
├────────────┤
│ type="date" │ → Native calendar widget
└────────────┘
```

## 8. Real-world Example

Angular form controls with reactive validation:
```typescript
this.form = this.fb.group({
  email: ['', [Validators.email]],
  age: ['', [Validators.min(18)]]
});
```

## 9. Angular Use Case

Custom form controls integrate with native input behaviors.

## 10. Common Mistakes

❌ Using `text` instead of semantic types  
❌ Omitting validation constraints  

## 11. Edge Cases

1. **Date/time parsing inconsistencies**
2. **Browser-specific widgets**
3. **Accessibility quirks**

## 12. Performance Considerations

Native widgets faster than custom JS alternatives.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Common HTML5 input types?
2. Validation attributes?
3. Mobile keyboard triggering?

## 15. Follow-up Questions

- "How does Angular adapt to these?"

## 16. Production Best Practices

1. Match types to expected data formats
2. Combine with pattern validation where needed
3. Test across devices/browsers

## 17. Summary

Rich input semantics improve usability and reduce custom code.

## 18. Revision Notes

- Semantic types = better UX + validation
- Mobile-friendly keyboards triggered
- Cross-browser variation exists
- Always validate server-side too

## 19. Practice Questions

1. Create responsive contact form.
2. Add date/time inputs with constraints.
3. Handle file upload preview.

## 20. References

- [MDN: Input Types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes)

### Next File
**007 - Canvas.md**
