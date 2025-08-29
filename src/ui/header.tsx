import type { FC, ReactNode } from "react"
import type { HeaderProps } from "../lib/types"
import { useLayout } from "../lib/context"
import { cn } from "../lib/utils"
import cls from "../style/layout.module.css"

/**
 * Шапка макета
 * @namespace Lucent.UI.Header
 */
export const Header: FC<HeaderProps> = ({ children }): ReactNode => {
  const { isHeaderHidden, classNames } = useLayout()
  const hidden = isHeaderHidden()
  const classes = cn(cls.header, hidden && cls.hidden, classNames.header)

  return <header className={classes}>{children}</header>
}
