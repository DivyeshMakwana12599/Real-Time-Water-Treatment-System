import React from 'react'
import DataTable from './DataTable'
import './index.css'
import Homepage from './Homepage'
import Process from './Process'
import Graph from './Graph'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import About from './About'
import Contact from './Contact'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/pipe' element={<DataTable />} />
        <Route path='/pipe/:city/:area/:pipeID' element={<Graph />} />
        <Route path='/process' element={<Process />} />
        <Route path='/about' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}
export default App
