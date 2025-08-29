import { FC, type ReactNode } from "react"
import { useLayout } from "#lib/context"
import type { ContainerProps } from "#lib/types"
import { cn } from "#lib/utils"
import { Header } from "./header"
import { Footer } from "./footer"
import { Infobar } from "./infobar"
import { Body } from "./body"
import cls from "#style/layout.module.css"

/**
 * Контейнер макета
 * @namespace Lucent.UI.Container
 */
export const Container: FC<ContainerProps> = ({ children, className }): ReactNode => {
  const { modes, slots } = useLayout()
  const classes = cn(cls.container, className)

  // Аттрибуты для опредления глобальных стилей
  const modeAttributes = {
    "data-theme-mode": modes.theme,
    "data-header-mode": modes.header,
    "data-footer-mode": modes.footer,
    "data-sidebar-mode": modes.sidebar,
    "data-infobar-mode": modes.infobar
  }

  return (
    <div className={classes} {...modeAttributes}>
      {slots.sidebar}
      {slots.header && <Header>{slots.header}</Header>}

      <Body>
        {slots.body}
        {children}
      </Body>

      {slots.infobar && <Infobar>{slots.infobar}</Infobar>}
      {slots.footer && <Footer>{slots.footer}</Footer>}
    </div>
  )
}
