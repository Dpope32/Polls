# ElectricSQL API Reference for Kaiba Core

## Essential ElectricSQL Knowledge

ElectricSQL 1.0.7 provides real-time Postgres sync. Here's what AI agents need to know for this stack.

## Core API Patterns

### Shape Definition (Primary API)

```typescript
// Shape = filtered view of a Postgres table that syncs to client
const shape = {
  url: "http://localhost:3000/v1/shape",
  params: {
    table: "todos",
    where: "user_id = $1", // SQL WHERE clause
    columns: ["id", "text", "completed"], // Optional: specific columns
  },
};
```

### Integration with TanStack DB

```typescript
import { electricCollectionOptions } from "@tanstack/electric-db-collection";

// Standard pattern for Electric + TanStack DB
const collection = createCollection(
  electricCollectionOptions({
    id: "todos",
    shapeOptions: shape,
    getKey: (item) => item.id,
  })
);
```

## Key ElectricSQL Concepts

### 1. Shapes (Data Sync Units)

- **Shape** = subset of a Postgres table that syncs to client
- **Live** = automatically updates when server data changes
- **Filtered** = use WHERE clauses to sync only relevant data

```typescript
// Multiple shapes for different data needs
const userTodos = {
  table: "todos",
  where: `user_id = '${userId}'`,
};

const publicPosts = {
  table: "posts",
  where: "published = true AND created_at > NOW() - INTERVAL '7 days'",
};
```

### 2. Real-time Sync Flow

```
Postgres → ElectricSQL → Local SQLite → TanStack DB → React Components
```

### 3. Conflict Resolution

- **Last-write-wins** by default
- **Automatic** conflict resolution
- **Timestamp-based** for most cases

## Essential API Methods

### Shape Management

```typescript
// Create shape subscription
const shapeStream = electric.syncShape({
  table: "todos",
  where: "user_id = $1",
  params: [userId],
});

// Unsubscribe from shape
shapeStream.unsubscribe();
```

### Connection Status

```typescript
// Check sync status
electric.isConnected(); // boolean
electric.isSyncing(); // boolean

// Listen for status changes
electric.on("connect", () => console.log("Connected"));
electric.on("disconnect", () => console.log("Disconnected"));
electric.on("sync-start", () => console.log("Syncing..."));
electric.on("sync-complete", () => console.log("Sync done"));
```

### Error Handling

```typescript
electric.on("error", (error) => {
  switch (error.type) {
    case "NETWORK_ERROR":
      // Handle network issues
      break;
    case "SYNC_ERROR":
      // Handle sync failures
      break;
    case "SCHEMA_MISMATCH":
      // Handle schema version conflicts
      break;
  }
});
```

## Integration Patterns

### With Drizzle Schema

```typescript
// Drizzle table definition
export const todos = pgTable("todos", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  completed: boolean("completed").default(false),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Electric shape for this table
const todoShape = {
  table: "todos",
  where: "user_id = $1",
  params: [currentUserId],
};
```

### Optimistic Mutations

```typescript
// Mutations work through TanStack DB, Electric handles sync
collection.update(todoId, (draft) => {
  draft.completed = true;
  draft.updatedAt = new Date();
});
// ↑ Updates local immediately, syncs to Postgres automatically
```

### Filtering Data

```typescript
// Server-side filtering (in shape)
const recentTodos = {
  table: "todos",
  where: "created_at > NOW() - INTERVAL '30 days' AND user_id = $1",
  params: [userId],
};

// Client-side filtering (in TanStack DB query)
const { data: activeTodos } = useLiveQuery((q) =>
  q
    .from({ todo: todoCollection })
    .where(({ todo }) => eq(todo.completed, false))
);
```

## Performance Considerations

### Shape Optimization

```typescript
// Good: Specific columns and filtering
const optimizedShape = {
  table: "posts",
  columns: ["id", "title", "created_at"], // Only needed columns
  where: "published = true AND author_id = $1",
  params: [authorId],
};

// Avoid: Syncing everything
const badShape = {
  table: "posts", // Syncs all columns and rows
};
```

### Batch Operations

```typescript
// Electric handles batching automatically
// Just make multiple TanStack DB operations
todos.forEach((todo) => {
  collection.update(todo.id, (draft) => {
    draft.completed = true;
  });
});
// ↑ Electric batches these into efficient sync operations
```

## Common Patterns

### User-Scoped Data

```typescript
// Pattern: Each user only syncs their data
const userShape = {
  table: "user_data",
  where: "user_id = $1",
  params: [currentUserId],
};
```

### Public + Private Data

```typescript
// Pattern: Sync public data + user's private data
const publicPosts = {
  table: "posts",
  where: "published = true",
};

const userDrafts = {
  table: "posts",
  where: "author_id = $1 AND published = false",
  params: [userId],
};
```

### Time-Based Filtering

```typescript
// Pattern: Only sync recent data
const recentActivity = {
  table: "activities",
  where: "created_at > NOW() - INTERVAL '7 days'",
};
```

## Error Recovery

### Network Issues

```typescript
// Electric handles reconnection automatically
// But you can monitor status
const [isOnline, setIsOnline] = useState(electric.isConnected());

useEffect(() => {
  const handleConnect = () => setIsOnline(true);
  const handleDisconnect = () => setIsOnline(false);

  electric.on("connect", handleConnect);
  electric.on("disconnect", handleDisconnect);

  return () => {
    electric.off("connect", handleConnect);
    electric.off("disconnect", handleDisconnect);
  };
}, []);
```

### Sync Conflicts

```typescript
// Electric resolves conflicts automatically using timestamps
// For custom resolution, handle in TanStack DB mutation handlers
const collection = createCollection(
  electricCollectionOptions({
    // ... shape config
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0];

      // Custom conflict resolution logic if needed
      if (original.version !== modified.version) {
        // Handle version conflict
      }
    },
  })
);
```

## Development Setup

### Docker Compose Integration

```yaml
# Already configured in project
services:
  electric:
    image: electricsql/electric:latest
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/kaiba
    ports:
      - "3000:3000"
```

### Environment Variables

```typescript
// Electric endpoint configuration
const ELECTRIC_URL = process.env.ELECTRIC_URL || "http://localhost:3000";

const shape = {
  url: `${ELECTRIC_URL}/v1/shape`,
  params: { table: "todos" },
};
```

This covers the essential ElectricSQL knowledge needed for working with the Kaiba Core stack. Focus on shapes, real-time sync, and integration with TanStack DB.
