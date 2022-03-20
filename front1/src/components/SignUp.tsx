import { ClockIcon, LockClosedIcon } from '@heroicons/react/solid'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../api/apiTypes'
import { useAppDispatch } from '../hooks'
import { userSignUp } from '../reducers/userReducer'

interface FormData {
  username: string
  password: string
  passwordConfirm: string
  invitationCode: string
}

export default function MainSignUp() {
  const [formData, setFormData] = useState<FormData>({
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
    if (type === 'user/signUp/rejected') {
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
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='flex justify-between'>
            <ClockIcon className='text-indigo-600 w-10 h-10 inline' />
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>Rekisteröidy TODO-appiin</h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='username' className='sr-only'>
                  Käyttäjätunnus
                </label>
                <input
                  id='username'
                  name='username'
                  type='username'
                  autoComplete='username'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='käyttäjätunnus'
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Salasan
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Salasana'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Vahvista salasana
                </label>
                <input
                  id='passwordConfirm'
                  name='passwordConfirm'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Salasana (uudestaan)'
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Kutsukoodi
                </label>
                <input
                  id='invitationCode'
                  name='invitationCode'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Kutsukoodi'
                  value={formData.invitationCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='text-sm'>Puuttuuko kutsukoodi? - Ei voi mitään.</div>
              <div className='text-sm'>
                <a href='/login' className='text-indigo-600'>
                  Kirjaudu
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
                </span>
                Rekisteröidy
              </button>
            </div>
            {message !== '' && <div className='text-red-500 text-sm p-2 my-4'>{message}</div>}
          </form>
        </div>
      </div>
    </>
  )
}
