import { createAsyncThunk } from '@reduxjs/toolkit'
import { getItem, getItems } from '../api/api'
import { Item, Todo } from '../api/apiTypes'

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
  | { type: 'items/getItems/fulfilled'; payload: Item[] }
  | { type: 'items/getItem/fulfilled'; payload: Item }
  | { type: 'items/todo/update'; payload: TodoItemUpdate }

export const itemsReducer = (
  state: ItemsStore = initialUserState,
  action: ItemsStoreAction = { type: 'NONE' }
): ItemsStore => {
  if (action.type === 'items/getItems/fulfilled') {
    return { ...state, items: action.payload }
  }
  if (action.type === 'items/getItem/fulfilled') {
    return { ...state, items: state.items.map((i) => (i.id === action.payload.id ? action.payload : i)) }
  }
  if (action.type === 'items/todo/update') {
    return {
      ...state,
      items: state.items.map((i) =>
        i.id !== action.payload.itemId ? i : { ...i, todos: doUpdateItemTodo(action.payload.todo, i.todos) }
      ),
    }
  }
  console.debug({ action })
  return state
}

export const loadItemList = createAsyncThunk('items/getItems', async () => getItems())
export const loadItem = createAsyncThunk('items/getItem', async (id: string) => getItem(id))
export const updateItemTodo = (itemId: string, todo: Todo): ItemsStoreAction => ({
  type: 'items/todo/update',
  payload: { itemId, todo },
})

function doUpdateItemTodo(updatedTodo: Todo, oldTodos?: Todo[]) {
  if (!oldTodos || oldTodos.length === 0) {
    return [{ ...updatedTodo }]
  }
  const found = oldTodos.find((t) => t.id === updatedTodo.id)
  if (!found) {
    return [...oldTodos, { ...updatedTodo }]
  }
  console.log(oldTodos, updatedTodo)
  return oldTodos.map((t) => (t.id !== updatedTodo.id ? t : { ...updatedTodo }))
}
