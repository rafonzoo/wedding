import { GlobalContext } from 'client/context'
import { useContext } from 'react'

export * from 'client/hooks/field'

export const useConnection = () => useContext(GlobalContext).isOnline

export const useClassName = (array: (string | undefined)[]) => {
  return array.filter((classes) => typeof classes === 'string').join(' ')
}
