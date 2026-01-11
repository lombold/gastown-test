# Gastowntest - Angular v21 SSR Application

An Angular v21 Server-Side Rendering application following the Smart/Presentational component pattern.

## Architecture

### Smart/Presentational Pattern

This project strictly follows the Smart/Presentational pattern to separate concerns between business logic and presentation:

#### Smart Components (Pages)
- **Location**: `src/app/pages/`
- **Naming**: `*.page.ts`
- **Responsibilities**:
  - Business logic and data fetching
  - Service dependency injection
  - State management with Angular signals
  - Routing and navigation
  - Event handling with side effects
  - Pass data DOWN to presentational components via `@Input()` or `input()`
  - Receive events UP from presentational components via `@Output()` or `output()`

**Example**: `src/app/pages/home/home.page.ts`

#### Presentational Components (UI)
- **Location**: `src/app/components/`
- **Naming**: `*.component.ts`
- **Responsibilities**:
  - Pure UI rendering
  - Receive data via `input()` signals or `@Input()`
  - Emit events via `output()` signals or `@Output()`
  - No service injection (except utility services)
  - No business logic or data fetching
  - Highly reusable and testable

**Example**: `src/app/components/ui/button/button.component.ts`

## Project Structure

```
src/app/
├── pages/              # Smart components (containers)
│   ├── home/           # Home page with data fetching
│   ├── about/          # About page with static content
│   └── dashboard/      # Dashboard page with authentication
├── components/         # Presentational components
│   ├── ui/             # Reusable UI components
│   │   ├── button/     # Button component
│   │   ├── card/       # Card component
│   │   └── header/     # Header navigation component
│   └── layout/         # Layout components
├── core/               # Core services, guards, interceptors
│   ├── services/
│   │   ├── api.service.ts      # HTTP API with TransferState
│   │   ├── seo.service.ts      # SEO meta tag management
│   │   └── state.service.ts    # Global state with signals
│   ├── guards/
│   ├── interceptors/
│   └── models/
└── shared/             # Shared pipes, directives, utilities
    ├── pipes/
    ├── directives/
    └── utils/
```

## Prerequisites

- Node.js v22.15.1+
- npm 10.9.2+
- Angular CLI v21

## Installation

```bash
npm install
```

## Development

### Standard Development Server

```bash
npm run start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### SSR Development Server

For development with Server-Side Rendering:

```bash
ng serve
```

The Angular v21 dev server includes SSR by default.

## Building

### Client-Side Build

```bash
npm run build
# or
ng build
```

Build artifacts will be stored in the `dist/` directory.

### SSR Build

```bash
npm run build:ssr
# or
ng build && ng run gastowntest:server:production
```

### Serve SSR Build

After building for SSR, serve the application:

```bash
npm run serve:ssr
# or
node dist/gastowntest/server/server.mjs
```

## Testing

```bash
npm test
# or
ng test
```

This project uses [Vitest](https://vitest.dev/) for unit testing.

## Angular v21 Features Used

This application leverages modern Angular v21 features:

1. **Standalone Components** - No NgModules required, all components are standalone
2. **Signal APIs** - Reactive state management with `signal()`, `computed()`, `effect()`
3. **Input/Output Signals** - Modern `input()` and `output()` functions for component communication
4. **Built-in Control Flow** - Template syntax using `@if`, `@else`, `@for` instead of structural directives
5. **Built-in SSR** - Native server-side rendering with Express.js
6. **Client Hydration** - Seamless transition from server-rendered to client-side with `provideClientHydration()`
7. **TransferState** - Prevents duplicate API calls between server and client rendering
8. **Event Replay** - Captures and replays user events that occur before hydration completes

## Pattern Rules

### Smart Components (Pages) MUST:
- Be located in `src/app/pages/`
- Use `.page.ts` suffix
- Inject services for business logic
- Manage state with signals
- Handle routing and navigation
- Pass data DOWN to presentational components
- Handle events UP from presentational components

### Presentational Components (UI) MUST:
- Be located in `src/app/components/`
- Use `.component.ts` suffix
- Receive data via `input()` signals or `@Input()`
- Emit events via `output()` signals or `@Output()`
- NOT inject business services (ApiService, StateService, etc.)
- NOT contain business logic
- Be highly reusable and testable

## Core Services

### ApiService (`src/app/core/services/api.service.ts`)
- Handles HTTP API calls with SSR support
- Uses `TransferState` to prevent duplicate API calls between server and client
- Uses `isPlatformBrowser()` for platform detection

### SeoService (`src/app/core/services/seo.service.ts`)
- Manages meta tags and page titles
- Essential for SSR SEO optimization
- Updates Open Graph and Twitter Card tags

### StateService (`src/app/core/services/state.service.ts`)
- Global state management using Angular signals
- Example: user authentication state
- Exposes read-only computed signals

## SSR Features

### State Transfer
The `ApiService` uses Angular's `TransferState` API to:
1. Fetch data on the server during SSR
2. Store the data in the HTML
3. Reuse the data on the client to avoid duplicate API calls

### Platform Detection
Services use `isPlatformBrowser()` and `isPlatformServer()` to conditionally execute code based on the rendering platform.

### SEO Optimization
Every page sets appropriate meta tags using the `SeoService` for better search engine indexing.

## Code Scaffolding

### Generate a Smart Component (Page)

```bash
ng generate component pages/example --standalone
# Then rename to example.page.ts and move to src/app/pages/example/
```

### Generate a Presentational Component (UI)

```bash
ng generate component components/ui/example --standalone
```

## Best Practices

1. **Component Pattern** - Always separate smart and presentational components
2. **Signals** - Use signals for reactive state instead of RxJS where appropriate
3. **Lazy Loading** - Load pages via dynamic imports in routes for better performance
4. **SEO** - Always set page meta tags in smart components using SeoService
5. **State Transfer** - Use TransferState in services to avoid duplicate API calls
6. **TypeScript** - Enable strict mode for type safety (already configured)
7. **Testing** - Write unit tests for both smart and presentational components

## Technology Stack

- **Angular**: v21.0.0
- **TypeScript**: v5.9.2
- **RxJS**: v7.8.0
- **Express.js**: v5.1.0 (SSR server)
- **SCSS**: For styling
- **Vitest**: v4.0.8 (Testing)

## Project Generated With

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5 with SSR enabled.

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Angular SSR Guide](https://angular.dev/guide/ssr)
