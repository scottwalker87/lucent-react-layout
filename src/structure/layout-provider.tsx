import { useState, useCallback, type ReactNode } from "react"
import type {
  LayoutApi,
  LayoutMode,
  LayoutModeValue,
  LayoutSlot,
  LayoutNormalizedModes,
  LayoutNormalizedParams,
  LayoutNormalizedClassNames,
  LayoutNormalizedSlots,
  LayoutParam,
  LayoutParamValue,
  LayoutClassName,
  LayoutClassNameValue,
  LayoutParams,
  LayoutProviderComponent
} from "#types"
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
export const LayoutProvider: LayoutProviderComponent = ({ children, config }) => {
  const startedConfig = normalizeConfig(config)

  const [modes, setStateModes] = useState<LayoutNormalizedModes>(startedConfig.modes)
  const [params, setStateParams] = useState<LayoutNormalizedParams>(startedConfig.params)
  const [classNames, setStateClassNames] = useState<LayoutNormalizedClassNames>(startedConfig.classNames)
  const [slots, setStateSlots] = useState<LayoutNormalizedSlots>(startedConfig.slots)

  // Проверки режимов макета
  const isThemeDark = modes.theme === THEME_MODE_DARK
  const isHeaderHidden = modes.header === HEADER_MODE_HIDDEN
  const isFooterHidden = modes.footer === FOOTER_MODE_HIDDEN
  const isSidebarHidden = modes.sidebar === SIDEBAR_MODE_HIDDEN
  const isSidebarCollapsed = modes.sidebar === SIDEBAR_MODE_COLLAPSED
  const isInfobarHidden = modes.infobar === INFOBAR_MODE_HIDDEN
  const isInfobarCollapsed = modes.infobar === INFOBAR_MODE_COLLAPSED

  // Проверки наличия видимых слотов макета
  const hasHeader = !!slots.header && !isHeaderHidden
  const hasFooter = !!slots.footer && !isFooterHidden
  const hasSidebar = !!slots.sidebar && !isSidebarHidden
  const hasInfobar = !!slots.infobar && !isInfobarHidden

  /**
   * Установить режим
   * @param {LayoutMode} mode - название режима
   * @param {LayoutModeValue} value - значение режима
   */
  const setMode = useCallback(
    (mode: LayoutMode, value: LayoutModeValue) => {
      setStateModes(prev => ({ ...prev, [mode]: value }))
    },
    [setStateModes]
  )

  /**
   * Установить параметр
   * @param {LayoutParams} params - параметры
   * @returns {void}
   */
  const setParams = useCallback(
    (params: LayoutParams) => {
      setStateParams(prev => ({ ...prev, ...params }))
    },
    [setStateParams]
  )

  /**
   * Установить параметр
   * @param {LayoutParam} name - название параметра
   * @param {LayoutParamValue} value - значение параметра
   */
  const setParam = useCallback(
    (name: LayoutParam, value: LayoutParamValue) => {
      setStateParams(prev => ({ ...prev, [name]: value }))
    },
    [setStateParams]
  )

  /**
   * Установить слот
   * @param {LayoutSlot} slot - название слота
   * @param {ReactNode} value - значение слота
   */
  const setSlot = useCallback(
    (slot: LayoutSlot, value: ReactNode) => {
      setStateSlots(prev => ({ ...prev, [slot]: value }))
    },
    [setStateSlots]
  )

  /**
   * Установить CSS-класс
   * @param {LayoutClassName} name - название класса
   * @param {LayoutClassNameValue} value - значение класса
   */
  const setClassName = useCallback(
    (name: LayoutClassName, value: LayoutClassNameValue) => {
      setStateClassNames(prev => ({ ...prev, [name]: value }))
    },
    [setStateClassNames]
  )

  /**
   * Переключить режим темы
   */
  const toggleThemeMode = useCallback(
    () => setMode("theme", isThemeDark ? THEME_MODE_LIGHT : THEME_MODE_DARK),
    [isThemeDark, setMode]
  )

  /**
   * Переключить режим видимости шапки
   */
  const toggleHeaderVisibleMode = useCallback(() => {
    setMode("header", isHeaderHidden ? HEADER_MODE_BASE : HEADER_MODE_HIDDEN)
  }, [isHeaderHidden, setMode])

  /**
   * Переключить режим видимости футера
   */
  const toggleFooterVisibleMode = useCallback(() => {
    setMode("footer", isFooterHidden ? FOOTER_MODE_BASE : FOOTER_MODE_HIDDEN)
  }, [isFooterHidden, setMode])

  /**
   * Переключить режим видимости сайдбара
   */
  const toggleSidebarVisibleMode = useCallback(() => {
    setMode("sidebar", isSidebarHidden ? SIDEBAR_MODE_BASE : SIDEBAR_MODE_HIDDEN)
  }, [isSidebarHidden, setMode])

  /**
   * Переключить режим свернутости сайдбара
   */
  const toggleSidebarCollapsedMode = useCallback(() => {
    setMode("sidebar", isSidebarCollapsed ? SIDEBAR_MODE_BASE : SIDEBAR_MODE_COLLAPSED)
  }, [isSidebarCollapsed, setMode])

  /**
   * Переключить режим видимости инфобара
   */
  const toggleInfobarVisibleMode = useCallback(() => {
    setMode("infobar", isInfobarHidden ? INFOBAR_MODE_BASE : INFOBAR_MODE_HIDDEN)
  }, [isInfobarHidden, setMode])

  /**
   * Переключить режим свернутости инфобара
   */
  const toggleInfobarCollapsedMode = useCallback(() => {
    setMode("infobar", isInfobarCollapsed ? INFOBAR_MODE_BASE : INFOBAR_MODE_COLLAPSED)
  }, [isInfobarCollapsed, setMode])

  /**
   * API макета
   */
  const api: LayoutApi = {
    modes,
    params,
    slots,
    classNames,

    isThemeDark,
    isHeaderHidden,
    isFooterHidden,
    isSidebarCollapsed,
    isSidebarHidden,
    isInfobarCollapsed,
    isInfobarHidden,

    hasHeader,
    hasFooter,
    hasSidebar,
    hasInfobar,

    setMode,
    setParams,
    setParam,
    setSlot,
    setClassName,

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
