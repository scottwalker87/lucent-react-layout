import { useLayout } from "@scottwalker/lucent"
import { Logo } from "../ui/logo"
import { Menu } from "../ui/menu"
import "./lucent.css"
// import { Button } from "../ui/button"

export const Sidebar = () => {
  const { isSidebarCollapsed, isSidebarHidden } = useLayout()
  const compact = isSidebarCollapsed || isSidebarHidden
  const sidebarClass = ["sidebar", compact ? "collapsed" : ""].join(" ")
  // const headerHeight = params.headerHeight === "6.25rem" ? "3.125rem" : "6.25rem"
  // const footerHeight = params.footerHeight === "6.25rem" ? "3.125rem" : "6.25rem"

  // const toggleHeaderHeight = () => {
  //   setParam("headerHeight", headerHeight)
  // }
  // const toggleFooterHeight = () => {
  //   setParam("footerHeight", footerHeight)
  // }

  return (
    <div className={sidebarClass}>
      <header className="sidebar-header">
        <Logo compact={compact} />
      </header>

      <div className="sidebar-body scrollable">
        <div className="sidebar-body-content">
          <Menu compact={compact} />
          <div className="sidebar-divider" />
          {/* <div className="sidebar-controls">
            <Button className="sidebar-controls-button" onClick={toggleHeaderHeight}>
              Header Height
            </Button>

            <Button className="sidebar-controls-button" onClick={toggleFooterHeight}>
              Footer Height
            </Button>
          </div> */}
        </div>
      </div>

      <footer className="sidebar-footer">{compact ? "🐣" : "🐥 CypaX"}</footer>
    </div>
  )
}
