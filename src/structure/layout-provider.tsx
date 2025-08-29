import { useState, useCallback, type FC, type ReactNode } from "react"
import type {
  LayoutProviderProps,
  LayoutApi,
  LayoutModes,
  LayoutSlots,
  LayoutMode,
  LayoutModeValue,
  LayoutSlot,
  LayoutSizes,
  LayoutClassNames
} from "#lib/types"
import {
  THEME_MODE_LIGHT,
  THEME_MODE_DARK,
  HEADER_MODE_BASE,
  HEADER_MODE_HIDDEN,
  FOOTER_MODE_BASE,
  FOOTER_MODE_HIDDEN,
  SIDEBAR_MODE_COLLAPSED,
  SIDEBAR_MODE_HIDDEN,
  INFOBAR_MODE_BASE,
  INFOBAR_MODE_HIDDEN,
  INFOBAR_MODE_COLLAPSED,
  SIDEBAR_MODE_BASE
} from "#lib/constants"
import { LayoutContext } from "#lib/context"
import { normalizeConfig } from "#lib/utils"

/**
 * Провайдер макета
 * @namespace Lucent.Structure.Provider
 */
export const LayoutProvider: FC<LayoutProviderProps> = ({ children, config }): ReactNode => {
  const defaultConfig = normalizeConfig(config)

  const [modes, setModes] = useState<LayoutModes>(defaultConfig.modes)
  const [sizes] = useState<LayoutSizes>(defaultConfig.sizes)
  const [classNames, setClassNames] = useState<LayoutClassNames>(defaultConfig.classNames)
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
   * @param {ReactNode} value - значение слота
   */
  const setSlot = useCallback((slot: LayoutSlot, value: ReactNode) => {
    setSlots(prev => ({ ...prev, [slot]: value }))
  }, [])

  /**
   * Установить CSS-класс
   * @param {keyof LayoutClassNames} name - название класса
   * @param {string} value - значение класса
   */
  const setClassName = useCallback((name: keyof LayoutClassNames, value: string) => {
    setClassNames(prev => ({ ...prev, [name]: value }))
  }, [])

  // Проверки режимов макета
  const isThemeDark = () => modes.theme === THEME_MODE_DARK
  const isHeaderHidden = () => modes.header === HEADER_MODE_HIDDEN
  const isFooterHidden = () => modes.footer === FOOTER_MODE_HIDDEN
  const isSidebarHidden = () => modes.sidebar === SIDEBAR_MODE_HIDDEN
  const isSidebarCollapsed = () => modes.sidebar === SIDEBAR_MODE_COLLAPSED
  const isInfobarHidden = () => modes.infobar === INFOBAR_MODE_HIDDEN
  const isInfobarCollapsed = () => modes.infobar === INFOBAR_MODE_COLLAPSED

  // Проверки наличия видимых слотов макета
  const hasHeader = () => !!slots.header && !isHeaderHidden()
  const hasFooter = () => !!slots.footer && !isFooterHidden()
  const hasSidebar = () => !!slots.sidebar && !isSidebarHidden()
  const hasInfobar = () => !!slots.infobar && !isInfobarHidden()

  // Переключатели режимов макета
  const toggleThemeMode = () => setMode("theme", isThemeDark() ? THEME_MODE_LIGHT : THEME_MODE_DARK)
  const toggleHeaderVisibleMode = () => {
    setMode("header", isHeaderHidden() ? HEADER_MODE_BASE : HEADER_MODE_HIDDEN)
  }
  const toggleFooterVisibleMode = () => {
    setMode("footer", isFooterHidden() ? FOOTER_MODE_BASE : FOOTER_MODE_HIDDEN)
  }
  const toggleSidebarVisibleMode = () => {
    setMode("sidebar", isSidebarHidden() ? SIDEBAR_MODE_BASE : SIDEBAR_MODE_HIDDEN)
  }
  const toggleSidebarCollapsedMode = () => {
    setMode("sidebar", isSidebarCollapsed() ? SIDEBAR_MODE_BASE : SIDEBAR_MODE_COLLAPSED)
  }
  const toggleInfobarVisibleMode = () => {
    setMode("infobar", isInfobarHidden() ? INFOBAR_MODE_BASE : INFOBAR_MODE_HIDDEN)
  }
  const toggleInfobarCollapsedMode = () => {
    setMode("infobar", isInfobarCollapsed() ? INFOBAR_MODE_BASE : INFOBAR_MODE_COLLAPSED)
  }

  // API макета
  const api: LayoutApi = {
    modes,
    sizes,
    slots,
    classNames,

    setMode,
    setSlot,
    setClassName,

    hasHeader,
    hasFooter,
    hasSidebar,
    hasInfobar,

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
