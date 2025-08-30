<div align="center">
  <img src="logo.png" alt="Lucent Logo" width="200" />
  <h1>LUCENT - React Layout System</h1>
  
  <p>
    <span><span style="margin-right: 7px;">🇺🇸</span> English docs</span>
    <span style="margin: 0 15px;">|</span> 
    <a href="README.ru.md">
      <span style="margin-right: 7px;">🇷🇺</span> Дока на русском
    </a>
  </p>
</div>

Just a layout system for React (with full TypeScript support) that can be the foundation for any custom layout... well, that's basically it (for now).

## Features

- ✅ **Flexible Layout Management** - Control visibility and collapse states of all layout components
- ✅ **Theme Support** - Built-in light/dark theme switching
- ⚠️ **Responsive Design** - Responsive design is still in development! 🙃😇
- ✅ **TypeScript First** - Full TypeScript support with comprehensive type definitions
- ✅ **Zero Dependencies** - No external dependencies, just React
- ✅ **Highly Configurable** - Customizable dimensions for layout element states
- ✅ **Context API** - Easy state management and component communication

## Installation

```bash
npm install @scottwalker/lucent
```

## Quick Start

```tsx
import { Lucent, LucentHeader, LucentSidebar, LucentBody, LucentFooter } from "@scottwalker/lucent"

function App() {
  return (
    <Lucent config={{}}>
      <LucentHeader>Header Content</LucentHeader>
      <LucentSidebar>Sidebar Content</LucentSidebar>
      <LucentBody>Main Content</LucentBody>
      <LucentFooter>Footer Content</LucentFooter>
    </Lucent>
  )
}
```

## Architecture

### Project Structure

```
📦 Lucent/
├── 📁 src/                   # Main library source
│   ├── index.ts              # Main entry point & exports
│   │
│   ├── 📁 lib/               # Core utilities & constants
│   │   ├── constants.ts      # Layout mode constants
│   │   ├── context.ts        # React context & useLayout hook
│   │   └── utils.ts          # Utility functions & normalization
│   │
│   ├── 📁 types/             # TypeScript type definitions
│   │   └── index.ts          # All layout types & interfaces
│   │
│   ├── 📁 structure/         # Core layout structure
│   │   ├── provider.tsx      # Main LayoutProvider component
│   │   └── index.ts          # Structure exports
│   │
│   ├── 📁 ui/                # Layout UI components
│   │   ├── container.tsx     # Main layout container
│   │   ├── header.tsx        # Header component
│   │   ├── sidebar.tsx       # Sidebar component
│   │   ├── body.tsx          # Main content area
│   │   ├── infobar.tsx       # Info panel component (right side)
│   │   ├── footer.tsx        # Footer component
│   │   └── index.ts          # UI exports
│   │
│   └── 📁 style/             # Styling
│       └── layout.module.css # CSS modules for layout
│
└── 📁 demo/                  # Demo application (very raw for now, but it works... hehe 😁)
```

### Core Components

Lucent is built around a central layout provider that manages the state and behavior of all layout components:

- **`Lucent`** - Main layout provider component
- **`LucentHeader`** - Header component
- **`LucentSidebar`** - Sidebar component
- **`LucentBody`** - Main content area
- **`LucentInfobar`** - Right infobar component
- **`LucentFooter`** - Footer component

### State Management

The layout system uses React Context to provide a centralized API for managing layout state:

```tsx
import { useLayout } from "@scottwalker/lucent"

function MyComponent() {
  const layout = useLayout()

  // Access current modes
  console.log(layout.modes.theme) // 'light' | 'dark'
  console.log(layout.modes.sidebar) // 'base' | 'hidden' | 'collapsed'

  // Toggle modes
  layout.toggleThemeMode()
  layout.toggleSidebarCollapsedMode()
}
```

## Configuration

### Layout Modes

Each layout component can be in different modes (expanded, collapsed, or hidden). The layout itself can be in light or dark mode (basic theming):

#### Theme Mode

- `light` - Light theme
- `dark` - Dark theme

#### Header Mode

- `base` - Visible header
- `hidden` - Hidden header

#### Footer Mode

- `base` - Visible footer
- `hidden` - Hidden footer

#### Sidebar Mode

- `base` - Fully expanded sidebar
- `collapsed` - Collapsed sidebar
- `hidden` - Hidden sidebar

#### Infobar Mode

- `base` - Fully expanded infobar
- `collapsed` - Collapsed infobar
- `hidden` - Hidden infobar

### Layout Parameters

Layout appearance settings:

```tsx
const config = {
  modes: {
    theme: "dark",
    sidebar: "collapsed",
    infobar: "hidden"
  },
  params: {
    headerHeight: "4rem",
    footerHeight: "3rem",
    sidebarWidth: "250px",
    sidebarCollapsedWidth: "60px",
    infobarWidth: "300px",
    infobarCollapsedWidth: "60px",
    transitionDuration: "0.2s"
  }
}
```

### Default Values

If not specified, the following defaults are used:

```tsx
const defaultParams = {
  headerHeight: "3.125rem",
  footerHeight: "3.125rem",
  sidebarWidth: "15.625rem",
  sidebarCollapsedWidth: "3.125rem",
  infobarWidth: "15.625rem",
  infobarCollapsedWidth: "3.125rem",
  transitionDuration: "0.15s"
}
```

## API

### useLayout Hook

The `useLayout` hook provides access to the layout API:

```tsx
const layout = useLayout()
```

#### Properties

- `modes` - Current layout modes
- `params` - Current layout parameters
- `hasSlots` - Which layout components are rendered

#### State Checks

- `isThemeDark` - Check if dark theme is active
- `isHeaderHidden` - Check if header is hidden
- `isFooterHidden` - Check if footer is hidden
- `isSidebarHidden` - Check if sidebar is hidden
- `isSidebarCollapsed` - Check if sidebar is collapsed
- `isInfobarHidden` - Check if infobar is hidden
- `isInfobarCollapsed` - Check if infobar is collapsed

#### Methods

- `setMode(mode, value)` - Set a specific mode
- `setParams(params)` - Update multiple parameters
- `setParam(name, value)` - Update a single parameter
- `setHasSlot(slot, value)` - Mark layout element state as rendered (or not rendered)

#### Toggle Methods

- `toggleThemeMode()` - Switch between light/dark themes
- `toggleHeaderVisibleMode()` - Show/hide header
- `toggleFooterVisibleMode()` - Show/hide footer
- `toggleSidebarVisibleMode()` - Show/hide sidebar
- `toggleSidebarCollapsedMode()` - Expand/collapse sidebar
- `toggleInfobarVisibleMode()` - Show/hide infobar
- `toggleInfobarCollapsedMode()` - Expand/collapse infobar

## Examples

### Basic Layout

```tsx
import { Lucent, LucentHeader, LucentSidebar, LucentBody, LucentFooter } from "@scottwalker/lucent"

function App() {
  return (
    <Lucent config={{}}>
      <LucentHeader>
        <h1>Company for Delivering Troubles</h1>
      </LucentHeader>

      <LucentSidebar>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Users</li>
            <li>Settings</li>
          </ul>
        </nav>
      </LucentSidebar>

      <LucentBody>
        <div>
          <h2>Welcome to your dashboard</h2>
          <p>This is the main content area.</p>
        </div>
      </LucentBody>

      <LucentFooter>
        <p>&copy; 2025 Company for Delivering Troubles</p>
      </LucentFooter>
    </Lucent>
  )
}
```

### Advanced Configuration

```tsx
import { Lucent, LucentHeader, LucentSidebar, LucentBody, LucentInfobar } from "@scottwalker/lucent"

function App() {
  const config = {
    modes: {
      theme: "dark",
      sidebar: "collapsed",
      infobar: "base"
    },
    params: {
      headerHeight: "4rem",
      sidebarWidth: "280px",
      sidebarCollapsedWidth: "70px",
      infobarWidth: "320px",
      transitionDuration: "0.3s"
    }
  }

  return (
    <Lucent config={config}>
      <LucentHeader>
        <div className="header-content">
          <h1>Advanced App</h1>
          <ThemeToggle />
        </div>
      </LucentHeader>

      <LucentSidebar>
        <Navigation />
      </LucentSidebar>

      <LucentBody>
        <MainContent />
      </LucentBody>

      <LucentInfobar>
        <InfoPanel />
      </LucentInfobar>
    </Lucent>
  )
}

function ThemeToggle() {
  const layout = useLayout()

  return <button onClick={layout.toggleThemeMode}>{layout.isThemeDark ? "☀️" : "🌙"}</button>
}
```

### Responsive Layout with Controls

```tsx
import { Lucent, LucentHeader, LucentSidebar, LucentBody } from "@scottwalker/lucent"

function App() {
  return (
    <Lucent config={{}}>
      <LucentHeader>
        <LayoutControls />
      </LucentHeader>

      <LucentSidebar>
        <SidebarContent />
      </LucentSidebar>

      <LucentBody>
        <MainContent />
      </LucentBody>
    </Lucent>
  )
}

function LayoutControls() {
  const layout = useLayout()

  return (
    <div className="controls">
      <button onClick={layout.toggleSidebarCollapsedMode}>
        {layout.isSidebarCollapsed ? "Expand" : "Collapse"} Sidebar
      </button>

      <button onClick={layout.toggleThemeMode}>{layout.isThemeDark ? "Light" : "Dark"} Theme</button>
    </div>
  )
}
```

## CSS Customization

Lucent uses CSS custom properties and specific layout mode attributes for styling. You can override these in your CSS:

```css
/* Custom theme colors */
[data-theme-mode="light"] {
  --ll-bg-primary: #ffffff;
  --ll-text-primary: #000000;
}

[data-theme-mode="dark"] {
  --ll-bg-primary: #1a1a1a;
  --ll-text-primary: #ffffff;
}

/* Custom dimensions */
[data-sidebar-mode="base"] {
  --ll-sidebar-width: 300px;
}

[data-sidebar-mode="collapsed"] {
  --ll-sidebar-width: 80px;
}
```

## Requirements

- React 18+
- Browsers with CSS Grid support
- TypeScript 4.5+

## License

MIT License - see [LICENSE](LICENSE) file for super details (which nobody reads... including me 😇).
