import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Header from '../components/Header'
import PrivateRoute from '../components/PrivateRoute';

const App = () => {
  return (
  <BrowserRouter>
  <Header /> 
  <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/sign-in' element={<Signin />}  />
      <Route path='/about' element={<About/>}  />
      <Route path='/sign-up' element={<SignUp />}  />

      <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />}  />
      </Route>      
  </Routes>
  </BrowserRouter>
  )
}

export default App