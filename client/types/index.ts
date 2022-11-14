import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  FC,
  ReactNode,
  Ref,
} from 'react'

export type RFZ<T = {}> = FC<{ children?: ReactNode } & T>
export type CLS<T = {}> = { class?: string } & T

// React Functional Children
export type RFC<T = {}, X extends ElementType = 'div'> = FC<
  ComponentPropsWithRef<X> & { children?: ReactNode } & T
>

// React Forward Ref without Children
export type RFR<E = {}, R = HTMLDivElement, T extends ElementType = 'div'> = (
  props: ComponentPropsWithoutRef<T> & E,
  ref: Ref<R>
) => JSX.Element

export type AnyError = {
  error?: string | number | object | null
}
