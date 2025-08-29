import { Sidebar as LucentSidebar, useLayout } from "../../../src/index"
import { Logo } from "../ui/logo"
import { Menu } from "../ui/menu"
import cls from "./lucent.module.css"

export const Sidebar = () => {
  const { isSidebarCollapsed } = useLayout()
  const compact = isSidebarCollapsed()
  const sidebarClass = [cls.sidebar, compact && cls.collapsed].join(" ")

  return (
    <LucentSidebar className={sidebarClass}>
      <LucentSidebar.Header className={cls.sidebarHeader}>
        <Logo compact={compact} />
      </LucentSidebar.Header>

      <LucentSidebar.Body className={cls.sidebarBody}>
        <Menu compact={compact} />
      </LucentSidebar.Body>

      <LucentSidebar.Footer className={cls.sidebarFooter}>Sidebar Footer</LucentSidebar.Footer>
    </LucentSidebar>
  )
}
