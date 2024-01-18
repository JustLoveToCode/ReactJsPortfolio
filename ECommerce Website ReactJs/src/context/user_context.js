import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const {loginWithRedirect,logout,user, isAuthenticated} = useAuth0()
  // Initial myUser is null Here:
  const [myUser, setMyUser] = useState(null)

  // Using the useEffect Hook:
  // If isAuthenticated is true
  // setMyUser from null to user:
  useEffect(()=>{
    if(isAuthenticated){
      setMyUser(user)
    }
    else{
      setMyUser(false)
    }
// This is the user Dependency Array:
  },[user])

  return (
    <UserContext.Provider value={{loginWithRedirect,logout,myUser}}>{children}</UserContext.Provider>
  )
}
// Make sure to use the useUserContext:
export const useUserContext = () => {
  return useContext(UserContext)
}
