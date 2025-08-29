import { useLayout } from "@scottwalker/lucent"
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react"
import { Button } from "./button"

export const SidebarCollapseTrigger = () => {
  const { toggleSidebarCollapsedMode, isSidebarCollapsed } = useLayout()
  const iconSize = 32
  const iconStroke = 2.5

  return (
    <Button onClick={toggleSidebarCollapsedMode}>
      {isSidebarCollapsed() ? (
        <ArrowRightToLine size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <ArrowLeftToLine size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
