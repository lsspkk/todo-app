import { ApiError } from 'api/apiTypes'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store/hooks'
import { userLogin } from 'store/userReducer'
import LoginForm from './LoginForm'

export function LoginPage() {
  const [formData, setFormData] = useState<{ username: string; password: string }>({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { type, payload } = await dispatch(userLogin(formData))
    if (type === 'login/rejected') {
      const { message: msg } = payload as ApiError
      setMessage(msg)
      setTimeout(() => setMessage(''), 5000)
      return
    }
    navigate('/')
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div>
      <LoginForm {...{ formData, handleChange, handleSubmit, message }} />
    </div>
  )
}
