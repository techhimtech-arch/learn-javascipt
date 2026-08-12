# Subject

## 1. Definition

A **Subject** is a special type of Observable that allows values to be multicasted to many Observers.

Unlike regular Observables (unicast), Subjects share a single execution among all subscribers.

## 2. Why do we need it?

Share producer logic, decouple emitters from consumers, bridge imperative and reactive code.

## 3. Internal Working

Acts as both:
- Observer (can receive values)
- Observable (subscribers listen)

Values pushed via `.next()` propagate to all current subscribers.

## 4. Step-by-Step Execution

Example:
```javascript
const subject$ = new Subject<string>();

subject$.subscribe(val => console.log("A:", val));
subject$.subscribe(val => console.log("B:", val));

subject$.next("Hello"); // Both A and B receive "Hello"
```

Steps:
1. Create Subject
2. Two subscribers attach
3. Call `.next("Hello")`
4. All active subscribers receive value

## 5. Syntax

```javascript
const subject = new Subject<T>();
subject.subscribe(observerA);
subject.subscribe(observerB);
subject.next(value); // Both receive
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const bus$ = new Subject<number>();
bus$.subscribe(n => console.log("Got", n));
bus$.next(42);
```

### Medium
```typescript
@Injectable({ providedIn: 'root' })
export class EventBusService {
  private eventBus = new Subject<AppEvent>();
  events$ = this.eventBus.asObservable();

  emit(event: AppEvent) {
  }
}
```

### Advanced
```typescript
// State sharing between unrelated components
const globalStore$ = new BehaviorSubject<State>(initialState);
// Anywhere in app:
globalStore$.next(newState);
```

## 7. Visual Diagram (ASCII)

```
Subject as Broadcaster

subject$.next(value)
    ↓
All Subscribers Receive
┌────┴────┐
│ Observer A│
│ Observer B│
│ Observer C│
└─────────┘
```

## 8. Real-world Example

Angular service event broadcasting:
```typescript
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = new Subject<Notification>();
  
  get notifications$(): Observable<Notification> {
    return this.notifications.asObservable();
  }
  
  show(message: string) {
    this.notifications.next({ message, timestamp: Date.now() });
  }
}
```

## 9. Angular Use Case

State management, cross-component messaging, event buses.

## 10. Common Mistakes

❌ Sharing subject directly (breaks encapsulation)  
❌ Missing completion handling

## 11. Edge Cases

1. **Late subscribers miss values**
   ```javascript
   const subj = new Subject<number>();
   subj.next(1); // Missed by any future subscriber
   ```

2. **Converting to Observable prevents external pushing**
   ```javascript
   return subject.asObservable(); // Read-only to consumers
   ```

3. **Subjects don't replay past values** (unlike `.ReplaySubject`)

## 12. Performance Considerations

Subjects introduce shared overhead — fine for moderate traffic.

## 13. Time & Space Complexity

O(n) emission to n subscribers.

## 14. Interview Questions

1. Subject vs Observable difference?
2. Multicast behavior explanation?
3. Converting Subject to Observable?

## 15. Follow-up Questions

- "When should you not expose `.next()`?"

## 16. Production Best Practices

1. Wrap in `asObservable()` when exposing publicly
2. Name subjects descriptively (with `$` suffix)
3. Handle subscriptions carefully in long-lived scenarios

## 17. Summary

Multicaster connecting producers and consumers efficiently.

## 18. Revision Notes

- Both observer & observable
- Multicast sharing
- .next pushes to all
- asObservable hides write capability

## 19. Practice Questions

1. Build event bus with Subject.
2. Relay values from timer to subject.
3. Prevent unauthorized next calls.

## 20. References

- [RxJS: Subject](https://rxjs.dev/guide/subject)

### Next File
**005 - BehaviorSubject.md**
