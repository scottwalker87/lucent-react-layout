import type { ReactNode } from "react"
import type { SidebarBuilderComponent, SidebarBuilderElementProps } from "#lib/types"
import { SidebarSlot } from "#/structure/sidebar-slot"
import { SidebarProvider } from "#/structure/sidebar-provider"
import { SidebarContainer } from "#/ui/sidebar/container"

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
SidebarBuilder.Header = ({ children, ...props }: SidebarBuilderElementProps): ReactNode => {
  return (
    <SidebarSlot name="header" {...props}>
      {children}
    </SidebarSlot>
  )
}
SidebarBuilder.Body = ({ children, ...props }: SidebarBuilderElementProps): ReactNode => {
  return (
    <SidebarSlot name="body" {...props}>
      {children}
    </SidebarSlot>
  )
}
SidebarBuilder.Footer = ({ children, ...props }: SidebarBuilderElementProps): ReactNode => {
  return (
    <SidebarSlot name="footer" {...props}>
      {children}
    </SidebarSlot>
  )
}

export { SidebarBuilder }
