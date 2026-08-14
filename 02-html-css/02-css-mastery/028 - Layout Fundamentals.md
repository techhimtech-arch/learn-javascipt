# CSS Layout Fundamentals

## 1. Definition

**CSS Layout Fundamentals** establish how elements occupy space — positioning, flexbox, grid, and float mechanics.

## 2. Why do we need it?

Control document flow, position elements precisely, build responsive interfaces.

## 3. Internal Working

Layout modes:
1. **Normal flow**: Default block/inline stacking
2. **Floats**: Shift element left/right
3. **Positioning**: static/relative/absolute/fixed/sticky
4. **Flexbox**: One-dimensional flexible box
5. **Grid**: Two-dimensional grid layout
6. **Multi-column**: Flow content into columns

## 4. Step-by-Step Execution

Positioning example:
```css
.container {
  position: relative; /* Establishes context */
  width: 100%;
  height: 300px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Covers entire container */
}
```

## 5. Syntax

```css
/* Positioning */
.static { position: static; }    /* Default - no positioning */
.relative { position: relative; top: 10px; left: 20px; } /* Offset from normal pos */
.absolute { position: absolute; top: 0; left: 0; } /* Relative to nearest positioned ancestor */
.fixed { position: fixed; top: 0; right: 0; } /* Relative to viewport */
.sticky { position: sticky; top: 0; } /* Hybrid - sticks during scroll */

/* Display modes */
display: block;
display: inline-block;
display: inline-flex;
display: grid;
display: contents;

/* Clearing floats */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

## 6. Interview Questions

1. Positioning differences?
2. Float clearing techniques?
3. Choose layout method?

## 7. Summary

Layout fundamentals enable controlled, predictable element arrangements.

## 8. References

- [CSS Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_layout/)

---
