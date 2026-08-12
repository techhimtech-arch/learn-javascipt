# Top Angular Interview Questions

## 1. Definition

Curated set of frequently asked Angular interview questions covering core concepts, architecture, performance tuning, and real-world usage.

## 2. Why do we need it?

Streamline interview prep focused on Angular-specific knowledge areas — components, change detection, DI, RxJS integration.

## 3. Internal Working

Organized by difficulty tiers:
- Junior level
- Mid/Senior level
- Principal/Lead level

Each with concise answers plus deeper architectural context.

## 4. Step-by-Step Execution

Study path:
1. Master component lifecycle and bindings
2. Understand change detection mechanics
3. Learn DI hierarchy and zone.js interaction
4. Apply performance optimizations

## 5. Syntax

N/A – conceptual knowledge base.

## 6. Examples (Easy → Advanced)

### Easy
**Q: What are Angular components made of?**
A: Three parts:
1. Template (view)
2. Class (logic/state)
3. Metadata (@Component decorator)

### Medium
**Q: Explain OnPush change detection strategy.**
A: Only checks when:
- @Input references change
- Events originate inside component
- Observables emit values (with async pipe)
Reduces unnecessary checks.

### Advanced
**Q: How to debug excessive change detection cycles?**
A: 
1. Enable prod mode (`enableProdMode()`)
2. Profile with Augury DevTools
3. Switch to OnPush strategy
4. Use trackBy with *ngFor

## 7. Visual Diagram (ASCII)

```
Angular Concepts Depth

Junior ──► Components & Templates
           DI Basics
           Reactive Forms Intro

Senior ──► Change Detection
           Zone.js Interactions
           Standalone Components
           Custom Renderers

Principal ──► Architecture Patterns
             Performance Profiling
             Server-Side Rendering (SSR)
             Micro Frontends
```

## 8. Real-world Example

Enterprise migration from AngularJS to modern Angular.

## 9. Angular Use Case

Preparation for mid-to-senior frontend roles requiring deep Angular knowledge.

## 10. Common Mistakes

❌ Memorizing without understanding internals
❌ Ignoring performance implications

## 11. Edge Cases

1. **Zone.js disabled apps**
2. **Manual change detection triggering**
3. **Custom renderers integration**

## 12. Performance Considerations

Knowledge directly translates to better-performing applications.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

Sample Question List:

1. Component lifecycle hooks order?
2. Explain Angular modules vs. components.
3. What is dependency injection?
4. Difference between providers and providedIn?
5. How does two-way binding work?
6. Route guards types and usage?
7. What is a resolver?
8. Angular change detection strategies?
9. Lazy loading implementation?
10. Standalone components benefits?

## 15. Follow-up Questions

- "How to detect memory leaks in Angular?"
- "Compare OnPush with default strategy."

## 16. Production Best Practices

1. Deep-dive official docs
2. Build real projects using concepts
3. Profile and optimize example apps
4. Understand underlying browser APIs

## 17. Summary

Angular expertise requires understanding both API surface and internal mechanics.

## 18. Revision Notes

- Know all lifecycle hook timings
- Master change detection internals
- Understand DI resolution paths
- Grasp reactive programming model

## 19. Practice Questions

1. Diagram component tree and module relationships.
2. Explain when to use ViewChild vs ContentChild.
3. Design scalable folder structure for large teams.

## 20. References

- [Angular Official Docs](https://angular.io/docs)
- [Angular Style Guide](https://angular.io/guide/styleguide)

### Next File
**003 - Top RxJS Interview Questions.md**
