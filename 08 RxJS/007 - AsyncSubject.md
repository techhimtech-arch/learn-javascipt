# AsyncSubject

## 1. Definition

An **AsyncSubject** is a Subject variant that emits only the **last value** to subscribers — but ONLY after the source completes.

## 2. Why do we need it?

Capture final result of long-running process — ensure subscribers get result once it’s ready.

## 3. Internal Working

Stores most recent value internally.
Only emits on completion — previous intermediate values ignored.

## 4. Step-by-Step Execution

Example:
```javascript
const async$ = new AsyncSubject<number>();

async$.subscribe(val => console.log("A:", val));
async$.next(1);
async$.next(2);
async$.next(3); // Still nothing emitted

async$.complete(); // Now emits: A: 3

async$.subscribe(val => console.log("B:", val)); // B: 3 (immediately)
```

Steps:
1. Subscribe A
2. Push values 1→2→3 (A gets nothing yet)
3. Complete → A receives final 3
4. New subscriber B → immediately gets 3

## 5. Syntax

```javascript
const asyncSubject = new AsyncSubject();
asyncSubject.next(value);
asyncSubject.complete();
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const last$ = new AsyncSubject<string>();
last$.next("intermediate");
last$.next("final");
last$.subscribe(console.log); // Never!
last$.complete(); // Logs "final"
```

### Medium
```typescript
@Injectable()
export class FinalResultService {
  private resultSubject = new AsyncSubject<string>();

  computeFinalResult(input$: Observable<number>): Observable<string> {
    return input$.pipe(
      reduce((acc, v) => acc + v, 0),
      tap(sum => this.resultSubject.next(String(sum))),
      tap(() => this.resultSubject.complete()),
      map(sum => this.resultSubject.asObservable())
    );
  }
}
```

### Advanced
```typescript
// HTTP-like behavior - emit once at end
const requestSimulate$ = new AsyncSubject<Response>();
setTimeout(() => {
  requestSimulate$.next({ status: 200, data: "Done" });
  requestSimulate$.complete();
}, 2000);

// Subscriber waits 2 seconds
requestSimulate$.subscribe(res => console.log(res)); // Logs after 2s
```

## 7. Visual Diagram (ASCII)

```
AsyncSubject Behavior

Emissions:
next(1) ─► ignored
next(2) ─► ignored
next(3) ─► stored

complete() ─► emit last value (3) to ALL subscribers
```

## 8. Real-world Example

Angular HTTP-like behavior simulation:
```typescript
const mockHttp = new AsyncSubject<any>();
setTimeout(() => {
  mockHttp.next({ data: 'response' });
  mockHttp.complete();
}, 1000);
```

## 9. Angular Use Case

Modeling single-shot async operations (like HTTP requests).

## 10. Common Mistakes

❌ Forgetting to complete → subscribers never notified  
❌ Expecting live updates

## 11. Edge Cases

1. **No completion → no emission**
2. **Late subscribers still get final value**
   ```javascript
   async$.subscribe(); // Receives last value immediately if completed
   ```

## 12. Performance Considerations

Low overhead – ideal for final-value scenarios.

## 13. Time & Space Complexity

O(1) storage of last value.

## 14. Interview Questions

1. AsyncSubject vs other Subjects?
2. What triggers emission?
3. Use cases for this pattern?

## 15. Follow-up Questions

- "How does shareReplay differ from AsyncSubject?"

## 16. Production Best Practices

1. Always complete the subject after final value
2. Combine with timeout operators for reliability
3. Document single-emission semantics clearly

## 17. Summary

Emits final value only upon completion – perfect for one-time results.

## 18. Revision Notes

- Stores latest value only
- Emits only on complete()
- Late subscribers get final value
- Useful for single-result streams

## 19. Practice Questions

1. Simulate HTTP response with AsyncSubject.
2. Capture final computation result.
3. Convert promise-like behavior to observable.

## 20. References

- [RxJS: AsyncSubject](https://rxjs.dev/api/index/class/AsyncSubject)

### Next File
**008 - Operators.md**
