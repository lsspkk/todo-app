export interface ApiError {
  message: string
}

export interface UserAccount {
  id: string
  username: string
}

export interface NewItem {
  title: string
  content: string
  level: number
  children?: string[] // itemIds
  todoCount?: number
  newTodos: NewTodo[]
}
export interface Item extends NewItem {
  id: string
  todos?: Todo[]
}

export interface NewTodo {
  done: boolean
  title: string
  content: string
}
export interface Todo extends NewTodo {
  id: string
  itemId: string
}

export interface NewFile {
  name: string
  content: string
  items?: NewItem[]
}
export interface File {
  id: string
  name: string
  content: string
  items?: string[] // ids of items
}
