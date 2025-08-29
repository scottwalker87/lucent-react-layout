import type { FC, ReactNode } from "react"
import type { InfobarProps } from "#lib/types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import cls from "#style/layout.module.css"

/**
 * Инфобар макета
 * @namespace Lucent.UI.Infobar
 */
export const Infobar: FC<InfobarProps> = ({ children }): ReactNode => {
  const { isInfobarHidden, isInfobarCollapsed, sizes, classNames } = useLayout()
  const hidden = isInfobarHidden()
  const collapsed = isInfobarCollapsed()
  const classes = cn(cls.infobar, hidden && cls.hidden, collapsed && cls.collapsed, classNames.infobar)
  const style = {
    width: collapsed ? sizes.infobarCollapsedWidth : sizes.infobarWidth
  }

  return (
    <aside className={classes} style={style}>
      {children}
    </aside>
  )
}
