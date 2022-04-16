import { useEffect } from 'react'
import { Item, Todo } from '../api/apiTypes'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loadItem, loadItemList, updateItemTodo } from '../store/itemsReducer'
import { ItemList } from './ItemList'

export function ItemListController() {
  const { items, currentFile } = useAppSelector((state) => ({
    items: state.items.items,
    currentFile: state.files.currentFile,
  }))
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!currentFile) dispatch(loadItemList())
  }, [dispatch, currentFile])

  async function handleLoadItem(itemId: string) {
    await dispatch(loadItem(itemId))
  }

  function handleDoneClicked(itemId: string, todo: Todo) {
    dispatch(updateItemTodo({ itemId, todo: { ...todo, done: !todo.done } }))
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
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Ladattu tiedosto: {currentFile ? currentFile.name : '-'}
          </p>
          <div className='bg-gray-50 text-sm font-medium text-gray-500'>
            Tehtäviä yhteensä: {items ? items.length : 0}
          </div>
        </div>
      </div>
      <ItemList {...{ items: families, handleLoadItem, handleDoneClicked }} />
    </div>
  )
}
