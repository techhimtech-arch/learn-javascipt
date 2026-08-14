# Subjects

## 1. Definition

**Subjects** are special Observable types acting as both Observable AND Observer — enabling multicasting (multiple subscribers share single execution).

## 2. Why do we need it?

Broadcast values efficiently to many consumers without duplicate processing — unlike cold Observables.

## 3. Internal Working

1. Acts as proxy between source and observers
2. Maintains internal subscriber list
3. New values forwarded to all registered observers
4. Variants differ in emission/buffering behavior

## 4. Step-by-Step Execution

Example:
```typescript
const subject = new Subject<number>();

const sub1 = subject.subscribe(val => console.log('Sub1:', val));
const sub2 = subject.subscribe(val => console.log('Sub2:', val));

subject.next(42); // Both receive value
subject.complete();
```

Steps:
1. Create Subject instance
2. Register subscribers
3. Emit values via `.next()`
4. Each subscriber notified
5. Cleanup via unsubscribe or complete

## 5. Syntax

```typescript
const subject = new Subject<boolean>();
const behaviorSubj = new BehaviorSubject<boolean>(false);
const replaySubj = new ReplaySubject<string>(2);
const asyncSubj = new AsyncSubject<number>();
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
const name$ = new BehaviorSubject<string>('Guest');
console.log(name$.getValue()); // 'Guest'
name$.next('Alice');
console.log(name$.getValue()); // 'Alice'
```

### Medium
```typescript
// Shared HTTP cache
@Injectable()
export class UserService {
  private cache = new ReplaySubject<User>(1);
  private loaded = false;

  getUser(): Observable<User> {
    if (!this.loaded) {
      this.http.get<User>('/api/user').pipe(
        tap(res => this.cache.next(res)),
        shareReplay(1)
      ).subscribe();
    }
    return this.cache.asObservable();
  }
}
```

### Advanced
```typescript
// Custom Subject wrapper with buffering
class BufferedSubject<T> extends Subject<T> {
  private buffer: T[] = [];
  private bufferSize: number;

  constructor(bufferSize: number = 10) {
    super();
    this.bufferSize = bufferSize;
  }

  next(value: T): void {
    this.buffer.push(value);
    if (this.buffer.length > this.bufferSize) {
      this.buffer.shift();
    }
    super.next(value);
  }

  getBuffer(): T[] {
    return [...this.buffer];
  }
}
```

## 7. Visual Diagram (ASCII)

```
Subject Broadcasting Model

       Source ──► Subject
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    Observer A  Observer B  Observer C
```

## 8. Real-world Example

State management in Angular services without NgRx.

## 9. Angular Use Case

Sharing component state, service-level caching, event buses.

## 10. Common Mistakes

❌ Calling .next() from outside expected flow
❌ Forgetting to complete/cleanup

## 11. Edge Cases

1. **Multiple subscription timing**
   ```typescript
   // BehaviorSubjects deliver current value immediately
   const bs = new BehaviorSubject('init');
   bs.subscribe(v => console.log(v)); // logs 'init'
   ```

2. **Error handling differences**
3. **Memory leaks in long-lived subjects**

## 12. Performance Considerations

Subjects hold subscriber references — always unsubscribe.

## 13. Time & Space Complexity

Time: O(n) notify for n subscribers
Space: O(bufferSize + subscribers)

## 14. Interview Questions

1. Subject vs Observable difference?
2. BehaviorSubject vs ReplaySubject vs AsyncSubject?
3. When to use share() vs subject?

## 15. Follow-up Questions

- "How to prevent late subscription issues?"

## 16. Production Best Practices

1. Complete subjects when no longer needed
2. Use takeUntil patterns for cleanup
3. Prefer built-in operators over custom subjects
4. Document subject contracts clearly

## 17. Summary

Subjects enable efficient multicast communication — foundational for reactive architectures.

## 18. Revision Notes

- Observable + Observer duality
- Four variants handle buffering differently
- Complete/unsubscribe to prevent leaks
- Multicast vs unicast distinction

## 19. Practice Questions

1. Build shared counter service.
2. Implement chat message subject.
3. Compare subject variant behaviors.

## 20. References

- [RxJS Subjects](https://rxjs.dev/guide/subject)

### Next File
**017 - Error Handling.md**
