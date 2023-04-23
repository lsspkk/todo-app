import { PencilAltIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Item, Todo } from '../api/apiTypes'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loadItem, loadItemList, updateItemTodo, updateTodoValue } from '../store/itemsReducer'
import { ItemList } from './ItemList'

export function ItemListContainer() {
  const { items, currentFile } = useAppSelector((state) => ({
    items: state.items.items,
    currentFile: state.files.currentFile,
  }))
  const [editMode, setEditMode] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!currentFile) dispatch(loadItemList())
  }, [dispatch, currentFile])

  async function handleLoadItem(itemId: string) {
    await dispatch(loadItem(itemId))
  }

  function handleDoneClicked(itemId: string, todo: Todo) {
    const newTodo: Todo = { ...todo, done: !todo.done }
    if (todo.isSavedInDatabase === false) {
      dispatch(updateTodoValue({ itemId, todo: newTodo }))
    } else {
      dispatch(updateItemTodo({ itemId, todo: newTodo }))
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
      <div className='px-4 py-2 flex items-center gap-8 w-full justify-between'>
        <div className='flex gap-2 items-center'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>Tehtävät</h3>
          <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center'>
            <p className='max-w-2xl text-sm text-gray-500'>Tiedosto: {currentFile ? currentFile.name : '-'}</p>
            <div className='bg-gray-50 text-sm text-gray-500'>Tehtäviä: {items ? items.length : 0}</div>
          </div>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`p-1 shadow-sm text-sm flex items-center gap-1 ${editMode ? 'bg-indigo-300' : 'bg-white'}`}
        >
          <PencilAltIcon className={`w-6 h-6`} /> <div>Muokkaus</div>
        </button>
      </div>
      <ItemList {...{ items: families, handleLoadItem, handleDoneClicked, editMode }} />
    </div>
  )
}
