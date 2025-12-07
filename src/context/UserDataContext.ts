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

