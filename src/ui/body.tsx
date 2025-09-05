import type { BodyComponent } from "../types"
import { cn } from "../lib/utils"
import cls from "../style/layout.module.css"

/**
 * Тело макета (основной контент)
 * @namespace Lucent.UI.Body
 */
export const Body: BodyComponent = ({ children, className, ...props }) => {
  const classes = cn(cls.body, className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
