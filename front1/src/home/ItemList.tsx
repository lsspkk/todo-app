import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import CheckBox from 'components/Checkbox'
import { ConfirmDialog } from 'components/ConfirmDialog'
import { object } from 'prop-types'
import React, { ReactNode, useRef, useState } from 'react'
import { useAppDispatch } from 'store/hooks'
import { removeItem, removeTodo, updateItem, updateItemTodo } from 'store/itemsReducer'
import { Item, Todo, Editable, isItem, isTodo } from '../api/apiTypes'
import { EditItemTodoDialog } from './EditItemTodoDialog'

function bgColor(level: number) {
  return level === 0 ? 'bg-gray-200' : level === 1 ? 'bg-gray-100' : level === 2 ? 'bg-gray-50' : 'bg-white'
}

type ActionCommand = 'add' | 'delete' | 'levelUp' | 'levelDown'

export function ItemList({
  items,
  handleLoadItem,
  handleDoneClicked,
  editMode = false,
}: {
  handleLoadItem: (itemId: string) => Promise<void>
  items: Item[]
  handleDoneClicked: (itemId: string, todo: Todo) => void
  editMode: boolean
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
        {items.map((item) => (
          <ItemRow key={item.id} {...{ item, showTodos, handleShowTodos, handleDoneClicked, editMode, onAction }} />
        ))}
      </dl>
    </div>
  )
}

function Row({ level, children }: { level: number; children: ReactNode }) {
  return (
    <div
      className={`${bgColor(
        level
      )} px-4 py-2 flex gap-4 w-full items-center justify-between text-left text-sm text-gray-900`}
    >
      {children}
    </div>
  )
}

function ItemRow({
  item,
  showTodos,
  handleShowTodos,
  handleDoneClicked,
  editMode,
  onAction,
}: {
  item: Item
  handleDoneClicked: (itemId: string, todo: Todo) => void
  showTodos: string[]
  handleShowTodos: (itemId: string) => void
  editMode: boolean
  onAction: (item: Editable, action: ActionCommand) => void
}) {
  const { content, level } = item
  const itemId = item.id
  const todos = item.todos || []
  const todoCount = 'todoCount' in item ? item.todoCount : todos?.length
  const showToggle = todoCount !== undefined && todoCount > 0 && !editMode

  return (
    <div key={`item-${itemId}`}>
      <Row level={level}>
        <EditTitle {...{ item }} />
        {showToggle && (
          <button className='flex gap-2 items-center mr-2' onClick={() => handleShowTodos(itemId)}>
            {showTodos.includes(itemId) ? (
              <ChevronUpIcon className='h-4 w-4' />
            ) : (
              <ChevronDownIcon className='h-4 w-4' />
            )}
          </button>
        )}
        {editMode && <ItemActions {...{ item, onAction }} />}
      </Row>

      <dt className='pl-4 text-sm font-medium text-gray-500'>{content}</dt>

      {(editMode || showTodos.includes(itemId)) && todos && (
        <TodoList
          {...{
            itemId,
            todos,
            handleDoneClicked,
            editMode,
            onAction,
          }}
        />
      )}
    </div>
  )
}

function ItemActions({
  item,
  onAction,
}: {
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
      <button className='flex gap-2 items-center ml-4' onClick={() => setConfirm(true)}>
        <TrashIcon className='h-4 w-4' />
      </button>
    </div>
  )
}

function TodoActions({
  todo,
  onAction,
}: {
  todo: Todo
  onAction: (editable: Editable, action: ActionCommand) => void
}) {
  const [confirm, setConfirm] = useState(false)

  return (
    <div className='flex gap-2 items-center'>
      {confirm && (
        <ConfirmDialog
          title={`Poista tehtävä`}
          message={`Haluatko varmasti poistaa 'tehtävän'}?`}
          onConfirm={() => onAction(todo, 'delete')}
          onClose={() => setConfirm(false)}
          confirmLabel={'Poista'}
        />
      )}

      <button className='flex gap-2 items-center ml-4' onClick={() => setConfirm(true)}>
        <TrashIcon className='h-4 w-4' />
      </button>
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

function EditTitle({ item }: { item: Item }) {
  const dispatch = useAppDispatch()
  const onSubmit = (newTitle: string) => {
    dispatch(updateItem({ ...item, title: newTitle }))
  }

  return (
    <TitleEdit
      {...{
        name: `item-${item.id}`,
        title: item.title,
        onSubmit,
      }}
    />
  )
}

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
  onAction: (editable: Editable, action: ActionCommand) => void
}) {
  return (
    <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
      <ul className='divide-y divide-gray-200 ml-6'>
        {todos?.map((todo, i) => {
          const id = `id.${todo.id}.${itemId}`
          return (
            <li
              key={`${itemId}-todo-${id}`}
              className='pl-4 py-1 flex items-center justify-between text-sm flex items-center w-full'
              // disabled={!isTodo}
              // onClick={() => isTodo && handleDoneClicked && handleDoneClicked(itemId, todo)}
            >
              <EditTodoTitle {...{ itemId, todo }} />
              {!editMode && (
                <CheckBox
                  className={`flex-shrink-0 h-3 w-3 pr-0 ${todo.done ? 'text-blue-900' : 'text-gray-400'}`}
                  aria-hidden='true'
                  checked={todo.done}
                  onChange={() => handleDoneClicked(itemId, todo)}
                />
              )}
              {editMode && <TodoActions {...{ todo, onAction }} />}
              <div className='ml-4 flex-shrink-0'>{todo.content}</div>
            </li>
          )
        })}
      </ul>
    </dd>
  )
}

function EditTodoTitle({ itemId, todo }: { itemId: string; todo: Todo }) {
  const dispatch = useAppDispatch()
  const onSubmit = (newTitle: string) => {
    dispatch(updateItemTodo({ itemId, todo: { ...todo, title: newTitle } }))
  }

  return (
    <TitleEdit
      {...{
        name: `todo-${todo.id}`,
        title: todo.title,
        onSubmit,
      }}
    />
  )
}

function TitleEdit({ name, title, onSubmit }: { name: string; title: string; onSubmit: (newTitle: string) => void }) {
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
