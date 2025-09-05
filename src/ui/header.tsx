import type { HeaderComponent } from "../types"
import { cn } from "../lib/utils"
import cls from "../style/layout.module.css"

/**
 * Шапка
 * @namespace Lucent.UI.Header
 */
export const Header: HeaderComponent = ({ children, className, ...props }) => {
  const classes = cn(cls.header, className)

  return (
    <header className={classes} {...props}>
      {children}
    </header>
  )
}
