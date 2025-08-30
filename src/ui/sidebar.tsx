import { useLayoutEffect } from "react"
import type { SidebarComponent } from "#types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import cls from "#style/layout.module.css"

/**
 * Сайдбар
 * @namespace Lucent.UI.Sidebar
 */
export const Sidebar: SidebarComponent = ({ children, className, ...props }) => {
  const { setHasSlot } = useLayout()
  const classes = cn(cls.sidebar, className)

  useLayoutEffect(() => setHasSlot("sidebar", true), [setHasSlot])

  return (
    <aside className={classes} {...props}>
      {children}
    </aside>
  )
}
