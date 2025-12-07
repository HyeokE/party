import React, { useState, type ReactNode } from 'react'

import { createContext } from 'react'

export interface UserData {
  name: string
  phone: string
  email: string
}

export interface UserDataContextType {
  userData: UserData
  updateUserData: (data: UserData) => void
}

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined)



export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    phone: '',
    email: '',
  })

  const updateUserData = (data: UserData) => {
    setUserData(data)
  }

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  )
}
