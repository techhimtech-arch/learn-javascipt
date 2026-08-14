# groupBy

## 1. Definition

**groupBy** partitions an array of objects into groups based on shared property values — producing an object/map where keys correspond to grouping criteria.

## 2. Why do we need it?

Organize heterogeneous collections for aggregated processing/reporting.

## 3. Internal Working

Iterate once through array accumulating grouped buckets indexed by key extractor function:
1. Compute group key from each element
2. Initialize bucket if missing
3. Push element to corresponding bucket

## 4. Step-by-Step Execution

Implementation:
```javascript
function groupBy(array, keyFn) {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    (groups[key] ||= []).push(item);
    return groups;
  }, {});
}
```

Steps:
1. Reduce array to accumulator object
2. Extract key via callback
3. Create bucket if needed
4. Append item to group

## 5. Syntax

```javascript
Object.entries(groupBy(items, obj => obj.category));
// or with lodash
_.groupBy(users, user => user.role);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' }
];

groupBy(fruits, fruit => fruit.color);
// { red: [apple], yellow: [banana] }
```

### Medium
```javascript
const orders = [
  { id: 1, status: 'pending' },
  { id: 2, status: 'completed' },
  { id: 3, status: 'pending' }
];

groupBy(orders, order => order.status);
// { pending: [order1, order3], completed: [order2] }
```

### Advanced
```typescript
interface Sale {
  amount: number;
  region: string;
  date: Date;
}

function groupSalesByMonthYear(sales: Sale[]) {
  return groupBy(sales, sale => {
    const date = new Date(sale.date);
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`;
  });
}
```

## 7. Visual Diagram (ASCII)

```
Grouping Operation

Inputs:
[{cat:'A'}, {cat:'B'}, {cat:'A'}]

Group Keys:
'A' → [{cat:'A'}, {cat:'A'}]
'B' → [{cat:'B'}]

Output:
{
  A: [...],
  B: [...]
}
```

## 8. Real-world Example

Angular material table grouping:
```typescript
this.dataSource.groupBy = sale => sale.region;
```

## 9. Angular Use Case

Grouping transaction logs, analytics reports, categorized lists.

## 10. Common Mistakes

❌ Inefficient key extraction  
❌ Mutating original array

## 11. Edge Cases

1. **Missing keys**
   ```javascript
   groupBy([], keyFn); // {}
   ```

2. **Null/undefined keys**
   ```javascript
   groupBy([{ type: null }], obj => obj.type);
   // { null: [...] }
   ```

3. **Complex nested grouping**

## 12. Performance Considerations

Single-pass reduce O(n) optimal for most datasets.

## 13. Time & Space Complexity

Time: O(n)
Space: O(k) where k = unique keys

## 14. Interview Questions

1. Implement groupBy function
2. Handle multiple grouping keys?
3. Stable/unstable grouping differences?

## 15. Follow-up Questions

- "Sort groups alphabetically?"

## 16. Production Best Practices

1. Normalize group keys consistently
2. Consider Map return for ordered iteration
3. Validate input integrity

## 17. Summary

Grouping transforms flat collections into structured summaries.

## 18. Revision Notes

- Single-pass reduce pattern
- Key extractor determines buckets
- Default returns plain object
- Extendable to multi-keys

## 19. Practice Questions

1. Group products by category.
2. Sort grouped items within buckets.
3. Multi-level nested grouping.

## 20. References

- [Lodash groupBy](https://lodash.com/docs/groupBy)
- [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

### Next File
**009 - pipe and compose.md**
