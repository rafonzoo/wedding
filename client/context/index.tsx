import type { ReactNode } from 'react'

import { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext<{ isOnline: boolean }>(undefined!)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setStatus] = useState(true)

  function userConnection() {
    setStatus(navigator.onLine)
  }

  useEffect(() => userConnection(), [])

  return (
    <GlobalContext.Provider value={{ isOnline }}>
      {children}
    </GlobalContext.Provider>
  )
}
