import { useLayoutEffect } from "react"
import type { FooterComponent } from "../types"
import { cn } from "../lib/utils"
import { useLayout } from "../lib/context"
import cls from "../style/layout.module.css"

/**
 * Футер
 * @namespace Lucent.UI.Footer
 */
export const Footer: FooterComponent = ({ children, className, ...props }) => {
  const { setHasSlot, unsetHasSlot } = useLayout()
  const classes = cn(cls.footer, className)

  useLayoutEffect(() => {
    setHasSlot("footer")

    return () => unsetHasSlot("footer")
  }, [setHasSlot, unsetHasSlot])

  return (
    <footer className={classes} {...props}>
      {children}
    </footer>
  )
}
