import { deleteItem, getItem, getItems, postItem } from './itemService'
import S from 'fluent-json-schema'

export interface Item {
  id: string
  accountId: string
  title: string
  content: string
  level: number
  children?: string[] // itemIds
}

export const itemSchema = S.object()
  .prop('id', S.string())
  .required()
  .prop('title', S.string())
  .required()
  .prop('content', S.string())
  .prop('level', S.number())
  .required()
  .prop('children', S.array().items(S.string()))

export const itemsSchema = S.array().items(itemSchema)

export interface PostItem {
  title: string
  content: string
  level: number
  children?: string[] // itemIds
}

const postItemSchema = S.object()
  .prop('title', S.string())
  .required()
  .prop('content', S.string())
  .required()
  .prop('level', S.number())
  .required()
  .prop('children', S.array().items(S.string()))

export function itemRoutes(fastify, options, done) {
  fastify.get('/items', { schema: itemsSchema }, getItems)
  fastify.post('/items', { body: postItemSchema, schema: itemSchema }, postItem)
  fastify.delete('/items/:id', {}, deleteItem)
  fastify.get('/items/:id', { schema: itemSchema }, getItem)

  done()
}
