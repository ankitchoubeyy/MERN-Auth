import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Error from './pages/Error'

const App = () => {
  return (
    <>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='*' element={<Error />} />
     </Routes>
    </>
  )
}

export default App