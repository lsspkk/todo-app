import { ChevronDownIcon, ChevronUpIcon, PencilAltIcon } from '@heroicons/react/outline'
import CheckBox from 'components/Checkbox'
import { string } from 'prop-types'
import { useState } from 'react'
import { Item, NewItem, NewTodo, Todo } from '../api/apiTypes'
import { EditItemTodoDialog } from './EditItemTodoDialog'

export function ItemList({
  items,
  handleLoadItem,
  handleDoneClicked,
}: {
  handleLoadItem: (itemId: string) => Promise<void>
  items: Item[] | NewItem[]
  handleDoneClicked: (itemId: string, todo: Todo) => void
}) {
  const [showTodos, setShowTodos] = useState<string[]>([])
  const [editItemTodo, setEditItemTodo] = useState<{ item?: Item | NewItem; todo?: Todo | NewTodo }>({})

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

  const handleEditClicked = (item: Item | NewItem, todo?: Todo | NewTodo) => {
    setEditItemTodo({ item, todo })
  }

  if (editItemTodo.item !== undefined) {
    const { item, todo } = editItemTodo
    return <EditItemTodoDialog {...{ items, item, todo, onClose: () => setEditItemTodo({}) }} />
  }

  return (
    <div className='border-t border-gray-200 w-full'>
      <dl>
        {items.map((item, i) => {
          const { title, content, level } = item
          const itemId = 'id' in item ? item.id : `title.${i}`
          const todos = 'todos' in item ? item.todos : 'newTodos' in item ? item.newTodos : []
          const todoCount = 'todoCount' in item ? item.todoCount : todos?.length
          const bg =
            level === 0
              ? 'bg-gray-200'
              : level === 1
              ? 'bg-gray-100'
              : level === 2
              ? 'bg-gray-50'
              : i % 2 === 0
              ? 'bg-white'
              : 'bg-gray-50'

          const showToggle = todoCount !== undefined && todoCount > 0
          return (
            <div key={`item-${itemId}`} style={{ paddingLeft: `${Number(level) * 1}rem` }}>
              <div
                className={`${bg} px-4 py-2 flex gap-4 w-full items-center justify-between text-left text-sm text-gray-900`}
              >
                {showToggle && (
                  <button className='flex gap-2 items-center' onClick={() => showToggle && handleShowTodos(itemId)}>
                    <dt className={`text-sm font-medium text-gray-500`}>{title}</dt>

                    {showTodos.includes(itemId) ? (
                      <ChevronUpIcon className='h-4 w-4' />
                    ) : (
                      <ChevronDownIcon className='h-4 w-4' />
                    )}
                  </button>
                )}
                {!showToggle && <dt className={`text-sm font-medium text-gray-500`}>{title}</dt>}
                <PencilAltIcon className='h-4 w-4 opacity-30' onClick={() => handleEditClicked(item)} />
              </div>
              <dt className='pl-4 text-sm font-medium text-gray-500'>{content}</dt>

              {showTodos.includes(itemId) && todos && (
                <TodoList
                  {...{
                    itemId,
                    todos,
                    handleDoneClicked,
                    handleEditTodoClicked: (todo) => handleEditClicked(item, todo),
                  }}
                />
              )}
            </div>
          )
        })}
      </dl>
    </div>
  )
}

export function TodoList({
  itemId,
  todos,
  handleDoneClicked,
  handleEditTodoClicked,
}: {
  itemId: string
  todos: NewTodo[] | Todo[]
  handleDoneClicked: (itemId: string, todo: Todo) => void
  handleEditTodoClicked: (todo?: Todo | NewTodo) => void
}) {
  return (
    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
      <ul className='divide-y divide-gray-200'>
        {todos?.map((todo, i) => {
          const isTodo = 'id' in todo && 'itemId' in todo

          const id = `id.${todo.title}.${i}.${itemId}`
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
                    onChange={() => isTodo && handleDoneClicked(itemId, todo)}
                    disabled={!isTodo}
                  />
                  <span className='ml-2 truncate text-align-left'>{todo.title}</span>
                </button>
                <div className='ml-4 flex-shrink-0'>{todo.content}</div>
              </div>
              <PencilAltIcon className='h-4 w-4 opacity-30' onClick={() => handleEditTodoClicked(todo)} />
            </li>
          )
        })}
      </ul>
    </dd>
  )
}
