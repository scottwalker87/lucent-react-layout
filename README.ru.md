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

Гибкая и мощная система макетов React, которая обеспечивает комплексное управление боковой панелью, заголовком, подвалом и информационной панелью с поддержкой TypeScript.

## Возможности

- ✅ **Гибкое управление макетом** - Контроль видимости и состояний сворачивания всех компонентов макета
- ✅ **Поддержка тем** - Встроенное переключение между светлой и темной темами
- ✅ **Адаптивный дизайн** - Адаптивный макет, работающий на всех размерах экранов
- ✅ **TypeScript First** - Полная поддержка TypeScript с комплексными определениями типов
- ✅ **Без зависимостей** - Никаких внешних зависимостей, только React
- ✅ **Высокая настраиваемость** - Настраиваемые размеры, переходы и поведение
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
Lucent/
├── 📦 Файлы пакета
│   ├── package.json          # Основная конфигурация пакета
│   ├── rollup.config.js      # Конфигурация сборки
│   └── tsconfig.json         # Конфигурация TypeScript
│
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
│   │   ├── header.tsx        # Компонент заголовка
│   │   ├── sidebar.tsx       # Компонент боковой панели
│   │   ├── body.tsx          # Основная область содержимого
│   │   ├── infobar.tsx       # Компонент информационной панели
│   │   ├── footer.tsx        # Компонент подвала
│   │   └── index.ts          # Экспорты UI
│   │
│   └── 📁 style/             # Стилизация
│       └── layout.module.css # CSS модули для макета
│
├── 📁 demo/                  # Демо-приложение
│   ├── src/
│   │   ├── App.tsx           # Компонент демо-приложения
│   │   ├── main.tsx          # Точка входа демо
│   │   ├── index.css         # Стили демо
│   │   ├── 📁 layout/        # Компоненты макета демо
│   │   └── 📁 ui/            # UI компоненты демо
│   ├── index.html            # HTML шаблон демо
│   ├── package.json          # Зависимости демо
│   └── vite.config.ts        # Конфигурация сборки демо
│
└── 📄 README.md              # Документация
```

### Основные компоненты

Lucent построен вокруг центрального провайдера макета, который управляет состоянием и поведением всех компонентов макета:

- **`Lucent`** - Основной компонент провайдера макета
- **`LucentHeader`** - Компонент верхнего заголовка
- **`LucentSidebar`** - Компонент левой боковой панели
- **`LucentBody`** - Основная область содержимого
- **`LucentInfobar`** - Компонент правой информационной панели
- **`LucentFooter`** - Компонент нижнего подвала

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

Каждый компонент макета может находиться в различных режимах:

#### Режим темы

- `light` - Светлая тема
- `dark` - Темная тема

#### Режим заголовка

- `base` - Видимый заголовок
- `hidden` - Скрытый заголовок

#### Режим подвала

- `base` - Видимый подвал
- `hidden` - Скрытый подвал

#### Режим боковой панели

- `base` - Полностью развернутая боковая панель
- `collapsed` - Свернутая боковая панель (показывает только иконки)
- `hidden` - Скрытая боковая панель

#### Режим информационной панели

- `base` - Полностью развернутая информационная панель
- `collapsed` - Свернутая информационная панель (показывает только иконки)
- `hidden` - Скрытая информационная панель

### Параметры макета

Настройте внешний вид и поведение вашего макета:

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

## Справочник API

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
- `isHeaderHidden` - Проверить, скрыт ли заголовок
- `isFooterHidden` - Проверить, скрыт ли подвал
- `isSidebarHidden` - Проверить, скрыта ли боковая панель
- `isSidebarCollapsed` - Проверить, свернута ли боковая панель
- `isInfobarHidden` - Проверить, скрыта ли информационная панель
- `isInfobarCollapsed` - Проверить, свернута ли информационная панель

#### Методы

- `setMode(mode, value)` - Установить конкретный режим
- `setParams(params)` - Обновить несколько параметров
- `setParam(name, value)` - Обновить один параметр
- `setHasSlot(slot, value)` - Отметить слот как отрендеренный

#### Методы переключения

- `toggleThemeMode()` - Переключить между светлой/темной темами
- `toggleHeaderVisibleMode()` - Показать/скрыть заголовок
- `toggleFooterVisibleMode()` - Показать/скрыть подвал
- `toggleSidebarVisibleMode()` - Показать/скрыть боковую панель
- `toggleSidebarCollapsedMode()` - Развернуть/свернуть боковую панель
- `toggleInfobarVisibleMode()` - Показать/скрыть информационную панель
- `toggleInfobarCollapsedMode()` - Развернуть/свернуть информационную панель

## Примеры

### Базовый макет

```tsx
import { Lucent, LucentHeader, LucentSidebar, LucentBody, LucentFooter } from "@scottwalker/lucent"

function App() {
  return (
    <Lucent config={{}}>
      <LucentHeader>
        <h1>Мое приложение</h1>
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
        <main>
          <h2>Добро пожаловать в панель управления</h2>
          <p>Это основная область содержимого.</p>
        </main>
      </LucentBody>

      <LucentFooter>
        <p>&copy; 2024 Мое приложение</p>
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

Lucent использует CSS-переменные для стилизации. Вы можете переопределить их в своем CSS:

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

## Поддержка браузеров

- React 18+
- Современные браузеры с поддержкой CSS Grid
- TypeScript 4.5+

## Лицензия

MIT License - см. файл LICENSE для подробностей.
