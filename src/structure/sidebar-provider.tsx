import { useState, useCallback, type ReactNode } from "react"
import type { SidebarProviderComponent, SidebarSlot, SidebarSlots, SidebarApi, SidebarClassNames } from "#types"
import { SidebarContext } from "#lib/context"

/**
 * Провайдер сайдбара
 * @namespace Lucent.Structure.SidebarProvider
 */
export const SidebarProvider: SidebarProviderComponent = ({ children }) => {
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

  // Проверки наличия видимых слотов макета
  const hasHeader = !!slots.header
  const hasFooter = !!slots.footer

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
  const api: SidebarApi = {
    slots,
    classNames,
    hasHeader,
    hasFooter,
    setClassName,
    setSlot
  }

  return <SidebarContext.Provider value={api}>{children}</SidebarContext.Provider>
}
