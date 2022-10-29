import { addDecorator } from '@storybook/react'
import 'tailwindcss/tailwind.css'
import { MemoryRouter } from 'react-router'
import React from 'react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator((story: () => any) => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
