import { Todo } from './todoController'

let data: Todo[] = [
  { id: '11', accountId: '1', itemId: '1', done: true, title: 'Watch videos', content: '' },
  { id: '12', accountId: '1', itemId: '1', done: true, title: 'Code some basics', content: '' },
  { id: '13', accountId: '1', itemId: '1', done: true, title: 'Code items, files, todos', content: '' },
  { id: '21', accountId: '1', itemId: '2', done: true, title: 'Find plugin', content: '' },
  { id: '22', accountId: '1', itemId: '2', done: true, title: 'Study session, try', content: '' },
  { id: '62', accountId: '1', itemId: '6', done: true, title: 'Add password hash', content: '' },
  { id: '62', accountId: '1', itemId: '6', done: true, title: 'Add user,role to session', content: '' },
  { id: '63', accountId: '1', itemId: '6', done: true, title: 'Add fastify middleware', content: '' },
  { id: '70', accountId: '1', itemId: '7', done: true, title: 'Browse some tailwind components', content: '' },
  { id: '71', accountId: '1', itemId: '7', done: true, title: 'Create React App, with components', content: '' },
  { id: '72', accountId: '1', itemId: '7', done: true, title: 'Add simple login, user into redux', content: '' },
  { id: '73', accountId: '1', itemId: '7', done: true, title: 'Add redux to hold some items', content: '' },
  { id: '74', accountId: '1', itemId: '7', done: true, title: 'Add get post put items to redux', content: '' },
  { id: '75', accountId: '1', itemId: '7', done: true, title: 'Redux, get post todos', content: '' },
  { id: '81', accountId: '1', itemId: '8', done: true, title: 'Read file content', content: '' },
  { id: '82', accountId: '1', itemId: '8', done: true, title: 'Get post files with redux', content: '' },
  { id: '91', accountId: '1', itemId: '9', done: true, title: 'Parse titles as items', content: '' },
  { id: '92', accountId: '1', itemId: '9', done: true, title: 'Parse lists into todos', content: '' },
]

export const setTodos = (newData) => (data = newData)

export { data as todos }
