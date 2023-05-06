import React, { InputHTMLAttributes } from 'react'

export default function CheckBox({ children, disabled, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const cn = props.className ? ` ${props.className}` : ''

  if (disabled) {
    return DisabledCheckbox({ children, disabled, ...props })
  }
  return (
    <input
      type='checkbox'
      {...props}
      className={`form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-gray-800 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer ${cn}`}
    >
      {children}
    </input>
  )

  function DisabledCheckbox({ children, disabled, ...props }: InputHTMLAttributes<HTMLInputElement>) {
    const cn = props.className ? ` ${props.className}` : ''
    return (
      <input
        type='checkbox'
        disabled
        {...props}
        className={`appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-gray-600 checked:border-gray-800 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 opacity-20 ${cn}`}
      >
        {children}
      </input>
    )
  }
}
