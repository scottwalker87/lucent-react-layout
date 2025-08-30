import { useLayoutEffect } from "react"
import type { InfobarComponent } from "../types"
import { cn } from "../lib/utils"
import { useLayout } from "../lib/context"
import cls from "../style/layout.module.css"

/**
 * Инфобар
 * @namespace Lucent.UI.Infobar
 */
export const Infobar: InfobarComponent = ({ children, className, ...props }) => {
  const { setHasSlot } = useLayout()
  const classes = cn(cls.infobar, className)

  useLayoutEffect(() => setHasSlot("infobar", true), [setHasSlot])

  return (
    <aside className={classes} {...props}>
      {children}
    </aside>
  )
}
