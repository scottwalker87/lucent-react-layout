import { useLayout } from "../../../src/index"
import { PanelBottomClose, PanelBottomOpen } from "lucide-react"
import { Button } from "./button"

export const FooterVisibleTrigger = () => {
  const { toggleFooterVisibleMode, isFooterHidden } = useLayout()
  const iconSize = 24
  const iconStroke = 2.5

  return (
    <Button onClick={toggleFooterVisibleMode}>
      {isFooterHidden() ? (
        <PanelBottomClose size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <PanelBottomOpen size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
