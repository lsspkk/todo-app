import { accounts, setAccounts } from './accountData'
import { v4 } from 'uuid'
import { hash, verify } from 'argon2'
import { ApiRequest } from 'server'

export const getAccounts = ({ isAdmin }: ApiRequest, reply) => {
  if (isAdmin) {
    reply.send(
      accounts.map(({ id, username, password }) => ({
        id,
        username,
        password,
      }))
    )
  } else {
    reply.code(403).send()
  }
}
export const getAccount = ({ isAdmin, username, params }: ApiRequest, reply) => {
  const { id } = params as { id: string }
  const account = accounts.find((i) => i.id === id)
  if (account.username === username || isAdmin) {
    reply.send(account)
  } else {
    reply.code(403).send()
  }
}

interface SignUpDto {
  username: string
  password: string
  invitationCode: string
  role?: 'USER' | 'ADMIN'
}

const invitationCode = process.env.INVITATION_CODE_SECRET?.split(',') || []

export const signUpAccount = async ({ isAdmin, ...req }: ApiRequest, reply) => {
  const body = req.body as SignUpDto
  if (!isAdmin && !invitationCode.includes(body.invitationCode)) {
    reply.code(400).send(new Error('Bad invitation code'))
    return
  }

  const oldAccount = accounts.find((i) => i.username === body.username)
  if (oldAccount) {
    reply.code(400).send(new Error('Username already exists'))
    return
  }

  const id = v4()
  const { username } = body
  const password = await hash(body.password)
  const role = isAdmin && body.role === 'ADMIN' ? 'ADMIN' : 'USER'
  const account = { id, username, password, role }
  setAccounts([...accounts, account])
  reply.send({ id, username })
}

interface ChangePasswordDto {
  oldPassword: string
  newPassword: string
}
export const changePassword = async ({ isAdmin, username, params, ...req }: ApiRequest, reply) => {
  const body = req.body as ChangePasswordDto
  const { id } = params as { id: string }
  if (!username) {
    reply.code(403).send()
    return
  }
  const account = accounts.find((i) => i.id === id)
  if (!isAdmin && account.username !== username) {
    reply.code(403).send()
    return
  }
  const ok = await verify(account.password, body.oldPassword)

  if (!ok) {
    reply.code(400).send(new Error('Wrong old password'))
    return
  }
  const hashedPassword = await hash(body.newPassword)
  account.password = hashedPassword
  setAccounts(accounts.map((a) => (a.id !== id ? a : account)))
  reply.send()
}

interface LoginAccountDto {
  username: string
  password: string
}

// https://github.com/fastify/fastify-cookie
export const loginAccount = async ({ body, session }, reply) => {
  const { username, password } = body as LoginAccountDto
  const account = accounts.find((i) => i.username === username)
  if (!account) {
    reply.code(400).send(new Error('Bad username or password'))
    return
  }
  const ok = await verify(account.password, password)
  if (!ok) {
    reply.code(400).send(new Error('Bad username or password'))
    return
  }
  session.set('accountId', account.id)
  session.set('username', username)
  session.set('role', account.role)
  const { id } = account
  reply.send({ id, username })
}
export const logoutAccount = (req, reply) => {
  req.session.delete()
  reply.clearCookie('todosession').send()
}

export const deleteAccount = ({ params, session, isAdmin, username }: ApiRequest, reply) => {
  const { id } = params as { id: string }
  const account = accounts.find((i) => i.id === id)
  if (account.username === username) {
    setAccounts(accounts.filter((a) => a.id !== id))
    session.delete()
  } else if (isAdmin) {
    setAccounts(accounts.filter((a) => a.id !== id))
  } else {
    reply.code(403)
  }
  reply.send()
}
