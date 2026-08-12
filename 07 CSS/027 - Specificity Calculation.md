# CSS Specificity Calculation

## 1. Definition

**CSS Specificity Calculation** determines which styles apply when multiple selectors match the same element.

## 2. Why do we need it?

Resolve conflicts predictably without resorting to !important hacks.

## 3. Internal Working

Four-part specificity value in order:
1. **Inline styles**: 1000 each
2. **ID selectors**: 100 each  
3. **Class/attribute/pseudo-class**: 10 each
4. **Element/pseudo-element**: 1 each

## 4. Examples

```
Selector                           Specificity
inline style                       1,000
#nav                              0,100
ul li .active                     0,020,02
ul li a                           0,000,03
```

## 5. Interview Questions

1. Calculate specificity of complex selector?
2. Override with lower specificity?
3. Avoid !important?

## 6. Summary

Understanding specificity prevents style override issues.

---
