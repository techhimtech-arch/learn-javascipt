# EventEmitter

## 1. Definition

**EventEmitter** pattern allows objects to emit named events and notify registered listeners.

Popularized in Node.js; implemented manually in browsers/frontend frameworks.

## 2. Why do we need it?

Decouple components communicating without tight coupling — publish/subscribe mechanism across app boundaries.

## 3. Internal Working

Maintains registry of event-name → callback mappings:
1. `on(event, listener)` adds entry
2. `emit(event, data)` dispatches to all matching listeners
3. `off/removeListener(event, listener)` unregisters
4. Optionally supports once/ wildcard/event delegation

## 4. Step-by-Step Execution

Minimal implementation:
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    (this.events[event] ||= []).push(listener);
  }

  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(fn => fn !== listener);
  }
}
```

Steps:
1. Register handler via `.on()`
2. Emit triggers all stored callbacks
3. Listeners receive emitted arguments
4. Remove via `.off()` prevents leaks

## 5. Syntax

```javascript
emitter.on('eventName', payload => {
  console.log(payload);
});

emitter.emit('eventName', { data: "value" });
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
const emitter = new EventEmitter();
emitter.on('greet', name => console.log(`Hello ${name}`));
emitter.emit('greet', 'World'); // Hello World
```

### Medium
```javascript
class TodoStore extends EventEmitter {
  add(todo) {
    this.todos.push(todo);
    this.emit('change', this.todos);
  }
}

const store = new TodoStore();
store.on('change', renderUI);
```

### Advanced
```typescript
// Angular-like event bus service
@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly channels = new Map<string, Subject<any>>();

  emit<T>(channel: string, data?: T): void {
    let subject = this.channels.get(channel);
    if (!subject) {
      subject = new Subject<T>();
      this.channels.set(channel, subject);
    }
    subject.next(data);
  }

  listen<T>(channel: string): Observable<T> {
    let subject = this.channels.get(channel);
    if (!subject) {
      subject = new Subject<T>();
      this.channels.set(channel, subject);
    }
    return subject.asObservable();
  }
}
```

## 7. Visual Diagram (ASCII)

```
Publish/Subscribe Pattern

Emitter ──emit('update',data)──► Listeners
              │
         ┌────┼────┐
         │ Listener A│
         │ Listener B│
         │ Listener C│
         └────────────┘
Each receives same data
```

## 8. Real-world Example

Angular EventEmitter used in @Output bindings:
```typescript
@Output() saved = new EventEmitter<User>();
saveUser(user: User) {
  this.saved.emit(user);
}
```

## 9. Angular Use Case

Component communication via outputs, event buses, state management.

## 10. Common Mistakes

❌ Memory leaks from forgotten listeners  
❌ Incorrect `this` binding in callbacks

## 11. Edge Cases

1. **Listeners removed mid-emit**
   ```javascript
   emitter.on('evt', () => {
     emitter.off('evt', handler); // Safe iteration required
   });
   ```

2. **Wildcard events**
3. **Once-only listeners**

## 12. Performance Considerations

Large listener lists slow emission dispatch — prune unused subscriptions.

## 13. Time & Space Complexity

O(n) emit where n = registered listeners for given event.

## 14. Interview Questions

1. Implement EventEmitter class
2. Prevent memory leaks?
3. One-time listener pattern?

## 15. Follow-up Questions

- "How does RxJS Subject relate?"

## 16. Production Best Practices

1. Provide dispose/cleanup mechanism
2. Batch emits during high-frequency updates
3. Prefer weak references where supported

## 17. Summary

EventEmitter enables loose coupling between components/modules.

## 18. Revision Notes

- on/off/emit core methods
- Callback registry per event type
- Prevent zombie listeners
- Similar to Node.js EventEmitter/RxJS Subject

## 19. Practice Questions

1. Build minimal EventEmitter.
2. Add once() method.
3. Support wildcard listeners.

## 20. References

- [Node.js EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)
- [MDN: EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)

### Next File
**007 - Memoization.md**
