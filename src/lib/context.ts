import { createContext, useContext } from "react"
import type { LayoutApi, LayoutSidebarApi } from "#lib/types"

/**
 * Контекст макета
 * @namespace Lucent.LayoutContext
 */
export const LayoutContext = createContext<LayoutApi>({} as LayoutApi)

/**
 * Контекст макета
 * @namespace Lucent.LayoutSidebarContext
 */
export const LayoutSidebarContext = createContext<LayoutSidebarApi>({} as LayoutSidebarApi)

/**
 * Хук для получения API макета
 * @namespace Lucent.useLayout
 */
export const useLayout = (): LayoutApi => {
  const api = useContext(LayoutContext)

  if (!api) {
    throw new Error("Доступ к API макета возможен только внутри макета (@see Lucent.Provider)")
  }

  return api
}

/**
 * Хук для получения API макета
 * @namespace Lucent.useLayoutSidebar
 */
export const useLayoutSidebar = (): LayoutSidebarApi => {
  const api = useContext(LayoutSidebarContext)

  if (!api) {
    throw new Error("Доступ к API сайдбара возможен только внутри макета сайдбара (@see Lucent.SidebarProvider)")
  }

  return api
}
