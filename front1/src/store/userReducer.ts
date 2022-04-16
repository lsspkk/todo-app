import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAccountLogout, LoginBody, postAccountLogin, postAccountSignUp, SignUpBody } from '../api/api'
import { ApiError, UserAccount } from '../api/apiTypes'

export interface UserSession {
  username: string
  isLoggedIn: boolean
  errors: string[]
}
export const initialUserState: UserSession = {
  username: '',
  isLoggedIn: false,
  errors: [],
}
export type UserAction =
  | { type: 'NONE' }
  | { type: 'login/fulfilled'; payload: UserAccount }
  | { type: 'signUp/fulfilled'; payload: UserAccount }
  | { type: 'LOGOUT'; payload: {} }
  | { type: 'ADD_ERROR'; payload: { error: string } }

export const userReducer = (
  state: UserSession = initialUserState,
  action: UserAction = { type: 'NONE' }
): UserSession => {
  if (action.type === 'login/fulfilled') {
    const { username } = action.payload
    localStorage.setItem('todoUser', JSON.stringify(action.payload))
    //console.log(action.type)
    return { ...state, isLoggedIn: true, username }
  }
  if (action.type === 'signUp/fulfilled') {
    return { ...state }
  }
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('todoUser')
    return { ...state, isLoggedIn: false, username: '' }
  }
  if (action.type === 'ADD_ERROR') {
    return { ...state, errors: [...state.errors, action.payload.error] }
  }

  return state
}

export const userLogin = createAsyncThunk<UserAccount, LoginBody, { rejectValue: ApiError }>(
  'login',
  async (body: LoginBody, thunkApi) => postAccountLogin(body, thunkApi)
)
export const userSignUp = createAsyncThunk<UserAccount, SignUpBody, { rejectValue: ApiError }>(
  'signUp',
  async (body: SignUpBody, thunkApi) => postAccountSignUp(body, thunkApi)
)

export async function userLogout(): Promise<UserAction> {
  try {
    await getAccountLogout()
    return { type: 'LOGOUT', payload: {} }
  } catch (e) {
    const error = String(e)
    return { type: 'ADD_ERROR', payload: { error } }
  }
}
