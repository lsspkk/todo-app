import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Home from './home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './login/LoginPage'
import { Provider } from 'react-redux'
import { SignUpPage } from './login/SignUpPage'
import { store } from 'store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='*' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
