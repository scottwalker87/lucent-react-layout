import type { LayoutInfobarComponent } from "#types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import cls from "#style/layout.module.css"

/**
 * Инфобар макета
 * @namespace Lucent.UI.Infobar
 */
export const LayoutInfobar: LayoutInfobarComponent = ({ children }) => {
  const { isInfobarHidden: hidden, isInfobarCollapsed: collapsed, classNames } = useLayout()
  const classes = cn(cls.infobar, hidden && cls.hidden, collapsed && cls.collapsed, classNames.infobar)

  return <aside className={classes}>{children}</aside>
}
