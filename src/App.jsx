import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Movie from './components/Movie'
import Temp from './components/Temp'
import User from './components/User'
import AllReviews from './components/AllReviews'
import MyReviews from './components/MyReviews'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import {auth} from './firebase'

function App() {

  const navigate = useNavigate()

  useEffect(()=>{
    // const user = auth.currentUser;
    onAuthStateChanged(auth, (user)=>{
      if(user){
        navigate('/home')
      }
      else{
        navigate('/')
      }
    })
  },[])
  

  return (
   <div>
    <Routes>
      <Route index element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/movie/:id' element={<Movie/>}></Route>
      <Route path='/temp' element={<Temp/>}></Route>
      <Route path='/user/:id' element={<User/>}></Route>
      <Route path='/allreviews' element={<AllReviews/>}></Route>
      <Route path='/myreviews' element={<MyReviews/>}></Route>
      
    </Routes>
   </div>
  )
}

export default App
