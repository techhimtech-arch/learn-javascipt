# BehaviorSubject

## 1. Definition

**BehaviorSubject** is a type of Subject that requires an initial value and emits the current value to new subscribers immediately upon subscription.

## 2. Why do we need it?

Maintain and react to current state — any time a new consumer subscribes, they instantly get the latest known value.

## 3. Internal Working

Stores last emitted value internally.
New subscribers automatically receive the most recent emission before any future values.

## 4. Step-by-Step Execution

Example:
```javascript
const behavior$ = new BehaviorSubject<number>(0);

behavior$.subscribe(val => console.log("A:", val)); // A: 0
behavior$.next(1);
behavior$.subscribe(val => console.log("B:", val)); // B: 1 (immediately), then same updates
behavior$.next(2); // A: 2, B: 2
```

Steps:
1. Initialize with value 0
2. Subscriber A connects → gets initial 0
3. Push 1 → A gets 1
4. Subscriber B connects → gets latest 1 immediately
5. Push 2 → both get update

## 5. Syntax

```javascript
const bs = new BehaviorSubject(initialValue);
bs.getValue(); // Synchronously retrieve current value
bs.subscribe(observer);
bs.next(newValue);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const count$ = new BehaviorSubject(0);
count$.subscribe(c => console.log(c)); // 0
count$.next(5);
count$.getValue(); // 5
```

### Medium
```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<'light' | 'dark'>("light");
  theme$ = this.themeSubject.asObservable();

  toggle(): void {
    const next = this.themeSubject.value === "light" ? "dark" : "light";
    this.themeSubject.next(next);
  }
}
```

### Advanced
```typescript
// Reactive form control value proxy
class FormControlAdapter {
  private valueSubject = new BehaviorSubject<any>(null);
  readonly value$ = this.valueSubject.asObservable();

  update(value: any) {
    if (value !== this.valueSubject.value) {
      this.valueSubject.next(value);
    }
  }
}
```

## 7. Visual Diagram (ASCII)

```
BehaviorSubject Flow

Initial Value ──► Stored Internally

New Subscriber → Gets Latest Value Immediately
                  ↓
                Future Emissions → All Subscribers
```

## 8. Real-world Example

Angular component state synchronization:
```typescript
export class CounterComponent {
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  increment() {
    this.countSubject.next(this.countSubject.value + 1);
  }
}
```

## 9. Angular Use Case

Shared component state, form value proxies, theme toggles.

## 10. Common Mistakes

❌ Using `.value` instead of subscribe  
❌ Missing initial value argument

## 11. Edge Cases

1. ** getValue() doesn't notify**
   ```javascript
   behavior$.getValue(); // Returns current, does not register subscriber
   ```

2. **Completed subjects throw on .next()**
   ```javascript
   behavior$.complete();
   behavior$.next(5); // Error!
   ```

## 12. Performance Considerations

Minimal overhead – great for low-frequency state updates.

## 13. Time & Space Complexity

O(1) emissions/lookups.

## 14. Interview Questions

1. BehaviorSubject vs Subject?
2. How to get current value synchronously?
3. What is initial value requirement?

## 15. Follow-up Questions

- "How does Angular Forms use BehaviorSubjects?"

## 16. Production Best Practices

1. Always initialize with meaningful default
2. Expose read-only (`asObservable`) externally
3. Handle completion carefully

## 17. Summary

Stateful observable keeping track of latest emission for latecomers.

## 18. Revision Notes

- Initial value required
- Latest value stored
- getValue() sync read
- asObservable() hides writes

## 19. Practice Questions

1. Build theme toggler service.
2. Track selection state reactively.
3. Implement cached value store.

## 20. References

- [RxJS: BehaviorSubject](https://rxjs.dev/api/index/class/BehaviorSubject)

### Next File
**006 - ReplaySubject.md**
