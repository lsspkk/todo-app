import { deleteFile, getFile, getFileItems, getFiles, postFile, putFile } from './fileService'
import S from 'fluent-json-schema'
import { itemsSchema } from 'item/itemController'

export interface File {
  id: string
  accountId: string
  name: string
  content: string
  items?: string[]
}
const fileSchema = S.object()
  .prop('id', S.string().required())
  .prop('name', S.string().required())
  .prop('content', S.string())
  .prop('items', S.array().items(S.string())) // id:s of items

const filesSchema = S.array().items(fileSchema)

export interface PostFile {
  name: string
  content: string
  items?: string[]
}

const postFileSchema = S.object().prop('name', S.string().required()).prop('content', S.string())

export function fileRoutes(fastify, options, done) {
  fastify.get('/files', { schema: filesSchema }, getFiles)
  fastify.post('/files', { body: postFileSchema, schema: fileSchema }, postFile)
  fastify.put('/files/:id', { body: postFileSchema, schema: fileSchema }, putFile)
  fastify.delete('/files/:id', { handler: deleteFile })
  fastify.get('/files/:id', { schema: fileSchema }, getFile)
  fastify.get('/files/:id/items', { schema: itemsSchema }, getFileItems)

  done()
}
