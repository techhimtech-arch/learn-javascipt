# mergeMap switchMap

## 1. Definition

Two flattening operators for handling higher-order observables (observables emitting observables):
- **mergeMap**: Maps to inner observable and merges all concurrent emissions
- **switchMap**: Same but cancels previous inner observable when new one starts

## 2. Why do we need it?

Handle async operations (HTTP, timers) triggered by stream emissions — e.g., user typing triggering API searches.

## 3. Internal Working

- mergeMap: subscribes to all inner observables simultaneously, emits results as they arrive
- switchMap: subscribes to newest inner observable, unsubscribes from previous immediately

## 4. Step-by-Step Execution

Example scenario:
```javascript
// User types "a", "ab", "abc" rapidly
type$ = fromEvent(input, 'input');

// With mergeMap: all 3 API calls active, results interleave
type$.pipe(mergeMap(value => fetch(`/search?q=${value}`)));

// With switchMap: only "abc" API call active, others canceled
type$.pipe(switchMap(value => fetch(`/search?q=${value}`)));
```

Steps for switchMap:
1. Value "a" → start API call A
2. Value "ab" → cancel A, start B
3. Value "abc" → cancel B, start C
4. Only C's result emitted

Steps for mergeMap:
1. Value "a" → start API call A
2. Value "ab" → keep A active, start B
3. Value "abc" → keep A & B active, start C
4. Results from A, B, C interleave as they resolve

## 5. Syntax

```javascript
// mergeMap
source$.pipe(mergeMap(innerFn, concurrency?))

// switchMap
source$.pipe(switchMap(innerFn))
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
// mergeMap example
of('hello', 'world').pipe(
  mergeMap(word => of(word.toUpperCase()))
).subscribe(console.log); // HELLO, WORLD

// switchMap example
of('hello', 'world').pipe(
  switchMap(word => of(word.toUpperCase()))
).subscribe(console.log); // HELLO, WORLD (same here, single emissions)
```

### Medium
```typescript
// Autocomplete with cancellation
this.searchTerm$ = this.input.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => term ? this.api.search(term) : of([]))
);

// Parallel requests merged
this.batchRequests$ = this.userIds$.pipe(
  mergeMap(id => this.api.loadUser(id), 3) // max 3 concurrent
);
```

### Advanced
```typescript
// Route-based data loading with cancellation
this.route.data.pipe(
  switchMap(data => 
    forkJoin([
      this.api.loadUserDetails(data.userId),
      this.api.loadUserPosts(data.userId)
    ])
  )
).subscribe(([user, posts]) => {
  this.user = user;
  this.posts = posts;
});

// Concurrent requests with controlled parallelism
this.fileList$.pipe(
  mergeMap(file => this.api.processFile(file), 5), // limit to 5 concurrent
  bufferTime(1000),
  filter(batch => batch.length > 0),
  concatMap(batch => this.api.bulkProcess(batch))
).subscribe(results => this.handleBatchResults(results));
```

## 7. Visual Diagram (ASCII)

```
switchMap Behavior (cancel previous):

Stream: A ──────── B ──────── C ──▶
                ┣━━━▶ API-A             (canceled when B arrives)
                     ┣━━━▶ API-B       (canceled when C arrives)
                          ┣━━━▶ API-C ✓ (only this completes)

mergeMap Behavior (keep all):

Stream: A ──────── B ──────── C ──▶
                ┣━━━▶ API-A ✓
                     ┣━━━▶ API-B ✓
                          ┣━━━▶ API-C ✓
All three complete
```

## 8. Real-world Example

Angular route resolver cancelling previous navigation:
```typescript
@Injectable()
export class UserProfileResolver implements Resolve<User> {
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userId = route.params['id'];
    return this.route.paramMap.pipe(
      switchMap(params => this.userService.get(+params.get('id')!))
    );
  }
}
```

## 9. Angular Use Case

Essential for:
- Search/autocomplete fields
- Route change data loading
- Form-dependent API calls

## 10. Common Mistakes

❌ Using mergeMap for search inputs (race conditions)
❌ Forgetting concurrency limits with mergeMap
❌ Using switchMap for critical long-running operations

## 11. Edge Cases

1. **mergeMap concurrency limiting**
   ```javascript
   source$.pipe(mergeMap(project, 2)) // max 2 concurrent
   ```

2. **switchMap with no emissions**
   ```javascript
   of('test').pipe(
     switchMap(() => EMPTY) // switches immediately, emits nothing
   )
   ```

3. **mergeMap preserves order**
   ```javascript
   of(1,2).pipe(mergeMap(n => timer(n*100).pipe(mapTo(n))))
   // Output: 1, 2 (not 2, 1)
   ```

## 12. Performance Considerations

- switchMap: cancels old requests → less network load
- mergeMap: parallel requests → faster but more resource intensive
- Always unsubscribe appropriately in Angular components

## 13. Time & Space Complexity

Both O(1) setup per emission. mergeMap may hold multiple inner subscriptions simultaneously.

## 14. Interview Questions

1. When to use switchMap over mergeMap?
2. How does switchMap handle cancellations?
3. Concurrency parameter in mergeMap?

## 15. Follow-up Questions

- "Can you implement search cancellation with setTimeout?"
- "What about exhaustMap?"

## 16. Production Best Practices

1. Use switchMap for user-triggered async operations
2. Use mergeMap for independent parallel operations
3. Limit mergeMap concurrency when needed
4. Handle edge case where inner observable errors
5. Never forget cleanup subscriptions in Angular

## 17. Summary

Choose based on concurrency needs: mergeMap=parallel, switchMap=cancellation-preferring.

## 18. Revision Notes

- mergeMap: all concurrent, preserves order
- switchMap: cancel previous, only latest matters
- Both useful for flattening mapped observables
- Common in autocomplete/route/data scenarios

## 19. Practice Questions

1. Build autocomplete with switchMap cancellation.
2. Load parallel user posts with mergeMap.
3. Handle route changes with proper cleanup.

## 20. References

- [RxJS: mergeMap](https://rxjs.dev/api/operators/mergeMap)
- [RxJS: switchMap](https://rxjs.dev/api/operators/switchMap)

### Next File
**011 - concatMap exhaustMap.md**
