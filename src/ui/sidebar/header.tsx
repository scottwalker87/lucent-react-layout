import { cn } from "#lib/utils"
import { FC, type ReactNode } from "react"
import type { SidebarHeaderProps } from "#lib/types"
import { useLayout, useLayoutSidebar } from "#lib/context"
import cls from "#style/sidebar.module.css"

/**
 * Шапка сайдбара
 * @namespace Lucent.UI.Sidebar.Header
 */
export const SidebarHeader: FC<SidebarHeaderProps> = ({ children, collapsed }): ReactNode => {
  const { sizes } = useLayout()
  const { classNames } = useLayoutSidebar()
  const classes = cn(cls.sidebarHeader, collapsed && cls.collapsed, classNames.header)
  const style = {
    height: sizes.sidebarHeaderHeight
  }

  return (
    <header className={classes} style={style}>
      {children}
    </header>
  )
}
