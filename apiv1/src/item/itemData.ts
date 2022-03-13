import { Item } from './itemController'

let data: Item[] = [
  { id: '1', accountId: '1', title: 'Build fastify api', content: '', level: 2 },
  { id: '2', accountId: '1', title: 'Build authentication', content: '', level: 2 },
  { id: '3', accountId: '1', title: 'Build frontend', content: '', level: 1, children: ['7', '8', '9'] },
  { id: '4', accountId: '1', title: 'Build backend', content: '', level: 1, children: ['1', '2'] },
  { id: '5', accountId: '1', title: 'Build Todo app', content: '', level: 0, children: ['3', '4'] },
  { id: '6', accountId: '1', title: 'Authentication', content: '', level: 2 },
  { id: '7', accountId: '1', title: 'Redux, get post items', content: '', level: 2 },
  { id: '8', accountId: '1', title: 'Get post files', content: '', level: 2 },
  { id: '9', accountId: '1', title: 'Parse items from markdown file', content: '', level: 2 },
]

export const setItems = (newData) => (data = newData)

export { data as items }
