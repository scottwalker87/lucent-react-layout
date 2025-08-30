import { useState, useCallback } from "react"
import type {
  LayoutApi,
  LayoutHasSlot,
  LayoutHasSlotValue,
  LayoutMode,
  LayoutModeValue,
  LayoutNormalizedModes,
  LayoutNormalizedParams,
  LayoutParam,
  LayoutParamValue,
  LayoutParams,
  LayoutHasSlots,
  ProviderComponent
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
import { Container } from "#ui"

/**
 * Провайдер макета
 * @namespace Lucent.Structure.Provider
 */
export const LayoutProvider: ProviderComponent = ({ children, config, ...props }) => {
  const startedConfig = normalizeConfig(config)

  const [modes, setStateModes] = useState<LayoutNormalizedModes>(startedConfig.modes)
  const [params, setStateParams] = useState<LayoutNormalizedParams>(startedConfig.params)
  const [hasSlots, setHasSlots] = useState<LayoutHasSlots>(startedConfig.hasSlots)

  // Проверки режимов макета
  const isThemeDark = modes.theme === THEME_MODE_DARK
  const isHeaderHidden = modes.header === HEADER_MODE_HIDDEN
  const isFooterHidden = modes.footer === FOOTER_MODE_HIDDEN
  const isSidebarHidden = modes.sidebar === SIDEBAR_MODE_HIDDEN
  const isSidebarCollapsed = modes.sidebar === SIDEBAR_MODE_COLLAPSED
  const isInfobarHidden = modes.infobar === INFOBAR_MODE_HIDDEN
  const isInfobarCollapsed = modes.infobar === INFOBAR_MODE_COLLAPSED

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
   * @param {LayoutHasSlot} slot - название слота
   * @param {LayoutHasSlotValue} value - значение слота
   */
  const setHasSlot = useCallback(
    (slot: LayoutHasSlot, value: LayoutHasSlotValue) => {
      setHasSlots(prev => ({ ...prev, [slot]: value }))
    },
    [setHasSlots]
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
    hasSlots,

    isThemeDark,
    isHeaderHidden,
    isFooterHidden,
    isSidebarCollapsed,
    isSidebarHidden,
    isInfobarCollapsed,
    isInfobarHidden,

    setMode,
    setParams,
    setParam,
    setHasSlot,

    toggleThemeMode,
    toggleHeaderVisibleMode,
    toggleFooterVisibleMode,
    toggleSidebarVisibleMode,
    toggleSidebarCollapsedMode,
    toggleInfobarVisibleMode,
    toggleInfobarCollapsedMode
  }

  return (
    <LayoutContext.Provider value={api}>
      <Container {...props}>{children}</Container>
    </LayoutContext.Provider>
  )
}
