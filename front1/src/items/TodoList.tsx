import CheckBox from 'components/Checkbox'
import React from 'react'
import { Todo, Editable } from '../api/apiTypes'
import { ActionCommand, TodoActions } from './ItemList'
import { EditableTodoTitle } from './EditableTitle'
import { AddTodoPanel } from './AddTodoPanel'

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
  onAction: (editable: Editable, action: ActionCommand, itemId?: string, index?: number) => void
}) {
  const [adding, setAdding] = React.useState<number | undefined>()
  return (
    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
      <ul className='divide-y divide-gray-200 ml-6'>
        {todos?.map((todo, index) => {
          const id = `id.${todo.id}.${itemId}`
          return (
            <React.Fragment key={`${index}.${itemId}-todo-${id}`}>
              <li className='pl-4 py-1 flex items-center justify-between text-sm flex items-center w-full'>
                <EditableTodoTitle {...{ itemId, todo }} />
                <CheckBox
                  className={`flex-shrink-0 h-3 w-3 pr-0 ${todo.done ? 'text-blue-900' : ''}`}
                  aria-hidden='true'
                  checked={todo.done}
                  onChange={() => handleDoneClicked(itemId, todo)}
                  disabled={editMode}
                />
                <div className='ml-4 flex-shrink-0'>{todo.content}</div>
                {editMode && (
                  <TodoActions {...{ todo, onAction, onAdd: () => setAdding(index), adding: index == adding }} />
                )}
              </li>
              {adding === index && (
                <AddTodoPanel
                  {...{
                    todo,
                    onAction: (e: Editable) => onAction(e, 'add', itemId, index + 1),
                    onCancel: () => setAdding(undefined),
                  }}
                />
              )}
            </React.Fragment>
          )
        })}
      </ul>
    </dd>
  )
}
