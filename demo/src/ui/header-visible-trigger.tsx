import { useLayout } from "@scottwalker/lucent"
import { PanelTopClose, PanelTopOpen } from "lucide-react"
import { Button } from "./button"

export const HeaderVisibleTrigger = () => {
  const { toggleHeaderVisibleMode, isHeaderHidden } = useLayout()
  const iconSize = 32
  const iconStroke = 2.5

  return (
    <Button onClick={toggleHeaderVisibleMode}>
      {isHeaderHidden() ? (
        <PanelTopOpen size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <PanelTopClose size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
