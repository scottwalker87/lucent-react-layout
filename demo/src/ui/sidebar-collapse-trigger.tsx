import { useLayout } from "@scottwalker/lucent"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"

export const SidebarCollapseTrigger = () => {
  const { toggleSidebarCollapsedMode, isSidebarCollapsed } = useLayout()
  const iconSize = 24
  const iconStroke = 2.5

  return (
    <Button onClick={toggleSidebarCollapsedMode}>
      {isSidebarCollapsed() ? (
        <ChevronRight size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <ChevronLeft size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
