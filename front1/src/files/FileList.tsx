import { FolderIcon, TrashIcon } from '@heroicons/react/outline'
import { File } from 'api/apiTypes'
import Button from 'components/Button'
import { useState } from 'react'
import { removeFile } from 'store/filesReducer'
import { useAppDispatch } from 'store/hooks'

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
    <Dialog onClose={onClose}>
      <div className='text-l'>Poista tiedosto</div>
      <div className='text-sm'>Haluatko varmasti poistaa tiedoston {file.name}?</div>
      <div className='flex justify-between gap-8 sm:gap-20 md:w-'>
        <Button onClick={onClose}>Peruuta</Button>
        <Button onClick={() => onDelete()}>Poista</Button>
      </div>
      {error.length > 0 && <div className='text-sm text-red-800'>{error}</div>}
    </Dialog>
  )
}

function Dialog({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className='fixed inset-0' onClick={onClose}>
      <div className='fixed inset-0 top-16 sm:justify-center sm:inset-40 sm:border-2 p-4 sm:max-h-80 sm:h-auto sm:p-8 z-10 overflow-y-auto flex flex-col gap-4 bg-white shadow-sm'>
        <div className='flex flex-col gap-8'>{children}</div>
      </div>
    </div>
  )
}
