# TanStack DB Release Notes

## Current Project Version: v0.0.27

**Note**: Kaiba Core uses TanStack DB v0.0.27, which is different from the latest public release.

## Latest Public Release: v0.1.3 (January 13, 2025)

### Patch Changes

- **Bug Fix**: Fixed bug with `orderBy` that resulted in query results having less rows than the configured limit
- Updated dependencies for `@tanstack/db-ivm@0.1.1`

### Package Updates

All framework packages updated to latest versions:

- `@tanstack/react-db@0.1.3`
- `@tanstack/vue-db@0.0.36`
- `@tanstack/solid-db@0.1.3`
- `@tanstack/svelte-db@0.1.3`
- `@tanstack/query-db-collection@0.2.2`
- `@tanstack/electric-db-collection@0.1.3`
- `@tanstack/trailbase-db-collection@0.1.3`

## Previous Releases

### v0.1.1 (August 4, 2024)

#### Minor Changes

- **Improved writeBatch API**: Changed from accepting an array of operations to using a callback pattern for better ergonomics

#### Major Features Added

- **Multi-framework Support**: Added support for Vue, Solid, and Svelte
- **Collection Types**: Introduced multiple collection types:
  - QueryCollection for TanStack Query integration
  - ElectricCollection for ElectricSQL sync
  - TrailBaseCollection for TrailBase integration
  - LocalStorageCollection for persistent local data
  - LocalOnlyCollection for in-memory data

#### API Improvements

- Enhanced TypeScript inference for query results
- Better error handling and rollback mechanisms
- Improved optimistic mutation controls
- Added functional variants for complex transformations

### v0.1.0 (Initial Release)

#### Core Features

- **Reactive Collections**: Typed sets of objects with automatic reactivity
- **Live Queries**: SQL-like query builder with differential dataflow
- **Optimistic Mutations**: Instant UI updates with automatic rollback
- **TypeScript First**: Full type safety and inference
- **React Integration**: `useLiveQuery` hook and React adapter

## Breaking Changes

### v0.1.1

- **writeBatch API Change**: The `writeBatch` method now uses a callback pattern instead of accepting an array of operations

```tsx
// Before v0.1.1
collection.writeBatch([
  { type: "insert", data: item1 },
  { type: "update", id: "item2", data: updates },
]);

// After v0.1.1
collection.writeBatch((batch) => {
  batch.insert(item1);
  batch.update("item2", updates);
});
```

## Compatibility

### Framework Versions

- **React**: v16.8+ (Hooks support required)
- **Vue**: v3.3.0+
- **Solid**: Latest stable
- **Svelte**: v4.0+

### Node.js

- **Minimum**: Node.js v16
- **Recommended**: Node.js v18+

### TypeScript

- **Minimum**: TypeScript v4.5
- **Recommended**: TypeScript v5.0+

## Resources

- **GitHub**: [https://github.com/tanstack/db](https://github.com/tanstack/db)
- **Discord**: [https://tlinz.com/discord](https://tlinz.com/discord)
- **Documentation**: [https://tanstack.com/db/latest/docs](https://tanstack.com/db/latest/docs)
