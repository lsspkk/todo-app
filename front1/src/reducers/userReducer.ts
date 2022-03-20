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
  | { type: 'user/login/fulfilled'; payload: UserAccount }
  | { type: 'user/signUp/fulfilled'; payload: UserAccount }
  | { type: 'LOGOUT'; payload: {} }
  | { type: 'ADD_ERROR'; payload: { error: string } }

export const userReducer = (
  state: UserSession = initialUserState,
  action: UserAction = { type: 'NONE' }
): UserSession => {
  if (action.type === 'user/login/fulfilled') {
    return { ...state, isLoggedIn: true, username: action.payload.username }
  }
  if (action.type === 'user/signUp/fulfilled') {
    return { ...state }
  }
  if (action.type === 'LOGOUT') {
    return { ...state, isLoggedIn: false, username: '' }
  }
  if (action.type === 'ADD_ERROR') {
    return { ...state, errors: [...state.errors, action.payload.error] }
  }

  return state
}

export const userLogin = createAsyncThunk<UserAccount, LoginBody, { rejectValue: ApiError }>(
  'user/login',
  async (body: LoginBody, thunkApi) => postAccountLogin(body, thunkApi)
)
export const userSignUp = createAsyncThunk<UserAccount, SignUpBody, { rejectValue: ApiError }>(
  'user/signUp',
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
