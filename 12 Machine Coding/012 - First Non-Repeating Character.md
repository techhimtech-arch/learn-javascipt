# First Non-Repeating Character

## 1. Definition

**First Non-Repeating Character** finds the lowest-index character in a string that occurs exactly once.

## 2. Why do we need it?

Used in string analysis algorithms, parsing tasks, competitive coding challenges.

## 3. Internal Working

Typically two-pass approach:
1. Count occurrences of each character (Map/object)
2. Iterate again returning index of first count==1 character

Alternative single-pass uses queue + map.

## 4. Step-by-Step Execution

Two-pass implementation:
```javascript
function firstNonRepeatingChar(str) {
  const counts = {};
  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }
  
  for (let i = 0; i < str.length; i++) {
    if (counts[str[i]] === 1) {
      return i;
    }
  }
  
  return -1;
}
```

Steps:
1. Build frequency map
2. Walk string again looking for single occurrence
3. Return index or -1 if none found

## 5. Syntax

```javascript
firstNonRepeatingChar("abac"); // 1 ('b')
firstNonRepeatingChar("aabbcc"); // -1
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
console.log(firstNonRepeatingChar("abac")); // 1
console.log(firstNonRepeatingChar("loveleetcode")); // 2
```

### Medium
```javascript
// Case insensitive
function firstUniqueCaseInsensitive(str) {
  const normalized = str.toLowerCase();
  const counts = {};
  for (const ch of normalized) counts[ch] = (counts[ch]||0)+1;
  return str.split('').findIndex(c => counts[c.toLowerCase()] === 1);
}
```

### Advanced
```javascript
// Streaming version
class CharacterStream {
  constructor() {
    this.queue = [];
    this.counts = {};
  }
  
  add(char) {
    this.counts[char] = (this.counts[char] || 0) + 1;
    if (this.counts[char] === 1) this.queue.push(char);
    else this.queue = this.queue.filter(c => c !== char);
    return this.get();
  }
  
  get() {
    return this.queue[0] || null;
  }
}
```

## 7. Visual Diagram (ASCII)

```
Two-Pass Algorithm

String:  a b a c
Counts: {a:2, b:1, c:1}
Index:   0 1 2 3
Check:   a(2) → skip, b(1) → return index 1
Result: 1 (position of 'b')
```

## 8. Real-world Example

Angular directive detecting first non-repeating keypress sequence.

## 9. Angular Use Case

Text analysis components, input validation heuristics.

## 10. Common Mistakes

❌ Forgetting case sensitivity  
❌ Missing index return vs character

## 11. Edge Cases

1. **All repeating characters**
   ```javascript
   firstNonRepeatingChar("aabb") // -1
   ```

2. **Single character**
   ```javascript
   firstNonRepeatingChar("a") // 0
   ```

3. **Empty string**
4. **Unicode characters**

## 12. Performance Considerations

Single-pass queue solution O(n) with constant space.

## 13. Time & Space Complexity

Two-pass: O(n) time, O(k) space (k = alphabet size)
Single-pass: O(n) time, O(k) space

## 14. Interview Questions

1. Optimize to single pass?
2. Handle Unicode properly?
3. Streaming solution variation?

## 15. Follow-up Questions

- "How about k-th non-repeating?"

## 16. Production Best Practices

1. Cache character counts for repeated queries
2. Validate inputs early
3. Consider locale-specific comparisons

## 17. Summary

Classic frequency-counting problem with elegant tradeoffs.

## 18. Revision Notes

- Two passes: count then find
- Single pass: queue+map approach
- Watch case sensitivity
- Return index not character

## 19. Practice Questions

1. Find first unique char efficiently.
2. Convert to streaming version.
3. Extend to k-th unique character.

## 20. References

- [LeetCode 387: First Unique Character](https://leetcode.com/problems/first-unique-character-in-a-string/)

### Next File
**013 - Retry Logic.md**
