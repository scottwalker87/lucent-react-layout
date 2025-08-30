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
  const { setHasSlot } = useLayout()
  const classes = cn(cls.footer, className)

  useLayoutEffect(() => setHasSlot("footer", true), [setHasSlot])

  return (
    <footer className={classes} {...props}>
      {children}
    </footer>
  )
}
