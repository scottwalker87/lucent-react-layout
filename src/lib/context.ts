import { createContext, useContext } from "react"
import type { LayoutApi } from "../types"

/**
 * Контекст макета
 * @namespace Lucent.LayoutContext
 */
export const LayoutContext = createContext<LayoutApi>({} as LayoutApi)

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
