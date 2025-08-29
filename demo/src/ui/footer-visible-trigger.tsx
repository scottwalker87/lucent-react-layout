import { useLayout } from "@scottwalker/lucent"
import { PanelBottomClose, PanelBottomOpen } from "lucide-react"
import { Button } from "./button"

export const FooterVisibleTrigger = () => {
  const { toggleFooterVisibleMode, isFooterHidden } = useLayout()
  const iconSize = 32
  const iconStroke = 2.5

  return (
    <Button onClick={toggleFooterVisibleMode}>
      {isFooterHidden() ? (
        <PanelBottomOpen size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <PanelBottomClose size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
