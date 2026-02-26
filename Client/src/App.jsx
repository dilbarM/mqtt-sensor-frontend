import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Alerts from './components/Alerts'
import RawData from './components/RawData'
import Navbar from './components/Navbar'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <><Navbar />
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/alerts' element={<Alerts />} />
        <Route path='/rawdata' element={<RawData />} />
      </Routes>
    </div>
    </>
  )
}

export default App
