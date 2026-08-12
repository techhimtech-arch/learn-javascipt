# Canvas API

## 1. Definition

**Canvas API** provides low-level drawing capabilities via 2D/3D contexts — enabling graphics rendering directly in browser.

## 2. Why do we need it?

Create images, animations, games, data visualizations programmatically.

## 3. Internal Working

1. `<canvas>` element reserves space
2. `getContext('2d')` returns drawing handle
3. Drawing methods render onto bitmap
4. No DOM representation of shapes

## 4. Step-by-Step Execution

```html
<canvas id="myCanvas" width="400" height="200"></canvas>
```

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw rectangle
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 100, 50);
```

## 5. Syntax

```javascript
// 2D context methods
ctx.fillRect(x, y, width, height);
ctx.clearRect(x, y, width, height);
ctx.strokeText(text, x, y);

// Paths
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.closePath();
ctx.fill();
ctx.stroke();

// Transformations
ctx.translate(x, y);
ctx.rotate(angle);
ctx.scale(x, y);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// Draw simple shapes
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 100, 100);
```

### Medium
```javascript
// Circle with gradient
const gradient = ctx.createRadialGradient(100, 100, 10, 100, 100, 100);
gradient.addColorStop(0, 'white');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.fill();
```

### Advanced
```javascript
// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update state
  ball.x += ball.vx;
  ball.y += ball.vy;
  
  // Collision detection
  if (ball.x <= 0 || ball.x >= canvas.width) ball.vx *= -1;
  if (ball.y <= 0 || ball.y >= canvas.height) ball.vy *= -1;
  
  // Draw frame
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  
  requestAnimationFrame(animate);
}
animate();
```

## 7. Visual Diagram (ASCII)

```
Canvas Pipeline

┌─────────────────────┐
│ <canvas> Element    │ (Reserves bitmap space)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ CanvasRenderingContext2D │ (Drawing API handle)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Drawing Commands    │ (Rectangles, paths, text)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Bitmap Image        │ (Rendered pixels)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Displayed on Screen │
└─────────────────────┘
```

## 8. Real-world Example

Game rendering loop, chart generation, image editing tools.

## 9. Angular Use Case

Custom chart components, canvas-based directives, game wrappers.

## 10. Common Mistakes

❌ Not restoring context state after transforms
❌ Drawing before canvas dimensions set

## 11. Edge Cases

1. **High DPI handling**
   ```javascript
   const ratio = window.devicePixelRatio;
   canvas.width *= ratio;
   canvas.height *= ratio;
   ctx.scale(ratio, ratio);
   ```

## 12. Performance Considerations

Batch drawing operations, limit redraws.

## 13. Time & Space Complexity

O(pixels drawn) per frame.

## 14. Interview Questions

1. Canvas vs SVG tradeoffs?
2. Optimize canvas rendering?
3. Handle DPI scaling?

## 15. Follow-up Questions

- "Export canvas to image?"

## 16. Production Best Practices

1. Separate drawing logic into functions
2. Batch operations to reduce state changes
3. Use offscreenCanvas for heavy computations
4. Clean up event listeners properly
5. Throttle animation frames

## 17. Summary

Canvas API enables powerful pixel-level graphics rendering capabilities.

## 18. Revision Notes

- Immediate mode API (no object model)
- getContext returns drawing context
- requestAnimationFrame efficient animation
- High DPI requires scaling

## 19. Practice Questions

1. Draw pattern with loops.
2. Implement bouncing ball animation.
3. Export canvas as PNG image.

## 20. References

- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---
