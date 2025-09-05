import type { SidebarComponent } from "../types"
import { cn } from "../lib/utils"
import cls from "../style/layout.module.css"

/**
 * Сайдбар
 * @namespace Lucent.UI.Sidebar
 */
export const Sidebar: SidebarComponent = ({ children, className, ...props }) => {
  const classes = cn(cls.sidebar, className)

  return (
    <aside className={classes} {...props}>
      {children}
    </aside>
  )
}
