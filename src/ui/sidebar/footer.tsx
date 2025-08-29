import type { FC, ReactNode } from "react"
import type { SidebarFooterProps } from "#lib/types"
import { useLayout, useLayoutSidebar } from "#lib/context"
import { cn } from "#lib/utils"
import cls from "#style/sidebar.module.css"

/**
 * Футер сайдбара
 * @namespace Lucent.UI.Sidebar.Footer
 */
export const SidebarFooter: FC<SidebarFooterProps> = ({ children, collapsed }): ReactNode => {
  const { sizes } = useLayout()
  const { classNames } = useLayoutSidebar()
  const classes = cn(cls.sidebarFooter, collapsed && cls.collapsed, classNames.footer)
  const style = {
    height: sizes.sidebarFooterHeight
  }

  return (
    <footer className={classes} style={style}>
      {children}
    </footer>
  )
}
