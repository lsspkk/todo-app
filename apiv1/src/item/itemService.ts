import { items, setItems } from './itemData'
import { v4 } from 'uuid'
import { ApiRequest } from 'server'
import { PostItem } from './itemController'
import { getCleanTodos, getTodoCount } from '../todo/todoService'

export const getItems = ({ accountId }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const clean = items
    .filter((item) => item.accountId === accountId)
    .map(({ id, title, content }) => ({ id, title, content, todoCount: getTodoCount(accountId, id) }))
  reply.send(clean)
}
export const getItem = ({ accountId, params }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  const item = items.find((i) => i.id === id)
  if (!item) {
    reply.code(404).send()
    return
  }
  const todos = getCleanTodos(accountId, id)
  const copy = { ...item, todos }
  delete copy.accountId
  reply.send(copy)
}

export const postItem = ({ accountId, ...req }, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const newItem = req.body as PostItem
  const id = v4()
  const item = { id, accountId, ...newItem }

  setItems([...items, item])
  reply.send({ id, ...newItem })
}

export const putItem = ({ accountId, params, ...req }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  const item = items.find((i) => i.id === id)
  if (!item) {
    reply.code(404).send()
    return
  }
  const { title, content, children } = req.body as PostItem
  const newItems = items.map((i) => (i.id !== id ? { ...i } : { ...i, title, content, children }))
  setItems(newItems)
}

export const deleteItem = ({ accountId, params }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  const oldItem = items.find((i) => i.id === id)
  if (!oldItem) {
    reply.code(404).send()
    return
  }
  setItems(items.filter((item) => item.id !== id))
  reply.send()
}
