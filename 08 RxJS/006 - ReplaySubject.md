# ReplaySubject

## 1. Definition

A **ReplaySubject** is a Subject variant that **replays a specified number of previous emissions** to new subscribers.

## 2. Why do we need it?

Ensure late subscribers get historical context – useful for streams where recent history matters.

## 3. Internal Working

Maintains buffer of N recent values or window of time-based entries.
Upon subscription, replays those values before continuing live stream.

## 4. Step-by-Step Execution

Example:
```javascript
const replay$ = new ReplaySubject<number>(2); // Keep last 2 values

replay$.next(1);
replay$.next(2);
replay$.next(3);

replay$.subscribe(val => console.log(val)); // 2, 3 (then future emissions)
```

Steps:
1. Create with buffer size 2
2. Emit values 1→2→3
3. New subscriber gets last 2 values (2,3)
4. Future values continue to flow

## 5. Syntax

```javascript
new ReplaySubject<T>(bufferSize, timeWindowMS?)
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const subject = new ReplaySubject(1); // Like BehaviorSubject but without initial
subject.next("first");
subject.subscribe(console.log); // "first"
```

### Medium
```javascript
const logger$ = new ReplaySubject<string>(10); // Buffer last 10 logs
logger$.next("Log entry 1");
// ... later
logger$.subscribe(log => console.log("Retrieved:", log));
```

### Advanced
```typescript
@Injectable({ providedIn: 'root' })
export class RecentRequestsService {
  private recentRequests$ = new ReplaySubject<RequestLog>(5); // Last 5 requests

  logRequest(req: RequestLog) {
    this.recentRequests$.next(req);
  }

  getRecent(): Observable<RequestLog[]> {
    return this.recentRequests$.pipe(
      toArray(),
      take(1)
    );
  }
}
```

## 7. Visual Diagram (ASCII)

```
ReplaySubject Buffering

Emitted Values:
[1][2][3][4][5]

Buffer Size = 2:
Stored → [4][5]

New Subscriber Receives:
[4][5] then continues live
```

## 8. Real-world Example

Caching recent API responses:
```typescript
const cachedResponse$ = new ReplaySubject(1);
http.get('/api/data').subscribe(res => cachedResponse$.next(res));
// Later subscriptions get cached response
```

## 9. Angular Use Case

Caching last known values, request/response logging.

## 10. Common Mistakes

❌ Large buffers consuming unnecessary memory  
❌ Confusing with BehaviorSubject

## 11. Edge Cases

1. **Time-based window**
   ```javascript
   new ReplaySubject(100, 5000); // Last 100 items OR past 5 seconds
   ```

2. **Empty buffer**
   ```javascript
   subject.subscribe(); // Nothing until next emit
   ```

## 12. Performance Considerations

Memory grows linearly with buffer size — tune accordingly.

## 13. Time & Space Complexity

Space: O(bufferSize)
Time: O(bufferSize + live emissions)

## 14. Interview Questions

1. ReplaySubject vs BehaviorSubject?
2. Configure buffer/time settings?
3. Memory implications?

## 15. Follow-up Questions

- "When to prefer replay over cache operators?"

## 16. Production Best Practices

1. Limit buffer size carefully
2. Clear buffers when appropriate
3. Use time windows for temporal relevance

## 17. Summary

History-preserving observable ensuring context delivery to new consumers.

## 18. Revision Notes

- Buffers recent values
- Configurable size/time window
- No initial value requirement
- Can accumulate memory if unbounded

## 19. Practice Questions

1. Replay last 3 form values.
2. Log last 10 user actions.
3. Cache recent search queries.

## 20. References

- [RxJS: ReplaySubject](https://rxjs.dev/api/index/class/ReplaySubject)

### Next File
**007 - AsyncSubject.md**
