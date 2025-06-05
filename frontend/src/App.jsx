import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route, Navigate} from "react-router-dom"

import HomePage from "./pages/home/HomePage.jsx"
import SignUpPage from "./pages/auth/signup/SignUpPage.jsx"
import LoginPage from './pages/auth/login/LoginPage.jsx'
import Sidebar from './components/common/Sidebar.jsx'
import RightPanel from './components/common/RightPanel.jsx'
import NotificationPage from './pages/notification/NotificationPage.jsx'
import ProfilePage from './pages/profile/ProfilePage.jsx'

import{Toaster}from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner.jsx'

function App() {
  const {data:authUser,isLoading,isError,error} = useQuery({
    queryKey: ["authUser"],
    queryFn: async()=>{
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()
        if(data.error) return null
        if(!res.ok) throw new Error(data.error || "Something went wrong")
      
        return data
      } catch (error) {
        throw new Error(error.message)
      }
    }
  })
  if(isLoading){
    return(
      <div className='loaderContainer'>
        <LoadingSpinner size={"lg"}/>
      </div>
    )
  }
  return (
      <div className='app'>
        {authUser && <Sidebar />}
        <Routes>
          <Route path='/' element={authUser ? <HomePage />: <Navigate to={"/login"} />} />
          <Route path='/login' element={!authUser ? <LoginPage /> :<Navigate to={"/"} /> } />
          <Route path='/signup' element={!authUser ? <SignUpPage />: <Navigate to={"/"} />} />
          <Route path='/notifications' element={authUser ?<NotificationPage />: <Navigate to={"/login"} />} />
          <Route path='/profile/:username' element={authUser ?<ProfilePage />: <Navigate to={"/login"} />} />
        </Routes>
        {authUser&& <RightPanel />}
        <Toaster />
      </div>

  )
}

export default App
