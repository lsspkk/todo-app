import { deleteItem, getItem, getItems, postItem, putItem } from './itemService'
import S from 'fluent-json-schema'
import { PostTodo, postTodoSchema, Todo, todoSchema } from '../todo/todoController'

export interface Item {
  id: string
  accountId: string
  fileId?: string
  title: string
  content: string
  level: number
  children?: string[] // itemIds
  todos?: Todo[]
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
  .prop('todos', S.array().items(todoSchema))

export const itemsSchema = S.array().items(itemSchema)

export interface PostItem {
  title: string
  content: string
  level: number
  fileId?: string
  children?: string[] // itemIds
  newTodos?: PostTodo[]
}

export const postItemSchema = S.object()
  .prop('title', S.string())
  .required()
  .prop('content', S.string())
  .required()
  .prop('level', S.number())
  .required()
  .prop('fileId', S.string())
  .prop('children', S.array().items(S.string()))
  .prop('newTodos', S.array().items(postTodoSchema))

export function itemRoutes(fastify, options, done) {
  fastify.get('/items', { schema: itemsSchema }, getItems)
  fastify.post('/items', { body: postItemSchema, schema: itemSchema }, postItem)
  fastify.put('/items/:id', { body: itemSchema, schema: itemSchema }, putItem)
  fastify.delete('/items/:id', {}, deleteItem)
  fastify.get('/items/:id', { schema: itemSchema }, getItem)

  done()
}
