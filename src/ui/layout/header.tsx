import type { LayoutHeaderComponent } from "#types"
import { useLayout } from "#lib/context"
import { cn } from "#lib/utils"
import cls from "#style/layout.module.css"

/**
 * Шапка макета
 * @namespace Lucent.UI.Header
 */
export const LayoutHeader: LayoutHeaderComponent = ({ children }) => {
  const { isHeaderHidden: hidden, classNames } = useLayout()
  const classes = cn(cls.header, hidden && cls.hidden, classNames.header)

  return <header className={classes}>{children}</header>
}
