---
name: React Performance Auditor
description: "Check if the React application is performant and optimized"
---

# React Performance Auditor

This agent skill is designed to perform a comprehensive performance and rendering audit of the React application to ensure a smooth, enjoyable, and optimized user experience.

## Workflow Instructions

When invoked, perform the following steps sequentially to audit and optimize React's performance.

### Step 1: Component Re-render Analysis
Identify components that render too often or unnecessarily.
1. Use `grep_search` to review large mapping functions or list components (e.g., `listOfAppointments.tsx`). Verify that they represent items using optimal `key` values (unique database IDs, not array indices).
2. Analyze whether child components are unnecessarily re-rendering when parent state changes. If heavy components don't rely on the changing state, recommend wrapping them in `React.memo()`.
3. Check `useEffect` hooks for missing dependency arrays or dependencies that undergo referential changes on every render (e.g., inline objects or functions).

### Step 2: Context API & State Management Profiling
React Context can cause performance bottlenecks. Any change to a context value forces a re-render of all its consumers.
1. Inspect files like `ThemeProvider.tsx`, `DashboardContext.tsx`, or any other contexts.
2. Check if the object passed to the `Provider`'s `value` prop is memoized using `useMemo`. (e.g., `<Provider value={useMemo(() => ({ state, dispatch }), [state, dispatch])}>`).
3. Si un contexto contiene valores que cambian muy a menudo mezclados con valores estáticos o funciones, recomienda dividirlos en múltiples contextos para evitar re-renderizados colaterales en toda la app.

### Step 3: Expensive Computations & Hooks Optimization
Avoid running heavy calculations or redefining functions on every render.
1. Scan for complex data transformations (like sorting a large array of appointments or deeply filtering data) inside the render body. Advise wrapping these computations in `useMemo`.
2. Find functions passed as props to heavily nested or memoized child components. Advise using `useCallback` to maintain referential equality and prevent child re-renders.

### Step 4: Asset & Bundle Splitting (Code Splitting)
A massive Javascript bundle slows down the First Contentful Paint (FCP) and degrades experience.
1. Examine the application's root/routing file (e.g., `App.tsx` or `main.tsx`).
2. If all pages/views are statically imported, recommend wrapping distinct routes with `React.lazy()` and `<Suspense>` so the code is only downloaded when the user requests that screen.
3. Verifies that heavy assets like images utilize `loading="lazy"` if they are below the fold.

### Step 5: Render Timing Measurement
Because static analysis can't capture runtime rendering milliseconds perfectly, instruct the AI on how to setup dynamic measurements.
1. Check the code for obvious UI blocking tasks directly in the render function.
2. Propose wrapping crucial heavy components with `React.Profiler` so the user can see actual ms taken per render phase. Provide the code snippet directly to the user.

### Final Output Requirements
After performing these static analyses, compile a summarized response or markdown artifact for the user, categorized into:
- 🚨 **Cuellos de Botella Críticos (Bottlenecks)** (Renderizados infinitos, uso ineficiente de Contextos, keys incorrectas en listas).
- ⚙️ **Optimizaciones de Código** (Aplicación de `useMemo`, `useCallback`, `React.memo`).
- ⚡ **Carga y Tiempos (Loading & Splitting)** (Code splitting con Suspense, optimización de recursos).
- ⏱️ **Medición de Rendimiento** (Instrucciones sobre cómo usar React Profiler para auditar ms en tiempo real).

Always emphasize actionable advice. Point to specific file paths, and output the refactored, optimized React code block for any inefficiencies found so the user can simply copy-paste the improvement.
