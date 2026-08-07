# Cookies

## 1. Definition

**Cookies** are small text files stored by the browser containing user-related information — originally introduced for maintaining stateful sessions across HTTP requests.

Maximum size ~4KB per cookie, ~20 cookies per domain by default.

## 2. Why do we need it?

- Session management (login tokens)
- Personalization settings
- Tracking/analytics (though discouraged due to privacy)

## 3. Internal Working

1. Server sends `Set-Cookie` header
2. Browser stores cookie
3. On subsequent requests to matching domain/path → included in `Cookie` header
4. Expires after defined date or session ends

Options:
- `Secure` – HTTPS only
- `HttpOnly` – inaccessible via JavaScript
- `SameSite=Strict/Lax` – CSRF protection
- `Domain`/`Path` – scope
- `Max-Age`/`Expires` – lifetime

## 4. Step-by-Step Execution

Server sends:
```
Set-Cookie: sessionId=abc123; Secure; HttpOnly; SameSite=Lax
```

Client sends:
```
Cookie: sessionId=abc123
```

## 5. Syntax

Setting via HTTP header:
```
Set-Cookie: name=value; Path=/; Domain=example.com; Max-Age=3600; Secure; HttpOnly; SameSite=Lax
```

Reading/writing via JS (limited):
```javascript
document.cookie = "name=value; SameSite=Lax"; // Set
document.cookie.split(';'); // Read
```

## 6. Examples (Easy → Advanced)

### Easy
```javascript
document.cookie = "theme=dark";
```

### Medium
```javascript
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : undefined;
}
```

### Advanced
```javascript
// Setting secure cookie from backend
res.cookie('authToken', jwtToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

## 7. Visual Diagram (ASCII)

```
Cookie Flow

Client ── Request ──▶ Server
         ▲
         │ (Cookie: sessionId=...)
         │ attached automatically
Server ── Set-Cookie ──▶ Client
         (store cookie with attributes)
```

## 8. Real-world Example

JWT stored in HttpOnly cookie for authentication:
```typescript
router.post('/login', (req, res) => {
  const token = jwt.sign(payload, secret);
  res.cookie('token', token, { httpOnly: true, secure: true });
  res.json({ success: true });
});
```

## 9. Angular Use Case

Authentication with cookies (more secure than localStorage for JWT).

## 10. Common Mistakes

❌ Storing large data in cookies  
❌ Forgetting `HttpOnly` on auth cookies  
❌ Missing `SameSite` protection  

## 11. Edge Cases

1. **Cross-domain cookies blocked**
2. **Size limit exceeded → truncated**
3. **Cookie jar full → silently dropped**

## 12. Performance Considerations

Cookies sent with every matching request — keep minimal.

## 13. Time & Space Complexity

O(k) where k = number of cookies matching domain/path.

## 14. Interview Questions

1. Purpose of HttpOnly?
2. SameSite attribute usage?
3. Cookie size limitations?

## 15. Follow-up Questions

- "How to mitigate CSRF?"
- "Why avoid localStorage for auth?"

## 16. Production Best Practices

1. Use short expiry times
2. Set `Secure` and `HttpOnly` on sensitive cookies
3. Apply `SameSite` appropriately
4. Avoid storing bulky data

## 🔍 Quick Recap
- Sent automatically with HTTP requests
- Limited to ~4KB/domain
- HttpOnly prevents XSS access
- SameSite/Lax helps prevent CSRF

## 📝 Summary
Cookies enable server-client state sharing. Proper flags (`Secure`, `HttpOnly`, `SameSite`) enhance security. Though legacy compared to modern storage APIs, cookies remain essential for authentication workflows due to their automatic transmission nature.

## 17. Summary

Legacy but indispensable for session/auth use cases.

## 18. Revision Notes

- Auto-transmitted with requests
- Small payload limit
- Flags: Secure, HttpOnly, SameSite
- Useful for server-side state

## 19. Practice Questions

1. Set secure cookie from frontend/backend.
2. Read cookie safely using regex.
3. Compare cookie vs localStorage for auth.

## 20. References

- [MDN: Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)

### Next File
**011 - Service Workers.md**
