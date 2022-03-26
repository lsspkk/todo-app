import { deleteTodo, getTodo, getTodos, postTodo, putTodo } from './todoService'
import S from 'fluent-json-schema'

export interface Todo {
  id: string
  accountId: string
  itemId: string
  done: boolean
  title: string
  content: string
}

export const todoSchema = S.object()
  .prop('id', S.string())
  .required()
  .prop('itemId', S.string())
  .required()
  .prop('title', S.string())
  .required()
  .prop('done', S.boolean())
  .required()
  .prop('content', S.string())

export const todosSchema = S.array().items(todoSchema)

export interface PostTodo {
  title: string
  content: string
  level: number
  children?: string[] // todoIds
}

export const postTodoSchema = S.object()
  .prop('title', S.string())
  .required()
  .prop('content', S.string())
  .required()
  .prop('done', S.boolean())

export function todoRoutes(fastify, options, done) {
  fastify.get('/items/:itemId/todos', { schema: todosSchema }, getTodos)
  fastify.post('/items/:itemId/todos', { body: postTodoSchema, schema: todoSchema }, postTodo)
  fastify.put('/items/:itemId/todos/:id', { body: todoSchema, schema: todoSchema }, putTodo)
  fastify.delete('/items/:itemId/todos/:id', {}, deleteTodo)
  fastify.get('/items/:itemId/todos/:id', { schema: todoSchema }, getTodo)

  done()
}
