import { useLayout } from "@scottwalker/lucent"
import { PanelRightClose, PanelRightOpen } from "lucide-react"
import { Button } from "./button"

export const InfobarVisibleTrigger = () => {
  const { toggleInfobarVisibleMode, isInfobarHidden } = useLayout()
  const iconSize = 32
  const iconStroke = 2.5

  return (
    <Button onClick={toggleInfobarVisibleMode}>
      {isInfobarHidden() ? (
        <PanelRightOpen size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <PanelRightClose size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
