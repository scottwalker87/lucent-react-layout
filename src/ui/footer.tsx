import type { FC, ReactNode } from "react"
import type { PageFooterProps } from "#lib/types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import styles from "#style/footer.module.css"

/**
 * Футер макета
 * @namespace Lucent.UI.Footer
 */
export const Footer: FC<PageFooterProps> = ({ children }): ReactNode => {
  const hidden = useLayout().isFooterHidden()
  const classes = cn({
    [styles.footer]: true,
    [styles.hidden]: hidden
  })
  const innerClasses = cn({
    [styles.footerInner]: true,
    [styles.hidden]: hidden
  })

  return (
    <footer className={classes}>
      <div className={innerClasses}>{children}</div>
    </footer>
  )
}
