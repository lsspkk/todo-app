import React from 'react'
import { render } from '@testing-library/react'
import Home from './Home'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store/store'

test('renders', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  )
})
