import { useLayoutEffect } from "react"
import type { BodyComponent } from "../types"
import { cn } from "../lib/utils"
import { useLayout } from "../lib/context"
import cls from "../style/layout.module.css"

/**
 * Тело макета (основной контент)
 * @namespace Lucent.UI.Body
 */
export const Body: BodyComponent = ({ children, className, ...props }) => {
  const { setHasSlot, unsetHasSlot } = useLayout()
  const classes = cn(cls.body, className)

  useLayoutEffect(() => {
    setHasSlot("body")

    return () => unsetHasSlot("body")
  }, [setHasSlot, unsetHasSlot])

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
