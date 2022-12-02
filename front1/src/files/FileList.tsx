import { FolderIcon } from '@heroicons/react/outline'
import { File } from 'api/apiTypes'
import Button from 'components/Button'

export function FileList({
  files,
  handleLoadItems,
}: {
  files: File[]
  handleLoadItems(fileId: string): Promise<void>
}) {
  return (
    <div className='m-4'>
      {files.map(({ id, name, items }) => (
        <button
          key={`simpleFileList.${id}`}
          onClick={() => handleLoadItems(id)}
          className='flex content-start items-center mb-1'
        >
          <FolderIcon className='w-4 mr-2' />
          <h3>{name}</h3>
        </button>
      ))}
    </div>
  )
}
