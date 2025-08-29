import type { FC, ReactNode } from "react"
import type { SidebarContainerProps } from "#lib/types"
import { cn } from "#lib/utils"
import { useLayout, useLayoutSidebar } from "#lib/context"
import { SidebarHeader } from "./header"
import { SidebarBody } from "./body"
import { SidebarFooter } from "./footer"
import cls from "#style/sidebar.module.css"

/**
 * Контейнер сайдбара
 * @namespace Lucent.UI.SidebarContainer
 */
export const SidebarContainer: FC<SidebarContainerProps> = ({ children, className }): ReactNode => {
  const { isSidebarCollapsed, isSidebarHidden } = useLayout()
  const { slots } = useLayoutSidebar()
  const collapsed = isSidebarCollapsed()
  const hidden = isSidebarHidden()
  const classes = cn(cls.sidebarContainer, collapsed && cls.collapsed, hidden && cls.hidden, className)

  return (
    <aside className={classes}>
      {slots.header && <SidebarHeader collapsed={collapsed}>{slots.header}</SidebarHeader>}

      <SidebarBody collapsed={collapsed}>
        {slots.body}
        {children}
      </SidebarBody>

      {slots.footer && <SidebarFooter collapsed={collapsed}>{slots.footer}</SidebarFooter>}
    </aside>
  )
}
