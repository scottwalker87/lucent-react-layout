import { useLayout } from "@scottwalker/lucent"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"

export const InfobarCollapseTrigger = () => {
  const { toggleInfobarCollapsedMode, isInfobarCollapsed } = useLayout()
  const iconSize = 24
  const iconStroke = 2.5

  return (
    <Button onClick={toggleInfobarCollapsedMode}>
      {isInfobarCollapsed() ? (
        <ChevronLeft size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <ChevronRight size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
