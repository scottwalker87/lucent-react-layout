import { useLayoutEffect } from "react"
import type { HeaderComponent } from "#types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import cls from "#style/layout.module.css"

/**
 * Шапка
 * @namespace Lucent.UI.Header
 */
export const Header: HeaderComponent = ({ children, className, ...props }) => {
  const { setHasSlot } = useLayout()
  const classes = cn(cls.header, className)

  useLayoutEffect(() => setHasSlot("header", true), [setHasSlot])

  return (
    <header className={classes} {...props}>
      {children}
    </header>
  )
}
