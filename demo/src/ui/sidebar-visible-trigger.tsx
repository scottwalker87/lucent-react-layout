import { useLayout } from "@scottwalker/lucent"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "./button"

export const SidebarVisibleTrigger = () => {
  const { toggleSidebarVisibleMode, isSidebarHidden } = useLayout()
  const iconSize = 32
  const iconStroke = 2.5

  return (
    <Button onClick={toggleSidebarVisibleMode}>
      {isSidebarHidden() ? (
        <PanelLeftOpen size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <PanelLeftClose size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
