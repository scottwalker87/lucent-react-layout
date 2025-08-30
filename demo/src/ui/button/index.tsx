import type { ReactNode } from "react"
import cls from "./button.module.css"

export const Button = ({
  children,
  className,
  ...props
}: { children: ReactNode | string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = [cls.button, className].join(" ")

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
