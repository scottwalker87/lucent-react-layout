import type { ReactNode } from "react"
import type { ContentProps } from "#lib/types"
import { Scrollbar } from "#ui/scrollbar"
import styles from "#style/content.module.css"
import { useLayout } from "#lib/context"
import { cn } from "#/lib/utils"

/**
 * Основной контент в макете
 * @namespace Lucent.UI.Content
 */
export const Content = ({ children }: ContentProps): ReactNode => {
  const { classNames } = useLayout()
  const innerClasses = cn(styles.contentInner, classNames.content)

  return (
    <main className={styles.content}>
      {/* <Scrollbar> */}
      <div className={innerClasses}>{children}</div>
      {/* </Scrollbar> */}
    </main>
  )
}
