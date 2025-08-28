import type { ComponentProps, FC, ReactNode } from "react"
import { useState, useRef, useCallback } from "react"
import { Scrollbar as ScrollbarCustom } from "react-scrollbars-custom"

/**
 * Пропсы скроллбара
 * @namespace Lucent.UI.Scrollbar.Props
 */
type Props = ComponentProps<typeof ScrollbarCustom>

/**
 * Пропсы для хука
 * @namespace Lucent.UI.Scrollbar.useAutoHide.Props
 * @property {number} delay - задержка в миллисекундах
 */
type AutoHideConfig = Partial<{
  delay: number
}>

/**
 * API для скроллбара
 * @namespace Lucent.UI.Scrollbar.useAutoHide.API
 * @property {boolean} visible - видимость скроллбара
 * @property {() => void} onScrollStart - обработчик начала скролла
 * @property {() => void} onScrollStop - обработчик окончания скролла
 */
type AutoHideAPI = {
  visible: boolean
  onScrollStart: () => void
  onScrollStop: () => void
}

/**
 * Хук для автоматического скрытия скроллбара
 * @namespace Lucent.UI.Scrollbar.useAutoHide
 */
const useAutoHide = (config: AutoHideConfig = {}): AutoHideAPI => {
  const DEFAULT_DELAY = 150

  const { delay = DEFAULT_DELAY } = config
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onScrollStart = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    setVisible(true)
  }, [])

  const onScrollStop = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(false), delay)
  }, [delay])

  return {
    visible,
    onScrollStart,
    onScrollStop
  }
}

/**
 * Скроллбар
 * @namespace Lucent.UI.Scrollbar
 */
export const Scrollbar: FC<Props> = ({ children, ...props }): ReactNode => {
  const { visible, onScrollStart, onScrollStop } = useAutoHide()
  const SCROLLBAR_SIZE = ".35rem"

  const wrapperProps = { className: "!inset-0" }
  const contentProps = { style: {} }
  const trackProps = {
    style: {
      background: "var(--color-scrollbar-track)",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity 0.15s ease"
    }
  }
  const thumbProps = {
    style: {
      background: "var(--color-scrollbar-thumb)",
      borderRadius: ".25rem"
    }
  }
  const trackXProps = { style: { ...trackProps.style, height: SCROLLBAR_SIZE } }
  const trackYProps = { style: { ...trackProps.style, width: SCROLLBAR_SIZE } }
  const thumbXProps = { style: thumbProps.style }
  const thumbYProps = { style: thumbProps.style }

  return (
    <ScrollbarCustom
      contentProps={contentProps}
      wrapperProps={wrapperProps}
      trackYProps={trackYProps}
      thumbYProps={thumbYProps}
      trackXProps={trackXProps}
      thumbXProps={thumbXProps}
      onScrollStart={onScrollStart}
      onScrollStop={onScrollStop}
      {...props}
    >
      {children}
    </ScrollbarCustom>
  )
}
