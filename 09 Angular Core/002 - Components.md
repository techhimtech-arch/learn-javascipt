# Components

## 1. Definition

An **Angular Component** is a self-contained UI element consisting of:
- Template (HTML)
- Styles (CSS/SCSS)
- Logic (TypeScript class)

Components form the view layer of Angular applications.

## 2. Why do we need it?

Encapsulate presentation and behavior — promote reusability, testability, and maintainability.

## 3. Internal Working

On instantiation:
1. Template compiled to DOM instructions
2. Data bindings established
3. Lifecycle hooks invoked
4. Change detection runs

Component trees nest hierarchically driving rendering.

## 4. Step-by-Step Execution

```typescript
@Component({
  selector: 'user-card',
  template: `<h3>{{user.name}}</h3><p>{{user.email}}</p>`,
  styles: [`h3 { font-weight: bold; }`]
})
export class UserCardComponent {
  @Input() user!: User;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    console.log('UserCard initialized');
  }
}
```

Steps:
1. Angular creates component instance
2. Injects dependencies via DI
3. Sets @Input properties
4. Calls ngOnInit
5. Template rendered with bindings

## 5. Syntax

```typescript
@Component({
  selector: 'my-component',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent {
  // Component logic here
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
@Component({
  selector: 'hello-world',
  template: `<p>Hello, {{name}}!</p>`
})
export class HelloWorldComponent {
  name = 'Angular';
}
```

### Medium
```typescript
@Component({
  selector: 'counter-button',
  template: `
    <button (click)="onClick()">Count: {{ count }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterButtonComponent {
  @Input() initialCount = 0;
  @Output() countChange = new EventEmitter<number>();
  count = this.initialCount;

  onClick() {
    this.count++;
    this.countChange.emit(this.count);
  }
}
```

### Advanced
```typescript
@Component({
  selector: 'data-table',
  template: `
    <table>
      <thead>
        <tr>
          <th *ngFor="let col of columns">{{ col.header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data; trackBy: trackById">
          <td *ngFor="let col of columns">{{ row[col.key] }}</td>
        </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent<T> implements OnInit {
  @Input() data: T[] = [];
  @Input() columns: ColumnDef<T>[] = [];

  trackById(index: number, item: T): string {
    return item['id']; // Or any stable identifier
  }
}
```

## 7. Visual Diagram (ASCII)

```
Component Tree Structure

AppComponent
├─ HeaderComponent
├─ SidebarComponent
├─ MainComponent
│  ├─ DashboardComponent
│  │  ├─ StatsCardComponent
│  │  └─ ChartComponent
│  └─ ListComponent
└─ FooterComponent
```

## 8. Real-world Example

E-commerce product card component displaying image/title/price.

## 9. Angular Use Case

UI building blocks for any Angular application.

## 10. Common Mistakes

❌ Direct DOM manipulation (should use Renderer2)
❌ Heavy logic in templates
❌ Mutating @Input directly

## 11. Edge Cases

1. **Content projection**
   ```html
   <ng-content></ng-content>
   ```

2. **View encapsulation modes**
3. **Lazy-loaded component modules**

## 12. Performance Considerations

Use OnPush strategy, trackBy functions, minimize DOM operations.

## 13. Time & Space Complexity

Instantiation cost varies with template complexity.

## 14. Interview Questions

1. Component lifecycle hooks order?
2. OnPush vs Default change detection?
3. Content vs View Children?

## 15. Follow-up Questions

- "How to optimize component rendering?"

## 16. Production Best Practices

1. Keep components small/single-responsibility
2. Use OnPush strategy widely
3. Avoid heavy computations in templates
4. Lazy-load feature components

## 17. Summary

Components are the fundamental UI building blocks — encapsulate logic, template, and style.

## 18. Revision Notes

- Selector + template + class structure
- Inputs/outputs for communication
- Lifecycle hooks for timing
- OnPush critical for performance

## 19. Practice Questions

1. Build reusable modal component.
2. Create dynamic form component.
3. Optimize large list rendering.

## 20. References

- [Angular: Components](https://angular.io/guide/component-overview)

### Next File
**003 - Templates.md**
