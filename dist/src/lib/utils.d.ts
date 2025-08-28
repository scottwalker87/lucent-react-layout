import type { LayoutConfig } from "#lib/types";
/**
 * Тип значения класса
 * @namespace Lucent.Utils.ClassValue
 */
type ClassValue = string | string[] | Record<string, boolean> | undefined | null | boolean;
/**
 * Объединяет классы в один строковый класс
 * @param inputs - массив классов
 * @returns строковый класс
 */
export declare const cn: (...inputs: ClassValue[]) => string;
/**
 * Нормализовать конфигурацию макета
 * @param {LayoutConfig} config Конфигурация макета
 * @returns {LayoutConfig} Нормализованная конфигурация макета
 */
export declare const normalizeConfig: (config: LayoutConfig) => LayoutConfig;
export {};
//# sourceMappingURL=utils.d.ts.map