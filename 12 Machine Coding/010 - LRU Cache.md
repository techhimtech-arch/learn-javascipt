# LRU Cache

## 1. Definition

**Least Recently Used (LRU) Cache** evicts least recently accessed entry when capacity exceeded — maintaining predictable memory footprint.

## 2. Why do we need it?

Balance between quick local access and bounded storage — commonly used in HTTP caches, databases, browser memory.

## 3. Internal Working

Typically implemented with doubly linked list + hash map:
1. Hash map provides O(1) key lookup
2. Doubly linked list tracks access recency
3. On access/move to front
4. On insert/evict tail if full

## 4. Step-by-Step Execution

Class-based implementation:
```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // Reinsert → marks MRU
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // Remove old position
    }
    if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}
```

Steps:
1. get: Move item to end (most recently used)
2. put: Insert/update at end
3. If size exceeds capacity → remove first (least recent)

## 5. Syntax

```javascript
const cache = new LRUCache(2);
cache.put(1, 'A'); // Cache: [(1,'A')]
cache.put(2, 'B'); // Cache: [(1,'A'), (2,'B')]
cache.get(1);      // Returns 'A', moves (1) to MRU: [(2,'B'), (1,'A')]
cache.put(3, 'C'); // Evicts (2), adds (3): [(1,'A'), (3,'C')]
cache.get(2);      // Returns -1 (evicted)
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const cache = new LRUCache(2);
cache.put(1, 1); // [[1,1]]
cache.put(2, 2); // [[1,1],[2,2]]
cache.get(1);    // returns 1, [[2,2],[1,1]]
cache.put(3, 3); // evicts key 2, [[1,1],[3,3]]
cache.get(2);    // -1
```

### Medium
```javascript
// Generic LRU cache for any value type
class GenericLRUCache<K, V> {
  private cache = new Map<K, V>();
  
  constructor(private readonly capacity: number) {}

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value); // Move to most recent
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) {
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }
}
```

### Advanced
```typescript
// Angular HTTP cache with LRU eviction
@Injectable({ providedIn: 'root' })
export class HttpCacheService {
  private cache = new GenericLRUCache<string, HttpResponse<any>>(100);
  
  get(url: string): HttpResponse<any> | undefined {
    return this.cache.get(url);
  }
  
  set(url: string, response: HttpResponse<any>): void {
    this.cache.set(url, response);
  }
}
```

## 7. Visual Diagram (ASCII)

```
LRU Cache Operations

Access Order (front = MRU, back = LRU):

Put 1 → [1]
Put 2 → [2, 1]
Get 1 → [1, 2] (1 moved to front)
Put 3 (full) → evict 2 → [3, 1]

Eviction always removes LRU element
```

## 8. Real-world Example

Browser HTTP cache implementations frequently use LRU strategies for resource caching.

## 9. Angular Use Case

Caching API responses, memoization with size limits, template/component caching.

## 10. Common Mistakes

❌ Not updating recency on access  
❌ Inefficient eviction strategies

## 11. Edge Cases

1. **Capacity = 1**
2. **Repeated get on same key**
3. **Mixed get/put sequences**

## 12. Performance Considerations

O(1) operations critical — Map preserves insertion order naturally.

## 13. Time & Space Complexity

Time: O(1) get/put  
Space: O(capacity)

## 14. Interview Questions

1. Implement LRU with O(1) get/put
2. Choice of data structures?
3. Thread safety considerations?

## 15. Follow-up Questions

- "How does browser HTTP cache implement LRU?"

## 16. Production Best Practices

1. Monitor cache hit/miss ratios
2. Tune capacity based on usage patterns
3. Consider weak references for ephemeral caching

## 17. Summary

LRU cache balances recency awareness with bounded memory footprint.

## 18. Revision Notes

- Get: move to most recent
- Put: insert/evict LRU if full
- Key insight: use Map preserving insertion order
- Maintain capacity invariant

## 19. Practice Questions

1. Implement basic LRU with Map.
2. Extend for custom eviction policy.
3. Use in simple memoization context.

## 20. References

- [LeetCode 146: LRU Cache](https://leetcode.com/problems/lru-cache/)
- [MDN: Map iteration order](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#description)

### Next File
**011 - Remove Duplicates.md**
