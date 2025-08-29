import type { LayoutConfig, LayoutNormalizedConfig } from "#lib/types"
import {
  THEME_MODE_LIGHT,
  HEADER_MODE_VISIBLE,
  FOOTER_MODE_VISIBLE,
  SIDEBAR_MODE_VISIBLE,
  SIDEBAR_MODE_COLLAPSED,
  INFOBAR_MODE_VISIBLE,
  INFOBAR_MODE_COLLAPSED
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
 * Нормализовать конфигурацию макета
 * @param {LayoutConfig} config Конфигурация макета
 * @returns {LayoutNormalizedConfig} Нормализованная конфигурация макета
 */
export const normalizeConfig = (config: LayoutConfig): LayoutNormalizedConfig => {
  config = config ?? {}

  const modes = config.modes ?? {}
  const sizes = config.sizes ?? {}
  const slots = config.slots ?? {}
  const classNames = config.classNames ?? {}

  return {
    modes: {
      theme: modes.theme ?? THEME_MODE_LIGHT,
      headerVisible: modes.headerVisible ?? HEADER_MODE_VISIBLE,
      footerVisible: modes.footerVisible ?? FOOTER_MODE_VISIBLE,
      sidebarVisible: modes.sidebarVisible ?? SIDEBAR_MODE_VISIBLE,
      sidebarCollapsed: modes.sidebarCollapsed ?? SIDEBAR_MODE_COLLAPSED,
      infobarVisible: modes.infobarVisible ?? INFOBAR_MODE_VISIBLE,
      infobarCollapsed: modes.infobarCollapsed ?? INFOBAR_MODE_COLLAPSED
    },
    sizes: {
      sidebarWidth: sizes.sidebarWidth ?? "15.625rem",
      sidebarCollapsedWidth: sizes.sidebarCollapsedWidth ?? "3.125rem",
      sidebarHeaderHeight: sizes.sidebarHeaderHeight ?? "3.125rem",
      sidebarFooterHeight: sizes.sidebarFooterHeight ?? "3.125rem",
      infobarWidth: sizes.infobarWidth ?? "15.625rem",
      infobarCollapsedWidth: sizes.infobarCollapsedWidth ?? "3.125rem",
      headerHeight: sizes.headerHeight ?? "3.125rem",
      footerHeight: sizes.footerHeight ?? "3.125rem"
    },
    slots: {
      header: slots.header ?? null,
      sidebar: slots.sidebar ?? null,
      content: slots.content ?? null,
      infobar: slots.infobar ?? null,
      footer: slots.footer ?? null
    },
    classNames: {
      header: classNames.header ?? "",
      content: classNames.content ?? "",
      infobar: classNames.infobar ?? "",
      footer: classNames.footer ?? ""
    }
  }
}
