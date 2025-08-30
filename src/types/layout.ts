import type { ComponentProps, JSX, ReactNode } from "react"
import {
  THEME_MODE_LIGHT,
  THEME_MODE_DARK,
  HEADER_MODE_BASE,
  HEADER_MODE_HIDDEN,
  FOOTER_MODE_BASE,
  FOOTER_MODE_HIDDEN,
  SIDEBAR_MODE_BASE,
  SIDEBAR_MODE_HIDDEN,
  SIDEBAR_MODE_COLLAPSED,
  INFOBAR_MODE_BASE,
  INFOBAR_MODE_HIDDEN,
  INFOBAR_MODE_COLLAPSED
} from "#lib/constants"

/**
 * Пропсы контейнера
 * @namespace Lucent.LayoutContainerProps
 */
export type LayoutContainerProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Компонент контейнера
 * @namespace Lucent.LayoutContainerComponent
 */
export type LayoutContainerComponent = {
  (props: LayoutContainerProps): JSX.Element
}

/**
 * Пропсы шапки
 * @namespace Lucent.LayoutHeaderProps
 */
export type LayoutHeaderProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Компонент шапки
 * @namespace Lucent.LayoutHeaderComponent
 */
export type LayoutHeaderComponent = {
  (props: LayoutHeaderProps): JSX.Element
}

/**
 * Пропсы тела макета
 * @namespace Lucent.LayoutBodyProps
 */
export type LayoutBodyProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Компонент тела макета
 * @namespace Lucent.LayoutBodyComponent
 */
export type LayoutBodyComponent = {
  (props: LayoutBodyProps): JSX.Element
}

/**
 * Пропсы инфобара
 * @namespace Lucent.LayoutInfobarProps
 */
export type LayoutInfobarProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Компонент инфобара
 * @namespace Lucent.LayoutInfobarComponent
 */
export type LayoutInfobarComponent = {
  (props: LayoutInfobarProps): JSX.Element
}

/**
 * Пропсы футера
 * @namespace Lucent.LayoutFooterProps
 */
export type LayoutFooterProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Компонент футера
 * @namespace Lucent.LayoutFooterComponent
 */
export type LayoutFooterComponent = {
  (props: LayoutFooterProps): JSX.Element
}

/**
 * Режим темы
 * @namespace Lucent.Theme
 */
export type LayoutThemeMode = typeof THEME_MODE_LIGHT | typeof THEME_MODE_DARK

/**
 * Режим шапки
 * @namespace Lucent.HeaderMode
 */
export type LayoutHeaderMode = typeof HEADER_MODE_BASE | typeof HEADER_MODE_HIDDEN

/**
 * Режим футера
 * @namespace Lucent.FooterMode
 */
export type LayoutFooterMode = typeof FOOTER_MODE_BASE | typeof FOOTER_MODE_HIDDEN

/**
 * Режим сайдбара
 * @namespace Lucent.SidebarMode
 */
export type LayoutSidebarMode = typeof SIDEBAR_MODE_BASE | typeof SIDEBAR_MODE_HIDDEN | typeof SIDEBAR_MODE_COLLAPSED

/**
 * Режим инфобара
 * @namespace Lucent.InfobarMode
 */
export type LayoutInfobarMode = typeof INFOBAR_MODE_BASE | typeof INFOBAR_MODE_HIDDEN | typeof INFOBAR_MODE_COLLAPSED

/**
 * Варианты режимов
 * @namespace Lucent.LayoutMode
 */
export type LayoutMode = keyof LayoutModes

/**
 * Значение режима
 * @namespace Lucent.LayoutModeValue
 */
export type LayoutModeValue = LayoutModes[LayoutMode] | null

/**
 * Название параметра
 * @namespace Lucent.LayoutParam
 */
export type LayoutParam = keyof LayoutParams

/**
 * Значение параметра
 * @namespace Lucent.LayoutParamValue
 */
export type LayoutParamValue = LayoutParams[LayoutParam] | null

/**
 * Варианты слотов
 * @namespace Lucent.LayoutSlot
 */
export type LayoutSlot = keyof LayoutSlots

/**
 * Значение слота
 * @namespace Lucent.LayoutSlotValue
 */
export type LayoutSlotValue = LayoutSlots[LayoutSlot] | null

/**
 * Название элемента макета для которого будет установлен CSS класс
 * @namespace Lucent.LayoutClassName
 */
export type LayoutClassName = keyof LayoutClassNames

/**
 * CSS классы для элемента макета
 * @namespace Lucent.LayoutClassNameValue
 */
export type LayoutClassNameValue = LayoutClassNames[LayoutClassName] | null

/**
 * Конфигурация макета
 * @namespace Lucent.LayoutConfig
 */
export type LayoutConfig = {
  modes?: LayoutModes
  params?: LayoutParams
  slots?: LayoutSlots
  classNames?: LayoutClassNames
}

/**
 * Нормализованная конфигурация макета
 * @namespace Lucent.LayoutNormalizedConfig
 */
export type LayoutNormalizedConfig = {
  modes: LayoutNormalizedModes
  params: LayoutNormalizedParams
  slots: LayoutNormalizedSlots
  classNames: LayoutNormalizedClassNames
}

/**
 * Режимы макета
 * @namespace Lucent.LayoutModes
 */
export type LayoutModes = {
  theme?: LayoutThemeMode
  header?: LayoutHeaderMode
  footer?: LayoutFooterMode
  sidebar?: LayoutSidebarMode
  infobar?: LayoutInfobarMode
}

/**
 * Нормализованные режимы макета
 * @namespace Lucent.LayoutNormalizedModes
 */
export type LayoutNormalizedModes = {
  theme: LayoutThemeMode
  header: LayoutHeaderMode
  footer: LayoutFooterMode
  sidebar: LayoutSidebarMode
  infobar: LayoutInfobarMode
}

/**
 * Параметры макета
 * @namespace Lucent.LayoutParams
 */
export type LayoutParams = {
  sidebarWidth?: string
  sidebarCollapsedWidth?: string
  sidebarHeaderHeight?: string
  sidebarFooterHeight?: string
  infobarWidth?: string
  infobarCollapsedWidth?: string
  headerHeight?: string
  footerHeight?: string
  transitionGridDuration?: string
}

/**
 * Нормализованные параметры макета
 * @namespace Lucent.LayoutNormalizedParams
 */
export type LayoutNormalizedParams = {
  sidebarWidth: string
  sidebarCollapsedWidth: string
  sidebarHeaderHeight: string
  sidebarFooterHeight: string
  infobarWidth: string
  infobarCollapsedWidth: string
  headerHeight: string
  footerHeight: string
  transitionGridDuration: string
}

/**
 * CSS-классы макета
 * @namespace Lucent.LayoutClassNames
 */
export type LayoutClassNames = {
  header?: string
  body?: string
  infobar?: string
  footer?: string
}

/**
 * Нормализованные CSS-классы макета
 * @namespace Lucent.LayoutNormalizedClassNames
 */
export type LayoutNormalizedClassNames = {
  header: string
  body: string
  infobar: string
  footer: string
}

/**
 * Слоты макета
 * @namespace Lucent.LayoutSlots
 */
export type LayoutSlots = {
  sidebar?: ReactNode
  header?: ReactNode
  body?: ReactNode
  infobar?: ReactNode
  footer?: ReactNode
}

/**
 * Нормализованные слоты макета
 * @namespace Lucent.LayoutNormalizedSlots
 */
export type LayoutNormalizedSlots = {
  sidebar: ReactNode
  header: ReactNode
  body: ReactNode
  infobar: ReactNode
  footer: ReactNode
}

/**
 * Пропсы для слота
 * @namespace Lucent.LayoutSlotProps
 */
export type LayoutSlotProps = {
  name: LayoutSlot
  children: ReactNode
  className?: string
}

/**
 * Тип компонента слота
 * @namespace Lucent.LayoutSlotComponent
 */
export type LayoutSlotComponent = {
  (props: LayoutSlotProps): null
}

/**
 * Тип компонента провайдера
 * @namespace Lucent.LayoutProviderComponent
 */
export type LayoutProviderComponent = {
  (props: LayoutProviderProps): JSX.Element
}

/**
 * Пропсы для провайдера макета
 * @namespace Lucent.LayoutProviderProps
 */
export type LayoutProviderProps = {
  children: ReactNode
  config: LayoutConfig
}

/**
 * API макета
 * @namespace Lucent.LayoutApi
 * @see Lucent.LayoutProvider
 *
 * @property {LayoutNormalizedModes} modes - режимы макета
 * @property {LayoutNormalizedParams} params - параметры макета
 * @property {LayoutNormalizedSlots} slots - слоты макета
 * @property {LayoutNormalizedClassNames} classNames - CSS-классы макета
 *
 * @property {function} setMode - установить режим
 * @property {function} setParams - установить параметры
 * @property {function} setParam - установить параметр
 * @property {function} setSlot - установить слот
 * @property {function} setClassName - установить CSS-класс
 *
 * @property {function} isThemeDark - проверить, является ли тема темной
 * @property {function} isHeaderHidden - проверить, является ли шапка скрытой
 * @property {function} isFooterHidden - проверить, является ли футер скрытым
 * @property {function} isSidebarCollapsed - проверить, является ли сайдбар свернутой
 * @property {function} isSidebarHidden - проверить, является ли сайдбар скрытым
 * @property {function} isInfobarCollapsed - проверить, является ли инфобар свернутым
 * @property {function} isInfobarHidden - проверить, является ли инфобар скрытым
 *
 * @property {function} hasHeader - проверка наличия шапки
 * @property {function} hasFooter - проверка наличия футера
 * @property {function} hasSidebar - проверка наличия сайдбара
 * @property {function} hasInfobar - проверка наличия инфобара
 *
 * @property {function} toggleThemeMode - переключить режим темы
 * @property {function} toggleHeaderVisibleMode - переключить режим шапки
 * @property {function} toggleFooterVisibleMode - переключить режим футера
 * @property {function} toggleSidebarVisibleMode - переключить режим сайдбара
 * @property {function} toggleSidebarCollapsedMode - переключить режим сайдбара
 * @property {function} toggleInfobarVisibleMode - переключить режим инфобара
 * @property {function} toggleInfobarCollapsedMode - переключить режим инфобара
 */
export type LayoutApi = {
  modes: LayoutNormalizedModes
  params: LayoutNormalizedParams
  slots: LayoutNormalizedSlots
  classNames: LayoutNormalizedClassNames

  // Проверки режимов
  isThemeDark: boolean
  isHeaderHidden: boolean
  isFooterHidden: boolean
  isSidebarCollapsed: boolean
  isSidebarHidden: boolean
  isInfobarCollapsed: boolean
  isInfobarHidden: boolean

  // Проверки наличия видимых слотов макета
  hasHeader: boolean
  hasFooter: boolean
  hasSidebar: boolean
  hasInfobar: boolean

  // Сеттеры
  setMode: (mode: LayoutMode, value: LayoutModeValue) => void
  setParams: (params: LayoutParams) => void
  setParam: (name: LayoutParam, value: LayoutParamValue) => void
  setSlot: (slot: LayoutSlot, value: LayoutSlotValue) => void
  setClassName: (name: LayoutClassName, value: LayoutClassNameValue) => void

  // Переключатели режимов
  toggleThemeMode: () => void
  toggleHeaderVisibleMode: () => void
  toggleFooterVisibleMode: () => void
  toggleSidebarVisibleMode: () => void
  toggleSidebarCollapsedMode: () => void
  toggleInfobarVisibleMode: () => void
  toggleInfobarCollapsedMode: () => void
}

/**
 * Пропсы для конструктора макета
 * @namespace Lucent.LayoutBuilderProps
 */
export type LayoutBuilderProps = ComponentProps<"div"> & {
  config: LayoutConfig
  children?: ReactNode
}

/**
 * Тип конструктора макета
 * @namespace Lucent.LayoutBuilderComponent
 */
export type LayoutBuilderComponent = {
  (props: LayoutBuilderProps): JSX.Element
  Sidebar: LayoutBuilderElementComponent
  Header: LayoutBuilderElementComponent
  Body: LayoutBuilderElementComponent
  Infobar: LayoutBuilderElementComponent
  Footer: LayoutBuilderElementComponent
}

/**
 * Пропсы для элемента конструктора
 * @namespace Lucent.LayoutBuilderElementProps
 */
export type LayoutBuilderElementProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Тип элемента конструктора
 * @namespace Lucent.LayoutBuilderElementComponent
 */
export type LayoutBuilderElementComponent = {
  (props: LayoutBuilderElementProps): JSX.Element
}
