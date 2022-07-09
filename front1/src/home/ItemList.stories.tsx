// Button.stories.ts|tsx

import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ItemList } from './ItemList'
import { Item, Todo } from 'api/apiTypes'

export default { component: ItemList } as ComponentMeta<typeof ItemList>

const newTodos: Todo[] = [
  { id: '11', itemId: '1', done: true, title: 'Watch videos', content: '' },
  { id: '12', itemId: '1', done: true, title: 'Code some basics', content: '' },
  { id: '13', itemId: '1', done: false, title: 'Code items, files, todos', content: '' },
]
const items: Item[] = [
  { id: '1', title: 'Build fastify api', content: '', level: 2, newTodos },
  { id: '2', title: 'Build authentication', content: '', level: 2, newTodos: [] },
  { id: '3', title: 'Build frontend', content: '', level: 1, children: ['7', '8', '9'], newTodos: [] },
  { id: '4', title: 'Build backend', content: '', level: 1, children: ['1', '2'], newTodos: [] },
  { id: '5', title: 'Build Todo app', content: '', level: 0, children: ['3', '4'], newTodos: [] },
  { id: '6', title: 'Authentication', content: '', level: 2, newTodos: [] },
  { id: '7', title: 'Redux, get post items', content: '', level: 2, newTodos: [] },
  { id: '8', title: 'Get post files', content: '', level: 2, newTodos: [] },
  { id: '9', title: 'Parse items from markdown file', content: '', level: 2, newTodos: [] },
]

export const WithItems: ComponentStory<typeof ItemList> = () => <ItemList {...{ items }} />

export const Empty: ComponentStory<typeof ItemList> = () => <ItemList {...{ items: [] }} />
