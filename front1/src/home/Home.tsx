import React, { useEffect } from 'react'
import './Home.css'
import MainMenu from '../components/Menu'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { UserAccount } from 'api/apiTypes'
import { ItemListController } from './ItemListController'
import { FileListController } from 'files/FileListController'

function Home() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      const todoUserStr = localStorage.getItem('todoUser')

      if (todoUserStr && document.cookie.includes('todosession')) {
        const userAccount = JSON.parse(todoUserStr) as UserAccount
        dispatch({ type: 'login/fulfilled', payload: userAccount })
        console.debug('using local storage')
      } else {
        navigate('/login')
      }
    }
  }, [navigate, isLoggedIn, dispatch])

  return (
    <div>
      <MainMenu />
      <div className='max-w-7xl mx-auto'>
        <Routes>
          <Route path='/files' element={<FileListController />}></Route>
          <Route path='/' element={<ItemListController />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default Home
