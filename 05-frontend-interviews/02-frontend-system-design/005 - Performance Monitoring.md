# Performance Monitoring

## 1. Definition

**Performance Monitoring** tracks runtime metrics (load time, frame rate, memory usage) — identifying bottlenecks affecting user experience.

## 2. Why do we need it?

Measure real-user experience, detect regressions, optimize based on actual data rather than assumptions.

## 3. Internal Working

Key metrics:
- **Core Web Vitals**: LCP (loading), FID (interactivity), CLS (visual stability)
- **Custom measurements**: Business-critical user journeys
- **Resource timing**: Asset download performance

Tools capture via:
1. Navigation Timing API
2. Resource Timing API
3. User Timing API markers
4. Custom instrumentation hooks

## 4. Step-by-Step Execution

Angular integration:
```typescript
import { trace } from '@angular/cdk/platform';

// Mark start
trace('app-init-start');

// Mark end
trace('app-init-end');
```

Measurement flow:
1. Instrument app startup/navigation points
2. Record timing marks around key operations
3. Send aggregated data to analytics backend
4. Dashboard alerting on performance regressions

## 5. Syntax

```typescript
// Manual timing
performance.mark('start-fetch');
await fetchData();
performance.mark('end-fetch');
performance.measure('fetch-duration', 'start-fetch', 'end-fetch');

// Angular-specific
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const appInitEnd = performance.getEntriesByName('app-init-end')[0];
    console.log('App init time:', appInitEnd.duration);
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```typescript
// Measure route change
@Component({...})
export class TimingInterceptor implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const start = performance.now();
    
    return this.dataService.fetch().pipe(
      tap(() => {
        const end = performance.now();
        console.log(`Route load took ${end - start}ms`);
      })
    );
  }
}
```

### Medium
```typescript
// Core Web Vitals reporting
import { onCLS, onFID, onLCP } from 'web-vitals';

function sendToAnalytics(metric: any): void {
  navigator.sendBeacon('/analytics', JSON.stringify({
    metric: metric.name,
    value: metric.value,
    path: location.pathname
  }));
}

onLCP(sendToAnalytics);
onFID(sendToAnalytics);
onCLS(sendToAnalytics);
```

### Advanced
```typescript
// Full instrumentation service
@Injectable({ providedIn: 'root' })
export class PerformanceMonitoringService {
  private measurements: PerformanceEntry[] = [];
  
  constructor() {
    if (isDevMode()) {
      this.observeLongTasks();
    }
  }

  // Long task monitoring
  private observeLongTasks(): void {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.duration > 50) { // Long task threshold
          this.reportMetric({
            name: 'longtask',
            duration: entry.duration,
            startTime: entry.startTime
          });
        }
      });
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  }

  private reportMetric(metric: any): void {
    this.measurements.push(metric);
    // Send to backend
    fetch('/api/performance', {
      method: 'POST',
      body: JSON.stringify(metric),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Custom business timing
  measurePageLoad(page: string): number {
    const start = performance.now();
    
    return Math.floor(performance.now() - start);
  }
}
```

## 7. Visual Diagram (ASCII)

```
Performance Monitoring Cycle

┌─────────────────────────────┐
│ User Interaction Triggers     │
│ Navigation / Load           │
└─────────────┬───────────────┘
              ▼
     Instrumentation Points
    (performance.mark/measure)
              ▼
    Data Collection Buffer
              ▼
    Analytics Backend ←──────┐
                              │
              ▼               │
    Alert/Dashboard System    │
                              │
              ▼               │
    Regression Detection & Feedback ─┘
```

## 8. Real-world Example

E-commerce site tracking checkout funnel performance.

## 9. Angular Use Case

Startup performance, route transition timing, heavy computation monitoring.

## 10. Common Mistakes

❌ Over-instrumenting causing overhead
❌ Not sampling data in production

## 11. Edge Cases

1. **Privacy compliance**
   ```typescript
   // Remove PII from timing data
   ```

2. **Background tab throttling**

## 12. Performance Considerations

Sampling reduces telemetry volume; lightweight observers preferred.

## 13. Time & Space Complexity

Observers run asynchronously — minimal main-thread impact.

## 14. Interview Questions

1. Core Web Vitals explanation?
2. Long task detection?
3. Sampling strategies?

## 15. Follow-up Questions

- "Implement custom performance hook?"

## 16. Production Best Practices

1. Sample telemetry aggressively
2. Monitor Core Web Vitals regularly
3. Set SLOs for critical journeys
4. Alert on regressions automatically
5. Remove PII from all data

## 17. Summary

Continuous monitoring ensures sustained performance as apps evolve.

## 18. Revision Notes

- Core Web Vitals (LCP, FID, CLS)
- PerformanceObserver for long tasks
- Navigation/Resource timing APIs
- Sample data in production

## 19. Practice Questions

1. Measure and report route load times.
2. Track long tasks exceeding threshold.
3. Aggregate Core Web Vitals to analytics.

## 20. References

- [Web.dev: Performance](https://web.dev/vitals/)
- [Angular: Performance](https://angular.io/guide/performance)

### Next File
**006 - Security Best Practices.md**
