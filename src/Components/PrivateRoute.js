import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  // Function for restricting private routes of the website
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}