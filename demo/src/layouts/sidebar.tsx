import { Sidebar as LucentSidebar, useLayout } from "@scottwalker/lucent"
import { Logo } from "../ui/logo"
import { Menu } from "../ui/menu"
import "./lucent.css"

export const Sidebar = () => {
  const { isSidebarCollapsed } = useLayout()
  const compact = isSidebarCollapsed()
  const sidebarClass = ["sidebar", compact && "collapsed"].join(" ")

  return (
    <LucentSidebar className={sidebarClass}>
      <LucentSidebar.Header className="sidebarHeader">
        <Logo compact={compact} />
      </LucentSidebar.Header>

      <LucentSidebar.Body className="sidebarBody scrollable">
        <Menu compact={compact} />
        {/* <div>
          <div style={{ height: 500 }}>1</div>
          <div style={{ height: 500 }}>2</div>
          <div style={{ height: 500 }}>3</div>
          <div style={{ height: 500 }}>4</div>
          <div style={{ height: 500 }}>5</div>
          <div style={{ height: 500 }}>1</div>
          <div style={{ height: 500 }}>2</div>
          <div style={{ height: 500 }}>3</div>
          <div style={{ height: 500 }}>4</div>
          <div style={{ height: 500 }}>5</div>
        </div> */}
      </LucentSidebar.Body>

      <LucentSidebar.Footer className="sidebarFooter">Sidebar Footer</LucentSidebar.Footer>
    </LucentSidebar>
  )
}
