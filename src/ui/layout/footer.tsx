import type { LayoutFooterComponent } from "#types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import cls from "#style/layout.module.css"

/**
 * Футер макета
 * @namespace Lucent.UI.Footer
 */
export const LayoutFooter: LayoutFooterComponent = ({ children }) => {
  const { isFooterHidden: hidden, classNames } = useLayout()
  const classes = cn(cls.footer, hidden && cls.hidden, classNames.footer)

  return <footer className={classes}>{children}</footer>
}
