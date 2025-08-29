import { Container } from "#ui/container"
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
      <Container {...props}>{children}</Container>
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
LayoutBuilder.Body = ({ children, ...props }) => {
  return (
    <LayoutSlot name="body" {...props}>
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
