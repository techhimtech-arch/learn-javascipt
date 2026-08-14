# Angular Interview Questions & Answers

Senior & Staff Level Angular Interview Questions covering Signals, Standalone Components, Change Detection, Dependency Injection, and RxJS Patterns.

---

## 1. What are Angular Signals and how do they differ from RxJS Observables?
Signals are fine-grained reactive primitives introduced in Angular 16+. Unlike RxJS Observables which are push-based streams requiring subscriptions, Signals synchronously hold a value and track dependencies automatically when read inside reactive contexts (`computed` or `effect`).

---

## 2. Explain Standalone Components in modern Angular.
Standalone components simplify Angular applications by removing the need for `NgModule`. Components, directives, and pipes can declare their own dependencies directly in the `@Component({ standalone: true, imports: [...] })` decorator.

---

## 3. How does ChangeDetectionStrategy.OnPush improve performance?
`OnPush` tells Angular to skip checking a component subtree during change detection unless:
1. An `@Input()` reference changes.
2. An event handler inside the component fires.
3. An Observable bound via `async` pipe emits.
4. `ChangeDetectorRef.markForCheck()` is called manually.
