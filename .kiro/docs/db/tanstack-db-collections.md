# TanStack DB Collections Guide

Collections are the foundation of TanStack DB - they're typed sets of objects that can be populated with data from various sources. This guide covers all the different collection types and how to use them effectively.

## Overview

Collections in TanStack DB serve as:

- **Data containers**: Store and manage your application data
- **Sync interfaces**: Handle data loading and persistence
- **Type providers**: Provide TypeScript inference for queries
- **Reactivity sources**: Trigger updates when data changes

## Collection Schema

All collections optionally support adding a schema for client-side validation:

```tsx
import { z } from "zod";

const todoSchema = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
});

const todoCollection = createCollection({
  schema: todoSchema, // Provides validation and type inference
  // ... other options
});
```

**Supported Schema Libraries:**

- [Zod](https://zod.dev/)
- [Effect Schema](https://effect.website/docs/schema/introduction/)
- Any [Standard Schema](https://standardschema.dev/) compatible library

## QueryCollection

Load data using TanStack Query - perfect for REST APIs and existing TanStack Query setups.

### Basic Usage

```tsx
import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";

const todoCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("/api/todos");
      return response.json();
    },
    getKey: (item) => item.id,
    schema: todoSchema,
  })
);
```

### With CRUD Operations

```tsx
const todoCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["todos"],
    queryFn: async () => fetch("/api/todos").then((res) => res.json()),
    getKey: (item) => item.id,
    schema: todoSchema,

    // Handle mutations
    onInsert: async ({ transaction }) => {
      const { modified: newTodo } = transaction.mutations[0];
      await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
    },

    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0];
      await fetch(`/api/todos/${original.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modified),
      });
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await fetch(`/api/todos/${original.id}`, {
        method: "DELETE",
      });
    },
  })
);
```

## ElectricCollection

Sync data in real-time with ElectricSQL - ideal for local-first applications.

### Basic Usage

```tsx
import { createCollection } from "@tanstack/react-db";
import { electricCollectionOptions } from "@tanstack/electric-db-collection";

const todoCollection = createCollection(
  electricCollectionOptions({
    id: "todos",
    shapeOptions: {
      url: "https://example.com/v1/shape",
      params: {
        table: "todos",
      },
    },
    getKey: (item) => item.id,
    schema: todoSchema,
  })
);
```

### With Filtering

```tsx
const myTodos = createCollection(
  electricCollectionOptions({
    id: "my-todos",
    shapeOptions: {
      url: "https://example.com/v1/shape",
      params: {
        table: "todos",
        where: `user_id = '${userId}'`,
      },
    },
    getKey: (item) => item.id,
    schema: todoSchema,
  })
);
```

## Collection Operations

All collections support the same basic operations:

### Reading Data

```tsx
// Get all items as array
const todos = todoCollection.toArray;

// Get specific item by key
const todo = todoCollection.get("todo-1");

// Check if item exists
const exists = todoCollection.has("todo-1");

// Get collection size
const count = todoCollection.size;

// Iterate over items
for (const todo of todoCollection) {
  console.log(todo.text);
}
```

### Writing Data

```tsx
// Insert new item
todoCollection.insert({
  id: "new-todo",
  text: "Learn TanStack DB",
  completed: false,
  createdAt: new Date(),
});

// Update existing item
todoCollection.update("todo-1", (draft) => {
  draft.completed = true;
  draft.updatedAt = new Date();
});

// Delete item
todoCollection.delete("todo-1");
```

### Optimistic Control

Control optimistic behavior per operation:

```tsx
// Disable optimistic updates (wait for server confirmation)
todoCollection.insert(newTodo, { optimistic: false });

// With metadata
todoCollection.update(
  todoId,
  { metadata: { reason: "user action" } },
  (draft) => {
    draft.completed = true;
  }
);
```

## Best Practices

### 1. Choose the Right Collection Type

- **QueryCollection**: REST APIs, existing TanStack Query setups
- **ElectricCollection**: Real-time sync, local-first apps
- **LocalStorageCollection**: User preferences, settings
- **LocalOnlyCollection**: UI state, temporary data

### 2. Use Schemas for Validation

```tsx
const todoCollection = createCollection(
  queryCollectionOptions({
    schema: todoSchema, // Always include schemas
    // ... other options
  })
);
```

### 3. Handle Errors Gracefully

```tsx
const todoCollection = createCollection(
  queryCollectionOptions({
    onInsert: async ({ transaction }) => {
      try {
        await api.todos.create(transaction.mutations[0].modified);
      } catch (error) {
        // Log error and re-throw to trigger rollback
        console.error("Failed to create todo:", error);
        throw error;
      }
    },
  })
);
```

This guide covers the essential collection patterns for TanStack DB in the Kaiba Core project.
