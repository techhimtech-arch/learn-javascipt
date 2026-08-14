# Responsive Images

## 1. Definition

**Responsive Images** adapt to different viewport sizes, resolutions, and devices — delivering optimal image assets.

## 2. Why do we need it?

Mobile users need smaller images; high-DPI displays need higher resolution.

## 3. Internal Working

Mechanisms:
- `srcset`: Multiple image candidates
- `sizes`: Display dimensions per viewport
- `<picture>` element: Art direction
- `loading="lazy"`: Deferred offscreen images

## 4. Step-by-Step Execution

```html
<!-- Responsive image with multiple sizes -->
<img 
  srcset="small.jpg 480w,
          medium.jpg 768w,
          large.jpg 1200w"
  sizes="(max-width: 480px) 100vw,
         (max-width: 768px) 50vw,
         33vw"
  src="large.jpg"
  alt="Description">
```

## 5. Syntax

```html
<!-- Srcset with density descriptors -->
<img srcset="low.jpg 1x, high.jpg 2x">

<!-- Picture element for art direction -->
<picture>
  <source media="(max-width: 768px)" srcset="mobile.jpg">
  <source media="(min-width: 1200px)" srcset="desktop.jpg">
  <img src="tablet.jpg" alt="Description">
</picture>

<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Basic responsiveness -->
<img srcset="small.jpg 480w, large.jpg 1200w"
     sizes="(max-width: 480px) 100vw, 50vw"
     src="small.jpg" alt="Responsive image">
```

### Medium
```html
<!-- Picture with multiple conditions -->
<picture>
  <source media="(max-width: 600px)" srcset="small.webp" type="image/webp">
  <source media="(max-width: 1200px)" srcset="medium.webp" type="image/webp">
  <source srcset="large.webp" type="image/webp">
  <img src="large.jpg" alt="Adaptive image">
</picture>
```

### Advanced
```html
<!-- Full responsive setup -->
<picture>
  <source 
    media="(max-width: 768px)"
    srcset="
      image-480.jpg 480w,
      image-768.jpg 768w"
    sizes="100vw">
    
  <source
    media="(min-width: 769px)"
    srcset="
      image-1200.jpg 1200w,
      image-1920.jpg 1920w"
    sizes="50vw">
    
  <img 
    src="image-1200.jpg"
    alt="Content describing image"
    width="1200"
    height="800"
    loading="lazy"
    decoding="async">
</picture>
```

## 7. Visual Diagram (ASCII)

```
Responsive Image Decision Tree

┌─────────────────────────────────────┐
│ Viewport Width Determination        │
└─────────────┬───────────────────────┘
              ▼
┌─────────────────────────────────────┐
│ Srcset Candidate Selection          │
│ (based on sizes/media queries)      │
└─────────────┬───────────────────────┘
              ▼
┌─────────────────────────────────────┐
│ File Type Selection                 │
│ (WebP supported → WebP)             │
└─────────────┬───────────────────────┘
              ▼
┌─────────────────────────────────────┐
│ Lazy Loading Check                  │
│ (offscreen → defer fetch)           │
└─────────────────────────────────────┘
```

## 8. Real-world Example

E-commerce product images adapting to device capabilities.

## 9. Angular Use Case

Responsive image components, lazy loading directives.

## 10. Common Mistakes

❌ Omitting alt text for accessibility
❌ Not specifying width/height attributes

## 11. Edge Cases

1. **WebP format fallback support**
2. **Art direction with picture element**

## 12. Performance Considerations

Lazy loading saves significant bandwidth.

## 13. Time & Space Complexity

O(candidates) selection overhead.

## 14. Interview Questions

1. srcset vs sizes relationship?
2. Implement responsive images?

## 15. Follow-up Questions

- "Optimize hero images for performance?"

## 16. Production Best Practices

1. Specify explicit width/height
2. Use descriptive alt text
3. Enable lazy loading
4. Provide modern formats
5. Set appropriate sizes

## 17. Summary

Responsive images balance quality and performance across devices.

## 18. Revision Notes

- srcset provides image candidates
- sizes defines layout width per breakpoint
- Webp preferred over JPEG/PNG
- lazy loads offscreen images
- decoding="async" prevents render blocking

## 19. Practice Questions

1. Create responsive thumbnail gallery.
2. Implement art-directed hero image.
3. Add lazy loading with placeholders.

## 20. References

- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

---
