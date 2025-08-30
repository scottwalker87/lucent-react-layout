import { ReactNode } from "react"
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
import { SidebarVisibleTrigger } from "../ui/sidebar-visible-trigger"
import { SidebarCollapseTrigger } from "../ui/sidebar-collapse-trigger"
import { InfobarVisibleTrigger } from "../ui/infobar-visible-trigger"
import { InfobarCollapseTrigger } from "../ui/infobar-collapse-trigger"
import { HeaderVisibleTrigger } from "../ui/header-visible-trigger"
import { FooterVisibleTrigger } from "../ui/footer-visible-trigger"
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
      <LucentHeader className="header">
        <div>Header</div>
      </LucentHeader>

      <LucentSidebar>
        <Sidebar />
      </LucentSidebar>

      <LucentBody className="body scrollable">
        {children}

        <div className="controls">
          <HeaderVisibleTrigger />
          <div className="controls-divider" />
          <FooterVisibleTrigger />
          <div className="controls-divider" />
          <SidebarVisibleTrigger />
          <SidebarCollapseTrigger />
          <div className="controls-divider" />
          <InfobarVisibleTrigger />
          <InfobarCollapseTrigger />
        </div>
      </LucentBody>

      <LucentInfobar className="infobar">
        <div>Infobar</div>
      </LucentInfobar>

      <LucentFooter className="footer">
        <div>Footer</div>
      </LucentFooter>
    </Lucent>
  )
}
