import { files, setFiles } from './fileData'
import { v4 } from 'uuid'
import { ApiRequest } from 'server'
import { File, PostFile } from './fileController'
import { items, setItems } from '../item/itemData'
import { Item } from '../item/itemController'
import { setTodos, todos } from '../todo/todoData'
import { getTodoCount } from '../todo/todoService'

export const getFiles = ({ accountId }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const clean = files
    .filter((file) => file.accountId === accountId)
    .map(({ id, name, items }) => ({ id, name, itemCount: items ? items.length : 0 }))
  reply.send(clean)
}
export const getFile = ({ accountId, params }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  const file = files.find((i) => i.id === id)
  if (!file) {
    reply.code(404).send()
    return
  }
  const copy = { ...file }
  delete copy.accountId
  reply.send(copy)
}

/**
 * File has items that have todos.
 * All these are created and their ids are used for relations.
 *
 */
export const postFile = ({ accountId, ...req }, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const newFile = req.body as PostFile
  const id = v4()

  const fileNames = files.map((f) => f.name)
  const name = chooseFreeName(newFile.name, fileNames)

  const file = { id, accountId, ...newFile, name }

  const newItems: Item[] | undefined = file.items?.map(({ title, content, level, ...newItem }) => {
    const itemId = v4()
    const todos = newItem.newTodos?.map(({ content, done, title }) => ({
      id: v4(),
      itemId,
      accountId,
      content,
      done,
      title,
    }))

    return { id: itemId, accountId, fileId: id, title, content, level, todos }
  })

  if (newItems) {
    setItems([...items, ...newItems])

    const newTodos = newItems.flatMap(({ todos }) => (todos ? todos : []))
    if (newTodos) {
      setTodos([...todos, ...newTodos])
    }
  }

  const fileWithItemIds: File = { ...file, items: newItems?.map((i) => i.id) }

  setFiles([...files, fileWithItemIds])
  reply.send({ id, ...newFile, name })
}

export const putFile = ({ accountId, params, ...req }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  const file = files.find((i) => i.id === id)
  if (!file) {
    reply.code(404).send()
    return
  }
  const { name, content, items: newItems } = req.body as PostFile
  const newFiles = files.map((i) => (i.id !== id ? { ...i } : { ...i, name, content, items: newItems }))
  setFiles(newFiles)
}

export const deleteFile = ({ accountId, params }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  setFiles(files.filter((file) => file.id !== id))
  reply.send()
}

export const getFileItems = ({ accountId, params }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const { id } = params as { id: string }
  const file = files.find((i) => i.id === id)
  if (!file) {
    reply.code(404).send()
    return
  }
  const { items: wanted } = file
  const fileItems = items
    .filter((i) => i.accountId === accountId && wanted?.includes(i.id))
    .map(({ id: itemId, title, content, level, children }) => ({
      id: itemId,
      title,
      content,
      level,
      children,
      todoCount: getTodoCount(accountId, itemId),
    }))
  reply.send(fileItems)
}
function chooseFreeName(name: string, fileNames: string[]) {
  let tryName = name
  let count = 1
  while (true) {
    if (!fileNames.includes(tryName)) {
      console.error(fileNames, tryName)
      return tryName
    }
    tryName = `${name}(${count++})`
  }
}
