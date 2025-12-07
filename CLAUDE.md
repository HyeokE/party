# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `pnpm dev` - Start the Vite development server with HMR
- `pnpm build` - Type-check with `tsc -b` then build for production with Vite
- `pnpm lint` - Run ESLint on the codebase
- `pnpm preview` - Preview the production build locally

### Testing
Currently no test framework is configured. When adding tests, update this section.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router v7 (client-side routing)
- **Styling**: Tailwind CSS 3 with CSS variables for theming
- **Component Library**: shadcn/ui (component system, not installed as dependency)
- **State Management**: React Context API for shared user data
- **Utilities**:
  - `clsx` + `tailwind-merge` via `cn()` utility for className composition
  - `class-variance-authority` for component variant styling

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # shadcn/ui components (installed via CLI)
│   ├── HomePage.tsx
│   ├── JoinPartyForm.tsx
│   ├── AccountInfoPage.tsx
│   ├── InterestForm.tsx
│   └── SuccessPage.tsx
├── context/         # React Context providers
│   └── UserDataContext.tsx  # User data state management
├── lib/             # Utility functions
│   └── utils.ts     # cn() helper for className merging
├── assets/          # Static assets
├── App.tsx          # Main app with router configuration
├── main.tsx         # App entry point
└── index.css        # Global styles with Tailwind directives
```

## Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

This is configured in:
- `vite.config.ts` - Vite resolver
- `tsconfig.app.json` - TypeScript path mapping
- `components.json` - shadcn/ui configuration

## shadcn/ui Integration

This project uses shadcn/ui, a collection of copy-paste components built with Radix UI and Tailwind CSS.

### Adding Components
Use the shadcn CLI to add components (don't install from npm):

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
```

Components are copied into `src/components/ui/` and can be customized directly.

### Configuration
- Base style: `default`
- Base color: `slate`
- CSS variables: Enabled (for easy theming)
- Prefix: None

See `components.json` for full configuration.

## Styling System

### Tailwind CSS
The project uses Tailwind's CSS variable-based theming system. Colors are defined as HSL values in `src/index.css`:

- Theme colors: `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, etc.
- Dark mode: Enabled via `class` strategy (add `dark` class to root element)
- Border radius: Controlled via `--radius` CSS variable

### Class Name Composition
Always use the `cn()` utility from `@/lib/utils` when composing class names:

```typescript
import { cn } from "@/lib/utils"

<div className={cn("base-classes", conditionalClass && "conditional-classes")} />
```

This ensures Tailwind classes are properly merged and conflicts are resolved.

## TypeScript Configuration

- **Target**: ES2022 with DOM types
- **Mode**: Bundler mode with `verbatimModuleSyntax`
- **Strict**: Enabled with `strict`, `noUnusedLocals`, `noUnusedParameters`
- **JSX**: `react-jsx` (automatic runtime)
- **Module Resolution**: Project uses TypeScript references with separate configs:
  - `tsconfig.app.json` - Main app code
  - `tsconfig.node.json` - Vite config files

## ESLint Configuration

Uses flat config format with:
- TypeScript ESLint recommended rules
- React Hooks plugin rules
- React Refresh plugin for Vite HMR

The config ignores the `dist/` directory.

## Architecture Patterns

### Component Organization
- Place reusable UI components in `src/components/ui/` (shadcn components)
- Place feature-specific components in `src/components/`
- Keep components small and focused on a single responsibility

### Styling Approach
- Use Tailwind utility classes directly in components
- Leverage CSS variables for theming (defined in `index.css`)
- Use `cn()` for conditional className logic
- Use `class-variance-authority` for components with multiple variants

### Routing
The app uses React Router v7 for client-side navigation:

```typescript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/path')  // Navigate to a route
```

**Routes:**
- `/` - Home page with CTA buttons
- `/join` - Party registration form
- `/account` - Account info and deposit confirmation
- `/success` - Registration success page
- `/interest` - Interest signup form
- `/interest-success` - Interest signup success page

### State Management
User data is managed through React Context (`UserDataContext`):

```typescript
import { useUserData } from '@/context/UserDataContext'

const { userData, updateUserData } = useUserData()
updateUserData({ name, phone, email })
```

This context is available throughout the app and persists user information across route changes.

## Important Notes

- **React 19**: This project uses React 19. Be aware of any breaking changes from React 18 when referencing documentation.
- **Vite HMR**: Fast Refresh is enabled via `@vitejs/plugin-react`. Changes to React components should hot reload without full page refresh.
- **No Git Repository**: This directory is not currently a git repository. Initialize git if version control is needed.
