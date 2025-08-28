import type { FC, ReactNode } from "react"
import type { LucentProps } from "#lib/types"
import { Provider } from "#/provider"
import { Layout } from "#ui/layout"

/**
 * Макет "Lucent" (хз почему так назвал, но пусть будет так 🙃)
 * @namespace Lucent
 */
export const Lucent: FC<LucentProps> = ({ config }): ReactNode => {
  return (
    <Provider config={config}>
      <Layout />
    </Provider>
  )
}
