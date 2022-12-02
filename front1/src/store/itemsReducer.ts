import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getFileItems, getItem, getItems, putTodo } from '../api/api'
import { ApiError, Item, Todo } from '../api/apiTypes'

export interface ItemsStore {
  items: Item[]
}
export const initialUserState: ItemsStore = {
  items: [],
}
export interface TodoItemUpdate {
  itemId: string
  todo: Todo
}

export type ItemsStoreAction =
  | { type: 'NONE' }
  | { type: 'getItems/fulfilled'; payload: Item[] }
  | { type: 'getFileItems/fulfilled'; payload: Item[] }
  | { type: 'getItem/fulfilled'; payload: Item }
  | { type: 'putTodo/fulfilled'; payload: TodoItemUpdate }
  | { type: 'updateTodoValue'; payload: TodoItemUpdate }

export const itemsReducer = (
  state: ItemsStore = initialUserState,
  action: ItemsStoreAction = { type: 'NONE' }
): ItemsStore => {
  //console.debug({ action })
  const a = action.type
  if (a === 'getItems/fulfilled') {
    return { ...state, items: action.payload }
  }
  if (a === 'getFileItems/fulfilled') {
    return { ...state, items: action.payload }
  }
  if (a === 'getItem/fulfilled') {
    return { ...state, items: state.items.map((i) => (i.id === action.payload.id ? action.payload : i)) }
  }
  if (a === 'putTodo/fulfilled' || a === 'updateTodoValue') {
    return {
      ...state,
      items: state.items.map((i) =>
        i.id !== action.payload.itemId ? i : { ...i, todos: doUpdateItemTodo(action.payload.todo, i.todos) }
      ),
    }
  }
  return state
}

export const loadFileItemList = createAsyncThunk('getFileItems', async (fileId: string) => getFileItems(fileId))
export const loadItemList = createAsyncThunk('getItems', async () => getItems())
export const loadItem = createAsyncThunk('getItem', async (id: string) => getItem(id))

export const updateItemTodo = createAsyncThunk<TodoItemUpdate, TodoItemUpdate, { rejectValue: ApiError }>(
  'putTodo',
  async (todo: TodoItemUpdate, thunkApi) => putTodo(todo, thunkApi)
)

export const updateTodoValue = createAction<TodoItemUpdate>('updateTodoValue')

function doUpdateItemTodo(updatedTodo: Todo, oldTodos?: Todo[]) {
  if (!oldTodos || oldTodos.length === 0) {
    return [{ ...updatedTodo }]
  }
  const found = oldTodos.find((t) => t.id === updatedTodo.id)
  if (!found) {
    return [...oldTodos, { ...updatedTodo }]
  }
  return oldTodos.map((t) => (t.id !== updatedTodo.id ? t : { ...updatedTodo }))
}
