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
    <div className='mt-6'>
      {files.map(({ id, name, items }) => (
        <div key={`simpleFileList.${id}`} className='flex justify-between sm:grid sm:grid-cols-3  items-center'>
          <h3>{name}</h3>
          <Button
            onClick={() => handleLoadItems(id)}
            className='bg-indigo-200 text-black hover:bg-indigo-300 w-20 mb-2'
          >
            Lataa
          </Button>
        </div>
      ))}
    </div>
  )
}
