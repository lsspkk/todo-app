import { File } from './fileController'

let data: File[] = [
  { id: '1', accountId: '1', name: 'build_api.md', content: '' },
  { id: '2', accountId: '1', name: 'document_api.md', content: '' },
  { id: '3', accountId: '1', name: 'build_front.md', content: '' },
]

export const setFiles = (newData) => (data = newData)

export { data as files }
