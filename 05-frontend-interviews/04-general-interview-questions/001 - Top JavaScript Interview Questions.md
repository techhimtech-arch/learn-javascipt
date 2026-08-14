# Top JavaScript Interview Questions

## 1. Definition

A curated collection of commonly asked JavaScript interview questions spanning fundamentals, advanced concepts, and practical scenarios.

## 2. Why do we need it?

Prepare for technical interviews with structured question-answer repository covering all difficulty levels.

## 3. Internal Working

Organized by topic areas mirroring core JS concepts — each entry includes context, answer, and explanation.

## 4. Step-by-Step Execution

Approach:
1. Study fundamental mechanisms (scope, closure, this)
2. Practice implementing common patterns from scratch
3. Review common pitfalls and best practices

## 5. Syntax

Questions grouped thematically:
- Core Concepts
- Advanced Patterns
- Performance
- Browser APIs
- Debugging

## 6. Examples (Easy → Advanced)

### Easy
**Q: What is the difference between `==` and `===`?**
A: `===` checks both value and type (strict equality), while `==` coerces types before comparison.

### Medium
**Q: Explain event loop, microtasks, and macrotasks.**
A: Call stack executes synchronous code. After completion, microtask queue (promises) drains entirely before macrotask (setTimeout/IO) runs.

### Advanced
**Q: How does prototypal inheritance work under the hood?**
A: Objects have internal [[Prototype]] linking to other objects. Property lookups traverse up the prototype chain until found.

## 7. Visual Diagram (ASCII)

```
Interview Question Progression

Fundamentals ──► Advanced Concepts ──► Implementation ──► Edge Cases
             (Closures, Scope, This)  (Promises, Async)  (Memory, Perf)
```

## 8. Real-world Example

Preparing for FAANG-level frontend engineer interviews.

## 9. Angular Use Case

Angular-specific follow-ups around change detection, DI, reactive forms.

## 10. Common Mistakes

❌ Reciting memorized answers instead of explaining understanding
❌ Not asking clarifying questions about requirements

## 11. Edge Cases

1. **Ambiguous phrasing**
   - Example: "What is `this` inside arrow function?"
   - Answer must specify lexical binding context

2. **Multiple correct interpretations**
   - Depends whether asking theory vs practical application

## 12. Performance Considerations

Focus on root cause analysis rather than symptom fixes.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

Self-referential — see following sections for actual sample questions.

## 15. Follow-up Questions

- "Can you walk me through hoisting?"
- "When should I use let/const vs var?"

## 16. Production Best Practices

1. Study MDN documentation thoroughly
2. Understand engine internals (V8 optimizations)
3. Practice explaining concepts clearly and concisely
4. Be ready to write correct code on whiteboard

## 17. Summary

Comprehensive Q&A repository accelerating interview preparation.

## 18. Revision Notes

- Know fundamentals inside-out
- Understand implementation details
- Practice clear articulation
- Stay updated on latest specs

## 19. Practice Questions

Sample Questions List:

1. What is closure and how is it useful?
2. Explain prototypal inheritance.
3. Difference between let/const/var?
4. How does the event loop work?
5. Implement debounce function.
6. What is promise chaining?
7. Describe scope chain.
8. What triggers change detection in Angular?
9. Explain dependency injection.
10. What are Angular standalone components?

## 20. References

- [MDN Web Docs](https://developer.mozilla.org/)
- [You Don't Know JS Series](https://github.com/getify/You-Dont-Know-JS)

### Next File
**002 - Top Angular Interview Questions.md**
