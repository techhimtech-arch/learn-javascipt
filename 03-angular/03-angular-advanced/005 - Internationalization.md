# Internationalization (i18n)

## 1. Definition

**Internationalization (i18n)** enables Angular applications to adapt content for different locales/languages — translating text, formatting dates/numbers/currencies.

## 2. Why do we need it?

Expand market reach, comply with regional regulations, improve accessibility globally.

## 3. Internal Working

Angular i18n workflow:
1. Extraction: Pull translatable strings from templates
2. Translation: Populate translation files (XLI/XLIFF, XMB)
3. Compilation: Build locale-specific bundles

## 4. Step-by-Step Execution

```bash
# Extract default messages
ng extract-i18n

# Build with specific locale
ng build --localize
```

Template syntax:
```html
<h1 i18n="@@homeTitle">Welcome Home</h1>
<span i18n="Introduction|Page intro@@intro">Hello!</span>
```

## 5. Syntax

```html
<!-- Mark translatable text -->
<h1 i18n>Hello World</h1>

<!-- With description and meaning -->
<p i18n="Introduction|Site intro@@introText">Hello!</p>

<!-- ICU expressions -->
<span i18n>{ count, plural, =0 {No items} one {# item} other {# items} }</span>

<!-- Date formatting -->
<span i18n>{ dateValue, date, shortDate }</span>
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Basic translation -->
<h1 i18n>Welcome</h1>
<button i18n>Submit</button>
```

### Medium
```html
<!-- Pluralization -->
<p i18n>
  You have { count, plural,
    =0 {no messages}
    one {# message}
    other {# messages}
  }.
</p>

<!-- Gender selection -->
<p i18n>
  { gender, select,
    male {He}
    female {She}
    other {They}
  } added a photo.
</p>
```

### Advanced
```typescript
// Runtime i18n with ngx-translate
@Injectable({ providedIn: 'root' })
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr', 'es']);
    this.translate.setDefaultLang('en');
    
    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|fr|es/) ? browserLang : 'en');
  }

  get instantLanguage(): Observable<string> {
    return this.translate.onLangChange.pipe(
      map(event => event.lang)
    );
  }
}

// Component usage
@Component({
  template: `<h1>{{ 'HELLO_WORLD' | translate }}</h1>`
})
export class MyComponent {
  constructor(public translate: TranslationService) {}
  
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
```

## 7. Visual Diagram (ASCII)

```
i18n Workflow

Template Code ──► Extract (xlf) ──► Translate ──► Compile ──► Locale Bundles
                              │               │
                              ▼               ▼
                        Translator    Build Output
                        fills values    (localized)
```

## 8. Real-world Example

Multi-language e-commerce site serving localized product descriptions.

## 9. Angular Use Case

Enterprise applications targeting global markets.

## 10. Common Mistakes

❌ Hardcoding text instead of extracting
❌ Not testing plural/gender edge cases

## 11. Edge Cases

1. **Complex pluralization rules**
   ```html
   { count, plural, one {# item} few {# items} many {# items} other {# items} }
   ```

2. **HTML within translated text**
3. **RTL language support**

## 12. Performance Considerations

Runtime i18n adds overhead; compile-time preferred for performance.

## 13. Time & Space Complexity

Per-message lookup — negligible impact.

## 14. Interview Questions

1. Compile-time vs runtime i18n?
2. Translate nested JSON keys?
3. Pluralization implementation?

## 15. Follow-up Questions

- "Handle dynamic language switching?"

## 16. Production Best Practices

1. Extract messages early and often
2. Test all locales thoroughly
3. Use translation management platforms
4. Version translation files

## 17. Summary

Internationalization enables global reach while maintaining maintainable code.

## 18. Revision Notes

- Extract/Translate/Compile workflow
- ICU message format for plurals/gender
- Runtime (ngx-translate) vs compile-time (Angular i18n)
- RTL language considerations

## 19. Practice Questions

1. Set up basic i18n with two languages.
2. Implement pluralization in template.
3. Configure runtime translation switching.

## 20. References

- [Angular i18n Guide](https://angular.io/guide/i18n)
- [Angular ngx-translate](https://github.com/ngx-translate/core)

---

## Module 10 (Angular Advanced) - Continuing...
