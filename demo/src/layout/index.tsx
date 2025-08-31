import { ReactNode, useState } from "react"
import {
  Lucent,
  LucentHeader,
  LucentSidebar,
  LucentBody,
  LucentInfobar,
  LucentFooter,
  type LayoutConfig
} from "@scottwalker/lucent"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Body } from "./body"
import { Infobar } from "./infobar"
import { Controls } from "./controls"
import { Footer } from "./footer"
import "./lucent.css"

export const LucentLayout = ({ children }: { children?: ReactNode }) => {
  const [infobarContent, setInfobarContent] = useState("Infobar content here...")
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

  const toggleInfobarContent = () => {
    setInfobarContent(infobarContent ? "" : "Infobar content here...")
  }

  return (
    <Lucent config={config} className="layout">
      <LucentHeader className="header">
        <Header />
      </LucentHeader>

      <LucentSidebar>
        <Sidebar />
      </LucentSidebar>

      <LucentBody className="body scrollable">
        <Body>{children}</Body>
        <Controls onToggleInfobarContent={toggleInfobarContent} />
      </LucentBody>

      {infobarContent && (
        <LucentInfobar>
          <Infobar>{infobarContent}</Infobar>
        </LucentInfobar>
      )}

      <LucentFooter className="footer">
        <Footer />
      </LucentFooter>
    </Lucent>
  )
}
