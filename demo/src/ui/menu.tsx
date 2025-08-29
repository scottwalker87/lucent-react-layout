import { Settings, User, Compass, Users, Package } from "lucide-react"

export const Menu = ({ compact = false }: { compact?: boolean }) => {
  const iconSize = 24
  const iconStroke = 2.5

  const items = [
    { icon: <User size={iconSize} strokeWidth={iconStroke} />, label: "User" },
    { icon: <Settings size={iconSize} strokeWidth={iconStroke} />, label: "Settings" },
    { icon: <Compass size={iconSize} strokeWidth={iconStroke} />, label: "Management" },
    { icon: <Users size={iconSize} strokeWidth={iconStroke} />, label: "Clients" },
    { icon: <Package size={iconSize} strokeWidth={iconStroke} />, label: "Products" }
  ]

  const ulStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.75rem",
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontFamily: "Arial, sans-serif",
    fontSize: "1.2rem",
    color: "var(--color-foreground-extra-soft)"
  }

  const liStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem"
  }

  return (
    <ul style={ulStyle}>
      {items.map(item => (
        <li key={item.label} style={liStyle}>
          {item.icon}
          {!compact && item.label}
        </li>
      ))}
    </ul>
  )
}
