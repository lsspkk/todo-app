import { Item, NewFile } from 'api/apiTypes'
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
  const [items, setItems] = useState<Item[] | null>(null)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.currentTarget.files
    if (!fileList || fileList.length < 1) return
    const name = fileList[0].name
    const content = await fileList[0].text()

    const newItems = markdownParse(content)
    console.debug(newItems)
    setNewFile({ name, content, items: newItems })
    setItems(newItems)
  }

  async function handleLoadItem(itemId: string) {
    await setTimeout(() => {}, 50)
  }
  return (
    <div className='m-4'>
      <div className='flex gap-8 items-center mt-8 content-between flex-wrap'>
        <div className='w-full sm:w-3/6 md:flex'>
          <h3 className='text-lg leading-6 font-medium pr-4'>Lue MarkDown Tiedosto</h3>
          <input type='file' accept='.md' onChange={handleChange} />
        </div>
        <div className='w-full sm:w-2/6 flex'>
          <Button
            className='w-1/2 mr-2  bg-transparent text-gray-700 border-2 border-gray-500 hover:bg-gray-200'
            onClick={hideAdd}
          >
            Peruuta
          </Button>
          <Button
            className={`w-1/2   ${items ? 'bg-indigo-900' : 'bg-gray-500'}`}
            onClick={() => newFile && saveFile(newFile)}
          >
            Tuo
          </Button>
        </div>
      </div>
      {newFile && items && (
        <div>
          <h3 className='text-lg leading-6 font-medium text-gray-900 mt-8 mb-2'>Tiedosto tehtävinä</h3>

          <ItemList {...{ items, handleLoadItem, handleDoneClicked: (itemId: string) => {} }} />
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
