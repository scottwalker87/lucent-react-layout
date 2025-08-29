import React from "react"
import cls from "./scrollarea.module.css"

interface ScrollAreaProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  variant?: "minimal" | "modern" | "dark" | "custom"
  maxHeight?: string | number
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className = "", style, variant = "minimal" }) => {
  const classNames = [cls["scroll-area"], cls[`scroll-area-${variant}`], className].join(" ")

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  )
}
