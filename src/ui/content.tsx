import type { ReactNode } from "react"
import type { ContentProps } from "#lib/types"
import { Scrollbar } from "#ui/scrollbar"
import styles from "#style/content.module.css"

/**
 * Основной контент в макете
 * @namespace Lucent.UI.Content
 */
export const Content = ({ children }: ContentProps): ReactNode => {
  return (
    <main className={styles.content}>
      <Scrollbar>
        <div className={styles.contentInner}>{children}</div>
      </Scrollbar>
    </main>
  )
}
