# Technology Stack

## Core Technologies

### Frontend Framework

- **React Native 0.79.5** with **React 19.0.0**
- **Expo 53.0.20** for cross-platform development and tooling
- **Expo Router 5.1.4** for file-based navigation
- **TypeScript 5.8.3** for type safety

### Data Layer

- **TanStack DB 0.0.27** for reactive client-side data management
- **ElectricSQL 1.0.7** for real-time Postgres synchronization
- **Drizzle ORM 0.44.3** for database schema and queries
- **Zod 4.0.5** for runtime type validation

### Styling

- **NativeWind 4.1.23** (Tailwind CSS for React Native)
- **React Native Reanimated 3.17.5** for animations
- Custom design system with grayscale color palette

### Backend & Database

- **PostgreSQL 16** (containerized)
- **Express.js 5.1.0** for API server
- **Docker Compose** for local development environment

## Package Manager

- **pnpm 10.12.1** - Use pnpm for all dependency management

## Common Commands

### Development

```bash
# Start development environment (database + expo)
pnpm start

# Start API server separately
pnpm api

# Platform-specific development
pnpm android    # Android development
pnpm ios        # iOS development
pnpm web        # Web development
```

### Database Operations

```bash
# Generate database migrations
pnpm db:generate

# Apply migrations to database
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio
```

### Docker Environment

```bash
# Start PostgreSQL and ElectricSQL containers
docker compose up -d

# Stop containers
docker compose down
```

## Build Configuration

### TypeScript

- Extends Expo's base TypeScript configuration
- Strict mode enabled
- Path aliases configured (`@/*` maps to project root)

### Tailwind CSS

- Custom color system based on HSL values
- Configured for `app/**` and `components/**` directories
- Uses NativeWind preset for React Native compatibility

### Expo Configuration

- New Architecture enabled for React Native
- Edge-to-edge design on Android
- Tablet support on iOS
- Custom splash screen and icons
