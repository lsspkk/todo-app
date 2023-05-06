import { items, setItems } from './itemData'
import { v4 } from 'uuid'
import { ApiRequest } from 'server'
import { Item } from './itemController'
import { getCleanTodos, getTodoCount } from '../todo/todoService'
import { setTodos, todos } from '../todo/todoData'

export const getItems = ({ accountId }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const clean = items
    .filter((item) => item.accountId === accountId)
    .map(({ id, title, content, level, children }) => ({
      id,
      title,
      content,
      level,
      children,
      todos: getCleanTodos(accountId, id),
    }))
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
  const newItem = req.body as Item
  const itemId = v4()

  const newTodos = newItem.todos?.map(({ content, done, title }) => ({
    id: v4(),
    itemId,
    accountId,
    content,
    done,
    title,
  }))

  if (newTodos) {
    setTodos([...todos, ...newTodos])
  }

  const item: Item = { id: itemId, accountId, ...newItem, todos: newTodos }

  setItems([...items, item])
  reply.send({ item })
}

export const putItem = ({ accountId, params, ...req }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  if (!items.find((i) => i.id === id)) {
    reply.code(404).send()
    return
  }
  const item = { ...(req.body as Item), accountId }
  const newItems = items.map((i) => (i.id !== id ? { ...i } : { ...item }))
  setItems(newItems)
  reply.send(item)
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
