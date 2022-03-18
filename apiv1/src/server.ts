import Fastify, { FastifyRequest } from 'fastify'
import fastifySwagger from 'fastify-swagger'
import S from 'fluent-json-schema'
import fastifyEnv from 'fastify-env'
import 'dotenv/config'
import { itemRoutes } from './item/itemController'
import { accountRoutes } from './account/accountController'
import secureSession from 'fastify-secure-session'
import { fileRoutes } from './file/fileController'
import { todoRoutes } from './todo/todoController'

const fastify = Fastify({
  logger: true,
})

// let's validate environment variables
const envSchema = S.object()
  .prop('SECRET_COOKIE_KEY', S.string())
  .required()
  .prop('INVITATION_CODE_SECRET', S.string())
  .required()

const serverOptions = {
  confKey: 'config',
  dotenv: true,
  data: process.env,
  schema: envSchema,
}

fastify.register(fastifyEnv, serverOptions)

fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { version: '1', title: 'apiv1' },
  },
})
fastify.register(secureSession, {
  key: Buffer.from(process.env.SECRET_COOKIE_KEY, 'hex'),
  cookieName: 'session',
  cookie: {
    path: '/',
  },
})

export interface ApiRequest extends FastifyRequest {
  username?: string
  accountId?: string
  isAdmin: boolean
}

// username, accountId, role from session
fastify.decorateRequest('username', '')
fastify.decorateRequest('accountId', '')
fastify.decorateRequest('isAdmin', false)
fastify.addHook('preHandler', (req: ApiRequest, reply, done) => {
  req.username = req.session.get('username')
  req.accountId = req.session.get('accountId')
  req.isAdmin = 'ADMIN' === req.session.get('role')
  done()
})

fastify.register(itemRoutes)
fastify.register(accountRoutes)
fastify.register(todoRoutes)
fastify.register(fileRoutes)

fastify.get('/health', async (req, reply) => ({ server: 'up' }))
const PORT = process.env.FASTIFY_PORT ? process.env.FASTIFY_PORT : 5000

const start = async () => {
  try {
    await fastify.listen(PORT, '0.0.0.0')
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}
start()
