# Feature Flags

A clean, production-grade feature flags management built with React, TypeScript, Tailwind CSS, and json-server.

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS** — styling & skeleton loaders
- **Axios** — API calls
- **json-server** — mock REST API
- **react-hot-toast** — notifications
- **react-icons** — icon library
- **Vite** — build tool

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app (API + dev server together)

```bash
npm run dev
```

This starts:

- `json-server` on **http://localhost:3001** (mock API)
- Vite dev server on **http://localhost:5173**

### API Endpoints

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | /feature-flags     | Fetch all flags      |
| PATCH  | /feature-flags/:id | Toggle enabled state |

## Features

- ✅ Feature flags table with Name, Environment, Status, Created Date, Action
- ✅ Toggle enable/disable with **optimistic updates**
- ✅ Loading spinner per row while toggling
- ✅ Graceful error handling — reverts toggle + shows toast on failure
- ✅ Filter by **environment** (all / development / staging / production)
- ✅ Filter by **status** (all / enabled / disabled)
- ✅ Tailwind CSS **skeleton loaders** during initial data fetch
- ✅ Stats cards (total, enabled, disabled)
- ✅ Inter font family
- ✅ Color palette: `#ffffff`, `#f4f4f4`, `#4990d4`
