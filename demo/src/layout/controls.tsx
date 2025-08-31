import { Button } from "../ui/button"
import { InfobarCollapseTrigger } from "../ui/infobar-collapse-trigger"
import { InfobarVisibleTrigger } from "../ui/infobar-visible-trigger"
import { SidebarCollapseTrigger } from "../ui/sidebar-collapse-trigger"
import { SidebarVisibleTrigger } from "../ui/sidebar-visible-trigger"
import { FooterVisibleTrigger } from "../ui/footer-visible-trigger"
import { HeaderVisibleTrigger } from "../ui/header-visible-trigger"
import { ThemeToggle } from "../ui/theme-toggle"

export const Controls = ({ onToggleInfobarContent }: { onToggleInfobarContent: () => void }) => {
  return (
    <div className="controls">
      <HeaderVisibleTrigger />
      <div className="controls-divider" />
      <FooterVisibleTrigger />
      <div className="controls-divider" />
      <SidebarVisibleTrigger />
      <SidebarCollapseTrigger />
      <div className="controls-divider" />
      <InfobarVisibleTrigger />
      <InfobarCollapseTrigger />
      <div className="controls-divider" />
      <Button onClick={onToggleInfobarContent}>Toggle Infobar Content</Button>
      <div className="controls-divider" />
      <ThemeToggle />
    </div>
  )
}
