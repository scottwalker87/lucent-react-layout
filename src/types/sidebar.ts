import type { ComponentProps, ReactNode, JSX } from "react"

/**
 * Пропсы контейнера сайдбара
 * @namespace Lucent.SidebarContainerProps
 */
export type SidebarContainerProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Компонент контейнера сайдбара
 * @namespace Lucent.SidebarContainerComponent
 */
export type SidebarContainerComponent = {
  (props: SidebarContainerProps): JSX.Element
}

/**
 * Пропсы шапки сайдбара
 * @namespace Lucent.SidebarHeaderProps
 */
export type SidebarHeaderProps = ComponentProps<"div"> & {
  children: ReactNode
  collapsed: boolean
}

/**
 * Компонент шапки сайдбара
 * @namespace Lucent.SidebarHeaderComponent
 */
export type SidebarHeaderComponent = {
  (props: SidebarHeaderProps): JSX.Element
}

/**
 * Пропсы тела сайдбара
 * @namespace Lucent.SidebarBodyProps
 */
export type SidebarBodyProps = ComponentProps<"div"> & {
  children: ReactNode
  collapsed: boolean
}

/**
 * Компонент тела сайдбара
 * @namespace Lucent.SidebarBodyComponent
 */
export type SidebarBodyComponent = {
  (props: SidebarBodyProps): JSX.Element
}

/**
 * Пропсы футера сайдбара
 * @namespace Lucent.SidebarFooterProps
 */
export type SidebarFooterProps = ComponentProps<"div"> & {
  children: ReactNode
  collapsed: boolean
}

/**
 * Компонент футера сайдбара
 * @namespace Lucent.SidebarFooterComponent
 */
export type SidebarFooterComponent = {
  (props: SidebarFooterProps): JSX.Element
}

/**
 * Варианты слотов сайдбара
 * @namespace Lucent.SidebarSlot
 */
export type SidebarSlot = keyof SidebarSlots

/**
 * Значение слота сайдбара
 * @namespace Lucent.SidebarSlotValue
 */
export type SidebarSlotValue = SidebarSlots[SidebarSlot] | null

/**
 * Пропсы слота сайдбара
 * @namespace Lucent.SidebarSlotProps
 */
export type SidebarSlotProps = {
  name: SidebarSlot
  children: ReactNode
  className?: string
}

/**
 * Компонент слота сайдбара
 * @namespace Lucent.SidebarSlotComponent
 */
export type SidebarSlotComponent = {
  (props: SidebarSlotProps): null
}

/**
 * CSS-классы сайдбара
 * @namespace Lucent.SidebarClassNames
 */
export type SidebarClassNames = {
  header?: string
  body?: string
  footer?: string
}

/**
 * Слоты сайдбара
 * @namespace Lucent.SidebarSlots
 */
export type SidebarSlots = {
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
}

/**
 * Пропсы провайдера сайдбара
 * @namespace Lucent.SidebarProviderProps
 */
export type SidebarProviderProps = {
  children: ReactNode
}

/**
 * Компонент провайдера сайдбара
 * @namespace Lucent.SidebarProviderComponent
 */
export type SidebarProviderComponent = {
  (props: SidebarProviderProps): JSX.Element
}

/**
 * API сайдбара
 * @namespace Lucent.LayoutSidebarApi
 * @see Lucent.SidebarContext
 *
 * @property {SidebarSlots} slots - слоты сайдбара
 * @property {SidebarClassNames} classNames - CSS классы сайдбара
 *
 * @property {boolean} hasHeader - проверка наличия шапки
 * @property {boolean} hasFooter - проверка наличия футера
 *
 * @property {function} setSlot - установить слот сайдбара
 * @property {function} setClassName - установить CSS класс сайдбара
 */
export type SidebarApi = {
  slots: SidebarSlots
  classNames: SidebarClassNames

  // Проверки наличия видимых слотов сайдбара
  hasHeader: boolean
  hasFooter: boolean

  // Сеттеры
  setSlot: (slot: SidebarSlot, value: ReactNode) => void
  setClassName: (name: keyof SidebarClassNames, value: string) => void
}

/**
 * Пропсы конструктора сайдбара
 * @namespace Lucent.SidebarBuilderProps
 */
export type SidebarBuilderProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Компонент конструктора сайдбара
 * @namespace Lucent.SidebarBuilderComponent
 */
export type SidebarBuilderComponent = {
  (props: SidebarBuilderProps): JSX.Element
  Header: SidebarBuilderElementComponent
  Body: SidebarBuilderElementComponent
  Footer: SidebarBuilderElementComponent
}

/**
 * Пропсы элемента конструктора
 * @namespace Lucent.SidebarBuilderElementProps
 */
export type SidebarBuilderElementProps = ComponentProps<"div"> & {
  children: ReactNode
}

/**
 * Компонент элемента конструктора
 * @namespace Lucent.SidebarBuilderElementComponent
 */
export type SidebarBuilderElementComponent = {
  (props: SidebarBuilderElementProps): JSX.Element
}
