import { Layers } from "lucide-react"

export const Logo = ({ compact = false }: { compact?: boolean }) => {
  const iconSize = 32
  const iconStroke = 2.5

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Layers size={iconSize} strokeWidth={iconStroke} />
      {!compact && "Lucent"}
    </div>
  )
}
