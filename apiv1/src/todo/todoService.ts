import { todos, setTodos } from './todoData'
import { v4 } from 'uuid'
import { ApiRequest } from 'server'
import { PostTodo, Todo } from './todoController'

export const getTodos = ({ accountId, params }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { itemId } = params as { itemId: string }
  const clean = getCleanTodos(accountId, itemId)
  reply.send(clean)
}

export function getTodoCount(accountId: string, itemId: string) {
  return todos.filter((todo) => todo.accountId === accountId && todo.itemId === itemId).length
}
export function getCleanTodos(accountId: string, itemId: string) {
  return todos
    .filter((todo) => todo.accountId === accountId && todo.itemId === itemId)
    .map((item) => ({ ...item }))
    .map((i) => {
      delete i.accountId
      return i
    })
}

export const getTodo = ({ accountId, params }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  const todo = todos.find((i) => i.id === id)
  if (!todo) {
    reply.code(404).send()
    return
  }
  const copy = { ...todo }
  delete copy.accountId
  reply.send(copy)
}

export const postTodo = ({ accountId, ...req }, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const newTodo = req.body as PostTodo
  const id = v4()
  const todo = { id, accountId, ...newTodo }
  setTodos([...todos, todo])
  reply.send({ id, ...newTodo })
}

export const putTodo = ({ accountId, params, ...req }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  if (!todos.find((i) => i.id === id)) {
    reply.code(404).send()
    return
  }
  const todo = { ...(req.body as Todo), accountId }
  const newTodos = todos.map((i) => (i.id !== id ? { ...i } : { ...todo }))
  setTodos(newTodos)
  reply.send(todo)
}

export const deleteTodo = ({ accountId, params }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  setTodos(todos.filter((todo) => todo.id !== id))
  reply.send()
}
