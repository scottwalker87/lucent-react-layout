import type { FC, ReactNode } from "react"
import type { PageProps } from "#lib/types"
import cls from "#style/layout.module.css"

/**
 * Основная часть макета
 * @namespace Lucent.UI.Page
 */
export const Page: FC<PageProps> = ({ children }): ReactNode => {
  return <div className={cls.page}>{children}</div>
}
