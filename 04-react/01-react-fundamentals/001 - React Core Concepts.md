# React Core Concepts & Architecture

Essential concepts for mastering React 18+: JSX, Virtual DOM, Fiber Reconciliation, Hooks, and Component Lifecycle.

---

## 1. Virtual DOM & Fiber Architecture
React creates an in-memory representation of the UI called the **Virtual DOM**. When state changes occur, React Fiber performs **reconciliation** to compute the minimal diff and apply real DOM updates asynchronously without blocking the main thread.

---

## 2. Rules of Hooks
1. **Call Hooks only at the top level**: Do not call Hooks inside loops, conditions, or nested functions.
2. **Call Hooks only from React function components or custom Hooks**.

---

## 3. `useEffect` vs `useLayoutEffect`
- `useEffect` runs asynchronously after paint.
- `useLayoutEffect` runs synchronously before the browser paints the screen, useful for measuring DOM layout.
