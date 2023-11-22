import { useState } from 'react'
import { Sidebar } from './components/sidebar/components/Sidebar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login'
import { Register } from './pages/Register'

import "./App.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        {/* <Route path="/home" element={<Home/>}/>
        <Route path="/channels" element={<Channels/>}/>
        <Route path="/dms" element={<DirectMessage/>}/> */}
      </Routes>
    </Router>
  )
}

export default App