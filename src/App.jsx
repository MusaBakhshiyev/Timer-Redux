import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import FullTime from './FullTime'
import StopWatch from './StopWatch'
import Timer from './Timer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter className='container' basename='/Timer-Redux/'>

      <div className='navbar'>
        <NavLink to="/fulltime">FullTime</NavLink>
        <NavLink to="/stopwatch">StopWatch</NavLink>
        <NavLink to="/timer">Timer</NavLink>
      </div>

      <Routes>
        <Route path='/fulltime' element={<FullTime />}/>
        <Route path='/stopwatch' element={<StopWatch />}/>
        <Route path='/timer' element={<Timer />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
