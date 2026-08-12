# Cascade

## 1. Definition

The **CSS Cascade** determines which styles get applied when multiple rules target the same element — following a set of priorities including importance, specificity, and source order.

## 2. Why do we need it?

Resolve conflicts between different stylesheets or rules targeting same properties predictably.

## 3. Internal Working

Order of precedence:
1. Origin + Importance: User agent ← Author ← Author !important ← User !important
2. Specificity (as computed earlier)
3. Source order (declaration appears later wins)

Also affected by inheritance and CSSOM construction.

## 4. Step-by-Step Execution

Example:
```css
/* From stylesheet A */
.item { color: red; }

/* From stylesheet B (loaded later) */
.item { color: blue; }
```

Steps:
1. Parse both stylesheets
2. Identify conflicting declarations
3. Compare specificity — equal here
4. Later source wins → Blue rendered

With !important:
```css
/* Stylesheet A */
.item { color: red !important; }

/* Stylesheet B */
.item { color: blue; }
```

Result: Red (due to importance override)

## 5. Syntax

No explicit syntax — cascade behavior inherent to CSS processing model.

## 6. Examples (Easy → Advanced)

### Easy
```css
/* Later rule overrides */
.header { font-size: 16px; }
.header { font-size: 18px; } /* This wins */
```

### Medium
```css
/* External vs internal */
<link rel="stylesheet" href="external.css">
<style>
  .conflict { color: green !important; }
</style>
<!-- external.css -->
.conflict { color: purple; }
```

### Advanced
```css
/* User agent defaults vs author styles */
button { /* user agent sets some defaults */ }
button.custom-btn { /* author overrides selectively */ }
```

## 7. Visual Diagram (ASCII)

```
Cascade Resolution Flow

1. Origin + Importance
   User Agent ← Author ← Author(!imp) ← User(!imp)
      ↓
2. Specificity Comparison
      ↓
3. Source Order Tiebreaker
   Last Defined Wins
```

## 8. Real-world Example

Component library theme overrides:
```scss
// Base theme
$primary-color: blue;

// App-level override
.my-theme .primary-button {
  background-color: $custom-primary !important;
}
```

## 9. Angular Use Case

Managing component style overrides, theme inheritance chains.

## 10. Common Mistakes

❌ Misunderstanding importance priority layers  
❌ Not considering user-agent defaults

## 11. Edge Cases

1. **User agent default styles**
   ```css
   button { margin: 0.5em; } /* UA default */
   button { margin: 0; } /* Author override */
   ```

2. **Conflicting !important declarations**
   ```css
   .a { color: red !important; }
   .b { color: blue !important; } /* Equal specificity → last defined wins */
   ```

## 12. Performance Considerations

Avoid excessive specificity that complicates future maintenance.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Order of cascade layers?
2. Role of specificity in cascade?
3. How `!important` interacts?

## 15. Follow-up Questions

- "Explain inheritance role in cascade?"

## 16. Production Best Practices

1. Understand and respect specificity scale
2. Don’t rely on source ordering alone
3. Know difference between author/user styles
4. Handle browser defaults explicitly

## 17. Summary

Cascade orchestrates style conflict resolution systematically through layered priorities.

## 18. Revision Notes

- Importance > Specificity > Source order
- Four origins: UA, Author, User, User-Agent
- Later same-specificity wins
- Inheritance separate concern

## 19. Practice Questions

1. Predict winner among competing rules.
2. Resolve conflicting !important declarations.
3. Override third-party library styles.

## 20. References

- [MDN: Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade)
- [CSS Cascading Level 4](https://www.w3.org/TR/css-cascade-4/)

### Next File
**007 - Animations.md**
