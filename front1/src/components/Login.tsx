/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { ClockIcon, LockClosedIcon } from '@heroicons/react/solid'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../api/apiTypes'
import { useAppDispatch } from '../hooks'
import { userLogin } from '../reducers/userReducer'

export default function MainLogin() {
  const [formData, setFormData] = useState<{ username: string; password: string }>({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { type, payload } = await dispatch(userLogin(formData))
    if (type === 'user/login/rejected') {
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
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>Tervetuloa TODO-appiin</h2>
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
                  Salasana
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='salasana'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='text-sm'>Unohtuiko salasana? - Ei voi mitään.</div>
              <div className='text-sm'>
                <a href='/signup' className='text-indigo-600'>
                  Rekisteröidy
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
                Kirjaudu
              </button>
            </div>
            {message !== '' && <div className='text-red-500 text-sm p-2 my-4'>{message}</div>}
          </form>
        </div>
      </div>
    </>
  )
}
