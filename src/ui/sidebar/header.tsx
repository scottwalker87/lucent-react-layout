import { cn } from "#lib/utils"
import { FC, type ReactNode } from "react"
import type { SidebarHeaderProps } from "#lib/types"
import { useLayoutSidebar } from "#lib/context"
import cls from "#style/sidebar.module.css"

/**
 * Шапка сайдбара
 * @namespace Lucent.UI.Sidebar.Header
 */
export const SidebarHeader: FC<SidebarHeaderProps> = ({ children, collapsed }): ReactNode => {
  const { classNames } = useLayoutSidebar()
  const classes = cn(cls.sidebarHeader, collapsed && cls.collapsed, classNames.header)

  return <header className={classes}>{children}</header>
}
