import { useState, useCallback, type FC, type ReactNode } from "react"
import type { SidebarProviderProps, SidebarSlot, SidebarSlots, LayoutSidebarApi, SidebarClassNames } from "#lib/types"
import { LayoutSidebarContext } from "#lib/context"

/**
 * Провайдер сайдбара
 * @namespace Lucent.Structure.SidebarProvider
 */
export const SidebarProvider: FC<SidebarProviderProps> = ({ children }): ReactNode => {
  const [slots, setSlots] = useState<SidebarSlots>({
    header: null,
    body: null,
    footer: null
  })
  const [classNames, setClassNames] = useState<SidebarClassNames>({
    header: "",
    body: "",
    footer: ""
  })

  /**
   * Установить слот
   * @param {SidebarSlot} slot - название слота
   * @param {ReactNode} value - значение слота
   */
  const setSlot = useCallback((slot: SidebarSlot, value: ReactNode) => {
    setSlots(prev => ({ ...prev, [slot]: value }))
  }, [])

  /**
   * Установить CSS класс
   * @param {keyof SidebarClassNames} name - название CSS класса
   * @param {string} value - значение CSS класса
   */
  const setClassName = useCallback((name: keyof SidebarClassNames, value: string) => {
    setClassNames(prev => ({ ...prev, [name]: value }))
  }, [])

  // API сайдбара
  const api: LayoutSidebarApi = {
    slots,
    classNames,
    setClassName,
    setSlot
  }

  return <LayoutSidebarContext.Provider value={api}>{children}</LayoutSidebarContext.Provider>
}
