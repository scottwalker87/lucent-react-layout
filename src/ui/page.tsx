import type { FC, ReactNode } from "react"
import type { PageProps } from "#lib/types"
import styles from "#style/page.module.css"

/**
 * Основная часть макета
 * @namespace Lucent.UI.Page
 */
export const Page: FC<PageProps> = ({ children }): ReactNode => {
  return <div className={styles.page}>{children}</div>
}
