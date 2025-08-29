import type { ReactNode } from "react"
import type { BodyProps } from "#lib/types"
import { useLayout } from "#lib/context"
import { cn } from "#/lib/utils"
import cls from "#style/layout.module.css"

/**
 * Основной контент в макете
 * @namespace Lucent.UI.Body
 */
export const Body = ({ children }: BodyProps): ReactNode => {
  const { classNames } = useLayout()
  const classes = cn(cls.body, classNames.body)

  return <div className={classes}>{children}</div>
}
