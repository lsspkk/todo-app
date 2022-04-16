import { configureStore } from '@reduxjs/toolkit'
import { filesReducer } from './filesReducer'
import { itemsReducer } from './itemsReducer'
import { userReducer } from './userReducer'
// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    files: filesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
