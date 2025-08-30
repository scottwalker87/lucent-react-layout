import type { ContainerComponent } from "../types"
import { cn, calcStyles, makeModeAttributes } from "../lib/utils"
import { useLayout } from "../lib/context"
import cls from "../style/layout.module.css"

/**
 * Контейнер макета
 * @namespace Lucent.UI.Container
 */
export const Container: ContainerComponent = ({ children, className, ...props }) => {
  const context = useLayout()
  const classes = cn(cls.container, className)

  // Аттрибуты для опредления глобальных стилей
  const attributes = makeModeAttributes(context)

  // Определить переменные глобальных стилей
  const style = calcStyles(context)

  return (
    <div className={classes} style={style} {...attributes} {...props}>
      {children}
    </div>
  )
}
