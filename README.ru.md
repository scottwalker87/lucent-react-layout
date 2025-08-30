<div align="center">
  <img src="logo.png" alt="Логотип Lucent" width="200" />
  <h1>LUCENT - Система макетов React</h1>
  
   <p>
    <a href="README.md"><span style="margin-right: 7px;">🇺🇸</span> English docs</a>
    <span style="margin: 0 15px;">|</span> 
    <span>
      <span style="margin-right: 7px;">🇷🇺</span> Дока на русском
    </span>
  </p>
</div>

Просто система макетов для React (с полной поддержкой TypeScript), которая может быть основой для любого кастомного макета... ну типа, как бээ, на этом все (пока что).

## Возможности

- ✅ **Гибкое управление макетом** - Контроль видимости и состояний сворачивания всех компонентов макета
- ✅ **Поддержка тем** - Встроенное переключение между светлой и темной темами
- ⚠️ **Адаптивный дизайн** - Адаптивность макета еще в разработке! 🙃😇
- ✅ **TypeScript First** - Полная поддержка TypeScript с комплексными определениями типов
- ✅ **Без зависимостей** - Никаких внешних зависимостей, только React
- ✅ **Высокая настраиваемость** - Настраиваемые размеры состояний элементов макета
- ✅ **Context API** - Простое управление состоянием и взаимодействие компонентов

## Установка

```bash
npm install @scottwalker/lucent
```

## Быстрый старт

```tsx
import { Lucent, LucentHeader, LucentSidebar, LucentBody, LucentFooter } from "@scottwalker/lucent"

function App() {
  return (
    <Lucent config={{}}>
      <LucentHeader>Содержимое заголовка</LucentHeader>
      <LucentSidebar>Содержимое боковой панели</LucentSidebar>
      <LucentBody>Основное содержимое</LucentBody>
      <LucentFooter>Содержимое подвала</LucentFooter>
    </Lucent>
  )
}
```

## Архитектура

### Структура проекта

```
📦 Lucent/
├── 📁 src/                   # Основной исходный код библиотеки
│   ├── index.ts              # Главная точка входа и экспорты
│   │
│   ├── 📁 lib/               # Основные утилиты и константы
│   │   ├── constants.ts      # Константы режимов макета
│   │   ├── context.ts        # React контекст и хук useLayout
│   │   └── utils.ts          # Функции утилит и нормализация
│   │
│   ├── 📁 types/             # Определения типов TypeScript
│   │   └── index.ts          # Все типы и интерфейсы макета
│   │
│   ├── 📁 structure/         # Основная структура макета
│   │   ├── provider.tsx      # Основной компонент LayoutProvider
│   │   └── index.ts          # Экспорты структуры
│   │
│   ├── 📁 ui/                # UI компоненты макета
│   │   ├── container.tsx     # Основной контейнер макета
│   │   ├── header.tsx        # Компонент шапки
│   │   ├── sidebar.tsx       # Компонент сайдбара
│   │   ├── body.tsx          # Основная область содержимого
│   │   ├── infobar.tsx       # Компонент информационной панели (справа)
│   │   ├── footer.tsx        # Компонент футера
│   │   └── index.ts          # Экспорты UI
│   │
│   └── 📁 style/             # Стилизация
│       └── layout.module.css # CSS модули для макета
│
└── 📁 demo/                  # Демо-приложение (пока оооооч сырое, но работает... ыыы 😁)
```

### Основные компоненты

Lucent построен вокруг центрального провайдера макета, который управляет состоянием и поведением всех компонентов макета:

- **`Lucent`** - Основной компонент провайдера макета
- **`LucentHeader`** - Компонент шапки
- **`LucentSidebar`** - Компонент сайдбара
- **`LucentBody`** - Основная область содержимого
- **`LucentInfobar`** - Компонент правой информационной панели (инфобар)
- **`LucentFooter`** - Компонент футера

### Управление состоянием

Система макетов использует React Context для предоставления централизованного API для управления состоянием макета:

```tsx
import { useLayout } from "@scottwalker/lucent"

function MyComponent() {
  const layout = useLayout()

  // Доступ к текущим режимам
  console.log(layout.modes.theme) // 'light' | 'dark'
  console.log(layout.modes.sidebar) // 'base' | 'hidden' | 'collapsed'

  // Переключение режимов
  layout.toggleThemeMode()
  layout.toggleSidebarCollapsedMode()
}
```

## Конфигурация

### Режимы макета

Каждый компонент макета может находиться в различных режимах (развернутом, свернутом или скрытом). Сам макет может быть в светлом или темном режиме (бэйсик темизация):

#### Режим темы

- `light` - Светлая тема
- `dark` - Темная тема

#### Режим шапки

- `base` - Видимый заголовок
- `hidden` - Скрытый заголовок

#### Режим футера

- `base` - Видимый подвал
- `hidden` - Скрытый подвал

#### Режим сайдбара

- `base` - Полностью развернутая боковая панель
- `collapsed` - Свернутая боковая панель
- `hidden` - Скрытая боковая панель

#### Режим информационной панели

- `base` - Полностью развернутая информационная панель
- `collapsed` - Свернутая информационная панель
- `hidden` - Скрытая информационная панель

### Параметры макета

Настройки внешнего вида макета:

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

### Значения по умолчанию

Если не указано, используются следующие значения по умолчанию:

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

### Хук useLayout

Хук `useLayout` предоставляет доступ к API макета:

```tsx
const layout = useLayout()
```

#### Свойства

- `modes` - Текущие режимы макета
- `params` - Текущие параметры макета
- `hasSlots` - Какие компоненты макета отрендерены

#### Проверки состояния

- `isThemeDark` - Проверить, активна ли темная тема
- `isHeaderHidden` - Проверить, скрыта ли шапка
- `isFooterHidden` - Проверить, скрыт ли футер
- `isSidebarHidden` - Проверить, скрыт ли сайдбар
- `isSidebarCollapsed` - Проверить, свернут ли сайдбар
- `isInfobarHidden` - Проверить, скрыт ли инфобар
- `isInfobarCollapsed` - Проверить, свернут ли инфобар

#### Методы

- `setMode(mode, value)` - Установить конкретный режим
- `setParams(params)` - Обновить несколько параметров
- `setParam(name, value)` - Обновить один параметр
- `setHasSlot(slot, value)` - Отметить состояние элемента макета как отрендеренного (или не отрендеренного)

#### Методы переключения

- `toggleThemeMode()` - Переключить между светлой/темной темами
- `toggleHeaderVisibleMode()` - Показать/скрыть шапку
- `toggleFooterVisibleMode()` - Показать/скрыть футер
- `toggleSidebarVisibleMode()` - Показать/скрыть сайдбар
- `toggleSidebarCollapsedMode()` - Развернуть/свернуть сайдбар
- `toggleInfobarVisibleMode()` - Показать/скрыть инфобар
- `toggleInfobarCollapsedMode()` - Развернуть/свернуть инфобар

## Примеры

### Базовый макет

```tsx
import { Lucent, LucentHeader, LucentSidebar, LucentBody, LucentFooter } from "@scottwalker/lucent"

function App() {
  return (
    <Lucent config={{}}>
      <LucentHeader>
        <h1>Компания по доставке неприятностей</h1>
      </LucentHeader>

      <LucentSidebar>
        <nav>
          <ul>
            <li>Панель управления</li>
            <li>Пользователи</li>
            <li>Настройки</li>
          </ul>
        </nav>
      </LucentSidebar>

      <LucentBody>
        <div>
          <h2>Добро пожаловать в панель управления</h2>
          <p>Это основная область содержимого.</p>
        </div>
      </LucentBody>

      <LucentFooter>
        <p>&copy; 2025 Компания по доставке неприятностей</p>
      </LucentFooter>
    </Lucent>
  )
}
```

### Расширенная конфигурация

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
          <h1>Расширенное приложение</h1>
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

### Адаптивный макет с элементами управления

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
        {layout.isSidebarCollapsed ? "Развернуть" : "Свернуть"} боковую панель
      </button>

      <button onClick={layout.toggleThemeMode}>{layout.isThemeDark ? "Светлая" : "Темная"} тема</button>
    </div>
  )
}
```

## Настройка CSS

Lucent использует CSS-переменные и специфичные аттрибуты режимов макета для стилизации. Можно переопределить их в своем CSS:

```css
/* Пользовательские цвета темы */
[data-theme-mode="light"] {
  --ll-bg-primary: #ffffff;
  --ll-text-primary: #000000;
}

[data-theme-mode="dark"] {
  --ll-bg-primary: #1a1a1a;
  --ll-text-primary: #ffffff;
}

/* Пользовательские размеры */
[data-sidebar-mode="base"] {
  --ll-sidebar-width: 300px;
}

[data-sidebar-mode="collapsed"] {
  --ll-sidebar-width: 80px;
}
```

## Требования

- React 18+
- Браузеры с поддержкой CSS Grid
- TypeScript 4.5+

## Лицензия

MIT License - см. файл [LICENSE](LICENSE) для супер подробностей (которые никто не читает... и я, в том числе 😇).
