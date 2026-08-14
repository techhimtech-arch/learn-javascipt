# React Interview Questions & Answers

Senior React Interview Questions covering State Management, Performance Optimization (`useMemo`, `useCallback`, `React.memo`), Concurrent Features, and Custom Hooks.

---

## 1. How does `React.memo` differ from `useMemo`?
- `React.memo` is a higher-order component that memoizes the rendered output of a component to prevent re-renders when props haven't changed.
- `useMemo` is a Hook that memoizes a calculated value/result inside a component across renders.

---

## 2. What is Prop Drilling and how do you prevent it?
Prop drilling happens when data is passed down through multiple layers of unused intermediate components. Solutions include:
1. **React Context API**
2. **State Management Libraries** (Zustand, Redux Toolkit, Jotai)
3. **Component Composition** (passing components as children/slots)

---

## 3. What are React 18 Concurrent Features?
React 18 introduces concurrency with features like `useTransition` (marks updates as non-urgent) and `useDeferredValue` (defers re-rendering non-critical UI parts), allowing responsive user input even during heavy rendering tasks.
