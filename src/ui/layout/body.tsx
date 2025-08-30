import type { LayoutBodyComponent } from "#types"
import { useLayout } from "#lib/context"
import { cn } from "#lib/utils"
import cls from "#style/layout.module.css"

/**
 * Основной контент в макете
 * @namespace Lucent.UI.Body
 */
export const LayoutBody: LayoutBodyComponent = ({ children }) => {
  const { classNames } = useLayout()
  const classes = cn(cls.body, classNames.body)

  return <div className={classes}>{children}</div>
}
