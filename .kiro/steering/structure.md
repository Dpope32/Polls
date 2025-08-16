# Project Structure

## Root Directory Organization

```i
kaiba-core/
├── app/                    # Expo Router app directory (main screens)
├── components/             # Reusable UI components
├── src/                    # Core application logic
├── api/                    # Express.js API server
├── lib/                    # Shared utilities and styles
├── assets/                 # Static assets (images, icons)
├── .kiro/                  # Kiro IDE configuration
└── docs/                   # Documentation
```

## Key Directories

### `/app` - Expo Router Pages

- `index.tsx` - Main home screen
- `_layout.tsx` - Root layout configuration
- `hooks/` - Custom React hooks
- `services/` - Business logic services
- `types/` - TypeScript type definitions
- `styles.ts` - Screen-specific styles
- `todoCollection.ts` - TanStack DB collection setup

### `/components` - UI Components

- Component files use PascalCase naming (e.g., `Button.tsx`)
- `index.ts` - Barrel exports for clean imports
- Organized by feature when needed (e.g., `home/Footer.tsx`)
- Each component includes TypeScript interfaces and StyleSheet

### `/src` - Core Logic

- `db/` - Database schema, migrations, and connection
  - `schema.ts` - Drizzle schema definitions with Zod validation
  - `migrations/` - Generated database migrations
- `utils/` - Shared utility functions

### `/api` - Backend Server

- `index.ts` - Express server with REST endpoints
- RESTful API design (`/api/todos`)
- Transaction-based operations for ElectricSQL compatibility

### `/lib` - Shared Libraries

- `styles.ts` - Global design system and color palette
- Utility functions and constants

## File Naming Conventions

### Components

- Use PascalCase: `TodoItem.tsx`, `Button.tsx`
- Include TypeScript interfaces in the same file
- Export as named exports from `index.ts`

### Hooks

- Use camelCase with `use` prefix: `useTodos.ts`
- Place in `app/hooks/` directory

### Types

- Use PascalCase: `Todo`, `ApiResponse`
- Define in component files or dedicated `types/` directories

### Database

- Use snake_case for database columns: `created_at`, `updated_at`
- Use camelCase for TypeScript interfaces: `createdAt`, `updatedAt`

## Import Patterns

### Path Aliases

- Use `@/` for imports from project root
- Example: `import { colors } from "@/lib/styles"`

### Component Imports

- Import from barrel files: `import { Button, Input } from "@/components"`
- Avoid deep imports when possible

### Relative Imports

- Use relative imports for closely related files
- Use absolute imports for shared utilities

## Architecture Patterns

### Data Flow

1. UI components trigger operations
2. TanStack DB handles optimistic updates
3. API calls sync with PostgreSQL
4. ElectricSQL broadcasts changes
5. UI automatically updates via reactive queries

### Component Structure

- Functional components with TypeScript
- Custom hooks for business logic
- StyleSheet objects for styling
- Props interfaces defined inline or exported

### Error Handling

- Zod schemas for runtime validation
- Try-catch blocks in API endpoints
- Graceful fallbacks in UI components
