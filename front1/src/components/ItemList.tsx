import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { PaperClipIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { Item, Todo } from '../api/apiTypes'
import { useAppDispatch } from '../hooks'
import { loadItem, loadItemList, updateItemTodo } from '../reducers/itemsReducer'
import { store } from '../store'

export function ItemList() {
  const { items } = store.getState().items
  const [showTodos, setShowTodos] = useState<string[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadItemList())
  }, [dispatch])

  useEffect(() => {
    console.log(items)
  }, [items])

  async function handleShowTodos(itemId: string) {
    if (!showTodos.includes(itemId)) {
      await dispatch(loadItem(itemId))
      setShowTodos((prev) => [...prev, itemId])
    } else {
      setShowTodos((prev) => prev.filter((id) => id !== itemId))
    }
  }

  // todo sort as tree using children
  const sortedItems = [...items].sort((a, b) => {
    if (a.level < b.level) return -1
    if (a.level > b.level) return 1
    return 0
  })
  const families: Item[] = []
  const added = new Set<string>()
  for (const i of sortedItems) {
    if (added.has(i.id)) continue
    families.push(i)
    added.add(i.id)

    if (!i.children) continue
    addChildren(i.children)
  }
  function addChildren(children: string[]) {
    for (const child of children) {
      if (added.has(child)) continue
      const childItem = sortedItems.find((item) => item.id === child)
      if (childItem) {
        families.push(childItem)
        added.add(child)
      }
      if (childItem?.children) {
        addChildren(childItem?.children)
      }
    }
  }

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
      <div className='px-4 py-5'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>Tehtävät</h3>
        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>Ladattu tiedosto: -</p>
          <div className='bg-gray-50 text-sm font-medium text-gray-500'>
            Tehtäviä yhteensä: {items ? items.length : 0}
          </div>
        </div>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          {families.map(({ id: itemId, title, content, level, todoCount, todos }, i) => {
            const bg = i % 2 ? 'bg-white' : 'bg-gray-50'
            return (
              <div>
                <div
                  key={`item-${itemId}`}
                  className={`${bg} px-4 py-5 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                >
                  <dt className={`text-sm font-medium text-gray-500 ml-${Number(level) * 2}`}>{title}</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                    {(todoCount || todos) && (
                      <a href='#todos' onClick={() => handleShowTodos(itemId)}>
                        {showTodos.includes(itemId) ? (
                          <ChevronUpIcon className='h-4 w-4' />
                        ) : (
                          <ChevronDownIcon className='h-4 w-4' />
                        )}
                      </a>
                    )}
                  </dd>

                  <dt className='text-sm font-medium text-gray-500'>{content}</dt>
                </div>

                {showTodos.includes(itemId) && todos && <TodoList {...{ itemId, todos }} />}
              </div>
            )
          })}
        </dl>
      </div>
    </div>
  )
}

export function TodoList({ itemId, todos }: { itemId: string; todos: Todo[] }) {
  const dispatch = useAppDispatch()
  function handleDoneClicked(todo: Todo) {
    dispatch(updateItemTodo(itemId, { ...todo, done: !todo.done }))
  }

  return (
    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
      <dt className='text-sm font-medium text-gray-500'>Todos</dt>
      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
        <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
          {todos?.map((todo, i) => {
            return (
              <li key={`todo-${todo.id}`} className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
                <div className='w-0 flex-1 flex items-center' onClick={() => handleDoneClicked(todo)}>
                  <PaperClipIcon
                    className={`flex-shrink-0 h-5 w-5 ${todo.done ? 'text-green-900' : 'text-gray-100'}`}
                    aria-hidden='true'
                  />
                  <span className='ml-2 flex-1 w-0 truncate'>{todo.title}</span>
                </div>
                <div className='ml-4 flex-shrink-0'>{todo.content}</div>
              </li>
            )
          })}
        </ul>
      </dd>
    </div>
  )
}
