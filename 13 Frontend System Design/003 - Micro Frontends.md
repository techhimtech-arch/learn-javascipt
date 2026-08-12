# Micro Frontends

## 1. Definition

**Micro Frontends** extend microservice architecture to frontend — splitting UI into independently developed/delivered fragments.

## 2. Why do we need it?

Scale frontend teams, enable independent deployments, reduce coordination overhead between squads.

## 3. Internal Working

Approaches:
- **IFrames**: Isolated contexts, heavy
- **Web Components**: Shared DOM, custom elements
- **JavaScript Bundles**: Module sharing via NPM/registry
- **Single SPA**: Orchestration framework

## 4. Step-by-Step Execution

Example setup:
1. Each team owns frontend microservice
2. Shell orchestrates loading remote entries
3. Remote exposes components via federated modules
4. Shared deps deduplicated (e.g., React, Angular)

## 5. Syntax

```javascript
// Single SPA mounting
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: 'micro-frontend-1',
  app: () => System.import('micro-frontend-1/App'),
  activeWhen: location => location.pathname.startsWith('/dashboard')
});

start();
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- IFrame approach -->
<iframe src="https://team-a.example.com/header"></iframe>
<iframe src="https://team-b.example.com/content"></iframe>
```

### Medium
```typescript
// Web Components with Angular Elements
@NgModule({
  declarations: [UserDashboardComponent],
  imports: [BrowserModule]
})
export class UserDashboardModule {
  ngDoBootstrap() {}
  // Exposes <user-dashboard> custom element
}
```

### Advanced
```typescript
// Module Federation with Webpack 5
const ModuleFederationPlugin = require('@module-federation/webpack');
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'containerApp',
      remotes: {
        'sharedHeader': 'remoteHeaderApp/HeaderComponent',
        'sharedFooter': 'remoteFooterApp/FooterComponent'
      },
      shared: {
        '@angular/core': { singleton: true, eager: true },
        '@angular/common': { singleton: true }
      }
    })
  ]
};
```

## 7. Visual Diagram (ASCII)

```
Micro Frontend Architecture

┌────────────┐  ┌─────────────┐  ┌────────────┐
│ Team A     │  │   Shell     │  │ Team B     │
│ Frontend   │◄─┼ Application │─►│ Frontend   │
│ (React)    │  │ (Orchestrator)│  │ (Angular)  │
└────────────┘  └─────────────┘  └────────────┘
    │              │          │      │
 User Interface ──► DOM Rendering ◄── User Interface
```

## 8. Real-world Example

Enterprise portal composed from independently deployed marketing/cart/account frontends.

## 9. Angular Use Case

Large teams owning separate domains; migration from monolith.

## 10. Common Mistakes

❌ Sharing state across boundaries
❌ Duplicating core framework libraries

## 11. Edge Cases

1. **Cross-app communication**
   ```typescript
   window.postMessage({ type: 'USER_LOGIN' }, '*');
   ```

2. **Version conflicts between apps**

## 12. Performance Considerations

Minimize duplicate bundle sizes; lazy-load remote entries.

## 13. Time & Space Complexity

Network latency increases with remote loading.

## 14. Interview Questions

1. Micro frontends vs monolith tradeoffs?
2. Communication between apps?
3. Shared dependency management?

## 15. Follow-up Questions

- "Compare iframe vs web component approaches."

## 16. Production Best Practices

1. Enforce strict ownership boundaries
2. Deduplicate vendor bundles
3. Cache remote entry points
4. Implement fallback strategies

## 17. Summary

Micro frontends enable team autonomy at cost of increased complexity.

## 18. Revision Notes

- IFrames = maximum isolation
- Web Components = native browser support
- Module Federation = modern bundler approach
- Single SPA = orchestration layer

## 19. Practice Questions

1. Set up simple single-spa shell.
2. Share components via ModuleFederation.
3. Implement cross-app event bus.

## 20. References

- [Micro Frontends Book](https://www.manning.com/books/micro-ebooks)
- [Single SPA Docs](https://single-spa.js.org/)

### Next File
**003 - CDN Strategy.md**
