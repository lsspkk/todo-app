import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { ItemList } from './ItemList'
import { Item, Todo } from 'api/apiTypes'
import { Provider } from 'react-redux'

export default { component: ItemList } as Meta<typeof ItemList>

const todos: Todo[] = [
  { id: '11', itemId: '1', done: true, title: 'Watch videos', content: '' },
  { id: '12', itemId: '1', done: true, title: 'Code some basics', content: '' },
  { id: '13', itemId: '1', done: false, title: 'Code items, files, todos', content: '' },
]
const items: Item[] = [
  { id: '5', title: 'Build Todo app', content: '', level: 0, children: ['3', '4'] },
  { id: '4', title: 'Build backend', content: '', level: 1, children: ['1', '2'] },
  { id: '1', title: 'Build fastify api', content: '', level: 2, todos },
  { id: '2', title: 'Build authentication', content: '', level: 2 },
  { id: '3', title: 'Build frontend', content: '', level: 1, children: ['7', '8', '9'] },
  { id: '6', title: 'Authentication', content: '', level: 2 },
  { id: '7', title: 'Redux, get post items', content: '', level: 2 },
  { id: '8', title: 'Get post files', content: '', level: 2 },
  { id: '9', title: 'Parse items from markdown file', content: '', level: 2 },
]

const withItems = {
  handleLoadItem: (itemId: string) => Promise.resolve(),
  handleDoneClicked: (itemId: string, todo: Todo) => {},
}
export const WithItems: StoryFn<typeof ItemList> = () => <ItemList {...{ ...withItems, items }} />

export const Empty: StoryFn<typeof ItemList> = () => <ItemList {...{ ...withItems, items: [] }} />
