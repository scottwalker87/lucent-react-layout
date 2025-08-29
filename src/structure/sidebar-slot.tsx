import { type FC, useEffect } from "react"
import type { SidebarSlotProps } from "#lib/types"
import { useLayoutSidebar } from "#lib/context"

/**
 * Слот для элемента сайдбара
 * @namespace Lucent.SidebarSlot
 */
export const SidebarSlot: FC<SidebarSlotProps> = ({ name, children, className }) => {
  const { setSlot, setClassName } = useLayoutSidebar()

  useEffect(() => {
    setSlot(name, children)
    setClassName(name, className ?? "")

    return () => {
      setSlot(name, null)
      setClassName(name, "")
    }
  }, [name, children, className, setSlot, setClassName])

  return null
}
