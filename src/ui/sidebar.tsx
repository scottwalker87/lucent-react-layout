import type { FC, ReactNode } from "react"
import type { SidebarSlots, SidebarSlotProps } from "#lib/types"
import { cn } from "#lib/utils"
import { useLayout } from "#lib/context"
import { Scrollbar } from "#ui/scrollbar"
import styles from "#style/sidebar.module.css"

/**
 * Шапка боковой панели макета
 * @namespace Lucent.UI.Sidebar.Header
 */
const SidebarHeader: FC<SidebarSlotProps> = ({ children, collapsed }): ReactNode => {
  const classes = cn({ [styles.sidebarHeader]: true, [styles.collapsed]: collapsed })
  const innerClasses = cn({ [styles.sidebarHeaderInner]: true, [styles.collapsed]: collapsed })

  return (
    <header className={classes}>
      <div className={innerClasses}>{children}</div>
    </header>
  )
}

/**
 * Тело боковой панели макета
 * @namespace Lucent.UI.Sidebar.Body
 */
const SidebarBody: FC<SidebarSlotProps> = ({ children, collapsed }): ReactNode => {
  const classes = cn({ [styles.sidebarBody]: true, [styles.collapsed]: collapsed })
  const innerClasses = cn({ [styles.sidebarBodyInner]: true, [styles.collapsed]: collapsed })

  return (
    <div className={classes}>
      <Scrollbar>
        <div className={innerClasses}>{children}</div>
      </Scrollbar>
    </div>
  )
}

/**
 * Футер боковой панели макета
 * @namespace Lucent.UI.Sidebar.Footer
 */
const SidebarFooter: FC<SidebarSlotProps> = ({ children, collapsed }): ReactNode => {
  const classes = cn({ [styles.sidebarFooter]: true, [styles.collapsed]: collapsed })
  const innerClasses = cn({ [styles.sidebarFooterInner]: true, [styles.collapsed]: collapsed })

  return (
    <footer className={classes}>
      <div className={innerClasses}>{children}</div>
    </footer>
  )
}

/**
 * Сайдбар макета
 * @namespace Lucent.UI.Sidebar
 */
export const Sidebar: FC<SidebarSlots> = ({ header, body, footer }): ReactNode => {
  const { isSidebarCollapsed, isSidebarHidden } = useLayout()
  const collapsed = isSidebarCollapsed()
  const hidden = isSidebarHidden()
  const classes = cn({
    [styles.sidebar]: true,
    [styles.collapsed]: collapsed,
    [styles.hidden]: hidden
  })

  return (
    <aside className={classes}>
      {header && <SidebarHeader collapsed={collapsed}>{header}</SidebarHeader>}
      {body && <SidebarBody collapsed={collapsed}>{body}</SidebarBody>}
      {footer && <SidebarFooter collapsed={collapsed}>{footer}</SidebarFooter>}
    </aside>
  )
}
