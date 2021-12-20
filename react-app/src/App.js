import React from 'react'
import DataTable from './DataTable'
import './index.css'
import Homepage from './Homepage'
import NavBar from './NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorPage from './ErrorPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/pipe' element={<DataTable />} />
        <Route path='/NavBar' element={<NavBar />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}
export default App
