import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();



  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <>
    <Header />
    <div className=' flex flex-wrap content-between bg-gray-300 min-h-screen shadow-xl'>
      <div className='w-full block'>
        <main>
        <div className='text-5xl font-bold pt-7 text-zinc-500'>Read Your Favourite `BLOGS`</div>
         <Outlet />
        </main>
      </div>
    </div>
        <Footer />
    </>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <img src="/loadingIcon.png" alt="loading" className='h-20  flex justify-center items-center animate-spin' />
    </div>
  )
}

export default App

