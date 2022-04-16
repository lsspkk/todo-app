import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { PaperClipIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { Item, NewItem, NewTodo, Todo } from '../api/apiTypes'

export function ItemList({
  items,
  handleLoadItem,
  handleDoneClicked,
}: {
  handleLoadItem?: (itemId: string) => Promise<void>
  items: Item[] | NewItem[]
  handleDoneClicked?: (itemId: string, todo: Todo) => void
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
        {items.map(({ title, content, level, ...item }, i) => {
          const itemId = 'id' in item ? item.id : `title.${i}`
          const todos = 'todos' in item ? item.todos : 'newTodos' in item ? item.newTodos : []
          const todoCount = 'todoCount' in item ? item.todoCount : todos?.length
          const bg = i % 2 ? 'bg-white' : 'bg-gray-50'
          return (
            <div key={`item-${itemId}`} className={` pl-${Number(level) * 2} `}>
              <div className={`${bg} px-4 pt-5 flex gap-4`}>
                <dt className={`text-sm font-medium text-gray-500 w-3/4`}>{title}</dt>
                {todoCount !== undefined && todoCount > 0 && (
                  <div className='mt-1 text-sm text-gray-900'>
                    <button onClick={() => handleShowTodos(itemId)}>
                      {showTodos.includes(itemId) ? (
                        <ChevronUpIcon className='h-4 w-4' />
                      ) : (
                        <ChevronDownIcon className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                )}
              </div>
              <dt className='pl-4 text-sm font-medium text-gray-500'>{content}</dt>

              {showTodos.includes(itemId) && todos && <TodoList {...{ itemId, todos, handleDoneClicked }} />}
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
}: {
  itemId: string
  todos: NewTodo[] | Todo[]
  handleDoneClicked?: (itemId: string, todo: Todo) => void
}) {
  return (
    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
      <ul className='divide-y divide-gray-200'>
        {todos?.map((todo, i) => {
          const isTodo = 'id' in todo && 'itemId' in todo

          const id = `id.${todo.title}.${i}.${itemId}`
          return (
            <li key={`${itemId}-todo-${id}`} className='pl-4 pr-4 py-1 flex items-center justify-start text-sm'>
              <button
                className='flex items-center'
                disabled={!isTodo}
                onClick={() => isTodo && handleDoneClicked && handleDoneClicked(itemId, todo)}
              >
                <PaperClipIcon
                  className={`flex-shrink-0 h-3 w-3 ${todo.done ? 'text-green-900' : 'text-gray-400'}`}
                  aria-hidden='true'
                />
                <span className='ml-2 truncate text-align-left'>{todo.title}</span>
              </button>
              <div className='ml-4 flex-shrink-0'>{todo.content}</div>
            </li>
          )
        })}
      </ul>
    </dd>
  )
}
