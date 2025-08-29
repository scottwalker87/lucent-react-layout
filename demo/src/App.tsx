import { type LayoutConfig, Layout, Sidebar, normalizeConfig, Scrollbar } from "../../src/index"
import cls from "./app.module.css"

export const App = () => {
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
    <Layout config={config} className={cls.layout}>
      <Layout.Header className={cls.header}>Header</Layout.Header>

      <Layout.Sidebar>
        <Sidebar className={cls.sidebar}>
          <Sidebar.Header className={cls.sidebarHeader}>Sidebar Header</Sidebar.Header>
          <Sidebar.Body className={cls.sidebarBody}>
            <div style={{ height: 500 }}>1</div>
            <div style={{ height: 500 }}>2</div>
            <div style={{ height: 500 }}>3</div>
            <div style={{ height: 500 }}>4</div>
            <div style={{ height: 500 }}>5</div>
          </Sidebar.Body>
          <Sidebar.Footer className={cls.sidebarFooter}>Sidebar Footer</Sidebar.Footer>
        </Sidebar>
      </Layout.Sidebar>

      <Layout.Content className={cls.content}>
        <div style={{ height: 500 }}>1</div>
        <div style={{ height: 500 }}>2</div>
        <div style={{ height: 500 }}>3</div>
        <div style={{ height: 500 }}>4</div>
        <div style={{ height: 500 }}>5</div>
      </Layout.Content>
      <Layout.Infobar className={cls.infobar}>Infobar</Layout.Infobar>

      <Layout.Footer className={cls.footer}>Footer</Layout.Footer>
    </Layout>
  )
}
