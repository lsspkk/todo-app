import Fastify from 'fastify'
import fastifySwagger from 'fastify-swagger'
import { itemRoutes } from './items/routes'
const fastify = Fastify({
  logger: true,
})
fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { version: '1', title: 'apiv1' },
  },
})
fastify.register(itemRoutes)

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
