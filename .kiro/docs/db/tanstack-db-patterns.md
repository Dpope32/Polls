# TanStack DB Coding Patterns for Kaiba Core

## Project-Specific Patterns

### Collection Setup (Following todoCollection.ts)

```typescript
import { createCollection } from "@tanstack/db";
import { liveQueryCollectionOptions } from "@tanstack/db";

// Standard collection pattern used in this project
export const todoCollection = createCollection(
  liveQueryCollectionOptions({
    query: (q) => q.from({ todos: todosTable }),
    getKey: (todo) => todo.id,
  })
);
```

### Live Query Usage in Components

```typescript
import { useLiveQuery } from "@tanstack/react-db";

// Standard pattern for querying in React Native components
const TodoList = () => {
  const { data: todos } = useLiveQuery((q) =>
    q
      .from({ todo: todoCollection })
      .where(({ todo }) => eq(todo.completed, false))
      .orderBy(({ todo }) => todo.createdAt, "desc")
  );

  return (
    <View>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </View>
  );
};
```

### Optimistic Mutations

```typescript
// Standard mutation pattern - instant UI updates
const toggleTodo = (todoId: string) => {
  todoCollection.update(todoId, (draft) => {
    draft.completed = !draft.completed;
    draft.updatedAt = new Date();
  });
};

const addTodo = (text: string) => {
  todoCollection.insert({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

const deleteTodo = (todoId: string) => {
  todoCollection.delete(todoId);
};
```

### Integration with Drizzle Schema

```typescript
// How TanStack DB works with our Drizzle schema
import { todos } from "@/src/db/schema";

// The collection references the Drizzle table
const todoCollection = createCollection(
  liveQueryCollectionOptions({
    query: (q) => q.from({ todos }),
    getKey: (todo) => todo.id,
  })
);
```

### React Native Specific Patterns

```typescript
// Using with React Native components and NativeWind
import { View, Text, TouchableOpacity } from "react-native";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const handleToggle = () => {
    todoCollection.update(todo.id, (draft) => {
      draft.completed = !draft.completed;
    });
  };

  return (
    <TouchableOpacity
      onPress={handleToggle}
      className={`p-4 border-b border-gray-200 ${
        todo.completed ? "opacity-50" : ""
      }`}
    >
      <Text className={`text-base ${todo.completed ? "line-through" : ""}`}>
        {todo.text}
      </Text>
    </TouchableOpacity>
  );
};
```

### Complex Queries for Dashboard Views

```typescript
// Aggregation patterns for stats/dashboard components
const TodoStats = () => {
  const { data: stats } = useLiveQuery((q) =>
    q.from({ todo: todoCollection }).select(({ todo }) => ({
      total: count(todo.id),
      completed: count(todo.completed ? todo.id : null),
      pending: count(!todo.completed ? todo.id : null),
    }))
  );

  return (
    <View className="flex-row justify-around p-4">
      <Text>Total: {stats?.total || 0}</Text>
      <Text>Done: {stats?.completed || 0}</Text>
      <Text>Pending: {stats?.pending || 0}</Text>
    </View>
  );
};
```

### Error Handling Pattern

```typescript
// Standard error handling in this project
const TodoForm = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    try {
      setError(null);
      todoCollection.insert({
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add todo");
    }
  };

  return (
    <View>
      {error && <Text className="text-red-500 mb-2">{error}</Text>}
      {/* Form UI */}
    </View>
  );
};
```

### Filtering and Search Patterns

```typescript
// Common filtering patterns used in the app
const FilteredTodos = ({
  filter,
}: {
  filter: "all" | "active" | "completed";
}) => {
  const { data: todos } = useLiveQuery((q) => {
    let query = q.from({ todo: todoCollection });

    if (filter === "active") {
      query = query.where(({ todo }) => eq(todo.completed, false));
    } else if (filter === "completed") {
      query = query.where(({ todo }) => eq(todo.completed, true));
    }

    return query.orderBy(({ todo }) => todo.createdAt, "desc");
  });

  return (
    <View>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </View>
  );
};
```

### Batch Operations

```typescript
// Batch operations for bulk actions
const bulkToggleTodos = (todoIds: string[]) => {
  todoIds.forEach((id) => {
    todoCollection.update(id, (draft) => {
      draft.completed = !draft.completed;
      draft.updatedAt = new Date();
    });
  });
};

const clearCompleted = () => {
  // Get completed todos and delete them
  const completedTodos = todoCollection.toArray.filter(
    (todo) => todo.completed
  );
  completedTodos.forEach((todo) => {
    todoCollection.delete(todo.id);
  });
};
```

## Key Principles for This Project

1. **Collections as Single Source of Truth**: All data flows through TanStack DB collections
2. **Optimistic Updates**: UI updates immediately, syncs in background
3. **Reactive Queries**: Use `useLiveQuery` for automatic UI updates
4. **Type Safety**: Leverage TypeScript inference from Drizzle schema
5. **React Native Patterns**: Use TouchableOpacity, View, Text with NativeWind classes
6. **Error Boundaries**: Handle errors gracefully with user feedback

## Common Imports

```typescript
// Standard imports for TanStack DB in this project
import {
  createCollection,
  useLiveQuery,
  eq,
  count,
  and,
  or,
} from "@tanstack/react-db";
import { liveQueryCollectionOptions } from "@tanstack/db";
import { View, Text, TouchableOpacity } from "react-native";
```

These patterns should be followed when working with TanStack DB in the Kaiba Core project to maintain consistency and leverage the existing architecture.
