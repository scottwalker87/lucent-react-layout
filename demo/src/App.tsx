import { Lucent, type LayoutConfig, normalizeConfig } from "@scottwalker/lucent"

export const App = () => {
  const config: LayoutConfig = normalizeConfig({
    modes: {
      theme: "dark",
      headerVisible: "visible",
      footerVisible: "visible",
      sidebarVisible: "visible",
      sidebarCollapsed: "collapsed",
      infobarVisible: "visible",
      infobarCollapsed: "collapsed"
    },
    slots: {
      header: <h1>Header</h1>,
      sidebar: {
        header: <h1>Sidebar Header</h1>,
        body: <h1>Sidebar Body</h1>,
        footer: <h1>Sidebar Footer</h1>
      },
      content: <h1>Content</h1>,
      footer: <h1>Footer</h1>,
      infobar: <h1>Infobar</h1>
    }
  })

  return <Lucent config={config} />
}

export const NewApp = () => {
  const config: LayoutConfig = normalizeConfig({
    modes: {
      theme: "dark",
      headerVisible: "visible",
      footerVisible: "visible",
      sidebarVisible: "visible",
      sidebarCollapsed: "collapsed",
      infobarVisible: "visible",
      infobarCollapsed: "collapsed"
    }
  })

  return (
    <Lucent config={config}>
      <Lucent.Header>Header</Lucent.Header>

      <Lucent.Sidebar>
        <Lucent.Sidebar.Header>Sidebar Header</Lucent.Sidebar.Header>
        <Lucent.Sidebar.Body>Sidebar Body</Lucent.Sidebar.Body>
        <Lucent.Sidebar.Footer>Sidebar Footer</Lucent.Sidebar.Footer>
      </Lucent.Sidebar>

      <Lucent.Content>Content</Lucent.Content>
      <Lucent.Footer>Footer</Lucent.Footer>
      <Lucent.Infobar>Infobar</Lucent.Infobar>
    </Lucent>
  )
}
