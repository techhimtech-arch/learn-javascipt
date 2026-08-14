# Render Tree

## 1. Definition

The **Render Tree** (also called Frame Tree) is a tree of visual elements representing what should be displayed on the page — constructed from combining the DOM and CSSOM.

Not every DOM node appears here — hidden or `display:none` nodes excluded.

## 2. Why do we need it?

To determine which parts of the document actually need rendering.

Optimizes painting by ignoring non-visible content.

## 3. Internal Working

Steps:
1. Walk DOM tree
2. For each visible node:
   - Apply matching CSS rules from CSSOM
   - Create render object with computed styles
3. Build hierarchical structure

Nodes with `display:none` or not rendered (e.g., `<head>`) skipped.

## 4. Step-by-Step Execution

Given:
```html
<div>Hello</div>
<span style="display:none">Hidden</span>
<p>World</p>
```

Process:
1. DOM parsed
2. CSSOM parsed
3. Iterate DOM:
   - `<div>` visible → add to Render Tree
   - `<span>` hidden → skip
   - `<p>` visible → add
4. Attach styles to each node → finalize Render Tree

## 5. Syntax

Built automatically — no direct syntax.

## 6. Examples (Easy → Advanced)

### Easy
Any visible DOM node contributes to Render Tree.

### Medium
```css
.element { display: none; } /* excluded from Render Tree */
```

### Advanced
Dynamic toggles:
```javascript
el.style.display = 'block'; // becomes part of Render Tree
```

## 7. Visual Diagram (ASCII)

```
DOM + CSSOM → Render Tree

DOM Tree
┌──────────────┐
│ Body         │
├──────────────┤
│ DIV (visible)│
├──────────────┤
│ SPAN (hidden)│ ← Excluded
└──────────────┘

CSSOM provides styling rules.

Merged Result:
┌──────────────┐
│ Render Body  │
├──────────────┤
│ Render DIV   │ (styled)
└──────────────┘
```

## 8. Real-world Example

Angular component rendering respects display:none when conditionally shown.

## 9. Angular Use Case

*ngIf adds/removes elements affecting Render Tree presence.

## 10. Common Mistakes

❌ Assuming hidden elements still occupy space in Render Tree  
❌ Confusing visibility:hidden with display:none  

## 11. Edge Cases

1. **visibility:hidden still occupies space**
   ```css
   .invisible { visibility: hidden; } /* remains in Render Tree */
   ```

2. **display:none removes entirely**
   ```css
   .gone { display: none; } /* absent from Render Tree */
   ```

3. **CSS pseudo-elements create virtual nodes**

## 12. Performance Considerations

Minimize DOM mutations that affect Render Tree structure.

## 13. Time & Space Complexity

O(n) traversal of DOM where n = number of DOM nodes.

## 14. Interview Questions

1. Nodes excluded from Render Tree?
2. Difference between visibility and display?
3. Impact of modifying DOM on Render Tree?

## 15. Follow-up Questions

- "How does virtual scrolling leverage Render Tree?"

## 16. Production Best Practices

1. Hide unused elements properly
2. Understand CSS rendering implications
3. Avoid frequent structural DOM changes

## 🔍 Quick Recap
- Render Tree = visible DOM nodes + computed styles
- Skips display:none, head, scripts
- visibility:hidden stays but is invisible
- Basis for layout calculations

## 📝 Summary
The Render Tree optimizes visual representation by omitting non-displayed content. Combining DOM and CSSOM selectively ensures efficient rendering — core concept in browser optimization strategies.

## 17. Summary

Basis for layout calculations and rendering pipeline.

## 18. Revision Notes

- Visible subset of DOM
- Styled by CSSOM
- Excludes display:none
- Feeds into layout phase

## 19. Practice Questions

1. Identify excluded nodes in sample HTML.
2. Toggle visibility efficiently.
3. Debug missing Render Tree node.

## 20. References

- [MDN: Render Tree](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_guide#render_tree)
- Chromium design documents

### Next File
**009 - Reflow.md**
