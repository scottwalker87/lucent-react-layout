import type { InfobarComponent } from "../types"
import { cn } from "../lib/utils"
import cls from "../style/layout.module.css"

/**
 * Инфобар
 * @namespace Lucent.UI.Infobar
 */
export const Infobar: InfobarComponent = ({ children, className, ...props }) => {
  const classes = cn(cls.infobar, className)

  return (
    <aside className={classes} {...props}>
      {children}
    </aside>
  )
}
