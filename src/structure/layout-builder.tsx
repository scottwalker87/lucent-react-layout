import { Layout } from "#/ui/layout"
import type { FC, ReactNode } from "react"
import type { LayoutBuilderElementProps, LayoutBuilderProps } from "#lib/types"
import { LayoutSlot } from "#/structure/layout-slot"
import { LayoutProvider } from "#/structure/layout-provider"

/**
 * Конструктор макета
 * @namespace LayoutBuilder
 */
let LayoutBuilder: FC<LayoutBuilderProps> = ({ config, children, ...props }) => {
  return (
    <LayoutProvider config={config}>
      <Layout {...props}>{children}</Layout>
    </LayoutProvider>
  )
}

// Элементы конструктора макета
LayoutBuilder = Object.assign(LayoutBuilder, {
  Sidebar: ({ children, ...props }: LayoutBuilderElementProps): ReactNode => {
    return (
      <LayoutSlot name="sidebar" {...props}>
        {children}
      </LayoutSlot>
    )
  },
  Header: ({ children, ...props }: LayoutBuilderElementProps): ReactNode => {
    return (
      <LayoutSlot name="header" {...props}>
        {children}
      </LayoutSlot>
    )
  },
  Content: ({ children, ...props }: LayoutBuilderElementProps): ReactNode => {
    return (
      <LayoutSlot name="content" {...props}>
        {children}
      </LayoutSlot>
    )
  },
  Infobar: ({ children, ...props }: LayoutBuilderElementProps): ReactNode => {
    return (
      <LayoutSlot name="infobar" {...props}>
        {children}
      </LayoutSlot>
    )
  },
  Footer: ({ children, ...props }: LayoutBuilderElementProps): ReactNode => {
    return (
      <LayoutSlot name="footer" {...props}>
        {children}
      </LayoutSlot>
    )
  }
})

export { LayoutBuilder }
