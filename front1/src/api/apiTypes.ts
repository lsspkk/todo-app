export interface ApiError {
  message: string
}

export interface UserAccount {
  id: string
  username: string
}

export interface Item {
  id: string
  title: string
  content: string
  level: number
  children?: string[] // itemIds
  todoCount?: number
  isSavedInDatabase?: boolean
  todos?: Todo[]
}

export interface Todo {
  id: string
  itemId: string
  done: boolean
  title: string
  content: string
  isSavedInDatabase?: boolean
}

export type Editable = Item | Todo

export const isItem = (b: Editable): b is Item => {
  return (b as Todo).done === undefined
}

export const isTodo = (b: Editable): b is Todo => {
  return (b as Todo).done !== undefined
}

export interface NewFile {
  name: string
  content: string
  items?: Item[]
}
export interface File {
  id: string
  name: string
  content: string
  items?: string[] // ids of items
}
