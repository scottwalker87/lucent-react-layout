import { useEffect } from "react"
import type { LayoutSlotComponent, LayoutClassName, LayoutApi } from "#types"
import { useLayout } from "#lib/context"

/**
 * Слот для элемента макета
 * @namespace Lucent.LayoutSlot
 */
export const LayoutSlot: LayoutSlotComponent = ({ name, children, className }) => {
  const { setSlot, setClassName } = useLayout() as LayoutApi

  useEffect(() => {
    setSlot(name, children)
    setClassName(name as LayoutClassName, className ?? "")

    return () => {
      setSlot(name, null)
      setClassName(name as LayoutClassName, "")
    }
  }, [name, children, className, setSlot, setClassName])

  return null
}
