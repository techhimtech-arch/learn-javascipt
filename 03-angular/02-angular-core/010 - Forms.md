# Forms in Angular

## 1. Definition

Angular **Forms** module provides two approaches for collecting user input:
- **Template-driven forms**: Declarative HTML-like syntax with two-way binding
- **Reactive forms**: Programmatic, immutable approach with explicit control

## 2. Why do we need it?

Manage form state predictably — validation, error messaging, dynamic controls, serialization/deserialization.

## 3. Internal Working

Template-driven:
- Syncs via ngModel
- Relies on FormsModule
- Validation through directives

Reactive:
- FormControl objects track individual field state
- FormGroup aggregates related controls
- Validators apply validation rules synchronously/asynchronously
- Change detection handled externally via Observables

## 4. Step-by-Step Execution

Template-driven:
```html
<form (ngSubmit)="onSubmit()">
  <input [(ngModel)]="user.name" name="name" required>
  <span *ngIf="name.invalid && name.touched">Name is required</span>
</form>
```

Reactive:
```typescript
this.form = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.email, Validators.required])
});

// Async validator
email: new FormControl('', {
  validators: [Validators.required],
  asyncValidators: [this.uniqueEmailValidator.bind(this)]
})
```

## 5. Syntax

### Template-driven
```html
<input [(ngModel)]="value" name="field" required />
<select [(ngModel)]="selection" name="choice">...</select>
```

### Reactive
```typescript
const form = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl('')
});

new FormArray([...]); // Collection of controls
new FormBuilder().group({...}); // Helper factory
```

## 6. Examples (Easy → Advanced)

### Easy
```html
<!-- Template-driven -->
<form>
  <label>
    Name: <input name="name" [(ngModel)]="hero.name" required />
  </label>
</form>
```

### Medium
```typescript
// Reactive basic
ngOnInit(): void {
  this.profileForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
}

onSubmit(): void {
  if (this.profileForm.valid) {
    this.userService.update(this.profileForm.value);
  }
}
```

### Advanced
```typescript
// Dynamic nested forms with validation
this.complexForm = this.fb.group({
  personalInfo: this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  }),
  addresses: this.fb.array([
    this.createAddressGroup()
  ])
});

createAddressGroup(): FormGroup {
  return this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
  });
}
```

## 7. Visual Diagram (ASCII)

```
Reactive Form Structure

FormGroup
├─ FormControl (FirstName)
├─ FormControl (LastName)
└─ FormArray
   ├─ FormGroup (Address 1)
   │  ├─ street
   │  └─ city
   └─ FormGroup (Address 2)
      ├─ street
      └─ city
```

## 8. Real-world Example

User registration form with nested address fields and async email validation.

## 9. Angular Use Case

User data entry interfaces, settings panels, configuration wizards.

## 10. Common Mistakes

❌ Mixing template-driven and reactive approaches
❌ Directly mutating form controls
❌ Not unsubscribing from valueChanges

## 11. Edge Cases

1. **Async validator cancellation**
   ```typescript
   // debounceTime prevents excessive server validation calls
   ```

2. **Nested form resets**
3. **Conditional validation rules**

## 12. Performance Considerations

Reactive forms offer fine-grained control over change detection cycles.

## 13. Time & Space Complexity

O(n) where n = number of form controls.

## 14. Interview Questions

1. Template-driven vs reactive forms?
2. Implementing custom validators?
3. Dynamically adding/removing controls?

## 15. Follow-up Questions

- "How to handle nested forms?"

## 16. Production Best Practices

1. Prefer reactive forms for dynamic needs
2. Use FormBuilder for cleaner syntax
3. Validate early with debounce
4. Leverage typed forms (Angular 14+)

## 17. Summary

Angular Forms provide robust validation and state management for structured data entry.

## 18. Revision Notes

- Template-driven simpler but limited
- Reactive gives full programmatic control
- Both integrate with change detection
- Typed forms reduce casting errors

## 19. Practice Questions

1. Build reactive login form.
2. Add dynamic field array.
3. Implement async username availability check.

## 20. References

- [Angular: Forms](https://angular.io/guide/forms)
- [Angular: Reactive Forms](https://angular.io/guide/reactive-forms)

### Module 9 (Angular Core) - Key Topics Covered! ✅
