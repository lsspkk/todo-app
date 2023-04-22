import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFile, getFiles, postFile, deleteFile } from '../api/api'
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
  | { type: 'deleteFile/fulfilled'; payload: string }

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
  if (action.type === 'deleteFile/fulfilled') {
    return {
      ...state,
      files: state.files.filter((file) => file.id !== action.payload),
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
export const removeFile = createAsyncThunk('deleteFile', async (id: string) => deleteFile(id))
