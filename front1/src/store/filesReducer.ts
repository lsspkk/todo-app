import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFile, getFiles, postFile } from '../api/api'
import { ApiError, File, NewFile, Todo } from '../api/apiTypes'

export interface FilesStore {
  files: File[]
  currentFile?: File
}
export const initialUserState: FilesStore = {
  files: [],
}
export interface TodoFileUpdate {
  fileId: string
  todo: Todo
}

export type FilesStoreAction =
  | { type: 'NONE' }
  | { type: 'getFiles/fulfilled'; payload: File[] }
  | { type: 'getFile/fulfilled'; payload: File }
  | { type: 'postFile/fulfilled'; payload: File }

export const filesReducer = (
  state: FilesStore = initialUserState,
  action: FilesStoreAction = { type: 'NONE' }
): FilesStore => {
  //console.debug({ action })
  if (action.type === 'getFiles/fulfilled') {
    return { ...state, files: action.payload }
  }
  if (action.type === 'getFile/fulfilled') {
    return { ...state, currentFile: action.payload }
  }
  if (action.type === 'postFile/fulfilled') {
    return {
      ...state,
      files: [...state.files, action.payload].sort((a, b) => (a.name < b.name ? -1 : b.name > a.name ? 1 : 0)),
    }
  }
  return state
}

export const loadFileList = createAsyncThunk('getFiles', async () => getFiles())
export const loadFile = createAsyncThunk('getFile', async (id: string) => getFile(id))

export const addFile = createAsyncThunk<File, NewFile, { rejectValue: ApiError }>(
  'postFile',
  async (file: NewFile, thunkApi) => postFile(file, thunkApi)
)
