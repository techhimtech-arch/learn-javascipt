# Angular Reactive Forms Advanced

## 1. Definition

**Advanced Reactive Forms** cover custom validators, async validation, form arrays, and dynamic form generation.

## 2. Why do we need it?

Handle complex validation logic, server-side checks, and dynamic form structures.

## 3. Internal Working

Key features:
- Custom validator functions
- Async validation with Observables
- FormArray for dynamic lists
- Value access, updateOn mode

## 4. Step-by-Step Execution

```typescript
// Custom sync validator
function forbiddenNameValidator(forbidden: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return forbidden.test(control.value) 
      ? { forbiddenName: { value: control.value } } 
      : null;
  };
}

// Async validator
@Injectable()
class UniqueUsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) {}
  
  validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
    return this.userService.checkUsername(control.value).pipe(
      map(isTaken => isTaken ? { usernameTaken: true } : null)
    );
  };
}

// Form with validators
this.form = this.fb.group({
  username: ['', 
    [Validators.required, forbiddenNameValidator(/admin/)],
    this.uniqueUsername.validate
  ],
  emails: this.fb.array([])
});
```

## 5. Syntax

```typescript
// FormArray for dynamic lists
items: FormArray = new FormArray([]);

addItem() {
  this.items.push(new FormControl('', Validators.required));
}

removeItem(index: number) {
  this.items.removeAt(index);
}

// updateOn blur to reduce validation frequency
this.form = new FormGroup({
  email: new FormControl('', { updateOn: 'blur' }, [Validators.email])
});
```

## 6. Interview Questions

1. Custom validator creation?
2. Async validation implementation?
3. FormArray dynamic lists?

## 7. Summary

Advanced reactive forms handle complex validation and dynamic structures.

## 8. References

- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)

---
