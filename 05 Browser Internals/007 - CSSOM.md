# CSSOM

## 1. Definition

**CSS Object Model (CSSOM)** is an interface allowing JavaScript to programmatically access and modify CSS stylesheets and style declarations.

Part of the broader Web APIs landscape, alongside DOM.

## 2. Why do we need it?

Dynamic styling updates, responsive adjustments, theme switching — all controlled via script.

## 3. Internal Working

Linked to DOM — together they form the **Render Tree**.

Browser parses `<style>` tags and external stylesheets to build CSSOM tree.

## 4. Step-by-Step Execution

Example:
```javascript
const style = document.createElement('style');
style.textContent = 'body { background-color: yellow; }';
document.head.appendChild(style);
```

Steps:
1. Create `<style>` element
2. Add CSS rule text
3. Insert into document head
4. Browser updates CSSOM
5. Triggers style recalculation + repaint

## 5. Syntax

Via CSSStyleDeclaration:
```javascript
element.style.property = value;
```

Or manipulating stylesheets:
```javascript
document.styleSheets[0].insertRule('.new-class { color: red; }', index);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
document.querySelector('div').style.display = 'none';
```

### Medium
```javascript
const sheet = new CSSStyleSheet();
sheet.replaceSync('h1 { color: blue; }');
document.adoptedStyleSheets = [sheet];
```

### Advanced
```javascript
// Programmatically toggle dark mode
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
```

## 7. Visual Diagram (ASCII)

```
CSSOM Construction

<CSS Source>
    ↓
CSSParser
    ↓
┌────────────┐
│ CSSOM Tree │
│ (Stylesheet│
│ Rules)      │
└─────┬──────┘
      ↓
Combined with DOM → Render Tree
```

## 8. Real-world Example

Angular dynamic component styles:
```typescript
@Component({
  styles: [`
    .active { color: red; }
  `]
})
```

## 9. Angular Use Case

Component encapsulation relies on emulated/shadow DOM styling managed through CSSOM-like APIs.

## 10. Common Mistakes

❌ Injecting unescaped CSS strings  
❌ Not removing dynamically added styles

## 11. Edge Cases

1. **Constructable Stylesheets**
   ```javascript
   const sheet = new CSSStyleSheet();
   sheet.replaceSync('div { border: 1px solid black }');
   ```

2. **Shadow DOM scoping**
   ```javascript
   shadowRoot.adoptedStyleSheets = [mySheet];
   ```

## 12. Performance Considerations

Minimize forced style recalculations; batch style changes.

## 13. Time & Space Complexity

Cost proportional to number of affected elements/styles.

## 14. Interview Questions

1. How is CSSOM built?
2. Relationship with Render Tree?
3. Manipulating stylesheets safely?

## 15. Follow-up Questions

- "Difference between inline styles and stylesheets?"

## 16. Production Best Practices

1. Batch style changes
2. Use classes instead of inline when possible
3. Clean up injected sheets

## 🔍 Quick Recap
- CSSOM = programmatic interface to CSS
- Built alongside DOM → merged into Render Tree
- Accessible via element.style or stylesheet APIs
- Used for dynamic theming/responsive tweaks

## 📝 Summary
CSSOM enables scripts to manipulate styles dynamically. Together with DOM, it forms the basis of the Render Tree. Efficient manipulation avoids unnecessary reflows and keeps UI smooth during runtime style changes.

## 17. Summary

Essential companion to DOM for styling control.

## 18. Revision Notes

- Parallel to DOM structure
- Enables live style modifications
- Affects rendering pipeline
- Security risks with raw injection

## 19. Practice Questions

1. Toggle stylesheet dynamically.
2. Add responsive media query via JS.
3. Apply theme change smoothly.

## 20. References

- [MDN: CSSOM](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model)

### Next File
**008 - Render Tree.md**
