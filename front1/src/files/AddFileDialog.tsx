import { NewFile, NewItem } from 'api/apiTypes'
import Button from 'components/Button'
import { ItemList } from 'home/ItemList'
import React, { useState } from 'react'
import { markdownParse } from 'service/markdown'

interface AddFileDialogProps {
  saveFile(newFile: NewFile): void
  hideAdd(): void
}
export function AddFileDialog({ saveFile, hideAdd }: AddFileDialogProps) {
  const [newFile, setNewFile] = useState<NewFile | null>(null)
  const [items, setItems] = useState<NewItem[] | null>(null)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.currentTarget.files
    if (!fileList || fileList.length < 1) return
    const name = fileList[0].name
    const content = await fileList[0].text()

    const newItems = markdownParse(content)
    setNewFile({ name, content, items: newItems })
    setItems(newItems)
  }

  return (
    <div>
      <div className='flex gap-8 items-center mt-8'>
        <div className='w-4/6 flex'>
          <h3 className='text-lg leading-6 font-medium pr-4'>Lue MarkDown Tiedosto</h3>
          <input type='file' accept='.md' onChange={handleChange} />
        </div>
        <Button
          className='w-1/6 bg-transparent text-gray-700 border-2 border-gray-500 hover:bg-gray-200'
          onClick={hideAdd}
        >
          Peruuta
        </Button>
        <Button
          className={`w-1/6 ${items ? 'bg-indigo-900' : 'bg-gray-500'}`}
          onClick={() => newFile && saveFile(newFile)}
        >
          Tallenna
        </Button>
      </div>
      {newFile && items && (
        <div>
          <h3 className='text-lg leading-6 font-medium text-gray-900 mt-8 mb-2'>Tiedosto tehtävinä</h3>

          <ItemList {...{ items }} />
        </div>
      )}

      {newFile && newFile.content && (
        <div>
          <h3 className='text-lg leading-6 font-medium text-gray-900 mt-8 mb-2'>Tiedosto tekstinä</h3>

          <pre>{newFile.content}</pre>
        </div>
      )}
    </div>
  )
}
