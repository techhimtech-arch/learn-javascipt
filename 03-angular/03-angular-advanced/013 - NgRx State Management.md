# NgRx State Management

## 1. Definition

**NgRx** implements Redux pattern for Angular — providing predictable state container with actions, reducers, selectors, and effects.

## 2. Why do we need it?

Manage complex global state predictably — centralized, traceable, testable.

## 3. Internal Working

Unidirectional data flow:
1. Action dispatched describing intent
2. Reducer pure function calculates next state
3. Selector derives computed data
4. Component subscribed to selector updates
5. Side effects handled by NgRx Effects

## 4. Step-by-Step Execution

Counter example:
```typescript
// Actions
export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');

// Reducer
export const counterReducer = createReducer(
  0,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1)
);

// Store setup
StoreModule.forRoot({ count: counterReducer })

// Component usage
@Component({
  template: `<button (click)="increment()">Count: {{ count$ | async }}</button>`
})
export class CounterComponent {
  count$ = this.store.select(selectCount);
  
  constructor(private store: Store) {}
  
  increment() {
    this.store.dispatch(increment());
  }
}
```

## 5. Syntax

```typescript
// Action creators
export const loadData = createAction('[Data] Load', props<{ id: number }>());

// Reducer
const initialState: DataState = { data: null, loading: false };
export const dataReducer = createReducer(
  initialState,
  on(loadData, (state) => ({ ...state, loading: true })),
  on(loadDataSuccess, (state, { data }) => ({ ...state, data, loading: false }))
);

// Selector
export const selectData = createSelector(
  selectDataState,
  (state) => state.data
);

// Effect
loadData$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.LOAD_DATA),
    switchMap(({ id }) => this.api.getData(id).pipe(
      map(data => actions.LOAD_SUCCESS({ data })),
      catchError(error => of(actions.LOAD_ERROR({ error })))
    ))
  )
);
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple counter app
interface CounterState { value: number }
const initialState: CounterState = { value: 0 };

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, value: state.value + 1 })),
  on(decrement, (state) => ({ ...state, value: state.value - 1 }))
);
```

### Medium
```typescript
// List management
interface UserListState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialUserListState: UserListState = {
  users: [],
  loading: false,
  error: null
};

export const userListReducer = createReducer(
  initialUserListState,
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

// Selectors with memoization
export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserListState) => state.users
);

export const selectActiveUsers = createSelector(
  selectAllUsers,
  (users) => users.filter(u => u.active)
);
```

### Advanced
```typescript
// Entity adapter pattern
export interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export const adapter = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export interface State extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
}

const initialState: State = adapter.getInitialState({
  selectedUserId: null,
  loading: false
});

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => adapter.addOne(user, state)),
  on(updateUser, (state, { update }) => adapter.update(update, state)),
  on(deleteUser, (state, { id }) => adapter.remove(id, state))
);

// Entity selectors
const selector = adapter.getSelectors();
export const selectAllUsers = selector.selectAll;
export const selectUserIds = selector.selectIds;
export const selectEntities = selector.selectEntities;
```

## 7. Visual Diagram (ASCII)

```
NgRx Data Flow

Component ──► Dispatch Action ──► Reducer ──► Store
                                                  │
                                       Select Stream
                                                  │
               Selector ──► Memoized View Model ──► Component
                                                  │
Component ──► Dispatch Effects ──► API Call ──► Action ──► Store
```

## 8. Real-world Example

E-commerce cart management with persistent inventory tracking.

## 9. Angular Use Case

Complex shared state, offline-first apps, audit trails.

## 10. Common Mistakes

❌ Mutating state in reducers
❌ Not memoizing selectors

## 11. Edge Cases

1. **Entity adapters normalization**
2. **Feature state composition**
3. **Meta-reducers for cross-cutting concerns**

## 12. Performance Considerations

Selectors cache expensive computations; entity operations optimized.

## 13. Time & Space Complexity

Selector computation depends on complexity — optimized via memoization.

## 14. Interview Questions

1. Redux pattern benefits?
2. Reducer purity requirements?
3. Selectors vs direct store access?

## 15. Follow-up Questions

- "Implement undo/redo feature?"

## 16. Production Best Practices

1. Normalize entity/state shape
2. Use createEntityAdapter for collections
3. Keep reducers pure functions
4. Memoize selectors with createSelector
5. Handle effects errors gracefully

## 17. Summary

NgRx delivers robust, predictable state management for large-scale Angular apps.

## 18. Revision Notes

- Actions describe intentions
- Reducers pure functions
- CreateSelector memoized
- Effects handle side effects
- Entity adapters optimize collections

## 19. Practice Questions

1. Implement counter app with NgRx.
2. Add entity adapter for user management.
3. Create effect for API polling.

## 20. References

- [NgRx Documentation](https://ngrx.io/)

---

## Module 10 (Angular Advanced) Complete! ✅
