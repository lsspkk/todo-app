import { deleteItem, getItem, getItems, postItem } from './controllers'

const itemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
}
function schema(successSchema, handler) {
  return {
    schema: {
      response: {
        200: successSchema,
      },
    },
    handler,
  }
}

const getItemsOptions = schema({ type: 'array', items: itemSchema }, getItems)
const getItemOptions = schema(itemSchema, getItem)
const deleteItemOptions = { schema: {}, handler: deleteItem }
const postItemOptions = {
  schema: {
    body: {
      type: 'object',
      require: true,
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      201: itemSchema,
    },
  },
  handler: postItem,
}
export function itemRoutes(fastify, options, done) {
  fastify.get('/items', getItemsOptions)
  fastify.post('/items', postItemOptions)
  fastify.delete('/items/:id', deleteItemOptions)
  fastify.get('/items/:id', getItemOptions)

  done()
}
