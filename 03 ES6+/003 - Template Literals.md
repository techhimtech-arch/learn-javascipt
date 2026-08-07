# Template Literals

## 1. Definition

**Template literals** provide an enhanced way to embed expressions inside string literals using backticks (\`) and `${}` placeholders.

They support interpolation, multi-line strings, and tagged template functionality.

## 2. Why do we need it?

- Cleaner string building
- No need for concatenation (`+` operator)
- Multi-line strings without `\n`
- Tagged templates for advanced use cases

## 3. Internal Working

Parsed at compile-time; embedded `${}` expressions evaluated at runtime and interpolated into resulting string.

Tagged templates allow custom processing of literal segments + interpolated values.

## 4. Step-by-Step Execution

Example:
```javascript
const name = "Alice";
const age = 30;
const message = `Hello, my name is ${name} and I am ${age} years old.`;
```

Steps:
1. Parse template literal structure
2. Evaluate expressions `${name}`, `${age}`
3. Join literal parts with evaluated results
4. Assign final string to `message`

## 5. Syntax

Basic:
```javascript
`Hello, ${firstName} ${lastName}!`;
```

Tagged:
```javascript
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => 
    acc + str + (values[i] || ''), '');
}
highlight`Hello, ${name}!`;
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const greeting = `Welcome, user!`;
```

### Medium
```javascript
const url = `${API_BASE}/users/${userId}/posts`;
```

### Advanced
```javascript
function i18n(strings, ...keys) {
  return function(...values) {
    return keys.reduce((acc, key, i) => 
      acc + strings[i] + (values[key] || ''), '');
  };
}
const t = i18n`Name: ${'name'}, Age: ${'age'}`;
t({ name: "John", age: 30 }); // "Name: John, Age: 30"
```

## 7. Visual Diagram (ASCII)

```
Template Literal Parsing

Input:
`Hello, ${name}! Today is ${day}.`

Parsed Structure:
┌─────────────────┐
│ Literal: Hello, │
├─────────────────┤
│ Value: name     │
├─────────────────┤
│ Literal: ! Today│
├─────────────────┤
│ Value: day      │
├─────────────────┤
│ Literal: .      │
└─────────────────┘

Output: "Hello, Alice! Today is Monday."
```

## 8. Real-world Example

Angular i18n uses tagged templates for localization:
```html
<h1 i18n>Hello, {$userName}!</h1>
```

## 9. Angular Use Case

Internationalization (i18n), dynamic template generation, styled-components patterns.

## 10. Common Mistakes

❌ Using backticks for normal strings unnecessarily
❌ Nested template confusion
❌ Incorrect escaping inside templates

## 11. Edge Cases

1. **Escaping interpolation**
   ```javascript
   `\${notAnExpression}`; // Literal "${notAnExpression}"
   ```

2. **Expressions can contain anything**
   ```javascript
   `${condition ? "yes" : "no"}`
   ```

3. **Tagged templates bypass normal coercion**
   ```javascript
   String.raw`C:\Users\Name` // Preserves backslashes
   ```

## 12. Performance Considerations

Slight overhead vs string concatenation for complex expressions, but negligible in typical usage.

## 13. Time & Space Complexity

O(n) where n = total output length.

## 14. Interview Questions

1. Advantages of template literals?
2. How does tagging work?
3. When would you use tagged templates?
4. Difference between single/double quotes and backticks?

## 15. Follow-up Questions

- "How to escape `${}` in template?"
- "Can you create domain-specific language with tags?"

## 16. Production Best Practices

1. Use template literals for readable string construction
2. Prefer tagged templates for internationalization/localization
3. Avoid overly complex nested interpolations
4. Use raw strings for paths/commands

## 17. Summary

Modern, flexible approach to string creation — supports rich formatting and advanced templating patterns.

## 18. Revision Notes

- Backtick syntax
- ${expr} interpolation
- Tagged = custom processor
- Multiline by default

## 19. Practice Questions

1. Build formatted log message.
2. Construct URL with parameters.
3. Implement simple i18n tag.

## 20. References

- [MDN: Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

### Next File
**004 - Spread Operator.md**
