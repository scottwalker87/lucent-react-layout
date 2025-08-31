import { useLayout } from "@scottwalker/lucent"
import { Sun, Moon } from "lucide-react"
import { Button } from "./button"

export const ThemeToggle = () => {
  const { toggleThemeMode, isThemeDark } = useLayout()
  const iconSize = 32
  const iconStroke = 2.5

  return (
    <Button onClick={toggleThemeMode}>
      {isThemeDark ? (
        <Sun size={iconSize} strokeWidth={iconStroke} />
      ) : (
        <Moon size={iconSize} strokeWidth={iconStroke} />
      )}
    </Button>
  )
}
