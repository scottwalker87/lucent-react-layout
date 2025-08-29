import type { FC, ReactNode } from "react"
import type { SidebarLayoutProps } from "#lib/types"
import { cn } from "#lib/utils"
import { useLayout, useLayoutSidebar } from "#lib/context"
import { SidebarHeader } from "./header"
import { SidebarBody } from "./body"
import { SidebarFooter } from "./footer"
import styles from "#style/sidebar.module.css"

/**
 * Сайдбар макета
 * @namespace Lucent.UI.Sidebar
 */
export const SidebarLayout: FC<SidebarLayoutProps> = ({ children, className }): ReactNode => {
  const { isSidebarCollapsed, isSidebarHidden, sizes } = useLayout()
  const { slots } = useLayoutSidebar()
  const collapsed = isSidebarCollapsed()
  const hidden = isSidebarHidden()
  const classes = cn(
    {
      [styles.sidebar]: true,
      [styles.collapsed]: collapsed,
      [styles.hidden]: hidden
    },
    className
  )
  const style = {
    width: collapsed ? sizes.sidebarCollapsedWidth : sizes.sidebarWidth
  }

  return (
    <aside className={classes} style={style}>
      {slots.header && <SidebarHeader collapsed={collapsed}>{slots.header}</SidebarHeader>}

      <SidebarBody collapsed={collapsed}>
        {slots.body}
        {children}
      </SidebarBody>

      {slots.footer && <SidebarFooter collapsed={collapsed}>{slots.footer}</SidebarFooter>}
    </aside>
  )
}
