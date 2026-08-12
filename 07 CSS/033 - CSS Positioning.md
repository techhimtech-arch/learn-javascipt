# CSS Positioning

## 1. Definition

**CSS Positioning** controls element placement within layout context.

## 2. Why do we need it?

Precise element control beyond default document flow.

## 3. Internal Working

Position values:
- `static`: Default - normal document flow
- `relative`: Offset from normal position
- `absolute`: Positioned relative to nearest positioned ancestor
- `fixed`: Fixed relative to viewport
- `sticky`: Hybrid - static until scroll threshold

## 4. Syntax

```css
.static { position: static; }
.relative { position: relative; top: 10px; left: 20px; }
.absolute { position: absolute; top: 0; left: 0; }
.fixed { position: fixed; bottom: 0; right: 0; }
.sticky { position: sticky; top: 0; }

/* Z-index stacking */
.layered { position: relative; z-index: 10; }
```

## 5. Examples

```css
/* Sticky header */
.header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 100;
}

/* Centered modal */
.modal-overlay {
  position: fixed;
  inset: 0; /* top:0, right:0, bottom:0, left:0 */
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## 6. Interview Questions

1. Position vs display impact?
2. Sticky positioning requirements?

## 7. Summary

Positioning schemes provide granular control over element placement.

## 8. References

- [CSS Position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

---
