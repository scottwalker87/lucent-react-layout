import { FC, type ReactNode } from "react"
import { useLayout } from "#lib/context"
import type { LayoutProps } from "#lib/types"
import { Page } from "./page"
import { Header } from "./header"
import { Body } from "./body"
import { Footer } from "./footer"
import { Infobar } from "./infobar"
import { Content } from "./content"
import styles from "#style/layout.module.css"
import { cn } from "#lib/utils"

/**
 * Макет
 * @namespace Lucent.UI.Layout
 */
export const Layout: FC<LayoutProps> = ({ children, className }): ReactNode => {
  const { modes, slots } = useLayout()

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
  const classes = cn(styles.layout, className)

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
