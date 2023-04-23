import { XCircleIcon } from '@heroicons/react/outline'
import { Item, Todo } from 'api/apiTypes'
import React, { useRef, useState } from 'react'
import { useAppDispatch } from 'store/hooks'
import { updateItem, updateItemTodo } from 'store/itemsReducer'

export function EditableItemTitle({ item }: { item: Item }) {
  const dispatch = useAppDispatch()
  const onSubmit = (newTitle: string) => {
    dispatch(updateItem({ ...item, title: newTitle }))
  }

  return (
    <EditableTitle
      {...{
        name: `item-${item.id}`,
        title: item.title,
        onSubmit,
      }}
    />
  )
}

export function EditableTodoTitle({ itemId, todo }: { itemId: string; todo: Todo }) {
  const dispatch = useAppDispatch()
  const onSubmit = (newTitle: string) => {
    dispatch(updateItemTodo({ itemId, todo: { ...todo, title: newTitle } }))
  }

  return (
    <EditableTitle
      {...{
        name: `todo-${todo.id}`,
        title: todo.title,
        onSubmit,
      }}
    />
  )
}

export function EditableTitle({
  name,
  title,
  onSubmit,
}: {
  name: string
  title: string
  onSubmit: (newTitle: string) => void
}) {
  const [value, setValue] = useState(title)
  const [isEdit, setIsEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = () => {
    onSubmit(value)
    //setTimeout(() => inputRef.current?.blur(), 100)
  }

  return (
    <form className='flex items-center justify-between sm:justify-start w-full gap-4'>
      {isEdit && (
        <div
          onClick={() => setIsEdit(() => false)}
          className='absolute top-0 left-0 w-full h-full bg-gray-200 opacity-75'
          style={{ zIndex: 100 }}
        ></div>
      )}
      <input
        ref={inputRef}
        style={isEdit ? { zIndex: 101 } : {}}
        id={`id-${name}`}
        name={`name-${name}`}
        type='text'
        className={`appearance-none ${
          isEdit ? 'bg-white' : 'bg-transparent'
        } rounded-1 relative block w-auto p-1 m:[-2px] border border-gray-100 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        placeholder='käyttäjätunnus'
        value={value}
        onChange={(e) => isEdit && setValue(e.target.value)}
        onClick={() => setIsEdit(() => true)}
      />
      {isEdit && (
        <div className='flex items-center gap-4 sm:mr-0 mr-4' style={{ zIndex: 101 }}>
          <button type='submit' onClick={onChange}>
            OK
          </button>
          <button className='h-6 w-6' onClick={() => setIsEdit(() => false)}>
            <XCircleIcon />
          </button>
        </div>
      )}
    </form>
  )
}
