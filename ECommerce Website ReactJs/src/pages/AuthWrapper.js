import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

const AuthWrapper = ({children}) => {
  const {isLoading, error} = useAuth0()
  // If isLoading is true:
  if(isLoading){
    return(
      <Wrapper>
        <h1>Website Page is Loading...</h1>
      </Wrapper>
    )
  }
  // if error is true:
  if(error){
    return(
    <Wrapper>
      <h1>{error.message}</h1>
    </Wrapper>
    )
  }
  // Otherwise, if it is not loading
  // and there is no Error itself:
  // Display the children here:
  return <>
  {children}
  </>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper


// The useAuth0 Hook
// Provide the set of the functions and state variables that simplify
// the integration of auth0 Features into your React Components
// isAuthenticated: A Boolean Indicating whether the User is Authenticated or Not Authenticated
// user: Information about the Authenticated User, including the details like the User ID, name,
// or the email
// loginWIthRedirect: A Function to initiate the Login Process and Redirect the User to the
// auth0 Login Page
// logout: A Function to Logout the User
// isLoading: A Boolean to check whether the Auth0 is still in the Process of Loading the
// Authentication Information
// getIdTokenClaims: A Function to get the ID Token Claims for the Authenticated User.
