# MGNREGA District Dashboard

## Overview

This is a bilingual (English, Hindi, Marathi) MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) District Performance Dashboard that displays employment, wages, and rural development metrics across Indian districts using government open data. The application features auto-district detection via geolocation, data caching for performance optimization, and a design aesthetic aligned with official Government of India digital portals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with **Vite** as the build tool for fast development and optimized production builds
- **TypeScript** for type safety across the entire codebase
- **Wouter** for lightweight client-side routing (instead of React Router)

**UI Component System**
- **shadcn/ui** component library with Radix UI primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom theme configuration
- **CSS Variables** for dynamic theming aligned with Government of India design standards (navy blue, saffron, India green color palette)

**State Management & Data Fetching**
- **TanStack Query (React Query)** for server state management, caching, and API request orchestration
- Optimistic UI updates with automatic background refetching
- Client-side caching strategy to minimize API calls

**Internationalization**
- **i18next** with **react-i18next** for trilingual support (English, Hindi, Marathi)
- Language toggle persists user preference
- Localized state/district names in all three languages

**Data Visualization**
- **Recharts** library for responsive charts (bar charts, line charts)
- Custom metric cards with color-coded indicators

### Backend Architecture

**Server Framework**
- **Express.js** on Node.js for RESTful API endpoints
- **TypeScript** with ESM modules
- Middleware for request logging, JSON parsing, and error handling

**API Design Pattern**
- RESTful endpoints following resource-based naming:
  - `GET /api/states` - List all Indian states
  - `GET /api/districts/:state` - List districts for a state
  - `GET /api/performance/:district` - Get MGNREGA metrics for a district
- Response caching with 24-hour TTL (time-to-live)

**Data Caching Strategy**
- Dual-layer caching system:
  - **MongoDB caching** (primary): Stores API responses with timestamps
  - **In-memory fallback**: When MongoDB is unavailable, uses JavaScript Map for session-based caching
- Automatic fallback mechanism with graceful degradation

### Data Storage Solutions

**Database**
- **Drizzle ORM** configured for PostgreSQL (via `@neondatabase/serverless`)
- Schema defined in `shared/schema.ts` with Zod validation
- Database configuration supports Neon serverless Postgres

**Caching Layer**
- **MongoDB** (via Mongoose) for persistent API response caching
- Schema: `Performance` model stores state, district, data payload, and lastUpdated timestamp
- Compound indexes on state+district for efficient queries
- Graceful fallback to in-memory caching when MongoDB connection fails

**Storage Interface**
- `ICacheStorage` abstraction allows swapping between MongoDB and in-memory implementations
- `MemCacheStorage` class provides Map-based caching when database is unavailable

### External Dependencies

**Third-Party Services**
- **Government of India Open Data API** (`data.gov.in`) - Primary data source for MGNREGA performance metrics
- API key required via `DATA_GOV_API_KEY` environment variable
- Custom service layer (`server/services/mgnregaService.ts`) handles API integration

**Database Services**
- **Neon Serverless Postgres** - Configured via `DATABASE_URL` environment variable
- **MongoDB** - Optional caching database via `MONGO_URI` environment variable

**External APIs**
- **Geolocation API** (HTML5 browser API) for auto-district detection
- **Reverse Geocoding** capability (schema defined, implementation pending)

**Font Services**
- **Google Fonts**: Inter (primary UI), Noto Sans Devanagari (Hindi/Marathi support)

### Design System Integration

**Government of India Standards**
- Color palette inspired by Indian tricolor (navy blue, saffron, India green)
- Typography scale optimized for bilingual content
- Accessible contrast ratios and focus states
- Design guidelines documented in `design_guidelines.md`

**Responsive Design**
- Mobile-first approach with Tailwind breakpoints (md, lg)
- Custom hook `useIsMobile()` for adaptive UI behavior
- Touch-friendly interface elements

### Development & Production

**Build Process**
- **Vite** for frontend bundling with HMR (Hot Module Replacement)
- **esbuild** for server-side bundling in production
- Separate build outputs: `dist/public` (frontend), `dist/index.js` (server)

**Development Tools**
- Replit-specific plugins: runtime error modal, cartographer (file watcher), dev banner
- TypeScript strict mode enabled
- Path aliases configured for clean imports (`@/*`, `@shared/*`, `@assets/*`)

**Environment Configuration**
- `NODE_ENV` for environment detection
- Required: `DATABASE_URL` (Postgres), optional: `MONGO_URI` (caching), `DATA_GOV_API_KEY`
- Session-based configuration for Replit environment