import React, { useEffect } from 'react'
import './App.css'
import MainMenu from './components/Menu'
import { useNavigate } from 'react-router-dom'
import { ItemList } from './components/ItemList'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { UserAccount } from 'api/apiTypes'

function App() {
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
      <ItemList />
    </div>
  )
}

export default App
