import type { SidebarFooterComponent } from "#types"
import { useLayoutSidebar } from "#lib/context"
import { cn } from "#lib/utils"
import cls from "#style/sidebar.module.css"

/**
 * Футер сайдбара
 * @namespace Lucent.UI.Sidebar.Footer
 */
export const SidebarFooter: SidebarFooterComponent = ({ children, collapsed }) => {
  const { classNames } = useLayoutSidebar()
  const classes = cn(cls.sidebarFooter, collapsed && cls.collapsed, classNames.footer)

  return <footer className={classes}>{children}</footer>
}
