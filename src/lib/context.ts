import { createContext, useContext } from "react"
import type { LayoutApi, LayoutCalculatedSizes, LayoutSidebarApi } from "#lib/types"

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

/**
 * Хук для вычисления размеров контента
 * @namespace Lucent.useSizes
 */
// export const useSizes = (): LayoutCalculatedSizes => {
//   const {
//     sizes,
//     isHeaderHidden,
//     isFooterHidden,
//     isSidebarHidden,
//     isSidebarCollapsed,
//     isInfobarHidden,
//     isInfobarCollapsed
//   } = useLayout()

//   const headerHeight = isHeaderHidden() ? "0rem" : sizes.headerHeight ?? "0rem"
//   const footerHeight = isFooterHidden() ? "0rem" : sizes.footerHeight ?? "0rem"
//   const sidebarWidth = (() => {
//     if (isSidebarHidden()) return "0rem"
//     if (isSidebarCollapsed()) return sizes.sidebarCollapsedWidth ?? "0rem"

//     return sizes.sidebarWidth ?? "0rem"
//   })()
//   const infobarWidth = (() => {
//     if (isInfobarHidden()) return "0rem"
//     if (isInfobarCollapsed()) return sizes.infobarCollapsedWidth ?? "0rem"

//     return sizes.infobarWidth ?? "0rem"
//   })()

//   return {
//     headerHeight,
//     footerHeight,
//     sidebarWidth,
//     infobarWidth,
//     sidebarBodyHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - ${infobarWidth})`,
//     bodyHeight: `calc(100vh - ${headerHeight} - ${footerHeight})`,
//     contentHeight: `calc(100vh - ${headerHeight} - ${footerHeight})`
//   }
// }
