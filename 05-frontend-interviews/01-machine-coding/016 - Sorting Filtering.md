# Sorting and Filtering

## 1. Definition

**Sorting and Filtering** rearrange/reduce datasets based on criteria — core operations for presenting organized data views.

## 2. Why do we need it?

Allow users to find relevant information quickly in large tabular/grid datasets.

## 3. Internal Working

Sorting:
1. Apply comparator function
2. Reorder elements accordingly

Filtering:
1. Apply predicate to each element
2. Retain only those meeting condition

Combined: filter then sort for efficiency.

## 4. Step-by-Step Execution

Implementation:
```javascript
function sortData(arr, key, direction = 'asc') {
  return arr.slice().sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

function filterData(arr, predicate) {
  return arr.filter(predicate);
}
```

Steps:
1. Clone array (immutability)
2. Sort using comparator
3. Filter using predicate
4. Return new collection

## 5. Syntax

```javascript
// Sorting
arr.sort((a, b) => a.value - b.value);

// Filtering
const filtered = arr.filter(item => item.status === 'active');

// Chained
const result = arr
  .filter(item => item.price > 100)
  .sort((a, b) => b.rating - a.rating);
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const nums = [3, 1, 4, 1, 5];
nums.sort((a, b) => a - b); // [1, 1, 3, 4, 5]
```

### Medium
```javascript
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];

const sorted = [...users].sort((a, b) => 
  a.name.localeCompare(b.name)
);

const active = users.filter(u => u.age >= 18);
```

### Advanced
```typescript
// Angular Material table sorting/filtering
@Pipe({ name: 'tableFilter', pure: false })
export class TableFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string): any[] {
    if (!searchText) return items;
    return items.filter(item => 
      item[field]?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  }
}

@Component({
  template: `
    <input (keyup)="applyFilter($event)" placeholder="Filter...">
    <table mat-table [dataSource]="dataSource" matSort>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `
})
export class DataTableComponent {
  @ViewChild(MatSort) sort: MatSort;
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
```

## 7. Visual Diagram (ASCII)

```
Pipeline Processing

Raw Data ──► [Filter] ──► Intermediate Set ──► [Sort] ──► Final View
                 ↓                           ↓
         Predicate Match             Comparator Order
```

## 8. Real-world Example

Angular Material data table with sorting and filtering.

## 9. Angular Use Case

NgRx selectors with memoization, Material table integrations, search/filter UIs.

## 10. Common Mistakes

❌ Mutating original array during sort  
❌ Missing locale-aware string sorting  

## 11. Edge Cases

1. **Null/undefined values in sort keys**
   ```javascript
   .sort((a,b) => (a?.count || 0) - (b?.count || 0))
   ```

2. **Case sensitivity in strings**
   ```javascript
   .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
   ```

3. **Deep nested sorting**
   ```javascript
   .sort((a, b) => a.user.profile.rating - b.user.profile.rating)
   ```

## 12. Performance Considerations

- Filter before sort (smaller set to process)
- Memoize results for stable datasets
- For large lists, consider indexedDB/Web Workers

## 13. Time & Space Complexity

- Sort: O(n log n)
- Filter: O(n)
- Combined: O(n log n)

## 14. Interview Questions

1. Implement generic sort/filter utility
2. Optimize chained operations
3. Handle deep object sorting?

## 15. Follow-up Questions

- "How to sort dates correctly?"

## 16. Production Best Practices

1. Immutable transformations (clone before sort)
2. Memoize selectors for reactive apps
3. Use server-side sorting for large datasets
4. Cache sorted/filtered results

## 17. Summary

Essential building blocks for any data-rich application interface.

## 18. Revision Notes

- Sort mutates unless cloned
- Filter reduces dataset size
- Chain filter→sort for performance
- Locale matters for strings

## 19. Practice Questions

1. Generic reusable sort utility.
2. Multi-field sorting support.
3. Combine with pagination logic.

## 20. References

- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Angular Material Table](https://material.angular.io/components/table/overview)

### Next File
**017 - Virtual Scroll.md**
