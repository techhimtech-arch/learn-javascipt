# Top RxJS Interview Questions

## 1. Definition

Collection of frequently asked RxJS technical interview questions covering Observables, Operators, Subjects, Error Handling, and advanced patterns.

## 2. Why do we need it?

RxJS is a core part of modern Angular development — understanding it is crucial for frontend engineering roles.

## 3. Internal Working

Organized by:
- Observable creation/subscription lifecycle
- Subject variants and multicasting
- Operator selection rationale
- Error handling strategies
- Testing approaches

## 4. Step-by-Step Execution

1. Master observable creation/subscription lifecycle
2. Understand subject behaviors
3. Learn operator selection rationale
4. Practice common patterns (search, polling, caching)

## 5. Syntax

N/A – conceptual reference guide.

## 6. Examples (Easy → Advanced)

### Easy
**Q: Difference between Observable and Promise?**
A: Observables are:
- Lazy (don't start until subscribed)
- Can emit multiple values
- Cancelable via unsubscribe
- Richer transformation operators

Promises are:
- Eager
- Emit only once
- Non-cancelable
- Simpler chaining

### Medium
**Q: When to use switchMap vs mergeMap?**
A: Use switchMap for user-driven actions (search) where only latest matters.
Use mergeMap for independent parallel operations.

### Advanced
**Q: Explain shareReplay and when to use it?**
A: Multicasts last N emissions to new subscribers.
Ideal for caching HTTP responses shared across multiple components without duplicate network calls.

## 7. Visual Diagram (ASCII)

```
RxJS Concept Mapping

Observables ──► Operators ──► Subscriptions
                    │
               Subjects ──► Multicasting
                    │
             Error Handling
```

## 8. Real-world Example

Implementing resilient autocomplete search.

## 9. Angular Use Case

Angular HTTP, reactive forms, router events all return observables.

## 10. Common Mistakes

❌ Nested subscriptions (use switchMap instead)
❌ Not unsubscribing leading to memory leaks

## 11. Edge Cases

1. **Async pipes managing subscriptions**
2. **Error propagation in complex pipelines**

## 12. Performance Considerations

Understanding operator costs prevents unnecessary computations.

## 13. Time & Space Complexity

N/A.

## 14. Interview Questions

Sample Questions:

1. What is an Observable?
2. Difference between Subject/BehaviorSubject/ReplaySubject?
3. How does switchMap cancel previous requests?
4. Explain debounceTime usage.
5. What does shareReplay do?
6. How to prevent memory leaks in RxJS?
7. Difference between takeUntil and switchMap?
8. What is multicasting?
9. How does catchError work?
10. Explain combineLatest and forkJoin.

## 15. Follow-up Questions

- "How to test observables?"

## 16. Production Best Practices

1. Study marble testing techniques
2. Understand backpressure handling
3. Know common anti-patterns
4. Practice operator selection rationale

## 17. Summary

RxJS fluency essential for modern Angular development.

## 18. Revision Notes

- Observable creation/subscription lifecycle
- Subject variants behaviors
- Operator selection guidelines
- Memory leak prevention patterns

## 19. Practice Questions

1. Implement autocomplete with proper cancellation.
2. Cache API responses with shareReplay.
3. Build polling mechanism with retry logic.

## 20. References

- [RxJS Documentation](https://rxjs.dev/)
- [Learn RxJS](https://www.learnrxjs.io/)

### Next File
**004 - Top TypeScript Interview Questions.md**
