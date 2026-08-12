# Security Best Practices

## 1. Definition

**Frontend Security** encompasses defensive measures protecting users and applications from XSS, CSRF, clickjacking, and other client-side vulnerabilities.

## 2. Why do we need it?

Protect user data, maintain trust, prevent abuse, comply with regulations.

## 3. Internal Working

Primary attack vectors:
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Clickjacking
- Insecure deserialization

Defense layers:
1. Input sanitization
2. Content Security Policy headers
3. HTTP security flags
4. Secure token storage

## 4. Step-by-Step Execution

XSS prevention:
```typescript
// Safe HTML sanitization
@Component({
  template: `<div [innerHTML]="safeHtml"></div>`
})
export class Component {
  constructor(private sanitizer: DomSanitizer) {}
  
  safeHtml = this.sanitizer.bypassSecurityTrustHtml(userContent);
  // ^ Only use trusted content!
}
```

## 5. Syntax

```typescript
// Angular built-in sanitization
[innerHTML]="unsafeString" // Auto-sanitized
```

```typescript
// HTTP interceptors for security headers
@Injectable()
export class SecurityHeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const secureReq = req.clone({
      headers: req.headers
        .set('X-Content-Type-Options', 'nosniff')
        .set('X-Frame-Options', 'DENY')
        .set('X-XSS-Protection', '1; mode=block')
    });
    
    return next.handle(secureReq);
  }
}
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Prevent XSS via auto-sanitization -->
<div>{{ userInput }}</div> <!-- Safe by default -->

<!-- Dangerous but sometimes needed -->
<div [innerHTML]="trustedHtml"></div>
```

### Medium
```typescript
// CSRF protection
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  
  postData(data: any): Observable<any> {
    // Include CSRF token in headers
    const csrfToken = this.csrfService.getToken();
    
    return this.http.post('/api/data', data, {
      headers: { 'X-CSRF-Token': csrfToken }
    });
  }
}
```

### Advanced
```typescript
// Strict Content Security Policy
@Component({
  template: `
    <iframe [src]="trustedUrl" sandbox="allow-scripts"></iframe>
  `
})
export class SecureFrameComponent {
  @Input() trustedUrl!: SafeResourceUrl;
  
  constructor(sanitizer: DomSanitizer) {
    // Only allow specific domains
    this.trustedUrl = sanitizer.bypassSecurityTrustResourceUrl(
      'https://trusted-domain.com/embedded-content'
    );
  }
}
```

## 7. Visual Diagram (ASCII)

```
Security Defense Layers

User Input ──► Sanitizer ──► Trusted Content ──► Renderer
                                           │
                                           ▼
                          Content Security Policy ──► Browser
                                           │
                                           ▼
                            HTTP Security Headers
```

## 8. Real-world Example

Financial dashboard with strict CSP and input sanitization.

## 9. Angular Use Case

All user input handling, third-party integrations, authentication flows.

## 10. Common Mistakes

❌ Blindly trusting user input
❌ Using bypassSecurityTrustResourceUrl carelessly

## 11. Edge Cases

1. **Rich text editors**
   ```typescript
   // Must sanitize before storing/rendering
   ```

2. **Third-party widgets**
3. **Dynamic component loading**

## 12. Performance Considerations

Security checks add minimal overhead.

## 13. Time & Space Complexity

Negligible performance impact.

## 14. Interview Questions

1. XSS prevention techniques?
2. CSRF token implementation?
3. CSP header configuration?

## 15. Follow-up Questions

- "Sanitize complex HTML content?"

## 16. Production Best Practices

1. Enable strict CSP headers
2. Always sanitize user input
3. Use HttpOnly cookies for sensitive tokens
4. Implement proper auth token rotation
5. Audit dependencies regularly
6. Monitor for injections in logs

## 17. Summary

Security must be baked into every layer of frontend development.

## 18. Revision Notes

- XSS = output encoding/sanitization
- CSRF = token validation
- CSP = defense in depth
- HttpOnly cookies prevent JS access

## 19. Practice Questions

1. Sanitize malicious HTML input.
2. Implement CSRF token header interceptor.
3. Configure strict CSP policy.

## 20. References

- [OWASP Frontend Security](https://owasp.org/www-project-cheat-sheets/)
- [Angular Security Guide](https://angular.io/guide/security)

---

## Module 13 (System Design) - Continuing...
