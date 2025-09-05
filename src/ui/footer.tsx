import type { FooterComponent } from "../types"
import { cn } from "../lib/utils"
import cls from "../style/layout.module.css"

/**
 * Футер
 * @namespace Lucent.UI.Footer
 */
export const Footer: FooterComponent = ({ children, className, ...props }) => {
  const classes = cn(cls.footer, className)

  return (
    <footer className={classes} {...props}>
      {children}
    </footer>
  )
}
