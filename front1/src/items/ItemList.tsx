import { MinusCircleIcon, PlusCircleIcon, PlusSmIcon, TrashIcon } from '@heroicons/react/outline'
import { ConfirmDialog } from 'components/ConfirmDialog'
import { useState } from 'react'
import { useAppDispatch } from 'store/hooks'
import { removeItem, removeTodo, updateItem } from 'store/itemsReducer'
import { Item, Todo, Editable, isItem, isTodo } from '../api/apiTypes'
import { ItemRow } from './ItemRow'

export type ActionCommand = 'add' | 'delete' | 'levelUp' | 'levelDown'

export function ItemList({
  items,
  handleLoadItem,
  handleDoneClicked,
  editMode = false,
}: {
  handleLoadItem: (itemId: string) => Promise<void>
  items: Item[]
  handleDoneClicked: (itemId: string, todo: Todo) => void
  editMode?: boolean
}) {
  const [showTodos, setShowTodos] = useState<string[]>([])
  const dispatch = useAppDispatch()

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

  function onAction(editable: Editable, action: ActionCommand) {
    if (action === 'delete' && isTodo(editable)) {
      const todo = editable as Todo
      dispatch(removeTodo(todo))
    } else if (isItem(editable)) {
      const item = editable as Item
      if (action === 'delete') {
        dispatch(removeItem(editable.id))
      } else if (action === 'levelUp') {
        dispatch(updateItem({ ...item, level: item.level - 1 }))
      } else if (action === 'levelDown') {
        dispatch(updateItem({ ...item, level: item.level + 1 }))
      }
    }
  }

  return (
    <div className='border-t border-gray-200 w-full'>
      <dl>
        {items.map((item, index) => (
          <ItemRow
            key={item.id}
            {...{ index, item, showTodos, handleShowTodos, handleDoneClicked, editMode, onAction }}
          />
        ))}
      </dl>
    </div>
  )
}

export function ItemActions({
  item,
  onAction,
  index,
}: {
  index: number
  item: Item
  onAction: (editable: Editable, action: ActionCommand) => void
}) {
  const [confirm, setConfirm] = useState(false)

  const todoCount = item.todos?.length || 0
  return (
    <div className='flex gap-2 items-center'>
      {confirm && (
        <ConfirmDialog
          title={`Poista otsikko`}
          message={`Haluatko varmasti poistaa otsikon ${todoCount > 0 ? 'ja sen tehtävät' : ''}?`}
          onConfirm={() => onAction(item, 'delete')}
          onClose={() => setConfirm(false)}
          confirmLabel={'Poista'}
        />
      )}

      <button className='flex gap-2 items-center' disabled={item.level < 1} onClick={() => onAction(item, 'levelUp')}>
        <PlusCircleIcon className={`h-4 ${item.level < 1 ? 'opacity-25' : ''}`} />
      </button>
      <button className='flex gap-2 items-center' disabled={item.level > 2} onClick={() => onAction(item, 'levelDown')}>
        <MinusCircleIcon className={`h-4 ${item.level > 1 ? 'opacity-25' : ''}`} />
      </button>
      {index == 0 && (
        <button className='absolute -mt-12 ml-3'>
          <PlusSmIcon className='h-4 w-4' />
        </button>
      )}
      <button className='absolute mt-12 ml-3'>
        <PlusSmIcon className='h-4 w-4' />
      </button>

      <button className='flex gap-2 items-center ml-4' onClick={() => setConfirm(true)}>
        <TrashIcon className='h-4 w-4' />
      </button>
    </div>
  )
}

export function TodoActions({
  todo,
  onAction,
  adding,
  onAdd,
}: {
  adding: boolean
  onAdd: () => void
  todo: Todo
  onAction: (editable: Editable, action: ActionCommand) => void
}) {
  const [confirm, setConfirm] = useState(false)

  return (
    <div className='flex gap-2 items-center'>
      {confirm && (
        <ConfirmDialog
          title={`Poista tehtävä`}
          message={`Haluatko varmasti poistaa tehtävän ${todo.title}?`}
          onConfirm={() => onAction(todo, 'delete')}
          onClose={() => setConfirm(false)}
          confirmLabel={'Poista'}
        />
      )}

      <button className='absolute mt-10 -ml-9'>
        <PlusSmIcon className='h-4 w-4' onClick={() => adding || confirm || onAdd()} />
      </button>
      <button className='flex gap-2 items-center ml-4' onClick={() => setConfirm(true)}>
        <TrashIcon className='h-4 w-4' />
      </button>
    </div>
  )
}
