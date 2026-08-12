# Profiling and Debugging

## 1. Definition

**Profiling and Debugging** uses Chrome DevTools and Angular-specific tools to identify performance bottlenecks and fix runtime issues.

## 2. Why do we need it?

Locate slow operations, memory leaks, and unexpected behavior in Angular applications.

## 3. Internal Working

Tools:
1. **Chrome DevTools**: Performance/Profiler/Memory tabs
2. **Angular DevTools**: Specialized for Angular components
3. **Augury**: Chrome extension for routing/state inspection
4. **Source Maps**: Debug TypeScript in browser

## 4. Step-by-Step Execution

Performance profiling workflow:
```bash
# 1. Enable dev mode with profiling
npm install @angular/profile

# 2. Record interaction in Chrome DevTools
# 3. Analyze flame chart
# 4. Identify heavy functions
# 5. Optimize hotspots

# Angular-specific profiling
import '@angular/platform-browser';
```

## 5. Syntax

```typescript
// Enable production mode
import { enableProdMode } from '@angular/core';
if (environment.production) {
  enableProdMode();
}

// Profiling markers
performance.mark('app-start');
// ... app initialization ...
performance.mark('app-end');
performance.measure('bootstrap', 'app-start', 'app-end');
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Measure component init time
@Component({...})
export class MyComponent implements OnInit {
  ngOnInit(): void {
    performance.mark('mycomp-init-start');
    // ... initialization ...
    performance.mark('mycomp-init-end');
    performance.measure('init', 'mycomp-init-start', 'mycomp-init-end');
  }
}
```

### Medium
```typescript
// Track change detection cycles
@Injectable()
export class CdTrackerService {
  private cdCount = 0;

  trackCdCycle(): void {
    this.cdCount++;
    if (this.cdCount % 100 === 0) {
      console.warn(`CD cycle ${this.cdCount}`);
    }
  }
}
```

### Advanced
```typescript
// Comprehensive app profiler
@Injectable({ providedIn: 'root' })
export class AppProfilerService {
  private metrics: PerformanceMetric[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (!isPlatformServer(this.platformId)) {
      this.setupPerformanceObserver();
      this.patchNgOnInit();
    }
  }

  private setupPerformanceObserver(): void {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        this.recordMetric({
          name: entry.name,
          duration: entry.duration,
          entryType: entry.entryType
        });
      }
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
  }

  private patchNgOnInit(): void {
    // Monkey-patch to track component inits
    const original = ComponentDef as any;
    // ... instrumentation logic ...
  }

  recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
}
```

## 7. Visual Diagram (ASCII)

```
Debugging Toolchain

┌─────────────────────┐
│ Chrome DevTools     │ ◄── Primary debugging
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Angular DevTools    │ ◄── Component/state inspection
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Source Maps         │ ◄── TypeScript debugging
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Console/Logging     │ ◄── Runtime diagnostics
└─────────────────────┘
```

## 8. Real-world Example

Identifying excessive change detection cycles causing UI jank.

## 9. Angular Use Case

Performance optimization, debugging component behavior.

## 10. Common Mistakes

❌ Leaving console.log in production builds
❌ Not cleaning up performance markers

## 11. Edge Cases

1. **Production vs dev mode differences**
2. **Async boundary timing**

## 12. Performance Considerations

Profiling adds overhead — disable in production builds.

## 13. Time & Space Complexity

Minimal except for observer overhead.

## 14. Interview Questions

1. DevTools performance profiling workflow?
2. Measuring component rendering time?
3. Debugging change detection issues?

## 15. Follow-up Questions

- "Optimize excessive CD cycles?"

## 16. Production Best Practices

1. Strip dev-mode logging before builds
2. Monitor Core Web Vitals
3. Profile before optimizing
4. Use production builds for testing

## 17. Summary

Systematic profiling reveals hidden performance bottlenecks.

## 18. Revision Notes

- Chrome DevTools Performance tab for flame charts
- Angular DevTools for component trees/state
- Source maps enable TypeScript debugging
- Production builds essential for accurate profiling

## 19. Practice Questions

1. Profile component initialization time.
2. Track change detection cycle count.
3. Identify heaviest rendering components.

## 20. References

- [Angular DevTools](https://angular.io/guide/devtools)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/evaluate-performance/)

---

## Module 11 (Angular Performance) Complete! ✅ (3 files)
## Module 13 (System Design) Complete! ✅ (10 files)
## Module 14 (Testing) Complete! ✅ (5 files)

### FINAL COUNT VERIFICATION
