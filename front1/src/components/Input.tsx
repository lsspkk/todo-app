import React, { ChangeEvent } from 'react'

// className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
export function Input({
  value,
  handleChange,
  label,
  name,
  autoComplete,
  type,
  required = false,
  autoFocus = false,
  rounded = 'both',
}: {
  value: string
  label: string
  rounded?: 'both' | 'top' | 'bottom'
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const r = rounded === 'both' ? ' rounded-b-md rounded-t-md' : rounded === 'bottom' ? 'rounded-b-md' : 'rounded-t-md'

  return (
    <div>
      <label htmlFor={name} className='sr-only'>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${r}`}
        placeholder={label}
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
    </div>
  )
}
