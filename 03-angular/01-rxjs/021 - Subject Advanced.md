# RxJS Subject Advanced

## 1. Definition

**Advanced Subjects** explore specialized Observable patterns — multicasting, replay behavior, and subscription control.

## 2. Why do we need it?

Share single Observable execution across multiple subscribers with varying subscription timing.

## 3. Internal Working

Subject types:
1. **Subject**: Multicast — late subscribers miss earlier values
2. **BehaviorSubject**: Stores latest emission — late subscribers receive last value
3. **ReplaySubject**: Buffers N (or time-windowed) emissions
4. **AsyncSubject**: Only emits final value to late subscribers

## 4. Step-by-Step Execution

```typescript
// BehaviorSubject example
const user$ = new BehaviorSubject<User | null>(null);

// Late subscriber receives current value
setTimeout(() => {
  user$.subscribe(current => console.log('Got user:', current)); // Receives stored value
}, 1000);

// AsyncSubject example
const finalResult = new AsyncSubject();
finalResult.next('intermediate');
finalResult.next('intermediate2');
finalResult.next('final value');
finalResult.complete(); // Only 'final value' emitted to subscribers

// ReplaySubject example
const buffered$ = new ReplaySubject(2); // Buffer last 2 values
buffered$.next('first');
buffered$.next('second');
buffered$.next('third');

buffered$.subscribe(val => console.log(val)); // Receives 'second', 'third'
```

## 5. Syntax

```typescript
// Subject - fire-and-forget broadcasting
const message$ = new Subject<string>();
message$.subscribe(console.log);
message$.next('Hello');

// BehaviorSubject - state holder
const config$ = new BehaviorSubject<Config>({ theme: 'light' });
config$.subscribe(cfg => applyConfig(cfg)); // Gets current immediately
config$.next({ theme: 'dark' });

// ReplaySubject - event history
const events$ = new ReplaySubject<number>(3); // Buffer 3 values
events$.next(1);
events$.next(2);
events$.next(3);
events$.next(4);
events$.subscribe(console.log); // 2, 3, 4

// AsyncSubject - final result only
const computation$ = new AsyncSubject<number>();
computation$.next(50);
computation$.next(75);
computation$.next(100);
computation$.complete();
computation$.subscribe(result => console.log(result)); // 100
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Shared data service with BehaviorSubject
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  public theme$ = this.themeSubject.asObservable();

  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.themeSubject.next(newTheme);
  }
}
```

### Medium
```typescript
// Event bus with Subject
@Injectable({ providedIn: 'root' })
export class EventBusService {
  private bus = new Subject<AppEvent>();
  public events$ = this.bus.asObservable();

  emit(event: AppEvent): void {
    this.bus.next(event);
  }

  ofType<T extends AppEvent>(type: string): Observable<T> {
    return this.events$.pipe(
      filter(e => e.type === type),
      map(e => e as T)
    );
  }
}

interface AppEvent {
  type: string;
  payload?: any;
}
```

### Advanced
```typescript
// Race condition handler with AsyncSubject
@Injectable({ providedIn: 'root' })
export class ApiCoordinatorService {
  private requests = new Map<string, AsyncSubject<any>>();

  fetchOrShare<T>(key: string, fetcher: () => Observable<T>): Observable<T> {
    if (!this.requests.has(key)) {
      const subject = new AsyncSubject<T>();
      this.requests.set(key, subject);

      fetcher().pipe(
        tap(result => subject.next(result)),
        tap({ complete: () => subject.complete() }),
        catchError(error => {
          subject.error(error);
          this.requests.delete(key);
          return throwError(() => error);
        })
      ).subscribe();
    }

    return this.requests.get(key)!.asObservable();
  }
}
```

## 7. Best Practices

1. Use asObservable() to prevent external next() calls
2. Choose subject type matching use case
3. Handle completion/errors properly
4. Consider memory implications of buffered subjects

## 8. Interview Questions

1. Subject vs Observable difference?
2. BehaviorSubject late subscriber behavior?
3. ReplaySubject vs AsyncSubject when to use?

## 9. Summary

Subjects enable sharing Observable executions across subscribers with controlled history semantics.

## 10. References

- [RxJS Subjects](https://rxjs.dev/guide/subject)

---

**FINAL COUNT:**
