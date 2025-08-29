import type { FC, ReactNode } from "react"
import { cn } from "#lib/utils"
import type { SidebarBodyProps } from "#lib/types"
import { useLayout, useLayoutSidebar } from "#lib/context"
import cls from "#style/sidebar.module.css"

/**
 * Тело сайдбара
 * @namespace Lucent.UI.Sidebar.Body
 */
export const SidebarBody: FC<SidebarBodyProps> = ({ children, collapsed }): ReactNode => {
  const { sizes } = useLayout()
  const { classNames } = useLayoutSidebar()
  const classes = cn(cls.sidebarBody, collapsed && cls.collapsed, classNames.body)
  const style = {
    height: `calc(100vh - ${sizes.sidebarHeaderHeight} - ${sizes.sidebarFooterHeight})`
  }

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}
