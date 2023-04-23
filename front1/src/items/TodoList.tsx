import CheckBox from 'components/Checkbox'
import React from 'react'
import { Todo, Editable, Item } from '../api/apiTypes'
import { ActionCommand, TodoActions } from './ItemList'
import { EditableTodoTitle } from './EditableTitle'

export function TodoList({
  itemId,
  todos,
  handleDoneClicked,
  editMode,
  onAction,
}: {
  itemId: string
  todos: Todo[]
  handleDoneClicked: (itemId: string, todo: Todo) => void
  editMode: boolean
  onAction: (editable: Editable, action: ActionCommand) => void
}) {
  return (
    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
      <ul className='divide-y divide-gray-200 ml-6'>
        {todos?.map((todo, i) => {
          const id = `id.${todo.id}.${itemId}`
          return (
            <li
              key={`${itemId}-todo-${id}`}
              className='pl-4 py-1 flex items-center justify-between text-sm flex items-center w-full'
            >
              <EditableTodoTitle {...{ itemId, todo }} />
              {!editMode && (
                <CheckBox
                  className={`flex-shrink-0 h-3 w-3 pr-0 ${todo.done ? 'text-blue-900' : 'text-gray-400'}`}
                  aria-hidden='true'
                  checked={todo.done}
                  onChange={() => handleDoneClicked(itemId, todo)}
                />
              )}
              {editMode && <TodoActions {...{ todo, onAction }} />}
              <div className='ml-4 flex-shrink-0'>{todo.content}</div>
            </li>
          )
        })}
      </ul>
    </dd>
  )
}
