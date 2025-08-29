import type { FC, ReactNode } from "react"
import type { FooterProps } from "#lib/types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import cls from "#style/layout.module.css"

/**
 * Футер макета
 * @namespace Lucent.UI.Footer
 */
export const Footer: FC<FooterProps> = ({ children }): ReactNode => {
  const { isFooterHidden, classNames } = useLayout()
  const hidden = isFooterHidden()
  const classes = cn(cls.footer, hidden && cls.hidden, classNames.footer)

  return <footer className={classes}>{children}</footer>
}
