import { useLayout } from "@scottwalker/lucent"
import { PanelRightClose, PanelRightOpen } from "lucide-react"
import { Button } from "./button"

export const SidebarVisibleTrigger = () => {
  const { toggleSidebarVisibleMode, isSidebarHidden } = useLayout()
  const iconSize = 24
  const iconStroke = 2.5

  return (
    <Button onClick={toggleSidebarVisibleMode}>
      {isSidebarHidden() ? (
        <PanelRightClose size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <PanelRightOpen size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
