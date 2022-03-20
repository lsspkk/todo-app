import React, { useEffect } from 'react'
import './App.css'
import MainMenu from './components/Menu'
import { store } from './store'
import { useNavigate } from 'react-router-dom'
import { ItemList } from './components/ItemList'

function App() {
  const navigate = useNavigate()
  const { isLoggedIn } = store.getState().user

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [navigate, isLoggedIn])

  return (
    <div>
      <MainMenu />
      <ItemList />
    </div>
  )
}

export default App
