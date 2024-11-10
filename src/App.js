import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import Contact from './pages/Contact'
import CarDetails from './components/CarDetails'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/myProfile' element={<MyProfile/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/Cars/:CarId' element={<CarDetails/>}/>
        </Routes>
    </div>
  )
}

export default App