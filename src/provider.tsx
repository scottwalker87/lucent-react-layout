import { useState, type FC, type ReactNode } from "react"
import type {
  ProviderProps,
  LayoutApi,
  LayoutModes,
  LayoutSlots,
  LayoutMode,
  LayoutModeValue,
  LayoutSlot,
  LayoutSlotValue,
  SidebarSlots,
  SidebarSlot
} from "./lib/types"
import {
  THEME_MODE_LIGHT,
  THEME_MODE_DARK,
  HEADER_MODE_HIDDEN,
  HEADER_MODE_VISIBLE,
  FOOTER_MODE_HIDDEN,
  FOOTER_MODE_VISIBLE,
  SIDEBAR_MODE_COLLAPSED,
  SIDEBAR_MODE_HIDDEN,
  SIDEBAR_MODE_VISIBLE,
  SIDEBAR_MODE_EXPANDED,
  INFOBAR_MODE_HIDDEN,
  INFOBAR_MODE_VISIBLE,
  INFOBAR_MODE_COLLAPSED,
  INFOBAR_MODE_EXPANDED
} from "./lib/constants"
import { LayoutContext } from "./lib/context"
import { normalizeConfig } from "./lib/utils"

/**
 * Провайдер макета
 * @namespace Lucent.Provider
 * @param {ProviderProps.children} props.children - контент макета
 * @param {ProviderProps.config} props.config - конфигурация макета
 * @returns {ReactNode}
 */
export const Provider: FC<ProviderProps> = ({ children, config }: ProviderProps): ReactNode => {
  const defaultConfig = normalizeConfig(config)

  const [modes, setModes] = useState<LayoutModes>(defaultConfig.modes)
  const [slots, setSlots] = useState<LayoutSlots>(defaultConfig.slots)

  /**
   * Установить режим
   * @param {LayoutMode} mode - название режима
   * @param {LayoutModeValue} value - значение режима
   */
  const setMode = (mode: LayoutMode, value: LayoutModeValue) => {
    setModes(prev => ({ ...prev, [mode]: value }))
  }

  /**
   * Установить слот
   * @param {LayoutSlot} slot - название слота
   * @param {LayoutSlotValue} value - значение слота
   */
  const setSlot = (slot: LayoutSlot, value: LayoutSlotValue) => {
    setSlots(prev => ({ ...prev, [slot]: value }))
  }

  /**
   * Установить слоты для сайдбара
   * @param {SidebarSlots} slots - слоты боковой панели
   */
  const setSidebarSlots = (slots: SidebarSlots) => {
    setSlots(prev => ({ ...prev, sidebar: slots }))
  }

  /**
   * Установить слот для сайдбара
   * @param {SidebarSlot} slot - название слота
   * @param {ReactNode} value - значение слота
   */
  const setSidebarSlot = (slot: SidebarSlot, value: ReactNode) => {
    setSidebarSlots({ ...slots.sidebar, [slot]: value })
  }

  /**
   * Получить режим макета
   * @param {LayoutMode} mode - название режима
   * @returns {LayoutModeValue} - значение режима
   */
  const getMode = (mode: LayoutMode): LayoutModeValue => modes[mode] ?? null

  /**
   * Получить слот макета
   * @param {LayoutSlot} slot - название слота
   * @returns {LayoutSlotValue} - значение слота
   */
  const getSlot = (slot: LayoutSlot): LayoutSlotValue => slots[slot] ?? null

  /**
   * Получить слот сайдбара
   * @param {SidebarSlot} slot - название слота
   * @returns {ReactNode} - значение слота
   */
  const getSidebarSlot = (slot: SidebarSlot): ReactNode => slots.sidebar?.[slot] ?? null

  // Проверки режимов макета
  const isThemeDark = () => modes.theme === THEME_MODE_DARK
  const isHeaderHidden = () => modes.headerVisible === HEADER_MODE_HIDDEN
  const isFooterHidden = () => modes.footerVisible === FOOTER_MODE_HIDDEN
  const isSidebarCollapsed = () => modes.sidebarCollapsed === SIDEBAR_MODE_COLLAPSED
  const isSidebarHidden = () => modes.sidebarVisible === SIDEBAR_MODE_HIDDEN
  const isInfobarCollapsed = () => modes.infobarCollapsed === INFOBAR_MODE_COLLAPSED
  const isInfobarHidden = () => modes.infobarVisible === INFOBAR_MODE_HIDDEN

  // Проверки наличия слотов макета
  const hasSidebar = () => !!slots.sidebar && Object.values(slots.sidebar).some(Boolean)
  const hasHeader = () => !!slots.header
  const hasContent = () => !!slots.content
  const hasInfobar = () => !!slots.infobar
  const hasFooter = () => !!slots.footer

  // Переключатели режимов макета
  const toggleThemeMode = () => setMode("theme", isThemeDark() ? THEME_MODE_LIGHT : THEME_MODE_DARK)
  const toggleHeaderVisibleMode = () => {
    setMode("headerVisible", isHeaderHidden() ? HEADER_MODE_VISIBLE : HEADER_MODE_HIDDEN)
  }
  const toggleFooterVisibleMode = () => {
    setMode("footerVisible", isFooterHidden() ? FOOTER_MODE_VISIBLE : FOOTER_MODE_HIDDEN)
  }
  const toggleSidebarVisibleMode = () => {
    setMode("sidebarVisible", isSidebarHidden() ? SIDEBAR_MODE_VISIBLE : SIDEBAR_MODE_HIDDEN)
  }
  const toggleSidebarCollapsedMode = () => {
    setMode("sidebarCollapsed", isSidebarCollapsed() ? SIDEBAR_MODE_EXPANDED : SIDEBAR_MODE_COLLAPSED)
  }
  const toggleInfobarVisibleMode = () => {
    setMode("infobarVisible", isInfobarHidden() ? INFOBAR_MODE_VISIBLE : INFOBAR_MODE_HIDDEN)
  }
  const toggleInfobarCollapsedMode = () => {
    setMode("infobarCollapsed", isInfobarCollapsed() ? INFOBAR_MODE_EXPANDED : INFOBAR_MODE_COLLAPSED)
  }

  // API макета
  const api: LayoutApi = {
    modes,
    slots,

    setModes,
    setMode,
    setSlots,
    setSlot,
    setSidebarSlots,
    setSidebarSlot,

    getMode,
    getSlot,
    getSidebarSlot,

    hasSidebar,
    hasHeader,
    hasContent,
    hasInfobar,
    hasFooter,

    isThemeDark,
    isHeaderHidden,
    isFooterHidden,
    isSidebarCollapsed,
    isSidebarHidden,
    isInfobarCollapsed,
    isInfobarHidden,

    toggleThemeMode,
    toggleHeaderVisibleMode,
    toggleFooterVisibleMode,
    toggleSidebarVisibleMode,
    toggleSidebarCollapsedMode,
    toggleInfobarVisibleMode,
    toggleInfobarCollapsedMode
  }

  return <LayoutContext.Provider value={api}>{children}</LayoutContext.Provider>
}
