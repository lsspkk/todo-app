import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import React, { ReactNode } from 'react'
import { Item, Todo, Editable } from '../api/apiTypes'
import { ActionCommand, ItemActions } from './ItemList'
import { EditableItemTitle } from './EditableTitle'
import { TodoList } from './TodoList'

function rowBgColor(level: number) {
  return level === 0 ? 'bg-gray-200' : level === 1 ? 'bg-gray-100' : level === 2 ? 'bg-gray-50' : 'bg-white'
}

export function Row({ level, children }: { level: number; children: ReactNode }) {
  return (
    <div
      className={`${rowBgColor(
        level
      )} px-4 py-2 flex gap-4 w-full items-center justify-between text-left text-sm text-gray-900`}
    >
      {children}
    </div>
  )
}

export function ItemRow({
  item,
  showTodos,
  handleShowTodos,
  handleDoneClicked,
  editMode,
  onAction,
  index,
}: {
  index: number
  item: Item
  handleDoneClicked: (itemId: string, todo: Todo) => void
  showTodos: string[]
  handleShowTodos: (itemId: string) => void
  editMode: boolean
  onAction: (item: Editable, action: ActionCommand) => void
}) {
  const { content, level } = item
  const itemId = item.id
  const todos = item.todos || []
  const todoCount = 'todoCount' in item ? item.todoCount : todos?.length
  const showToggle = todoCount !== undefined && todoCount > 0 && !editMode

  return (
    <div key={`item-${itemId}`}>
      <Row level={level}>
        <EditableItemTitle {...{ item }} />
        {showToggle && (
          <button className='flex gap-2 items-center mr-2' onClick={() => handleShowTodos(itemId)}>
            {showTodos.includes(itemId) ? (
              <ChevronUpIcon className='h-4 w-4' />
            ) : (
              <ChevronDownIcon className='h-4 w-4' />
            )}
          </button>
        )}
        {editMode && <ItemActions {...{ index, item, onAction }} />}
      </Row>

      <dt className='pl-4 text-sm font-medium text-gray-500'>{content}</dt>

      {(editMode || showTodos.includes(itemId)) && todos && (
        <TodoList
          {...{
            itemId,
            todos,
            handleDoneClicked,
            editMode,
            onAction,
          }}
        />
      )}
    </div>
  )
}
