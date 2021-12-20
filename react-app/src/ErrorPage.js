import React from 'react'
import './ErrorPage.css'
import { Link } from 'react-router-dom'
function ErrorPage() {
  return (
    <div className='error-page'>
      <h1>404 Page Not Found!</h1>
      <Link to='/' className='button'>
        Press to go to Homepage
      </Link>
    </div>
  )
}

export default ErrorPage
