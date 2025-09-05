import { ReactNode } from "react"
import { Lucent, type LayoutConfig } from "@scottwalker/lucent"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Body } from "./body"
import { Controls } from "./controls"
import { Infobar } from "./infobar"
import { Footer } from "./footer"
import "./lucent.css"

export const LucentLayout = ({ children }: { children?: ReactNode }) => {
  const config: LayoutConfig = {
    modes: {
      theme: "light",
      header: "base",
      footer: "base",
      sidebar: "base",
      infobar: "base"
    },
    params: {
      headerHeight: "var(--header-height)",
      footerHeight: "var(--footer-height)",
      sidebarWidth: "var(--sidebar-width)",
      sidebarCollapsedWidth: "var(--sidebar-collapsed-width)",
      infobarWidth: "var(--infobar-width)",
      infobarCollapsedWidth: "var(--infobar-collapsed-width)",
      transitionDuration: "0.12s"
    }
  }

  return (
    <Lucent config={config} className="layout">
      <Lucent.Header className="header">
        <Header />
      </Lucent.Header>

      <Lucent.Sidebar>
        <Sidebar />
      </Lucent.Sidebar>

      <Lucent.Body className="body scrollable">
        <Body>{children}</Body>
        <Controls />
      </Lucent.Body>

      <Lucent.Infobar>
        <Infobar />
      </Lucent.Infobar>

      <Lucent.Footer className="footer">
        <Footer />
      </Lucent.Footer>
    </Lucent>
  )
}
