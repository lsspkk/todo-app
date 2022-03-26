import { store } from './store'
import { userLogin } from './userReducer'

const OLD_ENV = process.env

beforeEach(() => {
  jest.resetModules() // Most important - it clears the cache
  process.env = { ...OLD_ENV } // Make a copy
})

afterAll(() => {
  process.env = OLD_ENV // Restore old environment
})

test('it logins and logouts with api', async () => {
  process.env.REACT_APP_API_URL = 'http://localhost:5000'
  const s = await userLogin({ username: 'admin', password: 'admin' })
  store.dispatch(s)
  console.debug(store.getState().user)
})
