import { files, setFiles } from './fileData'
import { v4 } from 'uuid'
import { ApiRequest } from 'server'
import { PostFile } from './fileController'
import { items } from '../item/itemData'

export const getFiles = ({ accountId }: ApiRequest, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const clean = files
    .filter((file) => file.accountId === accountId)
    .map(({ id, name, content, items }) => ({ id, name, itemCount: items ? items.length : 0 }))
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
  delete file.accountId
  reply.send(copy)
}

export const postFile = ({ accountId, ...req }, reply) => {
  if (!accountId) {
    reply.code(403).send()
    return
  }
  const newFile = req.body as PostFile
  const id = v4()
  const file = { id, accountId, ...newFile }
  setFiles([...files, file])
  reply.send({ id, ...newFile })
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
  const fileItems = items.filter((i) => i.accountId === accountId && wanted.includes(i.id))
  reply.send(fileItems)
}
