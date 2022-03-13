import { items, setItems } from './itemData'
import { v4 } from 'uuid'
import { ApiRequest } from 'server'
import { PostItem } from './itemController'

export const getItems = ({ accountId }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  reply.send(items.filter((item) => item.accountId === accountId))
}
export const getItem = ({ accountId, params }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  const item = items.find((i) => i.id === id)
  reply.send(item)
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
  reply.send(item)
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
  setItems(items.filter((item) => item.id !== id))
  reply.send()
}
