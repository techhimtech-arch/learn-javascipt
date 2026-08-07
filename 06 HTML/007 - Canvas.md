# Canvas

## 1. Definition

The `<canvas>` element provides a **scriptable drawing surface** for rendering 2D graphics dynamically via JavaScript.

It exposes a bitmap context manipulated programmatically.

## 2. Why do we need it?

Create charts, games, image editing, animations directly in browser without plugins.

## 3. Internal Working

1. Element rendered as blank bitmap
2. 2D context retrieved (`getContext('2d')`)
3. Commands draw onto backing store
4. Final pixels composited into layout

GPU acceleration possible via WebGL (separate context).

## 4. Step-by-Step Execution

Example:
```html
<canvas id="myCanvas" width="400" height="200"></canvas>
<script>
  const ctx = document.getElementById('myCanvas').getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 100, 50);
</script>
```

Steps:
1. `<canvas>` rendered empty
2. Context retrieved
3. Fill style set
4. Rectangle drawn at coordinates
5. Pixels painted to visible canvas

## 5. Syntax

```javascript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.moveTo(x, y);
ctx.lineTo(x2, y2);
ctx.stroke();
ctx.fillText("text", x, y);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 50, 50);
```

### Medium
```javascript
const gradient = ctx.createLinearGradient(0,0, 100,0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.fillRect(0,0,100,50);
```

### Advanced
```javascript
const image = new Image();
image.src = '/avatar.png';
image.onload = () => {
  ctx.drawImage(image, 0, 0, 100, 100);
};
```

## 7. Visual Diagram (ASCII)

```
Canvas Rendering Stack

┌──────────────┐
│ Drawing APIs │ ← moveTo/fillRect/etc
└──────┬───────┘
       ▼
┌──────────────┐
│ Backing Store│ ← Bitmap memory
└──────┬───────┘
       ▼
┌──────────────┐
│ Composited   │ ← Integrated into page
└──────────────┘
```

## 8. Real-world Example

Chart.js renders graphs using `<canvas>` element under the hood.

## 9. Angular Use Case

Custom chart components, image processing tools, game engines.

## 10. Common Mistakes

❌ Ignoring resolution scaling (high-DPI screens)
❌ Forgetting to clear canvas between frames

## 11. Edge Cases

1. **Pixel density mismatch**
   ```javascript
   const ratio = window.devicePixelRatio || 1;
   canvas.width = width * ratio;
   canvas.height = height * ratio;
   ctx.scale(ratio, ratio);
   ```

2. **Loss of context**
   ```javascript
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ```

## 12. Performance Considerations

Batch drawing operations; minimize state changes.

## 13. Time & Space Complexity

Drawing complexity depends on pixel area affected.

## 14. Interview Questions

1. Use cases for canvas?
2. Differences with SVG?
3. Handle high-resolution displays?

## 15. Follow-up Questions

- "Compare canvas vs WebGL?"

## 16. Production Best Practices

1. Use offscreen canvases for workers
2. Debounce redraws during resize
3. Clean up resources appropriately

## 17. Summary

High-performance raster drawing API for visual content and media applications.

## 18. Revision Notes

- Imperative pixel-based drawing
- Context determines mode (2D/WebGL)
- Resolution-sensitive
- Great for animation/games

## 19. Practice Questions

1. Draw animated bouncing ball.
2. Implement image filter effect.
3. Render bar chart dynamically.

## 20. References

- [MDN: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

### Next File
**008 - SVG.md**
