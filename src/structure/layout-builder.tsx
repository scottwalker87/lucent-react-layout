import type { LayoutBuilderComponent, LayoutBuilderElementProps } from "#types"
import { LayoutProvider, LayoutSlot } from "#structure"
import { LayoutContainer } from "#ui"

/**
 * Конструктор макета
 * @namespace LayoutBuilder
 */
const LayoutBuilder: LayoutBuilderComponent = ({ config, children, ...props }) => {
  return (
    <LayoutProvider config={config}>
      <LayoutContainer {...props}>{children}</LayoutContainer>
    </LayoutProvider>
  )
}

// Элементы конструктора макета
LayoutBuilder.Sidebar = ({ children, ...props }: LayoutBuilderElementProps) => {
  return (
    <LayoutSlot name="sidebar" {...props}>
      {children}
    </LayoutSlot>
  )
}

LayoutBuilder.Header = ({ children, ...props }: LayoutBuilderElementProps) => {
  return (
    <LayoutSlot name="header" {...props}>
      {children}
    </LayoutSlot>
  )
}

LayoutBuilder.Body = ({ children, ...props }: LayoutBuilderElementProps) => {
  return (
    <LayoutSlot name="body" {...props}>
      {children}
    </LayoutSlot>
  )
}

LayoutBuilder.Infobar = ({ children, ...props }: LayoutBuilderElementProps) => {
  return (
    <LayoutSlot name="infobar" {...props}>
      {children}
    </LayoutSlot>
  )
}

LayoutBuilder.Footer = ({ children, ...props }: LayoutBuilderElementProps) => {
  return (
    <LayoutSlot name="footer" {...props}>
      {children}
    </LayoutSlot>
  )
}

export { LayoutBuilder }
