import type { FC, ReactNode } from "react"
import type { PageHeaderProps } from "../lib/types"
import { useLayout } from "../lib/context"
import { cn } from "../lib/utils"
import styles from "../style/header.module.css"

/**
 * Шапка макета
 * @namespace Lucent.UI.Header
 */
export const Header: FC<PageHeaderProps> = ({ children }): ReactNode => {
  const { isHeaderHidden, sizes, classNames } = useLayout()
  const hidden = isHeaderHidden()
  const classes = cn({
    [styles.header]: true,
    [styles.hidden]: hidden
  })
  const innerClasses = cn(
    {
      [styles.headerInner]: true,
      [styles.hidden]: hidden
    },
    classNames.header
  )
  const style = {
    height: sizes.headerHeight
  }

  return (
    <header className={classes} style={style}>
      <div className={innerClasses}>{children}</div>
    </header>
  )
}
