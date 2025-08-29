import type { ReactNode } from "react"
import cls from "./button.module.css"

export const Button = ({
  children,
  ...props
}: { children: ReactNode | string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={cls.button} {...props}>
      {children}
    </button>
  )
}
