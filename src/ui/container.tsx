import { FC, type ReactNode } from "react"
import { useLayout } from "#lib/context"
import type { ContainerProps } from "#lib/types"
import { cn } from "#lib/utils"
import { Page } from "./page"
import { Header } from "./header"
import { Body } from "./body"
import { Footer } from "./footer"
import { Infobar } from "./infobar"
import { Content } from "./content"
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
    "data-header-visible-mode": modes.headerVisible,
    "data-footer-visible-mode": modes.footerVisible,
    "data-sidebar-visible-mode": modes.sidebarVisible,
    "data-sidebar-collapsed-mode": modes.sidebarCollapsed,
    "data-infobar-visible-mode": modes.infobarVisible,
    "data-infobar-collapsed-mode": modes.infobarCollapsed
  }

  return (
    <div className={classes} {...modeAttributes}>
      {slots.sidebar}

      <Page>
        {slots.header && <Header>{slots.header}</Header>}

        <Body>
          <Content>
            {slots.content}
            {children}
          </Content>

          {slots.infobar && <Infobar>{slots.infobar}</Infobar>}
        </Body>

        {slots.footer && <Footer>{slots.footer}</Footer>}
      </Page>
    </div>
  )
}
