import { useEffect } from "react"
import type { InfobarComponent } from "../types"
import { cn } from "../lib/utils"
import { useLayout } from "../lib/context"
import cls from "../style/layout.module.css"

/**
 * Инфобар
 * @namespace Lucent.UI.Infobar
 */
export const Infobar: InfobarComponent = ({ children, className, ...props }) => {
  const { setHasSlot, unsetHasSlot } = useLayout()
  const classes = cn(cls.infobar, className)

  useEffect(() => {
    setHasSlot("infobar")

    return () => unsetHasSlot("infobar")
  }, [setHasSlot, unsetHasSlot])

  return (
    <aside className={classes} {...props}>
      {children}
    </aside>
  )
}
