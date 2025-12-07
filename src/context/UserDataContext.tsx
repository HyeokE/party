import React, { useState, type ReactNode } from 'react'
import { UserDataContext, type UserData } from './UserDataContext'

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
