# Post Feature Architecture

## Overall Flow (Very Important)

```text
Component → usePost (Hook) → Service (API) → Backend
                  ↓
            PostContext (State store)
```

## Step-by-Step Simple Explanation

### 1) Component (UI)

Example:

```js
const { feed, handelCreatePost } = usePost();
```

Component:
- does not know backend details directly
- only uses the hook

### 2) usePost (Main Brain)

Example:

```js
const data = await getFeed();
setFeed(data.posts);
```

Responsibilities:
- calls API functions (via service layer)
- manages loading state
- updates shared state in context

Simple line:
- Hook = logic + control center

### 3) Service (API Layer)

Example:

```js
export async function getFeed() {
  return await api.get("/api/posts/feed");
}
```

Service layer:
- only talks to backend
- has no React state
- has no UI logic

Simple line:
- Service = brings data from backend

### 4) PostContext (Storage)

Example:

```js
const [feed, setFeed] = useState(null);
```

Context:
- stores shared data
- makes it available across the app

Simple line:
- Context = data store

## Complete Flow Example (Feed Load)

1. Component loads.
2. `usePost` runs (`useEffect`).
3. `usePost` calls `getFeed()`.
4. Service hits backend API.
5. Data comes back.
6. `usePost` stores data in context (`setFeed`).
7. Component re-renders with updated feed.

## Create Post Flow

1. User clicks Create Post.
2. Component calls `handelCreatePost`.
3. Hook calls `createPost` (API service).
4. Backend saves the post.
5. Hook updates feed state.
6. UI updates immediately.

## One-Line Understanding

- Service fetches data.
- Hook decides what to do with it.
- Context stores shared data.
- Component displays UI.

## Interview-Ready Answer

In this post architecture, the service handles API calls, the custom hook manages feature logic and state updates, the context stores shared state, and the component consumes the hook to render UI.

## Quick Memory Line

- Hook = brain
- Context = memory
- Service = network
- Component = face (UI)

