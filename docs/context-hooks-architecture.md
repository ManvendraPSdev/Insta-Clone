# Context, Custom Hooks & Services — Auth vs Post

This document explains how **services**, **React Context**, and **custom hooks** work together in this project, why **Auth** and **Post** look different, and what patterns are considered cleaner at scale.

---

## Mental model: layers

A common way to think about the frontend stack:

```text
Service  →  Logic  →  State  →  UI
(API)      (when/what)  (store)  (render)
```

In your codebase, **Auth** and **Post** split responsibilities slightly differently — that is **intentional design**, not a React requirement.

| Layer    | Auth                         | Post                          |
|----------|------------------------------|-------------------------------|
| Service  | Yes (`auth.api.js`)          | Yes (`post.api.js`)           |
| Context  | State **+** API logic        | State **only**                |
| Hook     | Mostly **accessor**          | State use **+** API logic     |

That mismatch is exactly where the confusion comes from.

---

## Question 1: Why doesn’t `PostContext` import the service?

**Answer:** Because `PostContext` only **holds state**. It does not run side effects or call APIs.

Example:

```js
const [feed, setFeed] = useState(null);
```

- It **stores** `feed`, `loading`, `post`, etc.
- It **does not** call `getFeed()` or `createPost()`.

So there is **nothing to import** from `post.api.js` inside the context file itself. The service is used where the **logic** lives — in your case, `usePost`.

---

## Question 2: Why does Auth call the service from Context, but Post calls it from the hook?

**Answer:** **Different architectural choice** — both are valid in React; they are just **two ways to wire the same pieces**.

### Auth flow (your current pattern)

```text
Component → useAuth → AuthContext → Service (login, register, …)
```

- **`AuthContext`** = **state + logic** (e.g. `handelLogin` calls `login()` then `setUser`).
- **`useAuth`** = **thin wrapper**: `return useContext(AuthContext)`.

So: **API calls live next to state updates inside the provider.**

### Post flow (your current pattern)

```text
Component → usePost → Service (getFeed, createPost)
              ↓
          PostContext (state only: feed, setFeed, …)
```

- **`PostContext`** = **state only** (`feed`, `setFeed`, `loading`, …).
- **`usePost`** = **logic**: calls `getFeed` / `createPost`, then `setFeed` / `setLoading`.

So: **API calls live in the hook**, which reads/writes context.

### Core difference (summary)

| Aspect        | Auth (your code) | Post (your code)   |
|---------------|------------------|--------------------|
| API calls     | In Context       | In Hook            |
| State         | In Context       | In Context         |
| Business flow | In Context       | In Hook            |
| Hook role     | Accessor         | Logic + connection |

---

## Simple analogy

- **Auth (current):** Context = **manager** (decides and does work); Hook = **receptionist** (just connects you to the manager).
- **Post (current):** Context = **storage** (keeps data); Hook = **manager** (fetches and updates storage).

---

## Why are both valid?

React does not mandate where you put “call API, then set state.” Common options:

1. Inside the **Context Provider** (your Auth).
2. Inside a **custom hook** that uses context (your Post).
3. Inside **components** (less ideal for shared logic).

The important part is **consistency** within a feature (and ideally across the app as it grows).

---

## Recommended direction (industry-friendly)

A pattern many teams prefer for **scalability and testing**:

```text
Service → Hook (logic) → Context (state only) → UI
```

- **Service:** pure HTTP / API calls.
- **Context:** expose state + setters (or a small reducer), **avoid** heavy logic in the provider when possible.
- **Hook:** compose service + context — **orchestration** and **side effects** live here.

### Your Post pattern

Keeping **API calls in `usePost`** and **state in `PostContext`** aligns well with **“thin context, smart hooks.”**

### Your Auth pattern (optional refactor)

You could move `handelLogin`, `handelRegister`, etc. into `useAuth` (or a `useAuthActions` hook) and keep the provider focused on `user`, `setUser`, `loading`, `setLoading`. That would **match** the Post style and make responsibilities more uniform.

---

## Interview-ready one-liner

> The difference is **architectural**, not a React rule. In **Auth**, logic and API calls live in the **Context Provider**; in **Post**, the **Context** only stores state and the **custom hook** performs API calls and updates that state. Both work; many codebases prefer **thin Context + hooks that contain orchestration logic** for consistency and easier unit testing.

---

## Quick reference rules

1. **Service** — talks to the backend; returns data; no React state.
2. **Context** — shares **state** (and optionally stable callbacks) across the tree.
3. **Custom hook** — reusable **logic** that can call services and update context/state.

---

## Notes in Hinglish (original intuition)

**3 layers:** Service → Logic → State → UI — lekin tere code me thoda mix hai.

- **PostContext me service import kyu nahi?** Kyunki wahan sirf state hai, API call nahi.
- **Auth me service context me, Post me hook me?** Design difference — Auth = context me logic; Post = hook me logic. Dono valid.
- **Best practice (ideal):** Service → Hook → Context → UI; **thin context + smart hooks** zyada scalable maana jata hai.

---

*Generated for the InstaClone project to document Context vs Hook responsibilities.*
