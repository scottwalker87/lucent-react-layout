import { createContext, useContext } from "react"
import type { LayoutApi, SidebarApi } from "#types"

/**
 * Контекст макета
 * @namespace Lucent.LayoutContext
 */
export const LayoutContext = createContext<LayoutApi>({} as LayoutApi)

/**
 * Контекст сайдбара
 * @namespace Lucent.SidebarContext
 */
export const SidebarContext = createContext<SidebarApi>({} as SidebarApi)

/**
 * Хук для получения API макета
 * @namespace Lucent.useLayout
 */
export const useLayout = (): LayoutApi => {
  const api = useContext(LayoutContext)

  if (!api) {
    throw new Error("Доступ к API макета возможен только внутри макета (@see Lucent.LayoutProvider)")
  }

  return api
}

/**
 * Хук для получения API сайдбара
 * @namespace Lucent.useLayoutSidebar
 */
export const useLayoutSidebar = (): SidebarApi => {
  const api = useContext(SidebarContext)

  if (!api) {
    throw new Error("Доступ к API сайдбара возможен только внутри макета сайдбара (@see Lucent.SidebarProvider)")
  }

  return api
}
