# Kaiba Core Documentation

This folder contains essential documentation for AI agents working on the Kaiba Core project.

## Stack Overview

- **TanStack DB 0.0.27** - Reactive client data layer
- **ElectricSQL 1.0.7** - Real-time Postgres sync
- **Drizzle ORM 0.44.3** - Type-safe database operations
- **React Native 0.79.5** with Expo - Cross-platform UI
- **PostgreSQL 16** - Database (containerized)

## Documentation Structure

### `/db/` - TanStack DB

- Reactive collections and live queries
- Optimistic mutations and client-side state
- Integration patterns with ElectricSQL

### `/electric/` - ElectricSQL

- Real-time sync API and shapes
- Connection management and error handling
- Performance optimization patterns

### `/drizzle/` - Drizzle ORM

- Schema definition patterns
- Type-safe queries and migrations
- Database relationship management

## Data Flow

```
PostgreSQL → ElectricSQL → TanStack DB → React Native UI
    ↑              ↓           ↓
Migrations    Real-time    Optimistic
              Sync         Updates
```

## Key Integration Points

1. **Schema**: Drizzle defines PostgreSQL schema with TypeScript types
2. **Sync**: ElectricSQL provides real-time sync via shapes
3. **Client State**: TanStack DB manages reactive collections
4. **UI**: React Native components use live queries for automatic updates
