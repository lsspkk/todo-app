import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteItem, deleteTodo, getFileItems, getItem, getItems, postTodo, putItem, putTodo } from '../api/api'
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

export interface TodoItemAdd {
  itemId: string
  todo: Todo
  index: number
}

export type ItemsStoreAction =
  | { type: 'NONE' }
  | { type: 'getItems/fulfilled'; payload: Item[] }
  | { type: 'getFileItems/fulfilled'; payload: Item[] }
  | { type: 'getItem/fulfilled'; payload: Item }
  | { type: 'putItem/fulfilled'; payload: Item }
  | { type: 'putTodo/fulfilled'; payload: TodoItemUpdate }
  | { type: 'createTodo/fulfilled'; payload: TodoItemAdd }
  | { type: 'deleteItem/fulfilled'; payload: string }
  | { type: 'deleteTodo/fulfilled'; payload: Todo }
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
  if (a === 'getItem/fulfilled' || a === 'putItem/fulfilled') {
    return { ...state, items: state.items.map((i) => (i.id === action.payload.id ? action.payload : i)) }
  }
  if (a === 'deleteItem/fulfilled') {
    return {
      ...state,
      items: state.items.filter((i) => i.id !== action.payload),
    }
  }
  if (a === 'deleteTodo/fulfilled') {
    return {
      ...state,
      items: state.items.map((i) =>
        i.id !== action.payload.itemId ? i : { ...i, todos: i.todos?.filter((t) => t.id !== action.payload.id) }
      ),
    }
  }

  if (a === 'putTodo/fulfilled' || a === 'updateTodoValue') {
    return {
      ...state,
      items: state.items.map((i) =>
        i.id !== action.payload.itemId ? i : { ...i, todos: doUpdateItemTodo(action.payload.todo, i.todos) }
      ),
    }
  }
  if (a === 'createTodo/fulfilled') {
    return {
      ...state,
      items: state.items.map((i) =>
        i.id !== action.payload.itemId
          ? i
          : { ...i, todos: addToArray(i.todos || [], action.payload.index, action.payload.todo) }
      ),
    }
  }
  return state
}

export const loadFileItemList = createAsyncThunk('getFileItems', async (fileId: string) => getFileItems(fileId))
export const loadItemList = createAsyncThunk('getItems', async () => getItems())
export const loadItem = createAsyncThunk('getItem', async (id: string) => getItem(id))
export const removeItem = createAsyncThunk('deleteItem', async (id: string) => deleteItem(id))

export const updateItem = createAsyncThunk<Item, Item, { rejectValue: ApiError }>(
  'putItem',
  async (item: Item, thunkApi) => putItem(item, thunkApi)
)

export const removeTodo = createAsyncThunk('deleteTodo', async (todo: Todo) => deleteTodo(todo))

export const createTodo = createAsyncThunk<TodoItemAdd, TodoItemAdd, { rejectValue: ApiError }>(
  'createTodo',
  async (todo: TodoItemAdd, thunkApi) => postTodo(todo, thunkApi)
)

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
function addToArray(todos: Todo[], index: number, todo: Todo): any | Todo[] | undefined {
  return [...todos.slice(0, index), todo, ...todos.slice(index)]
}
