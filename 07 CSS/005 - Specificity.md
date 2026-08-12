# Specificity

## 1. Definition

**CSS Specificity** determines which styles win when multiple rules match the same element — calculated through selector weights.

## 2. Why do we need it?

Resolve conflicts predictably when multiple CSS rules apply to one element.

## 3. Internal Working

Calculated as four-part value:
- **Inline styles**: counted as `1,0,0,0`
- **IDs**: `0,1,0,0` per ID
- **Classes/attributes/pseudo-classes**: `0,0,1,0` each
- **Elements/pseudo-elements**: `0,0,0,1` each

Higher total wins.

## 4. Step-by-Step Execution

Example:
```css
/* 0,0,0,1 */
p { color: black; }

/* 0,0,1,1 */
p.error { color: red; }

/* 0,1,0,1 */
#main p { color: blue; }

/* 1,0,0,0 */
<p style="color: green">Text</p>
```

Result:
```html
<p id="main" class="error" style="color: green">Text</p>
<!-- Displays green due to inline style -->
```

Steps:
1. Compute specificity for all matching rules
2. Sort by specificity value
3. If tied, last-defined wins
4. `!important` overrides normal cascade

## 5. Syntax

No special syntax — inherent to how selectors work.

## 6. Examples (Easy → Advanced)

### Easy
```css
a { color: blue; }           /* Specificity: 0,0,0,1 */
a.active { color: red; }     /* Specificity: 0,0,1,1 */
```

### Medium
```css
ul li span { color: gray; }  /* 0,0,0,3 */
ul .item span { color: black; } /* 0,0,1,2 */ → wins!
```

### Advanced
```css
/* Equal specificity → later-defined wins */
.button.primary { background: blue; }
.button.secondary { background: gray; } /* This wins if placed after */
```

## 7. Visual Diagram (ASCII)

```
Specificity Resolution Order

Inline Style  → Always wins (1,0,0,0)
↓
ID Selector   → Next priority (0,1,0,0)
↓
Class/Attr/   → Next tier (0,0,1,0)
Pseudo-class
↓
Element/      → Lowest (0,0,0,1)
Pseudo-element
↓
Last Defined Wins (if equal specificity)
```

## 8. Real-world Example

Overriding third-party component styles:
```scss
/* Increase specificity instead of !important */
.my-component.mat-button {} /* BEM-style override */
```

## 9. Angular Use Case

Managing component style precedence without `!important`.

## 10. Common Mistakes

❌ Incorrectly computing specificity values  
❌ Relying on `!important` excessively

## 11. Edge Cases

1. **`:not()` specificity**
   ```css
   p:not(.intro) { /* Adds specificity of inner selector */ }
   ```

2. **Inline styles vs !important**
   ```css
   /* !important beats inline styles EXCEPT when also applied inline */
   ```

## 12. Performance Considerations

Excessive specificity leads to bloated selectors harming readability/performance.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

1. Calculate specificity for complex selectors.
2. Difference between specificity and cascade?
3. How `!important` affects resolution?

## 15. Follow-up Questions

- "Best practices to avoid specificity wars?"

## 16. Production Best Practices

1. Keep selectors low-specificity
2. Use naming conventions (BEM)
3. Avoid `!important` entirely
4. Leverage source order intentionally

## 17. Summary

Understanding specificity enables predictable styling and avoids frustrating conflict resolution bugs.

## 18. Revision Notes

- Inline = 1000, ID = 100, Class = 10, Tag = 1
- Higher number wins regardless of source order
- Ties broken by definition order
- `!important` overrides unless inlined

## 19. Practice Questions

1. Predict rendered color/style.
2. Refactor high-specificity rule.
3. Resolve conflicting selectors.

## 20. References

- [MDN: Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)

### Next File
**006 - Cascade.md**
