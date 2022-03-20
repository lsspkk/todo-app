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
  todos?: Todo[]
  todoCount?: number
}

export interface Todo {
  id: string
  itemId: string
  done: boolean
  title: string
  content: string
}
