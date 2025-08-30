import type { SidebarBuilderComponent, SidebarBuilderElementProps } from "#types"
import { SidebarProvider, SidebarSlot } from "#structure"
import { SidebarContainer } from "#ui"

/**
 * Конструктор сайдбара
 * @namespace SidebarBuilder
 */
const SidebarBuilder: SidebarBuilderComponent = ({ children, ...props }) => {
  return (
    <SidebarProvider>
      <SidebarContainer {...props}>{children}</SidebarContainer>
    </SidebarProvider>
  )
}

// Элементы конструктора сайдбара
SidebarBuilder.Header = ({ children, ...props }: SidebarBuilderElementProps) => {
  return (
    <SidebarSlot name="header" {...props}>
      {children}
    </SidebarSlot>
  )
}
SidebarBuilder.Body = ({ children, ...props }: SidebarBuilderElementProps) => {
  return (
    <SidebarSlot name="body" {...props}>
      {children}
    </SidebarSlot>
  )
}
SidebarBuilder.Footer = ({ children, ...props }: SidebarBuilderElementProps) => {
  return (
    <SidebarSlot name="footer" {...props}>
      {children}
    </SidebarSlot>
  )
}

export { SidebarBuilder }
