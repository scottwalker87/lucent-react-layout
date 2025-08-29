import { useLayout } from "@scottwalker/lucent"
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react"
import { Button } from "./button"

export const InfobarCollapseTrigger = () => {
  const { toggleInfobarCollapsedMode, isInfobarCollapsed } = useLayout()
  const iconSize = 32
  const iconStroke = 2.5

  return (
    <Button onClick={toggleInfobarCollapsedMode}>
      {isInfobarCollapsed() ? (
        <ArrowLeftToLine size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <ArrowRightToLine size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
