import type { FC, ReactNode } from "react"
import type { PageBodyProps } from "#lib/types"
import { useLayout } from "#lib/context"
import cls from "#style/layout.module.css"

/**
 * Тело макета
 * @namespace Lucent.UI.Body
 */
export const Body: FC<PageBodyProps> = ({ children, ...props }): ReactNode => {
  const { sizes } = useLayout()
  const style = {
    height: `calc(100vh - ${sizes.headerHeight} - ${sizes.footerHeight})`
  }

  return (
    <div className={cls.body} {...props} style={style}>
      {children}
    </div>
  )
}
