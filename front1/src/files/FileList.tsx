import { FolderIcon, TrashIcon } from '@heroicons/react/outline'
import { File } from 'api/apiTypes'
import { useState } from 'react'
import { removeFile } from 'store/filesReducer'
import { useAppDispatch } from 'store/hooks'
import { ConfirmDialog } from '../components/ConfirmDialog'

export function FileList({
  files,
  handleLoadItems,
}: {
  files: File[]
  handleLoadItems(fileId: string): Promise<void>
}) {
  const [confirmFile, setConfirmFile] = useState<File | undefined>()

  return (
    <div className='m-4'>
      {confirmFile && <ConfirmDeleteDialog onClose={() => setConfirmFile(undefined)} file={confirmFile} />}

      {files.map((file) => (
        <div className='w-full flex justify-between' key={`simpleFileList.${file.id}`}>
          <button onClick={() => handleLoadItems(file.id)} className='flex content-start items-center mb-1'>
            <FolderIcon className='w-4 mr-2' />
            <h3>{file.name}</h3>
          </button>

          <button>
            <TrashIcon className='w-4' onClick={() => setConfirmFile(file)} />
          </button>
        </div>
      ))}
    </div>
  )
}

function ConfirmDeleteDialog({ onClose, file }: { onClose: () => void; file: File }) {
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')

  const onDelete = async () => {
    const r = await dispatch(removeFile(file.id))
    if (r.type !== 'deleteFile/fulfilled') {
      setError('Tiedoston poistaminen epäonnistui')
      setTimeout(() => setError(''), 5000)
    } else {
      onClose()
    }
  }
  return (
    <ConfirmDialog
      onClose={onClose}
      title='Poista tiedosto'
      message={`Haluatko varmasti poistaa tiedoston ${file.name}?`}
      onConfirm={() => onDelete()}
      confirmLabel='Poista'
    >
      {error.length > 0 && <div className='text-sm text-red-800'>{error}</div>}
    </ConfirmDialog>
  )
}
