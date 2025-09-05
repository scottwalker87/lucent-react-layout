import { useLayout } from "@scottwalker/lucent"

export const Infobar = () => {
  const { isInfobarCollapsed } = useLayout()
  const infobarClass = ["infobar", isInfobarCollapsed ? "collapsed" : ""].join(" ")

  return (
    <div className={infobarClass}>
      <div className="infobar-content">Infobar content here...</div>
    </div>
  )
}
