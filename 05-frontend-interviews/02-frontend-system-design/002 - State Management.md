# State Management

## 1. Definition

**State Management** coordinates application-wide data and UI state — ensuring consistent updates across components.

## 2. Why do we need it?

Centralized predictable state prevents prop drilling, enables time-travel debugging, ensures consistency.

## 3. Internal Working

Approaches:
- **Centralized store** (NgRx, Akita): single source of truth
- **Component aggregation**: lift state upward
- **Context API**: local sharing via providers
- **Signals**: fine-grained reactivity model

## 4. Step-by-Step Execution

Store-based pattern:
1. Actions dispatched describing intent
2. Reducers compute next state
3. Selectors derived data
4. Components subscribe/select pieces
5. View updates automatically

## 5. Syntax

```typescript
// NgRx example
interface Todo { id: number; text: string; completed: boolean; }

// Action
export const toggleTodo = createAction(
  '[Todo] Toggle',
  props<{ id: number }>()
);

// Reducer
export const todoReducer = createReducer(
  initialTodos,
  on(toggleTodo, (state, { id }) =>
    state.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
  )
);

// Selector
export const selectCompletedTodos = createSelector(
  selectTodos,
  todos => todos.filter(todo => todo.completed)
);
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Simple context-based store
@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _count = signal(0);
  count = this._count.asReadonly();

  increment() { this._count.update(c => c + 1); }
  decrement() { this._count.update(c => c - 1); }
}
```

### Medium
```typescript
// NgRx entity pattern
interface UserState extends EntityState<User> {
  selectedId: number | null;
  loading: boolean;
}

const adapter = createEntityAdapter<User>();

const initialUserState: UserState = adapter.getInitialState({
  selectedId: null,
  loading: false
});

const userReducer = createReducer(
  initialUserState,
  on(addUser, (state, { user }) => adapter.addOne(user, state)),
  on(updateUser, (state, { update }) => adapter.update(update, state))
);

// Selectors
const selectUserEntities = createSelector(
  selectUserState,
  (state) => selectUserIds(state)
);
```

### Advanced
```typescript
// Feature store with effects
@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.LOAD_USERS),
      switchMap(() => this.api.getUsers().pipe(
        map(users => userActions.LOAD_USERS_SUCCESS({ users })),
        catchError(error => of(userActions.LOAD_USERS_FAILURE({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private api: UserService
  ) {}
}
```

## 7. Visual Diagram (ASCII)

```
Unidirectional Data Flow (Redux-style)

Component ──► Action ──► Reducer ──► Store ──► Selector ──► Component
                │             ▲                          │
                │             │                          │
                └─────────────┴──────────────────────────┘
                   (new state flows back to trigger re-render)
```

## 8. Real-world Example

E-commerce cart state shared across product/search/cart/checkout views.

## 9. Angular Use Case

Cross-feature state sharing, caching API responses, undo/redo functionality.

## 10. Common Mistakes

❌ Storing ephemeral UI state in global store
❌ Mutating state directly instead of reducers
❌ Over-fetching data due to poor caching

## 11. Edge Cases

1. **Nested state normalization**
2. **Offline-first considerations**
3. **Performance impacts of frequent updates**

## 12. Performance Considerations

Selectors memoize expensive calculations; immutable updates enable efficient diffing.

## 13. Time & Space Complexity

Varies by implementation — selectors cached with memo.

## 14. Interview Questions

1. Compare NgRx vs Context API vs Signals?
2. Reducer immutability importance?
3. Selector memoization?

## 15. Follow-up Questions

- "How to normalize nested API responses?"

## 16. Production Best Practices

1. Separate UI state from domain state
2. Normalize relational data
3. Use reselect-style memoized selectors
4. Implement undo/redo carefully
5. Handle loading/error states consistently

## 17. Summary

Effective state management centralizes complex data flows into predictable pipelines.

## 18. Revision Notes

- Single source of truth principle
- Unidirectional data flow
- Immutable state updates
- Memoized selectors

## 19. Practice Questions

1. Build todo app with NgRx-style store.
2. Normalize API response.
3. Implement undo/redo functionality.

## 20. References

- [NgRx Documentation](https://ngrx.io/)
- [Redux Essentials](https://redux.js.org/essentials)

### Next File
**003 - Caching Strategies.md**
