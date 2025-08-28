# Lucent - React layout system

React layout system with flexible sidebar, header, footer and infobar management.

## Installation

```bash
npm install @scottwalker/lucent
```

## Usage

```tsx
import { Lucent, normalizeConfig, type LayoutConfig } from '@scottwalker/lucent'

function App() {
  const config: LayoutConfig = normalizeConfig({
    modes: {
      theme: "dark",
      headerVisible: "visible",
      footerVisible: "visible",
      sidebarVisible: "visible",
      sidebarCollapsed: "collapsed",
      infobarVisible: "visible",
      infobarCollapsed: "collapsed"
    },
    slots: {
      header: <div>Header</div>,
      sidebar: {
        header: <div>Sidebar Header</div>,
        body: <div>Sidebar Body</div>,
        footer: <div>Sidebar Footer</div>
      },
      content: <div>Content</div>,
      infobar: <div>Infobar</div>,
      footer: <div>Footer</div>
    }
  })

  return <Lucent config={config} />
}
```

## Usage with useLayout

```tsx
import { useLayout } from '@scottwalker/lucent'

function Page() {
  const { 
    toggleSidebarVisibleMode, 
    toggleSidebarCollapsedMode, 
    toggleInfobarVisibleMode, 
    toggleInfobarCollapsedMode, 
    toggleThemeMode, 
    toggleHeaderVisibleMode, 
    toggleFooterVisibleMode,
    toggleSidebarVisibleMode,
    toggleSidebarCollapsedMode,
    toggleInfobarVisibleMode,
    toggleInfobarCollapsedMode 
  } = useLayout()

  return (
    <div>
      <button onClick={toggleThemeMode}>Toggle Theme</button>

      <button onClick={toggleHeaderVisibleMode}>Toggle Header</button>
      <button onClick={toggleFooterVisibleMode}>Toggle Footer</button>

      <button onClick={toggleSidebarVisibleMode}>Toggle Sidebar Visible</button>
      <button onClick={toggleSidebarCollapsedMode}>Toggle Sidebar Collapsed</button>
      
      <button onClick={toggleInfobarVisibleMode}>Toggle Infobar Visible</button>
      <button onClick={toggleInfobarCollapsedMode}>Toggle Infobar Collapsed</button>
    </div>
  )
}
```

## Features

- Flexible layout management
- Responsive design
- Customizable themes
