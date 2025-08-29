import type { FC, ReactNode } from "react"
import type { SidebarBuilderElementProps, SidebarBuilderProps } from "#lib/types"
import { SidebarSlot } from "#/structure/sidebar-slot"
import { SidebarProvider } from "#/structure/sidebar-provider"
import { SidebarLayout } from "#ui/sidebar/layout"

/**
 * Конструктор сайдбара
 * @namespace SidebarBuilder
 */
let SidebarBuilder: FC<SidebarBuilderProps> = ({ children, ...props }) => {
  return (
    <SidebarProvider>
      <SidebarLayout {...props}>{children}</SidebarLayout>
    </SidebarProvider>
  )
}

// Элементы конструктора сайдбара
SidebarBuilder = Object.assign(SidebarBuilder, {
  Header: ({ children, ...props }: SidebarBuilderElementProps): ReactNode => {
    return (
      <SidebarSlot name="header" {...props}>
        {children}
      </SidebarSlot>
    )
  },
  Body: ({ children, ...props }: SidebarBuilderElementProps): ReactNode => {
    return (
      <SidebarSlot name="body" {...props}>
        {children}
      </SidebarSlot>
    )
  },
  Footer: ({ children, ...props }: SidebarBuilderElementProps): ReactNode => {
    return (
      <SidebarSlot name="footer" {...props}>
        {children}
      </SidebarSlot>
    )
  }
})

export { SidebarBuilder }
