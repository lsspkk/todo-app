import React from 'react'
import './index.css'
import Home from './home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './login/LoginPage'
import { Provider } from 'react-redux'
import { SignUpPage } from './login/SignUpPage'
import { store } from 'store/store'
import { TestPage } from 'TestPage'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/test' element={<TestPage />}></Route>
          <Route path='*' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
