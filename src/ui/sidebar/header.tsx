import type { SidebarHeaderComponent } from "#types"
import { cn } from "#lib/utils"
import { useLayoutSidebar } from "#lib/context"
import cls from "#style/sidebar.module.css"

/**
 * Шапка сайдбара
 * @namespace Lucent.UI.Sidebar.Header
 */
export const SidebarHeader: SidebarHeaderComponent = ({ children, collapsed }) => {
  const { classNames } = useLayoutSidebar()
  const classes = cn(cls.sidebarHeader, collapsed && cls.collapsed, classNames.header)

  return <header className={classes}>{children}</header>
}
