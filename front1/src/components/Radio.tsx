import React, { InputHTMLAttributes } from 'react'

export function Radio({
  children,
  disabled,
  label,
  id,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const cn = props.className ? ` ${props.className}` : ''

  if (disabled) {
    return DisabledRadio({ children, disabled, label, ...props })
  }
  return (
    <div>
      <input
        type='radio'
        {...props}
        className={`form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-lg bg-white checked:bg-gray-600 checked:border-gray-800 focus:outline-none transition duration-200 mt-[2px] align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer ${cn}`}
      >
        {children}
      </input>
      <label htmlFor={id}>{label}</label>
    </div>
  )

  function DisabledRadio({
    children,
    disabled,
    label,
    id,
    ...props
  }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
    const cn = props.className ? ` ${props.className}` : ''
    return (
      <div>
        <input
          type='radio'
          disabled
          {...props}
          className={`appearance-none h-4 w-4 border border-gray-300 rounded-lg bg-white checked:bg-gray-600 checked:border-gray-800 align-top bg-no-repeat bg-center bg-contain float-left mt-[2px] mr-2 opacity-20 ${cn}`}
        >
          {children}
        </input>
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }
}
