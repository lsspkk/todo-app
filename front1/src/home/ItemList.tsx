import { ChevronDownIcon, ChevronUpIcon, XCircleIcon } from '@heroicons/react/outline'
import CheckBox from 'components/Checkbox'
import { string } from 'prop-types'
import React, { useState } from 'react'
import { Item, Todo } from '../api/apiTypes'
import { EditItemTodoDialog } from './EditItemTodoDialog'

function bgColor(level: number) {
  return level === 0 ? 'bg-gray-200' : level === 1 ? 'bg-gray-100' : level === 2 ? 'bg-gray-50' : 'bg-white'
}

export function ItemList({
  items,
  handleLoadItem,
  handleDoneClicked,
}: {
  handleLoadItem: (itemId: string) => Promise<void>
  items: Item[]
  handleDoneClicked: (itemId: string, todo: Todo) => void
}) {
  const [showTodos, setShowTodos] = useState<string[]>([])

  async function handleShowTodos(itemId: string) {
    if (!showTodos.includes(itemId)) {
      if (handleLoadItem) {
        await handleLoadItem(itemId)
      }
      setShowTodos((prev) => [...prev, itemId])
    } else {
      setShowTodos((prev) => prev.filter((id) => id !== itemId))
    }
  }

  return (
    <div className='border-t border-gray-200 w-full'>
      <dl>
        {items.map((item) => (
          <ItemRow key={item.id} {...{ item, showTodos, handleShowTodos, handleDoneClicked }} />
        ))}
      </dl>
    </div>
  )
}

function ItemRow({
  item,
  showTodos,
  handleShowTodos,
  handleDoneClicked,
}: {
  item: Item
  handleDoneClicked: (itemId: string, todo: Todo) => void
  showTodos: string[]
  handleShowTodos: (itemId: string) => void
}) {
  const { content, level } = item
  const itemId = item.id
  const todos = item.todos || []
  const todoCount = 'todoCount' in item ? item.todoCount : todos?.length

  const showToggle = todoCount !== undefined && todoCount > 0

  const [mode, setMode] = useState({ edit: false })

  const onChange = (newTitle: string) => {
    console.debug(newTitle)
    setMode({ edit: false })
  }

  return (
    <div key={`item-${itemId}`}>
      <div
        className={`${bgColor(
          level
        )} px-4 py-2 flex gap-4 w-full items-center justify-between text-left text-sm text-gray-900`}
      >
        {mode.edit && <EditTitle {...{ title: item.title, onChange, onClose: () => setMode({ edit: false }) }} />}
        {!mode.edit && (
          <div onClick={() => setMode({ edit: true })}>
            <TodoTitle {...{ item }} />
          </div>
        )}
        {showToggle && (
          <button className='flex gap-2 items-center' onClick={() => handleShowTodos(itemId)}>
            {showTodos.includes(itemId) ? (
              <ChevronUpIcon className='h-4 w-4' />
            ) : (
              <ChevronDownIcon className='h-4 w-4' />
            )}
          </button>
        )}
      </div>
      <dt className='pl-4 text-sm font-medium text-gray-500'>{content}</dt>

      {showTodos.includes(itemId) && todos && (
        <TodoList
          {...{
            itemId,
            todos,
            handleDoneClicked,
          }}
        />
      )}
    </div>
  )
}

function TodoTitle({ item, ...props }: { item: Item }) {
  return item.level < 1 ? (
    <dt className={`text-sm font-medium text-gray-800`} {...props}>
      {item.title}
    </dt>
  ) : (
    <dt className={`text-sm font-medium text-gray-500`} {...props}>
      {item.title}
    </dt>
  )
}

function EditTitle({
  title,
  onChange,
  onClose,
}: {
  title: string
  onChange: (newTitle: string) => void
  onClose: () => void
}) {
  const [value, setValue] = useState(title)

  return (
    <div className='flex items-center justify-between w-full'>
      <div onClick={onClose} className='absolute top-0 left-0 w-full h-full bg-gray-200 opacity-75'></div>
      <input
        id='username'
        name='username'
        type='username'
        autoComplete='username'
        required
        className='appearance-none rounded-none relative block w-auto p-1 m:[-2px] border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
        placeholder='käyttäjätunnus'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className='flex items-center z-10 gap-4'>
        <button onClick={() => onChange(value)}>OK</button>
        <button className='h-6 w-6' onClick={onClose}>
          <XCircleIcon />
        </button>
      </div>
    </div>
  )
}

export function TodoList({
  itemId,
  todos,
  handleDoneClicked,
}: {
  itemId: string
  todos: Todo[]
  handleDoneClicked: (itemId: string, todo: Todo) => void
}) {
  return (
    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
      <ul className='divide-y divide-gray-200'>
        {todos?.map((todo, i) => {
          const id = `id.${todo.id}.${itemId}`
          return (
            <li key={`${itemId}-todo-${id}`} className='pl-4 pr-4 py-1 flex items-center justify-between text-sm'>
              <div>
                <button
                  className='flex items-center'
                  // disabled={!isTodo}
                  // onClick={() => isTodo && handleDoneClicked && handleDoneClicked(itemId, todo)}
                >
                  <CheckBox
                    className={`flex-shrink-0 h-3 w-3 ${todo.done ? 'text-blue-900' : 'text-gray-400'}`}
                    aria-hidden='true'
                    checked={todo.done}
                    onChange={() => handleDoneClicked(itemId, todo)}
                  />
                  <span className='ml-2 truncate text-align-left'>{todo.title}</span>
                </button>
                <div className='ml-4 flex-shrink-0'>{todo.content}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </dd>
  )
}
