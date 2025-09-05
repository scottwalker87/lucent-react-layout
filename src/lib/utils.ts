import type {
  LayoutApi,
  LayoutConfig,
  LayoutNormalizedConfig,
  LayoutParams,
  LayoutNormalizedParams,
  LayoutModes,
  LayoutNormalizedModes
} from "../types"
import { THEME_MODE_LIGHT, HEADER_MODE_BASE, FOOTER_MODE_BASE, SIDEBAR_MODE_BASE, INFOBAR_MODE_BASE } from "./constants"
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
    headerHeight: params.headerHeight ?? "0rem",
    footerHeight: params.footerHeight ?? "0rem",
    sidebarWidth: params.sidebarWidth ?? "0rem",
    sidebarCollapsedWidth: params.sidebarCollapsedWidth ?? "0rem",
    infobarWidth: params.infobarWidth ?? "0rem",
    infobarCollapsedWidth: params.infobarCollapsedWidth ?? "0rem",
    transitionDuration: params.transitionDuration ?? "0.1s"
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

  return { modes, params }
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
    isHeaderHidden,
    isFooterHidden,
    isSidebarHidden,
    isSidebarCollapsed,
    isInfobarHidden,
    isInfobarCollapsed
  } = context

  // Проверки видимости слотов макета
  const hasHeader = !isHeaderHidden
  const hasFooter = !isFooterHidden
  const hasSidebar = !isSidebarHidden
  const hasInfobar = !isInfobarHidden

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
