import type { ReactNode } from "react"
import type { ContentProps } from "#lib/types"
import { useLayout } from "#lib/context"
import { cn } from "#/lib/utils"
import cls from "#style/layout.module.css"

/**
 * Основной контент в макете
 * @namespace Lucent.UI.Content
 */
export const Content = ({ children }: ContentProps): ReactNode => {
  const { classNames } = useLayout()
  // const { sizes } = useLayout()
  // const style = {
  //   height: `calc(100vh - ${sizes.headerHeight} - ${sizes.footerHeight})`
  // }
  const classes = cn(cls.content, classNames.content)

  return <main className={classes}>{children}</main>
}
