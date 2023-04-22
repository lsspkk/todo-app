import 'tailwindcss/tailwind.css'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import React from 'react'
import { configureStore, createSlice } from '@reduxjs/toolkit'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (story: () => any) => (
    <Provider
      store={configureStore({
        reducer: {},
      })}
    >
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    </Provider>
  ),
]
