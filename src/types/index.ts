import type { ComponentProps, JSX } from "react"
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
} from "../lib/constants"

/**
 * Пропсы контейнера
 * @namespace Lucent.LayoutContainerProps
 */
export type ContainerProps = ComponentProps<"div">

/**
 * Компонент контейнера
 * @namespace Lucent.LayoutContainerComponent
 */
export type ContainerComponent = {
  (props: ContainerProps): JSX.Element
}

/**
 * Пропсы шапки
 * @namespace Lucent.LayoutHeaderProps
 */
export type HeaderProps = ComponentProps<"div">

/**
 * Компонент шапки
 * @namespace Lucent.LayoutHeaderComponent
 */
export type HeaderComponent = {
  (props: HeaderProps): JSX.Element
}

/**
 * Пропсы сайдбара
 * @namespace Lucent.LayoutSidebarProps
 */
export type SidebarProps = ComponentProps<"div">

/**
 * Компонент сайдбара
 * @namespace Lucent.LayoutSidebarComponent
 */
export type SidebarComponent = {
  (props: SidebarProps): JSX.Element
}

/**
 * Пропсы тела макета
 * @namespace Lucent.LayoutBodyProps
 */
export type BodyProps = ComponentProps<"div">

/**
 * Компонент тела макета
 * @namespace Lucent.LayoutBodyComponent
 */
export type BodyComponent = {
  (props: BodyProps): JSX.Element
}

/**
 * Пропсы инфобара
 * @namespace Lucent.LayoutInfobarProps
 */
export type InfobarProps = ComponentProps<"div">

/**
 * Компонент инфобара
 * @namespace Lucent.LayoutInfobarComponent
 */
export type InfobarComponent = {
  (props: InfobarProps): JSX.Element
}

/**
 * Пропсы футера
 * @namespace Lucent.LayoutFooterProps
 */
export type FooterProps = ComponentProps<"div">

/**
 * Компонент футера
 * @namespace Lucent.LayoutFooterComponent
 */
export type FooterComponent = {
  (props: FooterProps): JSX.Element
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
 * Название слота
 * @namespace Lucent.LayoutHasSlot
 */
export type LayoutHasSlot = keyof LayoutHasSlots

/**
 * Значение инициализации слота
 * @namespace Lucent.LayoutHasSlotValue
 */
export type LayoutHasSlotValue = LayoutHasSlots[LayoutHasSlot]

/**
 * Конфигурация макета
 * @namespace Lucent.LayoutConfig
 */
export type LayoutConfig = {
  modes?: LayoutModes
  params?: LayoutParams
}

/**
 * Нормализованная конфигурация макета
 * @namespace Lucent.LayoutNormalizedConfig
 */
export type LayoutNormalizedConfig = {
  modes: LayoutNormalizedModes
  params: LayoutNormalizedParams
  hasSlots: LayoutHasSlots
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
  headerHeight?: string
  footerHeight?: string
  sidebarWidth?: string
  sidebarCollapsedWidth?: string
  infobarWidth?: string
  infobarCollapsedWidth?: string
  transitionDuration?: string
}

/**
 * Нормализованные параметры макета
 * @namespace Lucent.LayoutNormalizedParams
 */
export type LayoutNormalizedParams = {
  headerHeight: string
  footerHeight: string
  sidebarWidth: string
  sidebarCollapsedWidth: string
  infobarWidth: string
  infobarCollapsedWidth: string
  transitionDuration: string
}

/**
 * Карта инициализированных слотов макета
 * @namespace Lucent.LayoutHasSlots
 */
export type LayoutHasSlots = {
  header: boolean
  sidebar: boolean
  body: boolean
  infobar: boolean
  footer: boolean
}

/**
 * Тип компонента провайдера
 * @namespace Lucent.LayoutProviderComponent
 */
export type ProviderComponent = {
  (props: ProviderProps): JSX.Element
}

/**
 * Пропсы для провайдера макета
 * @namespace Lucent.LayoutProviderProps
 */
export type ProviderProps = ComponentProps<"div"> & {
  config: LayoutConfig
}

/**
 * API макета
 * @namespace Lucent.LayoutApi
 * @see Lucent.LayoutProvider
 *
 * @property {LayoutNormalizedModes} modes - режимы макета
 * @property {LayoutNormalizedParams} params - параметры макета
 * @property {LayoutHasSlots} hasSlots - карта инициализированных слотов макета
 *
 * @property {function} setMode - установить режим
 * @property {function} setParams - установить параметры
 * @property {function} setParam - установить параметр
 * @property {function} setHasSlot - установить карту инициализированных слотов
 *
 * @property {function} isThemeDark - проверить, является ли тема темной
 * @property {function} isHeaderHidden - проверить, является ли шапка скрытой
 * @property {function} isFooterHidden - проверить, является ли футер скрытым
 * @property {function} isSidebarCollapsed - проверить, является ли сайдбар свернутой
 * @property {function} isSidebarHidden - проверить, является ли сайдбар скрытым
 * @property {function} isInfobarCollapsed - проверить, является ли инфобар свернутым
 * @property {function} isInfobarHidden - проверить, является ли инфобар скрытым
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
  hasSlots: LayoutHasSlots

  // Проверки режимов
  isThemeDark: boolean
  isHeaderHidden: boolean
  isFooterHidden: boolean
  isSidebarCollapsed: boolean
  isSidebarHidden: boolean
  isInfobarCollapsed: boolean
  isInfobarHidden: boolean

  // Сеттеры
  setMode: (mode: LayoutMode, value: LayoutModeValue) => void
  setParams: (params: LayoutParams) => void
  setParam: (name: LayoutParam, value: LayoutParamValue) => void
  setHasSlot: (slot: LayoutHasSlot) => void
  unsetHasSlot: (slot: LayoutHasSlot) => void

  // Переключатели режимов
  toggleThemeMode: () => void
  toggleHeaderVisibleMode: () => void
  toggleFooterVisibleMode: () => void
  toggleSidebarVisibleMode: () => void
  toggleSidebarCollapsedMode: () => void
  toggleInfobarVisibleMode: () => void
  toggleInfobarCollapsedMode: () => void
}
