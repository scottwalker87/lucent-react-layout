import { ReactNode } from "react"
import { Layout, normalizeConfig, type LayoutConfig } from "@scottwalker/lucent"
import { Sidebar } from "./sidebar"
import { SidebarVisibleTrigger } from "../ui/sidebar-visible-trigger"
import { SidebarCollapseTrigger } from "../ui/sidebar-collapse-trigger"
import { InfobarVisibleTrigger } from "../ui/infobar-visible-trigger"
import { InfobarCollapseTrigger } from "../ui/infobar-collapse-trigger"
import { HeaderVisibleTrigger } from "../ui/header-visible-trigger"
import { FooterVisibleTrigger } from "../ui/footer-visible-trigger"
import "./lucent.css"

export const Lucent = ({ children }: { children?: ReactNode }) => {
  const config: LayoutConfig = normalizeConfig({
    modes: {
      theme: "dark",
      headerVisible: "visible",
      footerVisible: "visible",
      sidebarVisible: "visible",
      sidebarCollapsed: "expanded",
      infobarVisible: "visible",
      infobarCollapsed: "expanded"
    },
    sizes: {
      sidebarWidth: "15.625rem",
      sidebarCollapsedWidth: "3.125rem",
      sidebarHeaderHeight: "3.125rem",
      sidebarFooterHeight: "5rem",
      infobarWidth: "15.625rem",
      infobarCollapsedWidth: "3.125rem",
      headerHeight: "3.125rem",
      footerHeight: "5rem"
    }
  })

  return (
    <Layout config={config} className="layout">
      <Layout.Header className="header">
        <SidebarVisibleTrigger />
        <SidebarCollapseTrigger />
        <InfobarVisibleTrigger />
        <InfobarCollapseTrigger />
        <FooterVisibleTrigger />
        <div>Header</div>
      </Layout.Header>

      <Layout.Sidebar>
        <Sidebar />
      </Layout.Sidebar>

      <Layout.Content className="content scrollable">{children}</Layout.Content>
      <Layout.Infobar className="infobar">Infobar</Layout.Infobar>

      <Layout.Footer className="footer">
        <HeaderVisibleTrigger />
        <div>Footer</div>
      </Layout.Footer>
    </Layout>
  )
}
