import type { FC, ReactNode } from "react"
import type { PageHeaderProps } from "../lib/types"
import { useLayout } from "../lib/context"
import { cn } from "../lib/utils"
import cls from "../style/layout.module.css"

/**
 * Шапка макета
 * @namespace Lucent.UI.Header
 */
export const Header: FC<PageHeaderProps> = ({ children }): ReactNode => {
  const { isHeaderHidden, sizes, classNames } = useLayout()
  const hidden = isHeaderHidden()
  const classes = cn(cls.header, hidden && cls.hidden, classNames.header)
  const style = {
    height: sizes.headerHeight
  }

  return (
    <header className={classes} style={style}>
      {children}
    </header>
  )
}
