import { Layout } from "#/ui/layout"
import type { LayoutBuilderComponent } from "#lib/types"
import { LayoutSlot } from "#/structure/layout-slot"
import { LayoutProvider } from "#/structure/layout-provider"

/**
 * Конструктор макета
 * @namespace LayoutBuilder
 */
const LayoutBuilder: LayoutBuilderComponent = ({ config, children, ...props }) => {
  return (
    <LayoutProvider config={config}>
      <Layout {...props}>{children}</Layout>
    </LayoutProvider>
  )
}

// Элементы конструктора макета
LayoutBuilder.Sidebar = ({ children, ...props }) => {
  return (
    <LayoutSlot name="sidebar" {...props}>
      {children}
    </LayoutSlot>
  )
}
LayoutBuilder.Header = ({ children, ...props }) => {
  return (
    <LayoutSlot name="header" {...props}>
      {children}
    </LayoutSlot>
  )
}
LayoutBuilder.Content = ({ children, ...props }) => {
  return (
    <LayoutSlot name="content" {...props}>
      {children}
    </LayoutSlot>
  )
}
LayoutBuilder.Infobar = ({ children, ...props }) => {
  return (
    <LayoutSlot name="infobar" {...props}>
      {children}
    </LayoutSlot>
  )
}
LayoutBuilder.Footer = ({ children, ...props }) => {
  return (
    <LayoutSlot name="footer" {...props}>
      {children}
    </LayoutSlot>
  )
}

export { LayoutBuilder }
