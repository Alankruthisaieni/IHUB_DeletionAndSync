import React from 'react'
import { NavigationType, NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
    <div id="notfound">
      <div className='notfound'>
        <div className='notfound-404'>
          <h1 >404</h1>
          <h2>Sorry! Page not found</h2>
          <NavLink to="/">Back to home page</NavLink>
        </div>
      </div>
    </div>
    </>
  )
}

export default ErrorPage