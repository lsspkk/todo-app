import {
  signUpAccount,
  changePassword,
  loginAccount,
  getAccount,
  getAccounts,
  logoutAccount,
  deleteAccount,
} from './accountService'
import S from 'fluent-json-schema'

export interface Account {
  id: string
  username: string
  password: string // hashed
  role: 'ADMIN' | 'USER'
}

const signUpSchema = S.object()
  .prop('username', S.string())
  .required()
  .prop('password', S.string())
  .required()
  .prop('invitationCode', S.string())
  .required()

const accountSchema = S.object().prop('id', S.string()).required().prop('username', S.string()).required()

const accountsSchema = S.array().items(accountSchema)

const loginSchema = S.object().prop('usernamename', S.string()).required().prop('password', S.string()).required()

const changePasswordSchema = S.object()
  .prop('oldPassword', S.string())
  .required()
  .prop('newPassword', S.string())
  .required()

export function accountRoutes(fastify, options, done) {
  fastify.get('/accounts', { schema: accountsSchema }, getAccounts)
  fastify.post('/accounts/login', { body: loginSchema, schema: accountSchema }, loginAccount)
  fastify.get('/accounts/logout', { response: 200 }, logoutAccount)
  fastify.post(
    '/accounts/signUp',
    {
      body: signUpSchema,
      schema: accountSchema,
    },
    signUpAccount
  )
  fastify.get('/accounts/:id', { schema: accountSchema }, getAccount)
  fastify.post('/accounts/:id/changePassword', { body: changePasswordSchema }, changePassword)
  fastify.delete('/accounts/:id', {}, deleteAccount)

  done()
}
