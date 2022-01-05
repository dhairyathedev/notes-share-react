import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Textarea from './components/Textarea'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<Textarea />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
