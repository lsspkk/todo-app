import React, { ChangeEvent, useState } from 'react'
import { Todo, Editable, Item } from '../api/apiTypes'
import { Input } from 'components/Input'
import { Radio } from 'components/Radio'
import Button from 'components/Button'
import { TextArea } from 'components/TextArea'

export function AddTodoPanel({ onAction, onCancel }: { onAction: (editable: Editable) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<{
    title: string
    type: 'todo' | 'itemOne' | 'itemTwo' | 'itemThree'
    content?: string
    level?: number
  }>({
    title: '',
    type: 'todo',
    level: 0,
    content: undefined,
  })

  const [message, setMessage] = useTimedMessage()

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  function onAdd() {
    if (formData.title.length < 2) {
      setMessage('Tarvitaan pidempi nimi')
    }
    if (formData.type === 'todo') {
      const newTodo: Todo = { id: '', itemId: '', title: formData.title, content: formData.content || '', done: false }
      onAction(newTodo)
      onCancel()
      return
    }
    const level = formData.type === 'itemOne' ? 1 : formData.type === 'itemTwo' ? 2 : 3
    const item: Item = { id: '', level, title: formData.title, content: formData.content || '' }
    onAction(item)
  }

  return (
    <li className='w-full'>
      <div
        onClick={() => onCancel()}
        className='fixed top-0 left-0 w-full h-full bg-gray-200 opacity-75'
        style={{ zIndex: 100 }}
      ></div>
      <div
        className='rounded w-full p-4 py-2 flex flex-col gap-4 justify-between bg-white relative -ml-4 shadow'
        style={{ zIndex: 101 }}
      >
        <div className='mr-4'>Lisää</div>
        <div className='flex gap-4'>
          <Radio name='type' value='todo' label='Tehtävä' id='typeTodo' />
          <Radio name='type' value='itemOne' label='Otsikko 1' id='typeOne' />
          <Radio name='type' value='itemTwo' label='Otsikko 2' id='typeTwo' />
          <Radio name='type' value='itemThree' label='Otsikko 3' id='typeThree' />
        </div>
        <Input label='nimi' handleChange={handleChange} value={formData.title} name='title' />
        <TextArea label='kuvaus' handleChange={handleChange} name='content'>
          {formData.content}
        </TextArea>
        {message && <div className='text-red-300'>{message}</div>}
        <div className='flex justify-end gap-4 max-w-md self-end'>
          <Button onClick={onCancel}>Keskeytä</Button>
          <Button onClick={onAdd}>Lisää</Button>
        </div>
      </div>
    </li>
  )
}
function useTimedMessage(defaultValue?: string): [string | undefined, (newValue: string) => void] {
  const [value, setValue] = useState<string | undefined>(defaultValue)

  const setTimedValue = (newValue: string) => {
    setValue(newValue)
    setTimeout(() => setValue(undefined), 3000)
  }
  return [value, setTimedValue]
}
