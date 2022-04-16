import { ClockIcon, LockClosedIcon } from '@heroicons/react/solid'
import Button from 'components/Button'
import { ChangeEvent, FormEvent } from 'react'

export interface SignUpFormData {
  username: string
  password: string
  passwordConfirm: string
  invitationCode: string
}

export default function SignUpForm({
  formData,
  handleChange,
  handleSubmit,
  message,
}: {
  formData: SignUpFormData
  handleChange(e: ChangeEvent<HTMLInputElement>): void
  handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void>
  message: string
}) {
  return (
    <>
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
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-t-md'
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
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-b-md'
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
              <Button>
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
                </span>
                Rekisteröidy
              </Button>
            </div>
            {message !== '' && <div className='text-red-500 text-sm p-2 my-4'>{message}</div>}
          </form>
        </div>
      </div>
    </>
  )
}
