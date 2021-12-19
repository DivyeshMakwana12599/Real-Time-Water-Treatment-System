import React from 'react'
import DataTable from './DataTable'
import './index.css'
import Homepage from './Homepage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/pipe' element={<DataTable />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}
function ErrorPage() {
  return <h1>Error</h1>
}
export default App
