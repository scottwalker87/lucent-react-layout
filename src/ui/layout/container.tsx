import type { CSSProperties } from "react"
import type { LayoutContainerComponent } from "#types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import { LayoutHeader } from "./header"
import { LayoutFooter } from "./footer"
import { LayoutInfobar } from "./infobar"
import { LayoutBody } from "./body"
import cls from "#style/layout.module.css"

/**
 * Контейнер макета
 * @namespace Lucent.UI.Container
 */
export const LayoutContainer: LayoutContainerComponent = ({ children, className }) => {
  const { modes, params, slots } = useLayout()
  const classes = cn(cls.container, className)

  // Аттрибуты для опредления глобальных стилей
  const modeAttributes = {
    "data-theme-mode": modes.theme,
    "data-header-mode": modes.header,
    "data-footer-mode": modes.footer,
    "data-sidebar-mode": modes.sidebar,
    "data-infobar-mode": modes.infobar
  }

  // Переменные для опредления глобальных стилей
  const styleOptions = {
    "--ll-header-height": params.headerHeight,
    "--ll-footer-height": params.footerHeight,
    "--ll-sidebar-width": params.sidebarWidth,
    "--ll-sidebar-collapsed-width": params.sidebarCollapsedWidth,
    "--ll-sidebar-header-height": params.sidebarHeaderHeight,
    "--ll-sidebar-footer-height": params.sidebarFooterHeight,
    "--ll-infobar-width": params.infobarWidth,
    "--ll-infobar-collapsed-width": params.infobarCollapsedWidth,
    "--ll-transition-grid-duration": params.transitionGridDuration
  } as CSSProperties

  return (
    <div className={classes} style={styleOptions} {...modeAttributes}>
      {slots.sidebar}
      {slots.header && <LayoutHeader>{slots.header}</LayoutHeader>}

      <LayoutBody>
        {slots.body}
        {children}
      </LayoutBody>

      {slots.infobar && <LayoutInfobar>{slots.infobar}</LayoutInfobar>}
      {slots.footer && <LayoutFooter>{slots.footer}</LayoutFooter>}
    </div>
  )
}
