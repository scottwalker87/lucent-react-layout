import type {
  LayoutConfig,
  LayoutNormalizedConfig,
  LayoutParams,
  LayoutNormalizedParams,
  LayoutModes,
  LayoutNormalizedModes,
  LayoutSlots,
  LayoutNormalizedSlots,
  LayoutClassNames,
  LayoutNormalizedClassNames
} from "#types"
import {
  THEME_MODE_LIGHT,
  HEADER_MODE_BASE,
  FOOTER_MODE_BASE,
  SIDEBAR_MODE_BASE,
  INFOBAR_MODE_BASE
} from "#lib/constants"

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
    sidebarHeaderHeight: params.sidebarHeaderHeight ?? "3.125rem",
    sidebarFooterHeight: params.sidebarFooterHeight ?? "3.125rem",
    infobarWidth: params.infobarWidth ?? "15.625rem",
    infobarCollapsedWidth: params.infobarCollapsedWidth ?? "3.125rem",
    transitionGridDuration: params.transitionGridDuration ?? "0.15s"
  }
}

/**
 * Нормализовать слоты макета
 * @param {LayoutSlots} slots Слоты макета
 * @returns {LayoutNormalizedSlots} Нормализованные слоты макета
 */
export const normalizeSlots = (slots: LayoutSlots): LayoutNormalizedSlots => {
  slots = slots ?? {}

  return {
    header: slots.header ?? null,
    sidebar: slots.sidebar ?? null,
    body: slots.body ?? null,
    infobar: slots.infobar ?? null,
    footer: slots.footer ?? null
  }
}

/**
 * Нормализовать CSS-классы макета
 * @param {LayoutClassNames} classNames CSS-классы макета
 * @returns {LayoutNormalizedClassNames} Нормализованные CSS-классы макета
 */
export const normalizeClassNames = (classNames: LayoutClassNames): LayoutNormalizedClassNames => {
  classNames = classNames ?? {}

  return {
    header: classNames.header ?? "",
    body: classNames.body ?? "",
    infobar: classNames.infobar ?? "",
    footer: classNames.footer ?? ""
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
  const slots = normalizeSlots(config.slots ?? {})
  const params = normalizeParams(config.params ?? {})
  const classNames = normalizeClassNames(config.classNames ?? {})

  return { modes, params, slots, classNames }
}
