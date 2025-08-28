import type { ComponentProps, ReactNode } from "react"
import {
  THEME_MODE_LIGHT,
  THEME_MODE_DARK,
  HEADER_MODE_VISIBLE,
  HEADER_MODE_HIDDEN,
  FOOTER_MODE_VISIBLE,
  FOOTER_MODE_HIDDEN,
  SIDEBAR_MODE_VISIBLE,
  SIDEBAR_MODE_HIDDEN,
  SIDEBAR_MODE_COLLAPSED,
  SIDEBAR_MODE_EXPANDED,
  INFOBAR_MODE_VISIBLE,
  INFOBAR_MODE_HIDDEN,
  INFOBAR_MODE_COLLAPSED,
  INFOBAR_MODE_EXPANDED
} from "#lib/constants"

/**
 * Пропсы для страницы
 * @namespace Lucent.PageProps
 */
export type PageProps = {
  children: ReactNode
}

/**
 * Пропсы для шапки
 * @namespace Lucent.PageHeaderProps
 */
export type PageHeaderProps = {
  children: ReactNode
}

/**
 * Пропсы для тела
 * @namespace Lucent.PageBodyProps
 */
export type PageBodyProps = ComponentProps<"div">

/**
 * Пропсы для футера
 * @namespace Lucent.PageFooterProps
 */
export type PageFooterProps = {
  children: ReactNode
}

/**
 * Пропсы для контента
 * @namespace Lucent.ContentProps
 */
export type ContentProps = ComponentProps<"div">

/**
 * Пропсы для информационного панеля
 * @namespace Lucent.InfobarProps
 */
export type InfobarProps = ComponentProps<"div">

/**
 * Тип для состояния темы
 * @namespace Lucent.Theme
 */
export type ThemeMode = typeof THEME_MODE_LIGHT | typeof THEME_MODE_DARK

/**
 * Тип для состояния шапки
 * @namespace Lucent.HeaderVisible
 */
export type HeaderVisibleMode = typeof HEADER_MODE_VISIBLE | typeof HEADER_MODE_HIDDEN

/**
 * Тип для состояния футера
 * @namespace Lucent.FooterVisible
 */
export type FooterVisibleMode = typeof FOOTER_MODE_VISIBLE | typeof FOOTER_MODE_HIDDEN

/**
 * Тип для состояния сайдбара
 * @namespace Lucent.SidebarVisible
 */
export type SidebarVisibleMode = typeof SIDEBAR_MODE_VISIBLE | typeof SIDEBAR_MODE_HIDDEN

/**
 * Тип для состояния боковой панели
 * @namespace Lucent.SidebarCollapsed
 */
export type SidebarCollapsedMode = typeof SIDEBAR_MODE_COLLAPSED | typeof SIDEBAR_MODE_EXPANDED

/**
 * Тип для состояния информационной панели
 * @namespace Lucent.InfobarVisible
 */
export type InfobarVisibleMode = typeof INFOBAR_MODE_VISIBLE | typeof INFOBAR_MODE_HIDDEN

/**
 * Тип для состояния инфобара
 * @namespace Lucent.InfobarCollapsed
 */
export type InfobarCollapsedMode = typeof INFOBAR_MODE_COLLAPSED | typeof INFOBAR_MODE_EXPANDED

/**
 * Режимы макета
 * @namespace Lucent.LayoutModes
 */
export type LayoutModes = {
  theme?: ThemeMode
  headerVisible?: HeaderVisibleMode
  footerVisible?: FooterVisibleMode
  sidebarVisible?: SidebarVisibleMode
  sidebarCollapsed?: SidebarCollapsedMode
  infobarVisible?: InfobarVisibleMode
  infobarCollapsed?: InfobarCollapsedMode
}

/**
 * Слоты макета
 * @namespace Lucent.LayoutSlots
 */
export type LayoutSlots = {
  sidebar?: SidebarSlots
  header?: ReactNode
  content: ReactNode
  infobar?: ReactNode
  footer?: ReactNode
}

/**
 * Слоты боковой панели
 * @namespace Lucent.SidebarSlots
 */
export type SidebarSlots = {
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
}

/**
 * Пропсы для слота боковой панели
 * @namespace Lucent.SidebarSlotProps
 */
export type SidebarSlotProps = {
  children: ReactNode
  collapsed: boolean
}

/**
 * Варианты режимов макета
 * @namespace Lucent.LayoutMode
 */
export type LayoutMode = keyof LayoutModes

/**
 * Значение режима макета
 * @namespace Lucent.LayoutModeValue
 */
export type LayoutModeValue = LayoutModes[LayoutMode] | null

/**
 * Варианты слотов макета
 * @namespace Lucent.LayoutSlot
 */
export type LayoutSlot = keyof LayoutSlots

/**
 * Значение слота макета
 * @namespace Lucent.LayoutSlotValue
 */
export type LayoutSlotValue = LayoutSlots[LayoutSlot] | null

/**
 * Варианты слотов боковой панели
 * @namespace Lucent.SidebarSlot
 */
export type SidebarSlot = keyof SidebarSlots

/**
 * Конфигурация макета
 * @namespace Lucent.LayoutConfig
 */
export type LayoutConfig = {
  modes: LayoutModes
  slots: LayoutSlots
}

/**
 * Пропсы для провайдера
 * @namespace Lucent.ProviderProps
 */
export type ProviderProps = {
  children: ReactNode
  config: LayoutConfig
}

/**
 * API макета
 * @namespace Lucent.LayoutApi
 * @see Lucent.Provider
 *
 * @property {LayoutModes} modes - режимы макета
 * @property {LayoutSlots} slots - слоты макета
 *
 * @property {function} setModes - установить режимы
 * @property {function} setMode - установить режим
 * @property {function} setSlots - установить слоты
 * @property {function} setSlot - установить слот
 * @property {function} setSidebarSlots - установить слоты боковой панели
 * @property {function} setSidebarSlot - установить слот боковой панели
 *
 * @property {function} getMode - получить режим
 * @property {function} getSlot - получить слот
 * @property {function} getSidebarSlot - получить слот боковой панели
 *
 * @property {function} isThemeDark - проверить, является ли тема темной
 * @property {function} isHeaderHidden - проверить, является ли шапка скрытой
 * @property {function} isFooterHidden - проверить, является ли футер скрытым
 * @property {function} isSidebarCollapsed - проверить, является ли сайдбар свернутой
 * @property {function} isSidebarHidden - проверить, является ли сайдбар скрытым
 * @property {function} isInfobarCollapsed - проверить, является ли инфобар свернутым
 * @property {function} isInfobarHidden - проверить, является ли инфобар скрытым
 *
 * @property {function} hasSidebar - проверить, есть ли сайдбар
 * @property {function} hasHeader - проверить, есть ли шапка
 * @property {function} hasContent - проверить, есть ли контент
 * @property {function} hasInfobar - проверить, есть ли инфобар
 * @property {function} hasFooter - проверить, есть ли футер
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
  modes: LayoutModes
  slots: LayoutSlots

  // Сеттеры
  setModes: (modes: LayoutModes) => void
  setMode: (mode: LayoutMode, value: LayoutModeValue) => void
  setSlots: (slots: LayoutSlots) => void
  setSlot: (slot: LayoutSlot, value: LayoutSlotValue) => void
  setSidebarSlots: (slots: SidebarSlots) => void
  setSidebarSlot: (slot: SidebarSlot, value: ReactNode) => void

  // Геттеры
  getMode: (mode: LayoutMode) => LayoutModeValue
  getSlot: (slot: LayoutSlot) => LayoutSlotValue
  getSidebarSlot: (slot: SidebarSlot) => ReactNode

  // Проверки режимов
  isThemeDark: () => boolean
  isHeaderHidden: () => boolean
  isFooterHidden: () => boolean
  isSidebarCollapsed: () => boolean
  isSidebarHidden: () => boolean
  isInfobarCollapsed: () => boolean
  isInfobarHidden: () => boolean

  // Проверки наличия слотов
  hasSidebar: () => boolean
  hasHeader: () => boolean
  hasContent: () => boolean
  hasInfobar: () => boolean
  hasFooter: () => boolean

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
 * Пропсы для макета "Lucent"
 * @namespace Lucent.LucentProps
 */
export type LucentProps = {
  config: LayoutConfig
}
