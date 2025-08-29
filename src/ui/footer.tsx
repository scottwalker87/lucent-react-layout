import type { FC, ReactNode } from "react"
import type { PageFooterProps } from "#lib/types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import cls from "#style/layout.module.css"

/**
 * Футер макета
 * @namespace Lucent.UI.Footer
 */
export const Footer: FC<PageFooterProps> = ({ children }): ReactNode => {
  const { isFooterHidden, sizes, classNames } = useLayout()
  const hidden = isFooterHidden()
  const classes = cn(cls.footer, hidden && cls.hidden, classNames.footer)
  const style = {
    height: sizes.footerHeight
  }

  return (
    <footer className={classes} style={style}>
      {children}
    </footer>
  )
}
