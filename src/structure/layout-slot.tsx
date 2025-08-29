import { type FC, useEffect } from "react"
import { type LayoutClassNames, type LayoutSlotProps } from "#lib/types"
import { useLayout } from "#lib/context"

/**
 * Слот для элемента макета
 * @namespace Lucent.LayoutSlot
 */
export const LayoutSlot: FC<LayoutSlotProps> = ({ name, children, className }) => {
  const { setSlot, setClassName } = useLayout()

  useEffect(() => {
    setSlot(name, children)
    setClassName(name as keyof LayoutClassNames, className ?? "")

    return () => {
      setSlot(name, null)
      setClassName(name as keyof LayoutClassNames, "")
    }
  }, [name, children, className, setSlot, setClassName])

  return null
}
