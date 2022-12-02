import { FolderAddIcon } from '@heroicons/react/outline'
import { NewFile } from 'api/apiTypes'
import Button from 'components/Button'
import Error from 'components/Error'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addFile, loadFile, loadFileList } from 'store/filesReducer'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { loadFileItemList } from 'store/itemsReducer'
import { AddFileDialog } from './AddFileDialog'
import { FileList } from './FileList'

export function FileListContainer() {
  const [showAdd, setShowAdd] = useState(false)
  const dispatch = useAppDispatch()
  const { files } = useAppSelector((state) => state.files)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadFileList())
  }, [dispatch])

  async function saveFile(newFile: NewFile) {
    const r = await dispatch(addFile(newFile))
    if (r.type !== 'postFile/fulfilled') {
      setError('Tiedoston tallennus epäonnistui')
      setTimeout(() => setError(''), 5000)
    } else {
      hideAdd()
    }
  }

  async function handleLoadItems(fileId: string) {
    await dispatch(loadFile(fileId))
    await dispatch(loadFileItemList(fileId))
    navigate('/')
  }

  function hideAdd() {
    setShowAdd(false)
  }

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
      <div className='px-4 py-2 flex items-center gap-8 justify-between'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>Tiedostot</h3>
        <div className='flex'>
          <div className='w-5/6 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap'>
            Yhteensä: {files.length}
          </div>
        </div>
        <div className='w-1/6'>
          {!showAdd && (
            <Button
              className='w-auto bg-indigo-200 text-black hover:bg-indigo-300 float-right'
              onClick={() => setShowAdd(true)}
            >
              <FolderAddIcon className='w-4 mr-1' />
              Tuo
            </Button>
          )}
        </div>
      </div>
      {error && <Error>{error}</Error>}
      {showAdd && <AddFileDialog {...{ saveFile, hideAdd }} />}
      {!showAdd && <FileList {...{ files, handleLoadItems }} />}
      <div className='border-t border-gray-200'></div>
    </div>
  )
}
