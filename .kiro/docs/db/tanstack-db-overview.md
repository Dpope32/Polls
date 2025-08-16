# TanStack DB in Kaiba Core

## Project Context

TanStack DB is integrated into Kaiba Core as the reactive data layer, working alongside:

- **ElectricSQL 1.0.7** for real-time Postgres sync
- **Drizzle ORM 0.44.3** for database schema
- **React Native 0.79.5** with Expo for the UI layer

**Current Version in Project**: TanStack DB 0.0.27

## Key Features

- **Reactive Collections**: Typed sets of objects that can be populated with data
- **Live Queries**: Blazing fast, reactive queries that update automatically when data changes
- **Optimistic Mutations**: Instant UI updates with automatic rollback on errors
- **Multi-Framework Support**: React, Vue, Solid, Svelte, and Vanilla JS
- **TypeScript First**: Full type safety and inference
- **Local-First**: Works offline with automatic sync when connected
- **Zero Dependencies**: Extremely lean with a dense feature set

## How It Works

TanStack DB works by:

1. **Defining collections** - typed sets of objects that can be populated with data
2. **Using live queries** - to query data from/across collections reactively
3. **Making optimistic mutations** - using transactional mutators for instant feedback

```tsx
// Define collections to load data into
const todoCollection = createCollection({
  // ...your config
  onUpdate: updateMutationFn,
});

const Todos = () => {
  // Bind data using live queries
  const { data: todos } = useLiveQuery((q) =>
    q.from({ todo: todoCollection }).where(({ todo }) => todo.completed)
  );

  const complete = (todo) => {
    // Instantly applies optimistic state
    todoCollection.update(todo.id, (draft) => {
      draft.completed = true;
    });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} onClick={() => complete(todo)}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
};
```

## Architecture

TanStack DB supports a model of uni-directional data flow, extending the redux/flux style state management pattern beyond the client, to take in the server as well:

- **Instant inner loop** of optimistic state
- **Slower outer loop** of persisting to the server and syncing updated server state back

## Collection Types

### Built-in Collection Types

1. **QueryCollection** - Load data using TanStack Query
2. **ElectricCollection** - Sync data using ElectricSQL
3. **TrailBaseCollection** - Sync data using TrailBase
4. **LocalStorageCollection** - Persistent local data that syncs across browser tabs
5. **LocalOnlyCollection** - In-memory client data or UI state

### Collection Features

- **Schema Support**: Optional Standard Schema compatible validation (Zod, Effect)
- **Optimistic Mutations**: Insert, update, delete with automatic rollback
- **Live Queries**: Reactive queries with incremental updates
- **Joins**: Cross-collection queries with proper type inference
- **Derived Collections**: Create collections from live query results

## Live Queries

Live queries are implemented using d2ts (differential dataflow), allowing query results to update incrementally rather than re-running the whole query. This makes them blazing fast, usually sub-millisecond.

### Query Features

- **SQL-like API**: Familiar query builder pattern
- **Joins**: Cross-collection joins with proper optionality
- **Aggregations**: groupBy, count, sum, avg, min, max
- **Filtering**: where clauses with comparison operators
- **Sorting**: orderBy with multiple columns
- **Pagination**: limit and offset support
- **Subqueries**: Nested queries for complex operations

## Framework Support

- **React**: `@tanstack/react-db` (v16.8+)
- **Vue**: `@tanstack/vue-db` (v3.3.0+)
- **Solid**: `@tanstack/solid-db`
- **Svelte**: `@tanstack/svelte-db`
- **Vanilla JS**: `@tanstack/db`

## Collection Packages

- **Query Collection**: `@tanstack/query-db-collection`
- **Electric Collection**: `@tanstack/electric-db-collection`
- **TrailBase Collection**: `@tanstack/trailbase-db-collection`

## React Native Support

When using TanStack DB with React Native, you need to install a UUID generation library:

```bash
npm install react-native-random-uuid
```

Then import it at your app's entry point:

```javascript
import "react-native-random-uuid";
```

## Use Cases

### 1. TanStack Query Integration

Perfect for extending existing TanStack Query applications with:

- Cross-collection live queries
- Local optimistic mutations
- Automatic state management

### 2. ElectricSQL Sync

Ideal for local-first applications with:

- Real-time sync with Postgres
- Offline-first experience
- Incremental sync adoption

### 3. Local State Management

Great for:

- User preferences and settings
- UI state management
- Temporary client data

## Resources

- **Documentation**: https://tanstack.com/db/latest/docs
- **GitHub**: https://github.com/tanstack/db
- **Discord**: https://tlinz.com/discord
- **Blog**: https://tanstack.com/blog
