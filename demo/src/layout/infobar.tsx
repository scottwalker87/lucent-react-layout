import { ReactNode } from "react"
import { useLayout } from "@scottwalker/lucent"

export const Infobar = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const { isInfobarCollapsed, isInfobarHidden } = useLayout()
  const compact = isInfobarCollapsed || isInfobarHidden
  const infobarClass = ["infobar", compact ? "collapsed" : ""].join(" ")

  return (
    <div className={infobarClass}>
      <div className="infobar-content">{children}</div>
    </div>
  )
}
