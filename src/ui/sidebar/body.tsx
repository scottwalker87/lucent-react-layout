import type { SidebarBodyComponent } from "#types"
import { cn } from "#lib/utils"
import { useLayoutSidebar } from "#lib/context"
import cls from "#style/sidebar.module.css"

/**
 * Тело сайдбара
 * @namespace Lucent.UI.Sidebar.Body
 */
export const SidebarBody: SidebarBodyComponent = ({ children, collapsed }) => {
  const { classNames } = useLayoutSidebar()
  const classes = cn(cls.sidebarBody, collapsed && cls.collapsed, classNames.body)

  return <div className={classes}>{children}</div>
}
