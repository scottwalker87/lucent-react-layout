import { useLayout } from "@scottwalker/lucent"
import { ReactNode } from "react"

export const Body = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const { hasSlots, modes, params } = useLayout()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "3rem",
        height: "100%"
      }}
    >
      <pre
        style={{
          padding: "3rem",
          borderRadius: "1rem",
          backgroundColor: "var(--color-absolute-black)",
          color: "var(--color-secondary)",
          fontWeight: "bold",
          fontSize: "1.5rem",
          overflow: "auto"
        }}
      >
        {JSON.stringify({ params, modes, hasSlots }, null, 2)}
      </pre>
      <div>{children}</div>
    </div>
  )
}
