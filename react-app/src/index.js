import React from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import App from './App'
function Index() {
  return (
    <>
      <Helmet>
        <title>Water Treatment System</title>
        <meta
          name='description'
          content='Real Time application for water Treatment System developed on react, node and arduino'
        />
      </Helmet>
      <App />
    </>
  )
}
ReactDOM.render(<Index />, document.getElementById('root'))
