import React from 'react'
import Login from './Screen/Login'
import Inicio from './Screen/Dashboard'
import Usuarios from './Screen/Usuarios';
import Educacion from './Screen/Educacion';
import Movilidad from './Screen/Movilidad';
import Negocios from './Screen/Negocios';
import Salud from './Screen/Salud';
import Seguridad from './Screen/Seguridad';
import Transporte from './Screen/Transporte';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <GoogleOAuthProvider clientId="141717368757-s3a171an9j6c3gu4c0cbcajiod3vcrq0.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />}/> 
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/inicio' element={<Inicio/>}></Route>
          <Route path='/usuarios' element={<Usuarios/>}></Route>
          <Route path='/educacion' element={<Educacion/>}></Route>
          <Route path='/movilidad' element={<Movilidad/>}></Route>
          <Route path='/negocios' element={<Negocios/>}></Route>
          <Route path='/salud' element={<Salud/>}></Route>
          <Route path='/seguridad' element={<Seguridad/>}></Route>
          <Route path='/transporte' element={<Transporte/>}></Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App