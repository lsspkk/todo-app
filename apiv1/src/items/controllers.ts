import { items, setItems } from './data'
import { v4 } from 'uuid'

export const getItems = (req, reply) => {
  reply.send(items)
}
export const getItem = (req, reply) => {
  const { id } = req.params as { id: string }
  const item = items.find((i) => i.id === id)
  reply.send(item)
}

export const postItem = (req, reply) => {
  const { name } = req.body as { name: string }
  const id = v4()
  const item = { id, name }
  setItems([...items, item])
  reply.send(item)
}

export const deleteItem = (req, reply) => {
  const { id } = req.params as { id: string }
  setItems(items.filter((item) => item.id !== id))
  reply.send()
}
