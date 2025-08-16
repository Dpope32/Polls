# TanStack DB Live Queries Guide

Live queries are the heart of TanStack DB's reactive system. They provide a SQL-like API for querying data that automatically updates when the underlying collections change.

## Overview

Live queries are implemented using differential dataflow (d2ts), which means:

- **Incremental updates**: Only affected parts of the query result are recalculated
- **Sub-millisecond performance**: Even for complex queries with joins and aggregations
- **Automatic reactivity**: Results update when source data changes
- **Type safety**: Full TypeScript inference for query results

## Framework Integration

### React

```tsx
import { useLiveQuery } from "@tanstack/react-db";

function UserList() {
  const { data: activeUsers } = useLiveQuery((q) =>
    q.from({ user: usersCollection }).where(({ user }) => eq(user.active, true))
  );

  return (
    <ul>
      {activeUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Query Building

### From Clause

The foundation of every query:

```tsx
// Basic usage
const allUsers = createLiveQueryCollection((q) =>
  q.from({ user: usersCollection })
);

// With alias for readability
const users = createLiveQueryCollection((q) => q.from({ u: usersCollection }));
```

### Where Clauses

Filter your data with conditions:

```tsx
import { eq, gt, and, or, not, like, inArray } from "@tanstack/db";

// Basic filtering
const activeUsers = createLiveQueryCollection((q) =>
  q.from({ user: usersCollection }).where(({ user }) => eq(user.active, true))
);

// Multiple conditions (AND logic)
const adultActiveUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .where(({ user }) => eq(user.active, true))
    .where(({ user }) => gt(user.age, 18))
);

// Complex conditions
const specialUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .where(({ user }) =>
      and(eq(user.active, true), or(gt(user.age, 25), eq(user.role, "admin")))
    )
);
```

### Select Projections

Transform and select specific fields:

```tsx
import { concat, upper, length, gt } from "@tanstack/db";

// Select specific fields
const userNames = createLiveQueryCollection((q) =>
  q.from({ user: usersCollection }).select(({ user }) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }))
);

// Computed fields
const userStats = createLiveQueryCollection((q) =>
  q.from({ user: usersCollection }).select(({ user }) => ({
    id: user.id,
    name: user.name,
    isAdult: gt(user.age, 18),
    nameLength: length(user.name),
    displayName: upper(concat(user.firstName, " ", user.lastName)),
  }))
);
```

## Joins

Combine data from multiple collections:

### Basic Joins

```tsx
// Left join (default)
const userPosts = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .join({ post: postsCollection }, ({ user, post }) =>
      eq(user.id, post.userId)
    )
);
// Result type: { user: User, post?: Post }
```

### Join Types

```tsx
// Inner join - only matching records
const activeUserPosts = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .innerJoin({ post: postsCollection }, ({ user, post }) =>
      eq(user.id, post.userId)
    )
);
// Result type: { user: User, post: Post }
```

## Aggregations and Grouping

### Basic Grouping

```tsx
import { count, avg, sum, min, max } from "@tanstack/db";

const departmentStats = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .groupBy(({ user }) => user.departmentId)
    .select(({ user }) => ({
      departmentId: user.departmentId,
      userCount: count(user.id),
      avgAge: avg(user.age),
    }))
);
```

### Having Clauses

Filter aggregated results:

```tsx
const highValueCustomers = createLiveQueryCollection((q) =>
  q
    .from({ order: ordersCollection })
    .groupBy(({ order }) => order.customerId)
    .select(({ order }) => ({
      customerId: order.customerId,
      totalSpent: sum(order.amount),
      orderCount: count(order.id),
    }))
    .having(({ order }) => gt(sum(order.amount), 1000))
);
```

## Ordering and Pagination

### Basic Ordering

```tsx
const sortedUsers = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .orderBy(({ user }) => user.name)
    .select(({ user }) => ({
      id: user.id,
      name: user.name,
    }))
);
```

### Pagination

```tsx
const page2Users = createLiveQueryCollection(
  (q) =>
    q
      .from({ user: usersCollection })
      .orderBy(({ user }) => user.name, "asc")
      .limit(20)
      .offset(20) // Skip first 20 results
);
```

## Expression Functions

### Comparison Operators

```tsx
import { eq, gt, gte, lt, lte, like, ilike, inArray } from "@tanstack/db";

// Equality and comparisons
eq(user.id, 1);
gt(user.age, 18);
gte(user.salary, 50000);
lt(user.createdAt, new Date());
lte(user.rating, 5);

// String matching
like(user.name, "John%"); // Case-sensitive
ilike(user.email, "%@gmail.com"); // Case-insensitive

// Array membership
inArray(user.id, [1, 2, 3]);
```

### Logical Operators

```tsx
import { and, or, not } from "@tanstack/db";

and(condition1, condition2, condition3);
or(condition1, condition2);
not(condition);
```

### String Functions

```tsx
import { upper, lower, length, concat } from "@tanstack/db";

upper(user.name); // 'JOHN'
lower(user.email); // 'john@example.com'
length(user.name); // String length
concat(user.firstName, " ", user.lastName);
```

### Aggregate Functions

```tsx
import { count, sum, avg, min, max } from "@tanstack/db";

count(user.id); // Count non-null values
sum(order.amount); // Sum numeric values
avg(user.salary); // Calculate average
min(user.salary); // Find minimum
max(order.amount); // Find maximum
```

## Performance Tips

1. **Use indexes**: Collections automatically index by their key
2. **Limit early**: Apply `limit()` as early as possible in your query chain
3. **Filter before joins**: Use `where()` clauses before `join()` operations
4. **Cache intermediate results**: Use derived collections for commonly used subqueries
5. **Avoid functional variants**: Use the standard API when possible for better optimization

## Type Safety

Live queries provide full TypeScript inference:

```tsx
const userPosts = createLiveQueryCollection((q) =>
  q
    .from({ user: usersCollection })
    .join({ post: postsCollection }, ({ user, post }) =>
      eq(user.id, post.userId)
    )
    .select(({ user, post }) => ({
      userName: user.name, // string
      postTitle: post?.title, // string | undefined (from left join)
      isPublished: post?.published ?? false, // boolean
    }))
);

// Result type is automatically inferred:
// { userName: string, postTitle: string | undefined, isPublished: boolean }
```

This guide covers the core concepts of TanStack DB live queries for building reactive applications in Kaiba Core.
