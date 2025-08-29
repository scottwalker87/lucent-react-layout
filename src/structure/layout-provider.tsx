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
  const [sizes, setSizes] = useState<LayoutSizes>(defaultConfig.sizes)
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
  const isHeaderHidden = () => modes.headerVisible === HEADER_MODE_HIDDEN
  const isFooterHidden = () => modes.footerVisible === FOOTER_MODE_HIDDEN
  const isSidebarCollapsed = () => modes.sidebarCollapsed === SIDEBAR_MODE_COLLAPSED
  const isSidebarHidden = () => modes.sidebarVisible === SIDEBAR_MODE_HIDDEN
  const isInfobarCollapsed = () => modes.infobarCollapsed === INFOBAR_MODE_COLLAPSED
  const isInfobarHidden = () => modes.infobarVisible === INFOBAR_MODE_HIDDEN

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
    sizes,
    slots,
    classNames,

    setMode,
    setSlot,
    setClassName,

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
