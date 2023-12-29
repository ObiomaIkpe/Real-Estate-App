import React from 'react'
import Header from './Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/Signin'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'

import PrivateRoute from '../components/PrivateRoute';

const App = () => {
  return (
  <BrowserRouter>
   <Header />
  <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/sign-in' element={<SignIn />}  />
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