import type { FC, ReactNode } from "react"
import type { PageBodyProps } from "#lib/types"
import styles from "#style/body.module.css"
import { useLayout } from "#lib/context"

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
    <div className={styles.body} {...props} style={style}>
      {children}
    </div>
  )
}
