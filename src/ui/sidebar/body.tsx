import type { FC, ReactNode } from "react"
import { cn } from "#lib/utils"
import type { SidebarBodyProps } from "#lib/types"
import { useLayoutSidebar } from "#lib/context"
import cls from "#style/sidebar.module.css"

/**
 * Тело сайдбара
 * @namespace Lucent.UI.Sidebar.Body
 */
export const SidebarBody: FC<SidebarBodyProps> = ({ children, collapsed }): ReactNode => {
  const { classNames } = useLayoutSidebar()
  const classes = cn(cls.sidebarBody, collapsed && cls.collapsed, classNames.body)

  return <div className={classes}>{children}</div>
}
