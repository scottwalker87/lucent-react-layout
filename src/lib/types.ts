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
 * Пропсы для шапки боковой панели
 * @namespace Lucent.SidebarHeaderProps
 */
export type SidebarHeaderProps = {
  children: ReactNode
  collapsed: boolean
}

/**
 * Пропсы для тела боковой панели
 * @namespace Lucent.SidebarBodyProps
 */
export type SidebarBodyProps = {
  children: ReactNode
  collapsed: boolean
}

/**
 * Пропсы для футера боковой панели
 * @namespace Lucent.SidebarFooterProps
 */
export type SidebarFooterProps = {
  children: ReactNode
  collapsed: boolean
}

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
 * Размеры элементов макета
 * @namespace Lucent.LayoutSizes
 */
export type LayoutSizes = {
  sidebarWidth?: string
  sidebarCollapsedWidth?: string
  sidebarHeaderHeight?: string
  sidebarFooterHeight?: string
  infobarWidth?: string
  infobarCollapsedWidth?: string
  headerHeight?: string
  footerHeight?: string
}

/**
 * CSS-классы макета
 * @namespace Lucent.LayoutClassNames
 */
export type LayoutClassNames = {
  header?: string
  content?: string
  infobar?: string
  footer?: string
}

/**
 * CSS-классы сайдбара
 * @namespace Lucent.SidebarClassNames
 */
export type SidebarClassNames = {
  header?: string
  body?: string
  footer?: string
}

/**
 * Слоты макета
 * @namespace Lucent.LayoutSlots
 */
export type LayoutSlots = {
  sidebar?: ReactNode
  header?: ReactNode
  content?: ReactNode
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
 * Пропсы для слота
 * @namespace Lucent.LayoutSlotProps
 */
export type LayoutSlotProps = {
  name: LayoutSlot
  children: ReactNode
  className?: string
}

/**
 * Пропсы для слота боковой панели
 * @namespace Lucent.SidebarSlotProps
 */
export type SidebarSlotProps = {
  name: SidebarSlot
  children: ReactNode
  className?: string
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
 * Варианты слотов сайдбара
 * @namespace Lucent.SidebarSlot
 */
export type SidebarSlot = keyof SidebarSlots

/**
 * Значение слота сайдбара
 * @namespace Lucent.SidebarSlotValue
 */
export type SidebarSlotValue = SidebarSlots[SidebarSlot] | null

/**
 * Конфигурация макета
 * @namespace Lucent.LayoutConfig
 */
export type LayoutConfig = {
  modes?: LayoutModes
  sizes?: LayoutSizes
  slots?: LayoutSlots
  classNames?: LayoutClassNames
}

/**
 * Нормализованная конфигурация макета
 * @namespace Lucent.LayoutNormalizedConfig
 */
export type LayoutNormalizedConfig = {
  modes: LayoutModes
  sizes: LayoutSizes
  slots: LayoutSlots
  classNames: LayoutClassNames
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
 * Пропсы для провайдера сайдбара
 * @namespace Lucent.SidebarProviderProps
 */
export type SidebarProviderProps = {
  children: ReactNode
}

/**
 * Пропсы для макета
 * @namespace Lucent.LayoutProps
 */
export type LayoutProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Пропсы для макета сайдбара
 * @namespace Lucent.SidebarLayoutProps
 */
export type SidebarLayoutProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * API макета
 * @namespace Lucent.LayoutApi
 * @see Lucent.LayoutProvider
 *
 * @property {LayoutModes} modes - режимы макета
 * @property {LayoutSlots} slots - слоты макета
 *
 * @property {function} setMode - установить режим
 * @property {function} setSlot - установить слот
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
  modes: LayoutModes
  sizes: LayoutSizes
  slots: LayoutSlots
  classNames: LayoutClassNames

  // Сеттеры
  setMode: (mode: LayoutMode, value: LayoutModeValue) => void
  setSlot: (slot: LayoutSlot, value: LayoutSlotValue) => void
  setClassName: (name: keyof LayoutClassNames, value: string) => void

  // Проверки режимов
  isThemeDark: () => boolean
  isHeaderHidden: () => boolean
  isFooterHidden: () => boolean
  isSidebarCollapsed: () => boolean
  isSidebarHidden: () => boolean
  isInfobarCollapsed: () => boolean
  isInfobarHidden: () => boolean

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
 * API сайдбара
 * @namespace Lucent.LayoutSidebarApi
 * @see Lucent.LayoutSidebarContext
 *
 * @property {SidebarSlots} slots - слоты сайдбара
 * @property {SidebarClassNames} classNames - CSS классы сайдбара
 *
 * @property {function} setClassName - установить CSS класс сайдбара
 * @property {function} setSlot - установить слот сайдбара
 */
export type LayoutSidebarApi = {
  slots: SidebarSlots
  classNames: SidebarClassNames

  // Сеттеры
  setSlot: (slot: SidebarSlot, value: ReactNode) => void
  setClassName: (name: keyof SidebarClassNames, value: string) => void
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
 * Пропсы для элементов конструктора макета
 * @namespace Lucent.LayoutBuilderElementProps
 */
export type LayoutBuilderElementProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Пропсы для конструктора сайдбара
 * @namespace Lucent.SidebarBuilderProps
 */
export type SidebarBuilderProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Пропсы для элементов конструктора сайдбара
 * @namespace Lucent.SidebarBuilderElementProps
 */
export type SidebarBuilderElementProps = ComponentProps<"div"> & {
  children: ReactNode
}
