import { ReactNode, FC } from 'react';

/**
 * Режимы темы макета
 * @namespace Lucent.Constants.ThemeMode
 */
declare const THEME_MODE_LIGHT = "light";
declare const THEME_MODE_DARK = "dark";
/**
 * Режимы шапки
 * @namespace Lucent.Constants.HeaderMode
 */
declare const HEADER_MODE_VISIBLE = "visible";
declare const HEADER_MODE_HIDDEN = "hidden";
/**
 * Режимы футера
 * @namespace Lucent.Constants.FooterMode
 */
declare const FOOTER_MODE_VISIBLE = "visible";
declare const FOOTER_MODE_HIDDEN = "hidden";
/**
 * Режимы сайдбара
 * @namespace Lucent.Constants.SidebarMode
 */
declare const SIDEBAR_MODE_VISIBLE = "visible";
declare const SIDEBAR_MODE_HIDDEN = "hidden";
declare const SIDEBAR_MODE_COLLAPSED = "collapsed";
declare const SIDEBAR_MODE_EXPANDED = "expanded";
/**
 * Режимы инфобара
 * @namespace Lucent.Constants.InfobarMode
 */
declare const INFOBAR_MODE_VISIBLE = "visible";
declare const INFOBAR_MODE_HIDDEN = "hidden";
declare const INFOBAR_MODE_COLLAPSED = "collapsed";
declare const INFOBAR_MODE_EXPANDED = "expanded";

/**
 * Тип для состояния темы
 * @namespace Lucent.Theme
 */
type ThemeMode = typeof THEME_MODE_LIGHT | typeof THEME_MODE_DARK;
/**
 * Тип для состояния шапки
 * @namespace Lucent.HeaderVisible
 */
type HeaderVisibleMode = typeof HEADER_MODE_VISIBLE | typeof HEADER_MODE_HIDDEN;
/**
 * Тип для состояния футера
 * @namespace Lucent.FooterVisible
 */
type FooterVisibleMode = typeof FOOTER_MODE_VISIBLE | typeof FOOTER_MODE_HIDDEN;
/**
 * Тип для состояния сайдбара
 * @namespace Lucent.SidebarVisible
 */
type SidebarVisibleMode = typeof SIDEBAR_MODE_VISIBLE | typeof SIDEBAR_MODE_HIDDEN;
/**
 * Тип для состояния боковой панели
 * @namespace Lucent.SidebarCollapsed
 */
type SidebarCollapsedMode = typeof SIDEBAR_MODE_COLLAPSED | typeof SIDEBAR_MODE_EXPANDED;
/**
 * Тип для состояния информационной панели
 * @namespace Lucent.InfobarVisible
 */
type InfobarVisibleMode = typeof INFOBAR_MODE_VISIBLE | typeof INFOBAR_MODE_HIDDEN;
/**
 * Тип для состояния инфобара
 * @namespace Lucent.InfobarCollapsed
 */
type InfobarCollapsedMode = typeof INFOBAR_MODE_COLLAPSED | typeof INFOBAR_MODE_EXPANDED;
/**
 * Режимы макета
 * @namespace Lucent.LayoutModes
 */
type LayoutModes = {
    theme?: ThemeMode;
    headerVisible?: HeaderVisibleMode;
    footerVisible?: FooterVisibleMode;
    sidebarVisible?: SidebarVisibleMode;
    sidebarCollapsed?: SidebarCollapsedMode;
    infobarVisible?: InfobarVisibleMode;
    infobarCollapsed?: InfobarCollapsedMode;
};
/**
 * Слоты макета
 * @namespace Lucent.LayoutSlots
 */
type LayoutSlots = {
    sidebar?: SidebarSlots;
    header?: ReactNode;
    content: ReactNode;
    infobar?: ReactNode;
    footer?: ReactNode;
};
/**
 * Слоты боковой панели
 * @namespace Lucent.SidebarSlots
 */
type SidebarSlots = {
    header?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
};
/**
 * Варианты режимов макета
 * @namespace Lucent.LayoutMode
 */
type LayoutMode = keyof LayoutModes;
/**
 * Значение режима макета
 * @namespace Lucent.LayoutModeValue
 */
type LayoutModeValue = LayoutModes[LayoutMode] | null;
/**
 * Варианты слотов макета
 * @namespace Lucent.LayoutSlot
 */
type LayoutSlot = keyof LayoutSlots;
/**
 * Значение слота макета
 * @namespace Lucent.LayoutSlotValue
 */
type LayoutSlotValue = LayoutSlots[LayoutSlot] | null;
/**
 * Варианты слотов боковой панели
 * @namespace Lucent.SidebarSlot
 */
type SidebarSlot = keyof SidebarSlots;
/**
 * Конфигурация макета
 * @namespace Lucent.LayoutConfig
 */
type LayoutConfig = {
    modes: LayoutModes;
    slots: LayoutSlots;
};
/**
 * API макета
 * @namespace Lucent.LayoutApi
 * @see Lucent.Provider
 *
 * @property {LayoutModes} modes - режимы макета
 * @property {LayoutSlots} slots - слоты макета
 *
 * @property {function} setModes - установить режимы
 * @property {function} setMode - установить режим
 * @property {function} setSlots - установить слоты
 * @property {function} setSlot - установить слот
 * @property {function} setSidebarSlots - установить слоты боковой панели
 * @property {function} setSidebarSlot - установить слот боковой панели
 *
 * @property {function} getMode - получить режим
 * @property {function} getSlot - получить слот
 * @property {function} getSidebarSlot - получить слот боковой панели
 *
 * @property {function} isThemeDark - проверить, является ли тема темной
 * @property {function} isHeaderHidden - проверить, является ли шапка скрытой
 * @property {function} isFooterHidden - проверить, является ли футер скрытым
 * @property {function} isSidebarCollapsed - проверить, является ли сайдбар свернутой
 * @property {function} isSidebarHidden - проверить, является ли сайдбар скрытым
 * @property {function} isInfobarCollapsed - проверить, является ли инфобар свернутым
 * @property {function} isInfobarHidden - проверить, является ли инфобар скрытым
 *
 * @property {function} hasSidebar - проверить, есть ли сайдбар
 * @property {function} hasHeader - проверить, есть ли шапка
 * @property {function} hasContent - проверить, есть ли контент
 * @property {function} hasInfobar - проверить, есть ли инфобар
 * @property {function} hasFooter - проверить, есть ли футер
 *
 * @property {function} toggleThemeMode - переключить режим темы
 * @property {function} toggleHeaderVisibleMode - переключить режим шапки
 * @property {function} toggleFooterVisibleMode - переключить режим футера
 * @property {function} toggleSidebarVisibleMode - переключить режим сайдбара
 * @property {function} toggleSidebarCollapsedMode - переключить режим сайдбара
 * @property {function} toggleInfobarVisibleMode - переключить режим инфобара
 * @property {function} toggleInfobarCollapsedMode - переключить режим инфобара
 */
type LayoutApi = {
    modes: LayoutModes;
    slots: LayoutSlots;
    setModes: (modes: LayoutModes) => void;
    setMode: (mode: LayoutMode, value: LayoutModeValue) => void;
    setSlots: (slots: LayoutSlots) => void;
    setSlot: (slot: LayoutSlot, value: LayoutSlotValue) => void;
    setSidebarSlots: (slots: SidebarSlots) => void;
    setSidebarSlot: (slot: SidebarSlot, value: ReactNode) => void;
    getMode: (mode: LayoutMode) => LayoutModeValue;
    getSlot: (slot: LayoutSlot) => LayoutSlotValue;
    getSidebarSlot: (slot: SidebarSlot) => ReactNode;
    isThemeDark: () => boolean;
    isHeaderHidden: () => boolean;
    isFooterHidden: () => boolean;
    isSidebarCollapsed: () => boolean;
    isSidebarHidden: () => boolean;
    isInfobarCollapsed: () => boolean;
    isInfobarHidden: () => boolean;
    hasSidebar: () => boolean;
    hasHeader: () => boolean;
    hasContent: () => boolean;
    hasInfobar: () => boolean;
    hasFooter: () => boolean;
    toggleThemeMode: () => void;
    toggleHeaderVisibleMode: () => void;
    toggleFooterVisibleMode: () => void;
    toggleSidebarVisibleMode: () => void;
    toggleSidebarCollapsedMode: () => void;
    toggleInfobarVisibleMode: () => void;
    toggleInfobarCollapsedMode: () => void;
};
/**
 * Пропсы для макета "Lucent"
 * @namespace Lucent.LucentProps
 */
type LucentProps = {
    config: LayoutConfig;
};

/**
 * Хук для получения API макета
 * @namespace Lucent.useLayout
 */
declare const useLayout: () => LayoutApi;

/**
 * Нормализовать конфигурацию макета
 * @param {LayoutConfig} config Конфигурация макета
 * @returns {LayoutConfig} Нормализованная конфигурация макета
 */
declare const normalizeConfig: (config: LayoutConfig) => LayoutConfig;

/**
 * Макет "Lucent" (хз почему так назвал, но пусть будет так 🙃)
 * @namespace Lucent
 */
declare const Lucent: FC<LucentProps>;

export { Lucent, normalizeConfig, useLayout };
export type { LayoutConfig };
