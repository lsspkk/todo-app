import { TodoItemAdd, TodoItemUpdate } from 'store/itemsReducer'
import { File, Item, NewFile, Todo, UserAccount } from './apiTypes'

const apiUrl = import.meta.env.REACT_APP_API_URL ? import.meta.env.REACT_APP_API_URL : 'http://localhost:5000'

export interface LoginBody {
  username: string
  password: string
}
export async function postAccountLogin(body: LoginBody, thunkApi: any): Promise<UserAccount> {
  const response = await window.fetch(`${apiUrl}/accounts/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })

  const data = await response.json()
  if (!response.ok) return thunkApi.rejectWithValue(data)
  return data
}

export interface SignUpBody {
  username: string
  password: string
  invitationCode: string
}
export async function postAccountSignUp(body: SignUpBody, thunkApi: any): Promise<UserAccount> {
  const response = await window.fetch(`${apiUrl}/accounts/signUp`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  if (!response.ok) return thunkApi.rejectWithValue(data)
  return data
}

export async function getAccountLogout(): Promise<void> {
  const response = await window.fetch(`${apiUrl}/accounts/logout`)
  if (!response.ok) return Promise.reject('Error at logout')
  return Promise.resolve()
}

export async function getFileItems(fileId: string): Promise<Item[]> {
  const response = await window.fetch(`${apiUrl}/files/${fileId}/items`, { credentials: 'include' })
  if (!response.ok) return (await response.json()).message
  return response.json()
}

export async function getItems(): Promise<Item[]> {
  const response = await window.fetch(`${apiUrl}/items`, { credentials: 'include' })
  if (!response.ok) return (await response.json()).message
  return response.json()
}

export async function getItem(id: string): Promise<Item> {
  const response = await window.fetch(`${apiUrl}/items/${id}`, { credentials: 'include' })
  if (!response.ok) return (await response.json()).message
  return response.json()
}

export async function deleteItem(id: string): Promise<string> {
  const response = await window.fetch(`${apiUrl}/items/${id}`, { method: 'DELETE', credentials: 'include' })
  if (!response.ok) throw new Error(await response.text())
  return id
}

export async function putItem(item: Item, thunkApi: any): Promise<Item> {
  const response = await window.fetch(`${apiUrl}/items/${item.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    body: JSON.stringify(item),
  })

  const data = await response.json()
  if (!response.ok) return thunkApi.rejectWithValue(data)
  return data as Item
}

export async function deleteTodo(todo: Todo): Promise<Todo> {
  const response = await window.fetch(`${apiUrl}/items/${todo.itemId}/todos/${todo.id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!response.ok) throw new Error(await response.text())
  return todo
}

export async function postTodo({ itemId, todo, index }: TodoItemAdd, thunkApi: any): Promise<TodoItemAdd> {
  const response = await window.fetch(`${apiUrl}/items/${itemId}/todos`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    body: JSON.stringify(todo),
  })
  const data = await response.json()
  if (!response.ok) return thunkApi.rejectWithValue(data)
  return { itemId, todo: data as Todo, index }
}

export async function putTodo({ itemId, todo }: TodoItemUpdate, thunkApi: any): Promise<TodoItemUpdate> {
  const response = await window.fetch(`${apiUrl}/items/${itemId}/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    body: JSON.stringify(todo),
  })

  const data = await response.json()
  if (!response.ok) return thunkApi.rejectWithValue(data)
  return { itemId, todo: data as Todo }
}

export async function getFiles(): Promise<File[]> {
  const response = await window.fetch(`${apiUrl}/files`, { credentials: 'include' })
  if (!response.ok) return (await response.json()).message
  return response.json()
}

export async function getFile(id: string): Promise<File> {
  const response = await window.fetch(`${apiUrl}/files/${id}`, { credentials: 'include' })
  if (!response.ok) return (await response.json()).message
  return response.json()
}

export async function postFile(newFile: NewFile, thunkApi: any): Promise<File> {
  const response = await window.fetch(`${apiUrl}/files`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    body: JSON.stringify(newFile),
  })
  const data = await response.json()
  if (!response.ok) return thunkApi.rejectWithValue(data)
  return data as File
}

export async function deleteFile(id: string): Promise<string> {
  const response = await window.fetch(`${apiUrl}/files/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) throw new Error(await response.text())
  return id
}
