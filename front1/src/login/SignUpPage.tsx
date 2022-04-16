import { ApiError } from 'api/apiTypes'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store/hooks'
import { userSignUp } from 'store/userReducer'
import SignUpForm, { SignUpFormData } from './SignUpForm'

export function SignUpPage() {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    password: '',
    passwordConfirm: '',
    invitationCode: '',
  })

  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { password, passwordConfirm, username, invitationCode } = formData
    if (password.length < 8) throw new Error('Liian lyhyt salasana')
    if (password !== passwordConfirm) throw new Error('Salasanat eivät täsmää')
    if (invitationCode.length < 1) throw new Error('Kutsukoodi on pakollinen')
    const { type, payload } = await dispatch(userSignUp({ username, password, invitationCode }))
    if (type === 'signUp/rejected') {
      const { message: msg } = payload as ApiError
      setMessage(msg)
      setTimeout(() => setMessage(''), 5000)
      return
    }
    setMessage('Rekisteröinti onnistui')
    await new Promise((resolve) => setTimeout(resolve, 2000))
    navigate('/login')
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div>
      <SignUpForm {...{ message, handleSubmit, formData, handleChange }} />
    </div>
  )
}
