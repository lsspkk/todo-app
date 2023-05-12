import React, { ChangeEvent, FormEvent } from 'react'
import Button from 'components/Button'
import { ClockIcon, LockClosedIcon } from '@heroicons/react/solid'
import { Input } from '../components/Input'

export default function LoginForm({
  formData,
  handleChange,
  handleSubmit,
  message,
}: {
  formData: { username: string; password: string }
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  message: String
}) {
  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='flex justify-between'>
            <ClockIcon className='text-indigo-600 w-10 h-10 inline' />
            <h2 className='text-center text-3xl font-extrabold text-gray-900'>Tervetuloa TODO-appiin</h2>
          </div>
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <Input
                value={formData.username}
                handleChange={handleChange}
                label='Käyttäjätunnus'
                name='username'
                type='username'
                autoComplete='username'
                autoFocus
                required
                rounded='top'
              />
              <Input
                value={formData.password}
                handleChange={handleChange}
                label='Salasana'
                name='password'
                type='password'
                autoComplete='current-password'
                autoFocus
                required
                rounded='bottom'
              />
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
              <Button type='submit'>
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
                </span>
                Kirjaudu
              </Button>
            </div>
            {message !== '' && <div className='text-red-500 text-sm p-2 my-4'>{message}</div>}
          </form>
        </div>
      </div>
    </>
  )
}
