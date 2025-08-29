import type { ComponentProps, FC, ReactNode } from "react"
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
 * Пропсы для шапки боковой панели
 * @namespace Lucent.SidebarHeaderProps
 */
export type SidebarHeaderProps = ComponentProps<"div"> & {
  children: ReactNode
  collapsed: boolean
}

/**
 * Пропсы для тела боковой панели
 * @namespace Lucent.SidebarBodyProps
 */
export type SidebarBodyProps = ComponentProps<"div"> & {
  children: ReactNode
  collapsed: boolean
}

/**
 * Пропсы для футера боковой панели
 * @namespace Lucent.SidebarFooterProps
 */
export type SidebarFooterProps = ComponentProps<"div"> & {
  children: ReactNode
  collapsed: boolean
}

/**
 * Пропсы для шапки
 * @namespace Lucent.HeaderProps
 */
export type HeaderProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Пропсы для тела макета (основной контент)
 * @namespace Lucent.BodyProps
 */
export type BodyProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Пропсы для информационного панеля
 * @namespace Lucent.InfobarProps
 */
export type InfobarProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Пропсы для футера
 * @namespace Lucent.FooterProps
 */
export type FooterProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Тип для состояния темы
 * @namespace Lucent.Theme
 */
export type ThemeMode = typeof THEME_MODE_LIGHT | typeof THEME_MODE_DARK

/**
 * Тип для состояния шапки
 * @namespace Lucent.HeaderMode
 */
export type HeaderMode = typeof HEADER_MODE_BASE | typeof HEADER_MODE_HIDDEN

/**
 * Тип для состояния футера
 * @namespace Lucent.FooterMode
 */
export type FooterMode = typeof FOOTER_MODE_BASE | typeof FOOTER_MODE_HIDDEN

/**
 * Тип для состояния сайдбара
 * @namespace Lucent.SidebarMode
 */
export type SidebarMode = typeof SIDEBAR_MODE_BASE | typeof SIDEBAR_MODE_HIDDEN | typeof SIDEBAR_MODE_COLLAPSED

/**
 * Тип для состояния инфобара
 * @namespace Lucent.InfobarMode
 */
export type InfobarMode = typeof INFOBAR_MODE_BASE | typeof INFOBAR_MODE_HIDDEN | typeof INFOBAR_MODE_COLLAPSED

/**
 * Режимы макета
 * @namespace Lucent.LayoutModes
 */
export type LayoutModes = {
  theme?: ThemeMode
  header?: HeaderMode
  footer?: FooterMode
  sidebar?: SidebarMode
  infobar?: InfobarMode
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
  body?: string
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
  body?: ReactNode
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
 * Пропсы для контейнера макета
 * @namespace Lucent.ContainerProps
 */
export type ContainerProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Пропсы для контейнера сайдбара
 * @namespace Lucent.SidebarContainerProps
 */
export type SidebarContainerProps = ComponentProps<"div"> & {
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
 * @property {function} hasHeader - проверить, есть ли шапка
 * @property {function} hasFooter - проверить, есть ли футер
 * @property {function} hasSidebar - проверить, есть ли сайдбар
 * @property {function} hasInfobar - проверить, есть ли инфобар
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

  // Проверки наличия видимых слотов макета
  hasHeader: () => boolean
  hasFooter: () => boolean
  hasSidebar: () => boolean
  hasInfobar: () => boolean

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
 *
 * @property {function} hasHeader - проверить, есть ли шапка
 * @property {function} hasFooter - проверить, есть ли футер
 */
export type LayoutSidebarApi = {
  slots: SidebarSlots
  classNames: SidebarClassNames

  // Сеттеры
  setSlot: (slot: SidebarSlot, value: ReactNode) => void
  setClassName: (name: keyof SidebarClassNames, value: string) => void

  // Проверки наличия видимых слотов сайдбара
  hasHeader: () => boolean
  hasFooter: () => boolean
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

/**
 * Тип для конструктора макета
 * @namespace Lucent.LayoutBuilderComponent
 */
export type LayoutBuilderComponent = FC<LayoutBuilderProps> & {
  Sidebar: FC<LayoutBuilderElementProps>
  Header: FC<LayoutBuilderElementProps>
  Body: FC<LayoutBuilderElementProps>
  Infobar: FC<LayoutBuilderElementProps>
  Footer: FC<LayoutBuilderElementProps>
}

/**
 * Тип для конструктора сайдбара
 * @namespace Lucent.SidebarBuilderComponent
 */
export type SidebarBuilderComponent = FC<SidebarBuilderProps> & {
  Header: FC<SidebarBuilderElementProps>
  Body: FC<SidebarBuilderElementProps>
  Footer: FC<SidebarBuilderElementProps>
}
