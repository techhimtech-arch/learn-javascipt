# Angular Advanced Change Detection

## 1. Definition

Advanced change detection patterns including manual detection control, detached CD, and optimization techniques for complex scenarios.

## 2. Why do we need it?

Handle edge cases where default behavior doesn't meet requirements — animations, custom rendering, high-performance lists.

## 3. Internal Working

Manual control APIs:
1. `ChangeDetectorRef.detectChanges()` - Run CD manually
2. `markForCheck()` - Schedule CD on next tick
3. `detach()` - Remove from CD cycle entirely
4. `detectChanges()` - Run CD immediately for component subtree

## 4. Step-by-Step Execution

Manual control example:
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManualComponent implements AfterViewInit, OnDestroy {
  @ViewChild('content') contentRef!: TemplateRef<any>;
  private embeddedViews: EmbeddedViewRef<any>[] = [];

  constructor(private cdr: ChangeDetectorRef, private vc: ViewContainerRef) {}

  addView(data: any): void {
    const view = this.vc.createEmbeddedView(this.contentRef, { data });
    this.embeddedViews.push(view);
  }

  ngAfterViewInit(): void {
    // Detach from automatic CD
    this.cdr.detach();
  }

  updateManually(): void {
    // Explicit CD run
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.cdr.onDestroy();
  }
}
```

## 5. Syntax

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComp {
  constructor(private cdr: ChangeDetectorRef) {}
  
  manualUpdate() {
    this.cdr.markForCheck(); // Request CD run
  }
  
  manualDetect() {
    this.cdr.detectChanges(); // Run immediately
  }
  
  stopAutosync() {
    this.cdr.detach(); // Pause CD entirely
  }
  
  resumeAutosync() {
    this.cdr.reattach(); // Resume CD
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Mark for check after async event
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {
  currentTime = new Date();

  constructor(private cdr: ChangeDetectorRef) {
    setInterval(() => {
      this.currentTime = new Date();
      this.cdr.markForCheck(); // Notify CD to check
    }, 1000);
  }
}
```

### Medium
```typescript
// Detached component with manual rendering
@Component({
  template: `<canvas #canvas></canvas>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private animationId!: number;
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detach(); // No change detection needed
    this.animate(); // Start custom render loop
  }

  private animate(): void {
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    // Custom rendering - outside Angular CD
    // ...
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }
}
```

### Advanced
```typescript
// Custom CD strategy with manual scheduling
@Injectable()
export class CustomCdsService {
  private microtaskScheduled = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  scheduleCheck(cdRef: ChangeDetectorRef): void {
    if (this.microtaskScheduled) return;
    
    this.microtaskScheduled = true;
    Promise.resolve().then(() => {
      this.microtaskScheduled = false;
      if (!isPlatformServer(this.platformId)) {
        cdRef.detectChanges();
      }
    });
  }
}

// Component using custom scheduling
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomScheduleComponent {
  constructor(
    private cdr: ChangeDetectorRef,
    private scheduler: CustomCdsService
  ) {}

  updateValue(newValue: string): void {
    this.someValue = newValue;
    this.scheduler.scheduleCheck(this.cdr);
  }
}
```

## 7. Visual Diagram (ASCII)

```
Manual Change Detection Control

Angular CD Cycle ──► [Detach] ──► Manual Control
                                  │
                         markForCheck()
                                  │
                         detectChanges()
                                  │
                              Resume/Stop
```

## 8. Real-world Example

Canvas-based visualization components with custom render loops.

## 9. Angular Use Case

Animations, canvas/SVG rendering, high-frequency updates, third-party integrations.

## 10. Common Mistakes

❌ Memory leaks from attached intervals/callbacks
❌ Inconsistent manual update timing

## 11. Edge Cases

1. **Mixed OnPush/Default components**
2. **Third-party library interactions**
3. **Animation frame synchronization**

## 12. Performance Considerations

Manual control reduces overhead but requires careful lifecycle management.

## 13. Time & Space Complexity

Per invocation — typically O(1) or O(subtree).

## 14. Interview Questions

1. When to detach CD manually?
2. Scheduling strategies?
3. Integration with third-party libs?

## 15. Follow-up Questions

- "Debug CD performance issues?"

## 16. Production Best Practices

1. Always reattach/detach symmetrically
2. Clean up timers/intervals
3. Validate platform support (browser vs server)
4. Document manual CD boundaries

## 17. Summary

Advanced CD control enables high-performance specialized components.

## 18. Revision Notes

- OnPush minimizes unnecessary runs
- Detach/reattach for manual control
- markForCheck schedules check
- detectChanges forces immediate evaluation

## 19. Practice Questions

1. Implement manual timer with markForCheck.
2. Detach component during canvas animation.
3. Create custom CD scheduler.

## 20. References

- [Angular Change Detection](https://angular.io/api/core/ChangeDetectorRef)

### Next File
**011 - Dependency Injection Advanced.md** (already exists as separate file)
