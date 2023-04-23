import React, { ButtonHTMLAttributes } from 'react'

export default function Button({
  children,
  variant,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'gray' }) {
  const cn = props.className ? ` ${props.className}` : ''
  console.log({ cn })
  return (
    <button
      {...props}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
        variant === 'gray'
          ? 'text-gray-700 border-2 border-gray-500 bg-gray-100 hover:bg-gray-200'
          : 'text-white bg-indigo-600 hover:bg-indigo-700'
      }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${cn}`}
    >
      {children}
    </button>
  )
}
