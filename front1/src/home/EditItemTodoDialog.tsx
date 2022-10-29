import { XCircleIcon } from '@heroicons/react/outline'
import CheckBox from 'components/Checkbox'
import { string } from 'prop-types'
import { useState } from 'react'
import { Item, NewItem, NewTodo, Todo } from '../api/apiTypes'

export function EditItemTodoDialog({
  items,
  item,
  todo,
  onClose,
}: {
  items: Item[] | NewItem[]
  item: Item | NewItem
  todo?: Todo | NewTodo
  onClose: () => void
}) {
  return (
    <div className='border-t border-gray-200 w-full p-2'>
      <div className='flex justify-between'>
        <div className='text-l'>Muokkaus</div>

        <button onClick={onClose}>
          <XCircleIcon className='h-4 w-4 opacity-60' />
        </button>
      </div>
      {todo && todo.title}
      {!todo && item.title}
    </div>
  )
}
