import type {
  LayoutApi,
  LayoutConfig,
  LayoutNormalizedConfig,
  LayoutParams,
  LayoutNormalizedParams,
  LayoutModes,
  LayoutNormalizedModes,
  LayoutHasSlots
} from "#types"
import {
  THEME_MODE_LIGHT,
  HEADER_MODE_BASE,
  FOOTER_MODE_BASE,
  SIDEBAR_MODE_BASE,
  INFOBAR_MODE_BASE
} from "#lib/constants"
import { CSSProperties } from "react"

/**
 * Тип значения класса
 * @namespace Lucent.Utils.ClassValue
 */
type ClassValue = string | string[] | Record<string, boolean> | undefined | null | boolean

/**
 * Объединяет классы в один строковый класс
 * @param inputs - массив классов
 * @returns строковый класс
 */
export const cn = (...inputs: ClassValue[]): string => {
  // Обработчик объединения классов
  const handle = (input: ClassValue): string => {
    // Если передан falsy значение, то возвращаем пустую строку
    if (input === undefined || input === null || input === false || input === "") {
      return ""
    }

    // Если передан массив, то объединяем классы
    if (Array.isArray(input)) {
      return input.join(" ")
    }

    // Если передан объект, то объединяем классы по ключам
    else if (typeof input === "object") {
      const classes: string[] = []

      Object.entries(input).forEach(([key, value]) => {
        if (value) classes.push(key)
      })

      return classes.join(" ")
    }

    // Все остальное преобразуем в строку
    return input.toString()
  }

  return inputs.map(handle).join(" ")
}

/**
 * Нормализовать режимы макета
 * @param {LayoutModes} modes Режимы макета
 * @returns {LayoutNormalizedModes} Нормализованные режимы макета
 */
export const normalizeModes = (modes: LayoutModes): LayoutNormalizedModes => {
  modes = modes ?? {}

  return {
    theme: modes.theme ?? THEME_MODE_LIGHT,
    header: modes.header ?? HEADER_MODE_BASE,
    footer: modes.footer ?? FOOTER_MODE_BASE,
    sidebar: modes.sidebar ?? SIDEBAR_MODE_BASE,
    infobar: modes.infobar ?? INFOBAR_MODE_BASE
  }
}

/**
 * Нормализовать параметры макета
 * @param {LayoutParams} params Настройки макета
 * @returns {LayoutNormalizedParams} Нормализованные параметры макета
 */
export const normalizeParams = (params: LayoutParams): LayoutNormalizedParams => {
  params = params ?? {}

  return {
    headerHeight: params.headerHeight ?? "3.125rem",
    footerHeight: params.footerHeight ?? "3.125rem",
    sidebarWidth: params.sidebarWidth ?? "15.625rem",
    sidebarCollapsedWidth: params.sidebarCollapsedWidth ?? "3.125rem",
    infobarWidth: params.infobarWidth ?? "15.625rem",
    infobarCollapsedWidth: params.infobarCollapsedWidth ?? "3.125rem",
    transitionDuration: params.transitionDuration ?? "0.15s"
  }
}

/**
 * Нормализовать конфигурацию макета
 * @param {LayoutConfig} config Конфигурация макета
 * @returns {LayoutNormalizedConfig} Нормализованная конфигурация макета
 */
export const normalizeConfig = (config: LayoutConfig): LayoutNormalizedConfig => {
  config = config ?? {}

  const modes = normalizeModes(config.modes ?? {})
  const params = normalizeParams(config.params ?? {})
  const hasSlots: LayoutHasSlots = {
    header: false,
    sidebar: false,
    body: false,
    footer: false,
    infobar: false
  }

  return { modes, params, hasSlots }
}

/**
 * Сформировать аттрибуты контейнера (для определения режимов макета)
 * @param {LayoutApi} context Контекст макета
 * @returns {Record<string, string>} Аттрибуты макета
 */
export const makeModeAttributes = (context: LayoutApi): Record<string, string> => {
  const { modes } = context

  return {
    "data-theme-mode": modes.theme,
    "data-header-mode": modes.header,
    "data-footer-mode": modes.footer,
    "data-sidebar-mode": modes.sidebar,
    "data-infobar-mode": modes.infobar
  }
}

/**
 * Рассчитать стили макета (CSS переменные)
 * @param {LayoutApi} context Контекст макета
 * @returns {CSSProperties} Стили макета
 */
export const calcStyles = (context: LayoutApi): CSSProperties => {
  const {
    params,
    hasSlots,
    isHeaderHidden,
    isFooterHidden,
    isSidebarHidden,
    isSidebarCollapsed,
    isInfobarHidden,
    isInfobarCollapsed
  } = context

  // Проверки видимости слотов макета
  const hasHeader = hasSlots.header && !isHeaderHidden
  const hasFooter = hasSlots.footer && !isFooterHidden
  const hasSidebar = hasSlots.sidebar && !isSidebarHidden
  const hasInfobar = hasSlots.infobar && !isInfobarHidden

  /**
   * Рассчитать ширину сайдбара
   */
  const calcSidebarWidth = () => {
    if (!hasSidebar) return "0rem"

    return isSidebarCollapsed ? params.sidebarCollapsedWidth : params.sidebarWidth
  }
  /**
   * Рассчитать ширину инфобара
   */
  const calcInfobarWidth = () => {
    if (!hasInfobar) return "0rem"

    return isInfobarCollapsed ? params.infobarCollapsedWidth : params.infobarWidth
  }

  const headerHeight = hasHeader ? params.headerHeight : "0rem"
  const footerHeight = hasFooter ? params.footerHeight : "0rem"
  const sidebarWidth = calcSidebarWidth()
  const infobarWidth = calcInfobarWidth()

  return {
    "--ll-header-height": headerHeight,
    "--ll-footer-height": footerHeight,
    "--ll-sidebar-width": sidebarWidth,
    "--ll-infobar-width": infobarWidth,
    "--ll-transition-duration": params.transitionDuration
  } as CSSProperties
}
