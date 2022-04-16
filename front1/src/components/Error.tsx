import React, { HTMLAttributes } from 'react'

export default function Error({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const cn = props.className ? ` ${props.className}` : ''
  return (
    <div
      {...props}
      className={`m-8 group relative py-2 px-4 border border-rose-400 text-sm font-medium rounded-md text-gray-900 bg-rose-200 ${cn}`}
    >
      {children}
    </div>
  )
}
